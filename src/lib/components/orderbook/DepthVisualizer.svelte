<script lang="ts">
	import { OrderType } from './types';

	export let type: OrderType = OrderType.BIDS;
	export let depth: number = 50;
</script>

<div
	class={`h-[30px] relative top-[30px] left-0 z-[1] ${
		type == OrderType.BIDS ? 'bg-[#18F9D81A]' : 'bg-[#DE345D33]'
	} mt-[-30px]`}
	style="width: {depth}%"
>
	<slot />
</div>
