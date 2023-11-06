<script lang="ts">
	import SortableTable from './SortableTable.svelte';
	import type { ITableColumns } from './types';
	import {
		getCompletedAsksForMarketFromSubgraph,
		getNotCompletedAsksForMarketFromSubgraph
	} from '$lib/controller/subgraphController';
	import { selectedMarket } from '$lib/stores/general-data';

	let tableRows: any[] = [];
	let tableDataLoading = true;

	async function getCompletedAsksForMarketModified(marketId: string) {
		tableDataLoading = true;
		const asksForMarketFromSubgraph = await getCompletedAsksForMarketFromSubgraph(marketId);
		console.log(asksForMarketFromSubgraph, 'asksForMarketFromSubgraph which are completed');
		const modifiedAsksForMarket = asksForMarketFromSubgraph.data.askRequests.map((ask) => {
			const orderStatus = ask.state === 'COMPLETE' ? 'COMPLETE' : 'OPEN';
			const orderType = ask.state === 'COMPLETE' ? 'BUY' : 'SELL';
			const completedTimeStamp = new Date(ask.task.completed_at_ts * 1000).toLocaleString();
			const provingTime = getHumanReadableTime(
				parseInt(ask.task.completed_at_ts) - parseInt(ask.task.assigned_at_ts)
			);
			const askAmount = (BigInt(ask.reward) / 1000000n).toLocaleString('en-US', {
				minimumFractionDigits: 2
			});
			const orderSize = ask.prover_data.length + ask.secret_data.length;
			const proofGenerationCost =
				parseInt(ask.task?.generator_info?.proof_generation_cost).toLocaleString('en-US', {
					minimumFractionDigits: 2
				}) ?? 'N/A';
			return {
				txId: ask.id,
				askAmount,
				orderStatus,
				orderType,
				orderSize,
				completedTimeStamp,
				provingTime,
				proofGenerationCost
			};
		});

		tableRows = modifiedAsksForMarket;
		tableDataLoading = false;
	}

	// function to get a human readable string format of time when given seconds as input
	function getHumanReadableTime(secondsToConvert: number) {
		const days = Math.floor(secondsToConvert / 86400);
		const hours = Math.floor((secondsToConvert % 86400) / 3600);
		const minutes = Math.floor((secondsToConvert % 3600) / 60);
		const seconds = Math.floor((secondsToConvert % 3600) % 60);

		let timeString = '';
		if (days > 0) timeString += `${days}d `;
		if (hours > 0) timeString += `${hours}h `;
		if (minutes > 0) timeString += `${minutes}m `;
		if (seconds > 0) timeString += `${seconds}s`;

		return timeString.trim();
	}

	$: if ($selectedMarket.id !== '' && $selectedMarket.id !== undefined) {
		console.log($selectedMarket.id);
		getCompletedAsksForMarketModified($selectedMarket.id);
	}

	const tableColumns: ITableColumns<any> = [
		{
			key: 'completedTimeStamp',
			title: 'PROOF GENERATED ON',
			value: (v) => new Date(v.completedTimeStamp).toLocaleString(),
			sortable: true,
			headerClass: 'text-left'
		},
		{
			key: 'orderStatus',
			title: 'STATUS',
			value: (v) => v.orderStatus,
			sortable: false,
			headerClass: 'text-center'
		},
		{
			key: 'orderType',
			title: 'TYPE',
			value: (v) => v.orderType,
			sortable: true,
			headerClass: 'text-center'
		},
		{
			key: 'orderSize',
			title: 'SIZE',
			value: (v) => v.orderSize,
			sortable: true,
			headerClass: 'text-center'
		},
		{
			key: 'askAmount',
			title: 'ASK AMOUNT',
			value: (v) => v.askAmount,
			sortable: true,
			headerClass: 'text-center'
		},
		{
			key: 'proofGenerationCost',
			title: 'ACTUAL REWARD',
			value: (v) => v.value,
			sortable: true,
			headerClass: 'text-center'
		},

		{
			key: 'provingTime',
			title: 'PROVING TIME',
			value: (v) => v.value,
			sortable: true,
			headerClass: 'text-center'
		}
	];
</script>

<SortableTable
	columns={tableColumns}
	tableHeightClasses={'max-h-[375px] h-[375px]'}
	loading={tableDataLoading}
>
	{#if tableRows.length > 0}
		{#each tableRows as tableRow (tableRow.txId)}
			<tr>
				<td class="border-[#202740b3] bg-inherit">{tableRow.completedTimeStamp}</td>
				<td class="border-[#202740b3] bg-inherit"
					><div
						class="badge text-white {tableRow.orderStatus === 'COMPLETE'
							? 'badge-success'
							: 'badge-error'}"
					>
						{tableRow.orderStatus}
					</div></td
				>
				<td class="border-[#202740b3] bg-inherit">
					<div
						class="badge text-white {tableRow.orderType === 'BUY'
							? 'badge-success'
							: 'badge-error'}"
					>
						{tableRow.orderType}
					</div>
				</td>
				<td class="border-[#202740b3] bg-inherit">{tableRow.orderSize}</td>
				<td class="border-[#202740b3] bg-inherit">{tableRow.askAmount}</td>
				<td class="border-[#202740b3] bg-inherit">{tableRow.proofGenerationCost}</td>
				<td class="border-[#202740b3] bg-inherit">{tableRow.provingTime}</td>
			</tr>
		{/each}
	{:else}
		<tr>
			<td class="border-[#202740b3] bg-inherit text-center" colspan="7">No Completed Orders</td>
		</tr>
	{/if}
</SortableTable>
