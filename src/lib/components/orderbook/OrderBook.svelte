<script lang="ts">
	import DepthVisualizer from './DepthVisualizer.svelte';
	import Loader from './Loader.svelte';
	import PriceLevelRow from './PriceLevelRow.svelte';
	import { OrderType } from './types';
	import { createDummyState, formatNumber } from './utils';
	import dummyBidsData from './bids';
	import { onMount } from 'svelte';

	let bids: string[][] = [];
	let asks: string[][] = [];
	let bidsPriceLevels: any[];
	let asksPriceLevels: any[];

	onMount(async () => {
		const data = createDummyState({
			bids: dummyBidsData.bids,
			asks: dummyBidsData.asks,
			groupingSize: 0.5
		});
		bids = data.bids;
		asks = data.asks;
	});

	const formatPrice = (arg: number): string => {
		return arg.toLocaleString('en', { useGrouping: true, minimumFractionDigits: 2 });
	};
	const buildPriceLevels = (levels: string[][], orderType: OrderType) => {
		let sortedPriceLevels = [...levels].sort(
			(currentLevel: string[], nextLevel: string[]): number => {
				let result: number = 0;
				if (orderType === OrderType.ASKS) {
					result = Number(nextLevel[0]) - Number(currentLevel[0]);
				} else {
					result = Number(currentLevel[0]) - Number(nextLevel[0]);
				}
				return result;
			}
		);

		sortedPriceLevels.length = 9;

		return sortedPriceLevels.map((level, idx) => {
			return {
				total: formatNumber(Number(level[2])),
				depth: level[3],
				size: formatNumber(Number(level[1])),
				price: formatPrice(Number(level[0]))
			};
		});
	};
	$: bidsPriceLevels = buildPriceLevels(bids, OrderType.BIDS);
	$: asksPriceLevels = buildPriceLevels(asks, OrderType.ASKS);
</script>

<div class="flex flex-col bg-base-200 rounded-[20px] p-6 h-full">
	<p class="font-poppins text-base font-medium leading-4 text-white mb-6">Market Trades</p>
	<div class="flex justify-between flex-row mb-3">
		<span class="text-[#9699BC] text-sm capitalize font-normal">Price</span>
		<span class="text-[#9699BC] text-sm capitalize font-normal">Size</span>
		<span class="text-[#9699BC] text-sm capitalize font-normal">Total</span>
	</div>
	{#if bids.length && asks.length}
		<div class="asks">
			{#each asksPriceLevels as curAsk}
				<div class="">
					<DepthVisualizer type={OrderType.ASKS} depth={curAsk.depth} />
					<PriceLevelRow rowData={curAsk} type={OrderType.ASKS} />
				</div>
			{/each}
		</div>
		<div class="bids">
			{#each bidsPriceLevels as curBid}
				<div class="">
					<DepthVisualizer type={OrderType.BIDS} depth={curBid.depth} />
					<PriceLevelRow rowData={curBid} type={OrderType.BIDS} />
				</div>
			{/each}
		</div>
	{:else}
		<Loader />
	{/if}
</div>
