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
	<span class="text-sm {type == OrderType.BIDS ? 'text-[#4CC18B]' : 'text-[#FF2B61]'}"
		>{rowData.price}</span
	>
	<span class="text-sm {type == OrderType.BIDS ? 'text-[#4CC18B]' : 'text-[#FF2B61]'}"
		>{rowData.size}</span
	>
	<span class="text-sm">{rowData.total}</span>
</div>
