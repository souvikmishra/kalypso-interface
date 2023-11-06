<script lang="ts">
	import SortableTable from './SortableTable.svelte';
	import type { ITableColumns } from './types';
	import { getAllAsksForMarketFromSubgraph } from '$lib/controller/subgraphController';
	import { selectedMarket } from '$lib/stores/general-data';

	let tableRows: any[] = [];
	let tableDataLoading = true;

	async function getAllAsksForMarketModified(marketId: string) {
		tableDataLoading = true;
		const asksForMarketFromSubgraph = await getAllAsksForMarketFromSubgraph(marketId);
		const modifiedAsksForMarket = asksForMarketFromSubgraph.data.askRequests.map((ask) => {
			const productType = ask.product_type ?? 'spot';
			const orderStatus = ask.state === 'COMPLETE' ? 'COMPLETE' : 'OPEN';
			const orderType = ask.state === 'COMPLETE' ? 'BUY' : 'SELL';
			const assignTimeStamp = new Date(ask.task.assigned_at * 1000);
			const completedTimeStamp = new Date(ask.task.completed_at * 1000);
			return {
				txId: ask.id,
				productType,
				orderStatus,
				orderType,
				orderSize: 'todo',
				price: 'todo',
				market: $selectedMarket.id.slice(0, 4),
				orderAmount: 'todo',
				value: ask.reward,
				tstamp: assignTimeStamp.toLocaleString()
			};
		});

		tableRows = modifiedAsksForMarket;
		tableDataLoading = false;
	}

	$: if ($selectedMarket.id !== '' && $selectedMarket.id !== undefined) {
		console.log($selectedMarket.id);
		getAllAsksForMarketModified($selectedMarket.id);
	}

	const tableColumns: ITableColumns<any> = [
		{
			key: 'tstamp',
			title: 'DATE',
			value: (v) => new Date(v.tstamp).toLocaleString(),
			sortable: true,
			headerClass: 'text-left'
		},
		{
			key: 'productType',
			title: 'PRODUCT',
			value: (v) => v.productType,
			sortable: true,
			headerClass: 'text-center'
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
			key: 'orderType',
			title: 'SIDE',
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
			key: 'price',
			title: 'PRICE',
			value: (v) => v.price,
			sortable: true,
			headerClass: 'text-center'
		},
		{
			key: 'orderAmount',
			title: 'AMOUNT',
			value: (v) => v.orderAmount,
			sortable: true,
			headerClass: 'text-center'
		},
		{
			key: 'value',
			title: 'VALUE',
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
	{#each tableRows as tableRow (tableRow.txId)}
		<tr>
			<td class="bg-inherit] border-[#202740b3]">{tableRow.tstamp}</td>
			<td class="bg-inherit] border-[#202740b3]">{tableRow.productType}</td>
			<td class="bg-inherit] border-[#202740b3]">{tableRow.orderStatus}</td>
			<td class="bg-inherit] border-[#202740b3]">{tableRow.market}</td>
			<td class="bg-inherit] border-[#202740b3]">{tableRow.orderType}</td>
			<td class="bg-inherit] border-[#202740b3]">{tableRow.orderSize}</td>
			<td class="bg-inherit] border-[#202740b3]">{tableRow.price}</td>
			<td class="bg-inherit] border-[#202740b3]">{tableRow.orderAmount}</td>
			<td class="bg-inherit] border-[#202740b3]">{tableRow.value}</td>
		</tr>
	{/each}
</SortableTable>
