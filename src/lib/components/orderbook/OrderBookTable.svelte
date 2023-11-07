<script lang="ts">
	import SortableTable from '../table/SortableTable.svelte';
	import type { ITableColumns } from '../table/types';

	export let tableRows: any[] = [];
	export let tableDataLoading: boolean;

	const tableColumns: ITableColumns<any> = [
		{
			key: 'matchedPrice',
			title: 'PRICE (USDC)',
			value: (v) => v.matchedPrice,
			sortable: false,
			headerClass: 'text-left'
		},
		{
			key: 'date',
			title: 'TIME',
			value: (v) => new Date(v.date).toLocaleString(),
			sortable: true,
			headerClass: 'text-right'
		},
		{
			key: 'proofTime',
			title: 'PROOF TIME',
			value: (v) => v.proofTime,
			sortable: true,
			headerClass: 'text-right'
		},
		{
			key: 'generator',
			title: 'GENERATOR',
			value: (v) => v.generator,
			sortable: true,
			headerClass: 'text-right'
		}
	];
</script>

<SortableTable
	columns={tableColumns}
	tableHeightClasses={'max-h-[554px] h-[554px]'}
	loading={tableDataLoading}
	tableVariant="table-xs"
>
	{#if tableRows.length > 0}
		{#each tableRows as tableRow (tableRow.txId)}
			<tr>
				<td class="border-[#202740b3] bg-inherit"
					><div class={tableRow.matchedPrice === 'COMPLETE' ? '' : ''}>
						{tableRow.matchedPrice}
					</div></td
				>
				<td class="border-[#202740b3] bg-inherit text-right">{tableRow.date}</td>
				<td class="border-[#202740b3] bg-inherit">
					<div class="text-right {tableRow.proofTime === 'BUY' ? '' : ''}">
						{tableRow.proofTime}
					</div>
				</td>
				<td class="border-[#202740b3] bg-inherit text-right">{tableRow.generator}</td>
			</tr>
		{/each}
	{:else}
		<tr>
			<td class="border-[#202740b3] bg-inherit text-center" colspan="7">Order Book is Empty</td>
		</tr>
	{/if}
</SortableTable>
