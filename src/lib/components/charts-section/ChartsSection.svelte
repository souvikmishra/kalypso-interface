<script lang="ts">
	import { ColorType } from 'lightweight-charts';
	import Chart from '../charts/Chart.svelte';
	import HistogramSeries from '../charts/HistogramSeries.svelte';
	import type { $$PROPS as ChartProps } from '../charts/Chart.types';
	import type { $$PROPS as CandleStickSeriesProps } from '../charts/CandleStickSeries.types';
	import PriceScale from '../charts/PriceScale.svelte';
	import CandleStickSeries from '../charts/CandleStickSeries.svelte';
	import LineSeries from '../charts/LineSeries.svelte';
	import ChartOptionsHeader from './ChartOptionsHeader.svelte';
	import TokenSelectorHeader from './TokenSelectorHeader.svelte';
	import {
		showFavouritesHeader,
		allHeaderTradingPairs,
		selectedMarket
	} from '$lib/stores/general-data';
	import { getCompletedAsksForMarketFromSubgraph } from '$lib/controller/subgraphController';

	let indicatorType: string;
	let timeFrame: string;
	let completedAsks: any[];
	let volume: any = [];
	let price: any = [];
	let dataLoading = true;

	const options: ChartProps = {
		width: 600,
		height: 505,
		autoSize: true,
		rightPriceScale: {
			scaleMargins: {
				top: 0.3,
				bottom: 0.25
			},
			borderVisible: false
		},
		layout: {
			background: {
				type: ColorType.Solid,
				color: '#fff'
			},
			textColor: '#070A21',
			fontFamily: 'Poppins'
		},
		grid: {
			vertLines: {
				color: '#fff'
			},
			horzLines: {
				color: '#E3EBEE'
			}
		},
		localization: {
			priceFormatter: (price) => {
				return `${price.toFixed(6)}`;
			}
		}
	};

	let candlestickOptions: CandleStickSeriesProps | null;
	let hollowstickOptions: CandleStickSeriesProps | null;
	function updateChartOptions(indicatorType: string, price: any[], marketId: string) {
		candlestickOptions = null;
		hollowstickOptions = null;
		switch (indicatorType) {
			case 'candlestick':
				candlestickOptions = {
					data: price,
					upColor: '#57CA94',
					wickUpColor: '#57CA94',
					borderVisible: false,
					downColor: '#FF3569',
					wickDownColor: '#FF3569'
				};
				break;
			case 'hollowstick':
				hollowstickOptions = {
					data: price,
					upColor: 'transparent',
					wickUpColor: '#57CA94',
					borderUpColor: '#57CA94',
					downColor: '#FF3569',
					borderDownColor: '#FF3569',
					wickDownColor: '#FF3569',
					priceLineColor: '#000'
				};
				break;
		}
	}
	$: updateChartOptions(indicatorType, price, $selectedMarket.id);

	let chartApi: ChartProps['ref'];
	function handleChartRef(ref: any) {
		if (ref) {
			chartApi = ref;
		}
	}

	let isCameraOptionsVisible = false;
	let downloadChartAnchorEleRef: HTMLAnchorElement;
	function getChartImage(canvas: HTMLCanvasElement) {
		return canvas.toDataURL('image/png', 1);
	}
	function handleCameraClick() {
		let chartImage = getChartImage((chartApi as any)?.takeScreenshot());
		isCameraOptionsVisible = true;
		downloadChartAnchorEleRef.href = chartImage;
		downloadChartAnchorEleRef.download = `ChartImage_${new Date().toLocaleString()}.png`;
	}
	function handleFullscreenClick() {}

	async function getCompletedAsksForMarketModified(marketId: string) {
		completedAsks = await getCompletedAsksForMarketFromSubgraph(marketId);
	}

	function getSecondsFromTimeframe(timeFrame: string) {
		switch (timeFrame) {
			case '15m':
				return 900;
			case '1h':
				return 3600;
			case '8h':
				return 28800;
			case '1d':
				return 86400;
			default:
				return 86400;
		}
	}

	function getVolumeAndPriceData(asks: any[], timeFrame: string) {
		dataLoading = true;
		if (asks !== undefined) {
			volume = [];
			// Define the time frame (in seconds), e.g., 5 minutes
			const timeframeInSeconds = getSecondsFromTimeframe(timeFrame);
			// Get the current timestamp in seconds
			const currentTimestamp = Math.floor(Date.now() / 1000);
			// Initialize an object to store grouped data
			const groupedData = {};
			// Iterate through the data and group by time frames
			asks.data?.askRequests.forEach((item) => {
				const completedAtTimestamp = parseInt(item.task.completed_at_ts);
				const timeDifference = currentTimestamp - completedAtTimestamp;
				const groupKey = Math.floor(timeDifference / timeframeInSeconds) * timeframeInSeconds;
				if (!groupedData[groupKey]) {
					groupedData[groupKey] = {
						count: 0,
						open: parseInt(item.task.generator_info.proof_generation_cost) / 100000000,
						close: parseInt(item.task.generator_info.proof_generation_cost) / 100000000,
						high: parseInt(item.task.generator_info.proof_generation_cost) / 100000000,
						low: parseInt(item.task.generator_info.proof_generation_cost) / 100000000
					};
				} else {
					groupedData[groupKey].count++;
					groupedData[groupKey].low = Math.min(
						groupedData[groupKey].low,
						parseInt(item.task.generator_info.proof_generation_cost) / 100000000
					);
					groupedData[groupKey].high = Math.max(
						groupedData[groupKey].high,
						parseInt(item.task.generator_info.proof_generation_cost) / 100000000
					);
					groupedData[groupKey].close =
						parseInt(item.task.generator_info.proof_generation_cost) / 100000000;
				}
			});

			const timeKeys = Object.keys(groupedData).map(Number);
			const minTimeKey = Math.min(...timeKeys);
			const maxTimeKey = Math.max(...timeKeys);
			const volumeData = [];
			const priceData = [];
			for (let timeKey = minTimeKey; timeKey <= maxTimeKey; timeKey += timeframeInSeconds) {
				const date = new Date((currentTimestamp - timeKey) * 1000);
				const year = date.getFullYear();
				const month = (date.getMonth() + 1).toString().padStart(2, '0');
				const day = date.getDate().toString().padStart(2, '0');
				const formattedDate = `${year}-${month}-${day}`;
				volumeData.unshift({
					time: formattedDate,
					value: groupedData[timeKey]?.count || 0,
					color: '#57CA9499'
				});
				priceData.unshift({
					time: formattedDate,
					open: groupedData[timeKey]?.open || 0,
					close: groupedData[timeKey]?.close || 0,
					high: groupedData[timeKey]?.high || 0,
					low: groupedData[timeKey]?.low || 0,
					color: groupedData[timeKey]?.open > groupedData[timeKey]?.close ? '#FF3569' : '#57CA94'
				});
			}

			volume = volumeData;
			price = priceData;
		}
		dataLoading = false;
	}

	function getLineData(priceData: any[]) {
		return priceData.map((cur) => {
			(cur as any).value = cur.close;
			cur.color = '#424CEA';
			return cur;
		});
	}

	$: if ($selectedMarket.id !== undefined && $selectedMarket.id !== '') {
		getCompletedAsksForMarketModified($selectedMarket.id);
	}
	$: getVolumeAndPriceData(completedAsks, timeFrame);
	$: lineData = getLineData(price);
</script>

<div class="flex h-full max-h-[612px] flex-col rounded-[20px] bg-base-100 p-4">
	<div
		class="mb-7 h-9 flex-row content-center"
		class:hidden={!$showFavouritesHeader || $allHeaderTradingPairs.length <= 1}
		class:flex={$showFavouritesHeader && $allHeaderTradingPairs.length > 1}
	>
		<TokenSelectorHeader />
		<!-- svelte-ignore a11y-click-events-have-key-events -->
		<!-- <img
			src="/icons/close_circle_outline.svg"
			alt="x"
			class="cursor-pointer"
			on:click|stopPropagation={onCloseFavouritesHeader}
		/> -->
	</div>
	<div class="flex flex-row items-center">
		<ChartOptionsHeader bind:indicatorType bind:timeFrame />
		<div class="flex items-center justify-end">
			<div class="dropdown dropdown-end z-10">
				<button
					class="btn btn-square btn-xs h-8 w-8 border-0 bg-transparent p-[4px]"
					on:click={handleCameraClick}
				>
					<img
						src="/icons/camera.svg"
						class="h-full w-auto object-contain"
						alt="capture_chart_camera_icon"
					/>
				</button>
				<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
				<ul
					tabindex="0"
					class="menu dropdown-content rounded-box w-52 bg-base-100 p-2 shadow"
					class:dropdown-open={isCameraOptionsVisible}
				>
					<!-- svelte-ignore a11y-click-events-have-key-events -->
					<!-- svelte-ignore a11y-missing-attribute -->
					<li><a bind:this={downloadChartAnchorEleRef} class="p-2 text-sm">Download as png</a></li>
				</ul>
			</div>
			<div class="tooltip" data-tip="View on Fullscreen">
				<button
					class="btn btn-square btn-xs h-8 w-8 border-0 bg-transparent p-[4px]"
					on:click={handleFullscreenClick}
				>
					<img alt="View on Fullscreen" src="/icons/fullscreen.svg" />
				</button>
			</div>
		</div>
	</div>

	<Chart {...options} ref={handleChartRef}>
		{#if indicatorType == 'candlestick'}
			{#key price}
				<CandleStickSeries {...candlestickOptions} />
			{/key}
		{:else if indicatorType == 'hollowstick'}
			{#key price}
				<CandleStickSeries {...hollowstickOptions} />
			{/key}
		{:else}
			{#key lineData}
				<LineSeries data={lineData} />
			{/key}
		{/if}

		{#key volume}
			<HistogramSeries
				data={volume}
				priceScaleId="volume"
				color="#26a69a"
				priceFormat={{ type: 'volume' }}
			/>
			<PriceScale id="volume" mode={0} scaleMargins={{ top: 0.8, bottom: 0 }} />
		{/key}
	</Chart>
</div>
