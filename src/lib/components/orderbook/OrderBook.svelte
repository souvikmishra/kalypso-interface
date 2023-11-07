<script lang="ts">
	import { getOrderBookDataFromSubgraph } from '$lib/controller/subgraphController';
	import { selectedMarket } from '$lib/stores/general-data';
	import { get } from 'svelte/store';
	import OrderBookTable from './OrderBookTable.svelte';
	import { getHumanReadableTime } from '$lib/utils/stringHelpers';

	let tableDataLoading = true;
	let orderBookData: any[] = [];

	async function getOrderBookDataModified(marketId: string) {
		tableDataLoading = true;
		const orderBookDataFromSubgraph = await getOrderBookDataFromSubgraph(marketId);

		let nextMatchedPrice = 0;
		orderBookData = orderBookDataFromSubgraph.data.askRequests.map((ask, idx) => {
			nextMatchedPrice =
				idx < orderBookDataFromSubgraph.data.askRequests.length - 1
					? parseInt(
							orderBookDataFromSubgraph.data.askRequests[idx + 1].task.generator_info
								.proof_generation_cost
					  ) / 100000000
					: 0;
			const priceColor =
				idx === orderBookDataFromSubgraph.data.askRequests.length - 1
					? 'text-[#4CC18B]'
					: parseInt(ask.task.generator_info.proof_generation_cost) / 100000000 <= nextMatchedPrice
					? 'text-[#4CC18B]'
					: 'text-[#FF2B61]';
			const txId = ask.id;
			const date = new Date(ask.task.completed_at_ts * 1000).toLocaleTimeString('en-US', {
				hour12: false
			});
			const matchedPrice = (
				parseInt(ask.task.generator_info.proof_generation_cost) / 100000000
			).toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 8
			});
			const proofTime = getHumanReadableTime(ask.task.completed_at_ts - ask.task.assigned_at_ts);
			const generator =
				ask.task.generator_info.generator.id.slice(0, 3) +
				'...' +
				ask.task.generator_info.generator.id.slice(-4);

			return {
				priceColor,
				txId,
				date,
				matchedPrice,
				proofTime,
				generator
			};
		});
		tableDataLoading = false;
	}

	$: if ($selectedMarket.id !== undefined && $selectedMarket.id !== '') {
		getOrderBookDataModified($selectedMarket.id);
	}
</script>

<div class="flex h-full flex-col rounded-[20px] bg-base-100 p-6">
	<div>
		<p class="font-poppins text-base font-medium leading-4 text-base-content">Market Trades</p>
		<div class="divider mt-0"></div>
	</div>
	<OrderBookTable tableRows={orderBookData} {tableDataLoading} />
</div>
