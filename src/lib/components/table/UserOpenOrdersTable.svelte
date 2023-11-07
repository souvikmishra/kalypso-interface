<script lang="ts">
	import SortableTable from './SortableTable.svelte';
	import type { ITableColumns } from './types';
	export let tableRows: any[] = [];
	export let tableDataLoading = true;

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
				<td class="border-[#202740b3] bg-inherit">{tableRow.askProvingTime}</td>
			</tr>
		{/each}
	{:else}
		<tr>
			<td class="border-[#202740b3] bg-inherit text-center" colspan="7">No Open Orders</td>
		</tr>
	{/if}
</SortableTable>
