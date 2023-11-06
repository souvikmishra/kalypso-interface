<script lang="ts">
	import SortableTable from './SortableTable.svelte';
	import type { ITableColumns } from './types';
	import { getNotCompletedAsksForMarketFromSubgraph } from '$lib/controller/subgraphController';
	import { selectedMarket } from '$lib/stores/general-data';

	let tableRows: any[] = [];
	let tableDataLoading = true;

	async function getNotCompletedAsksForMarketModified(marketId: string) {
		tableDataLoading = true;
		const asksForMarketFromSubgraph = await getNotCompletedAsksForMarketFromSubgraph(marketId);
		console.log(asksForMarketFromSubgraph, 'asksForMarketFromSubgraph which are open');
		const modifiedAsksForMarket = asksForMarketFromSubgraph.data.askRequests.map((ask) => {
			const orderStatus = ask.state === 'COMPLETE' ? 'COMPLETE' : 'OPEN';
			const orderType = ask.state === 'COMPLETE' ? 'BUY' : 'SELL';
			const assignTimeStamp = new Date(ask.task.assigned_at_ts * 1000).toLocaleString();
			const completedTimeStamp = new Date(ask.task.completed_at_ts * 1000).toLocaleString();
			const askProvingTime = getHumanReadableTime(ask.proving_time);
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
				orderStatus,
				orderType,
				orderSize,
				assignTimeStamp,
				completedTimeStamp,
				askAmount,
				askProvingTime,
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
		return `${days}d ${hours}h ${minutes}m ${seconds}s`;
	}

	$: if ($selectedMarket.id !== '' && $selectedMarket.id !== undefined) {
		console.log($selectedMarket.id);
		getNotCompletedAsksForMarketModified($selectedMarket.id);
	}

	const tableColumns: ITableColumns<any> = [
		{
			key: 'tstamp',
			title: 'ORDER CREATED ON',
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
			title: 'ACTUAL REWARD',
			value: (v) => v.value,
			sortable: true,
			headerClass: 'text-center'
		},
		{
			key: 'provingTime',
			title: 'REQUESTED PROVING TIME',
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
				<td class="border-[#202740b3] bg-inherit">{tableRow.assignTimeStamp}</td>
				<td class="border-[#202740b3] bg-inherit">{tableRow.orderStatus}</td>
				<td class="border-[#202740b3] bg-inherit">{tableRow.orderType}</td>
				<td class="border-[#202740b3] bg-inherit">{tableRow.orderSize}</td>
				<td class="border-[#202740b3] bg-inherit">{tableRow.askAmount}</td>
				<td class="border-[#202740b3] bg-inherit">{tableRow.proofGenerationCost}</td>
				<td class="border-[#202740b3] bg-inherit">{tableRow.askProvingTime}</td>
			</tr>
		{/each}
	{:else}
		<tr>
			<td class="border-[#202740b3] bg-inherit text-center" colspan="7">No Open Orders</td>
		</tr>
	{/if}
</SortableTable>
