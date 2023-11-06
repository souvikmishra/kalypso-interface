<script lang="ts">
	import CandleStick from '$lib/constants/svgs/CandleStick.svelte';
	import HollowBar from '$lib/constants/svgs/HollowBar.svelte';
	import LineBar from '$lib/constants/svgs/LineBar.svelte';

	export let selected: string;
</script>

<div class="tabs-boxed tabs">
	<button
		value={'candlestick'}
		class="tab h-9 flex-1 font-semibold {selected === 'candlestick' ? 'tab-active' : ''}"
		on:click={() => (selected = 'candlestick')}
	>
		<CandleStick />
	</button>
	<button
		value={'hollowstick'}
		class="tab h-9 flex-1 font-semibold {selected === 'hollowstick' ? 'tab-active' : ''}"
		on:click={() => (selected = 'hollowstick')}
	>
		<HollowBar />
	</button>
	<button
		value={'line'}
		class="tab h-9 flex-1 font-semibold {selected === 'line' ? 'tab-active' : ''}"
		on:click={() => (selected = 'line')}
	>
		<LineBar />
	</button>
</div>
