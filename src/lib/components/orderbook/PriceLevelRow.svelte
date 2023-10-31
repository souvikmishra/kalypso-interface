<script lang="ts">
	import { OrderType } from './types';
	export let type: OrderType;
	export let rowData: {
		total: string;
		size: string;
		price: string;
	};
</script>

<div class="relative z-[1] flex h-[30px] justify-between">
	<span class="text-sm" style="color: {type == OrderType.BIDS ? '#18F9D8' : '#DE345D'}"
		>{rowData.price}</span
	>
	<span class="text-sm">{rowData.size}</span>
	<span class="text-sm">{rowData.total}</span>
</div>
