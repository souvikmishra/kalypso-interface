<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import type { IRowClassName, ITableColumn, ITableColumns } from './types';

	export let columns: ITableColumns<any>;
	export let rows: any[];
	export let c_rows: any[] = [];
	export let sortOrders = [1, -1];

	export let sortBy: string | undefined = '';
	export let sortOrder: number = sortOrders?.[0] || 1;

	export let selected: string[] | number[] = [];
	export let selectOnClick: boolean = false;
	export let selectSingle: boolean = true;
	export let iconAsc = '▲';
	export let iconDesc = '▼';
	export let iconSortable = '';

	export let rowKey: string | null = null;

	// className props
	export let classNameCell = '';
	export let classNameRowSelected: string | null = null;
	export let classNameRow: IRowClassName<any> = null;

	const dispatch = createEventDispatcher();
	let sortFunction = (r: any) => '';

	let columnByKey: Record<string | number | symbol, ITableColumn<any>>;
	$: {
		columnByKey = {};
		columns.forEach((col) => {
			columnByKey[col.key] = col;
		});
	}

	$: c_rows = rows
		.map((r: any) => {
			return Object.assign({}, r, {
				// internal row property for sort order
				$sortOn: sortFunction(r),
				$selected: rowKey !== null && (selected as any).indexOf(r[rowKey]) >= 0
			});
		})
		.sort((a, b) => {
			if (!sortBy) return 0;
			else if (a.$sortOn > b.$sortOn) return sortOrder;
			else if (a.$sortOn < b.$sortOn) return -sortOrder;
			return 0;
		});

	$: {
		let col = sortBy && columnByKey[sortBy];
		if (
			col !== undefined &&
			col != '' &&
			col.sortable === true &&
			typeof col.value === 'function'
		) {
			sortFunction = (r) => (col as any).value(r) + '';
		}
	}

	const updateSortOrder = (colKey: string) => {
		return colKey === sortBy
			? sortOrders[(sortOrders.findIndex((o) => o === sortOrder) + 1) % sortOrders.length]
			: sortOrders[0];
	};

	function handleClickCol(event: any, col: ITableColumn<any>) {
		if (col.sortable) {
			sortOrder = updateSortOrder(col.key.toString());
			sortBy = sortOrder ? col.key.toString() : undefined;
		}
		dispatch('clickCol', { event, col, key: col.key });
	}

	function handleClickRow(event: any, row: any) {
		if (selectOnClick) {
			if (selectSingle && rowKey) {
				// replace selection is default behaviour
				if ((selected as any).includes(row[rowKey])) {
					selected = [];
				} else {
					selected = [row[rowKey]];
				}
			} else if (rowKey) {
				if ((selected as any).includes(row[rowKey])) {
					selected = (selected as any).filter((r: any) => rowKey && r != row[rowKey]);
				} else {
					selected = [...selected, row[rowKey]].sort();
				}
			}
		}
		dispatch('clickRow', { event, row });
	}

	function handleClickCell(event: any, row: any, key: string) {
		dispatch('clickCell', { event, row, key });
	}

	function asStringArray(v: string[]) {
		const returnArray: string[] = [];
		return returnArray
			.concat(v)
			.filter((v) => v !== null && typeof v === 'string' && v !== '')
			.join(' ');
	}
</script>

<div class="overflow-x-auto">
	<table class="table w-full cursor-pointer bg-base-200">
		<!-- head -->
		<thead>
			<slot name="header" {sortOrder} {sortBy}>
				<tr>
					{#each columns as col}
						<th
							on:click={(e) => handleClickCol(e, col)}
							class:cursor-pointer={col.sortable}
							class:rounded-none={!col.rounded}
							tabindex="0"
						>
							{col.title}
							{#if sortBy === col.key}
								{@html sortOrder === 1 ? iconAsc : iconDesc}
							{:else if col.sortable}
								{@html iconSortable}
							{/if}
						</th>
					{/each}
				</tr>
			</slot>
		</thead>
		<tbody>
			{#each c_rows as row, n}
				<slot name="row" {row} {n}>
					<tr
						on:click={(e) => handleClickRow(e, row)}
						on:keypress={(e) => e.key === 'Enter' && handleClickRow(e, row)}
						class={asStringArray([
							typeof classNameRow === 'string' ? classNameRow : null,
							typeof classNameRow === 'function' ? classNameRow(row, n) : null,
							row.$selected && classNameRowSelected
						])}
						tabIndex={selectOnClick ? 0 : null}
					>
						{#each columns as col, colIndex}
							<td
								on:click={(e) => handleClickCell(e, row, col.key)}
								on:keypress={(e) => e.key === 'Enter' && handleClickCell(e, row, col.key)}
								class={asStringArray([
									typeof col.class === 'string' ? col.class : '',
									typeof col.class === 'function' ? col.class(row, n, colIndex) || '' : '',
									classNameCell,
									'border-[#202740b3] bg-inherit'
								])}
								class:{col.class}={col.class}
							>
								{#if col.renderValue || col.value}
									{@html col.renderValue ? col.renderValue(row) : col.value(row)}
								{/if}
							</td>
						{/each}
					</tr>
				</slot>
			{/each}
		</tbody>
	</table>
</div>
