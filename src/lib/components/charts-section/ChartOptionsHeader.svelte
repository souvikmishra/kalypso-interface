<script lang="ts">
	import Tabs from '../common/Tabs.svelte';
	const timeFrameOptions = [
		{
			key: '15m',
			value: '15m',
			label: '15m'
		},
		{
			key: '1h',
			value: '1h',
			label: '1h'
		},
		{
			key: '8h',
			value: '8h',
			label: '8h'
		},
		{
			key: '1d',
			value: '1d',
			label: '1d'
		}
	];
	export let timeFrame = '1d';

	const indicatorTypeOptions = [
		{
			label: 'Candlestick',
			value: 'candlestick',
			labelSrc: '/icons/candlestick.svg'
		},
		{
			label: 'Hollowstick',
			value: 'hollowstick',
			labelSrc: '/icons/hollowcandlestick.svg'
		},
		{
			label: 'Line',
			value: 'line',
			labelSrc: '/icons/linechart.svg'
		}
	];
	export let indicatorType = 'candlestick';
</script>

<div class="flex w-full items-center">
	<p class="mr-8 text-sm font-medium">Time</p>
	<Tabs bind:selected={timeFrame} tabs={timeFrameOptions} />
	<p class="ml-5 mr-8 text-sm font-medium">Indicator</p>
	<Tabs bind:selected={indicatorType} tabs={indicatorTypeOptions} />
	<p class="ml-5" />
	<slot name="capture-camera-slot" />
	<slot name="fullscreen-chart-slot" />
</div>
