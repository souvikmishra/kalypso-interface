<script lang="ts">
	import { OrderType } from './types';

	export let type: OrderType = OrderType.BIDS;
	export let depth: number = 50;
</script>

<div
	class={`relative left-0 top-[30px] z-[1] h-[30px] ${
		type == OrderType.BIDS ? 'bg-[#18F9D81A]' : 'bg-[#DE345D33]'
	} mt-[-30px]`}
	style="width: {depth}%"
>
	<slot />
</div>
