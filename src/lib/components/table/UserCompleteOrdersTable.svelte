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
			return {
				txId: ask.id,
				askAmount,
				orderStatus,
				orderType,
				orderSize,
				completedTimeStamp,
				provingTime,
				orderAmount: 'todo'
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
			key: 'tstamp',
			title: 'PROOF GENERATED ON',
			value: (v) => new Date(v.tstamp).toLocaleString(),
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
			key: 'market',
			title: 'MARKET',
			value: (v) => v.market,
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
			value: (v) => v.orderAmount,
			sortable: true,
			headerClass: 'text-center'
		},
		{
			key: 'actualReward',
			title: 'Actual Reward',
			value: (v) => v.value,
			sortable: true,
			headerClass: 'text-center'
		},
		{
			key: 'provingTime',
			title: 'Proving Time',
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
				<td class="border-[#202740b3] bg-inherit">{tableRow.orderStatus}</td>
				<td class="border-[#202740b3] bg-inherit">{tableRow.orderType}</td>
				<td class="border-[#202740b3] bg-inherit">{tableRow.orderSize}</td>
				<td class="border-[#202740b3] bg-inherit">{tableRow.askAmount}</td>
				<td class="border-[#202740b3] bg-inherit">{tableRow.actualReward}</td>
				<td class="border-[#202740b3] bg-inherit">{tableRow.provingTime}</td>
			</tr>
		{/each}
	{:else}
		<tr>
			<td class="border-[#202740b3] bg-inherit text-center" colspan="7">No Completed Orders</td>
		</tr>
	{/if}
</SortableTable>
