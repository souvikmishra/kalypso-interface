<script lang="ts">
	import Tabs from '../common/Tabs.svelte';
	import LineIndicatorTabs from './LineIndicatorTabs.svelte';
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
	export let indicatorType = 'line';
</script>

<div class="flex w-full items-center">
	<p class="mr-4 text-sm font-medium">Time</p>
	<Tabs bind:selected={timeFrame} tabs={timeFrameOptions} />
	<p class="ml-6 mr-4 text-sm font-medium">Indicator</p>
	<LineIndicatorTabs bind:selected={indicatorType} />
</div>
