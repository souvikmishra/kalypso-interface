<script lang="ts">
	import SortableTable from './SortableTable.svelte';
	import type { ITableColumns } from './types';

	const tableRows = [
		{
			txId: 1,
			productType: 'spot',
			orderStatus: 'open',
			market: 'ICP/USDC',
			orderType: 'Buy',
			orderSize: '931',
			price: 5.52,
			orderAmount: 135.32,
			value: 0.0,
			tstamp: +new Date()
		},
		{
			txId: 2,
			productType: 'spot',
			orderStatus: 'open',
			market: 'ICP/USDC',
			orderType: 'Buy',
			orderSize: '931',
			price: 5.52,
			orderAmount: 135.32,
			value: 0.0,
			tstamp: +new Date()
		},
		{
			txId: 3,
			productType: 'margin',
			orderStatus: 'open',
			market: 'ICP/USDC',
			orderType: 'Sell',
			orderSize: '931',
			price: 5.52,
			orderAmount: 135.32,
			value: 0.0,
			tstamp: +new Date()
		}
	];

	const tableColumns: ITableColumns<any> = [
		{
			key: 'tstamp',
			title: 'DATE',
			value: (v) => new Date(v.tstamp).toLocaleString(),
			sortable: true,
			headerClass: 'text-left'
			// renderValue: (v) =>
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

<SortableTable columns={tableColumns} rows={tableRows} />
