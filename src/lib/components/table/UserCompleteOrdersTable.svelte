<script lang="ts">
	import { getOrderStatusTagColor } from '$lib/utils/commonHelper';
	import SortableTable from './SortableTable.svelte';
	import type { ITableColumns } from './types';

	export let tableRows: any[] = [];
	export let tableDataLoading = true;

	const tableColumns: ITableColumns<any> = [
		{
			key: 'date',
			title: 'DATE',
			value: (v) => new Date(v.date).toLocaleString(),
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
			key: 'assignedTo',
			title: 'ASSIGNED TO',
			value: (v) => v.assignedTo,
			sortable: true,
			headerClass: 'text-center'
		},
		{
			key: 'assignTimeStamp',
			title: 'ASSIGNED AT',
			value: (v) => v.assignTimeStamp,
			sortable: true,
			headerClass: 'text-right'
		},
		{
			key: 'limitPrice',
			title: 'LIMIT PRICE (USDC)',
			value: (v) => v.limitPrice,
			sortable: true,
			headerClass: 'text-right'
		},
		{
			key: 'matchedPrice',
			title: 'MATCHED PRICE (USDC)',
			value: (v) => v.matchedPrice,
			sortable: true,
			headerClass: 'text-right'
		},
		{
			key: 'expiryTime',
			title: 'EXPIRY TIME',
			value: (v) => v.expiryTime,
			sortable: true,
			headerClass: 'text-right'
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
				<td class="border-[#202740b3] bg-inherit">{tableRow.date}</td>
				<td class="border-[#202740b3] bg-inherit text-center"
					><div class="badge text-white {getOrderStatusTagColor(tableRow.orderStatus)}">
						{tableRow.orderStatus}
					</div></td
				>
				<td class="border-[#202740b3] bg-inherit text-center">
					{tableRow.assignedTo}
				</td>
				<td class="border-[#202740b3] bg-inherit text-right">{tableRow.assignTimeStamp}</td>
				<td class="border-[#202740b3] bg-inherit text-right">{tableRow.limitPrice}</td>
				<td class="border-[#202740b3] bg-inherit text-right">{tableRow.matchedPrice}</td>
				<td class="border-[#202740b3] bg-inherit text-right">{tableRow.expiryTime}</td>
			</tr>
		{/each}
	{:else}
		<tr>
			<td class="border-[#202740b3] bg-inherit text-center" colspan="7">No Completed Orders</td>
		</tr>
	{/if}
</SortableTable>
