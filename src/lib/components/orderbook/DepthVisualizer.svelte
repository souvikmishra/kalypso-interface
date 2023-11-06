<script lang="ts">
	import { OrderType } from './types';

	export let type: OrderType = OrderType.BIDS;
	export let depth: number = 50;
</script>

<div
	class={`relative left-0 top-[30px] z-[1] h-[30px] ${
		type == OrderType.BIDS ? 'bg-[#71D0A833]' : 'bg-[#FF2B6133]'
	} mt-[-30px]`}
	style="width: {depth}%"
>
	<slot />
</div>
