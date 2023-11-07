<script lang="ts">
	import { getMarketDataFromSubgraph } from '$lib/controller/subgraphController';
	import { marketDataStore, selectedMarket } from '$lib/stores/general-data';
	import { capitaliseFirstLetters, getFirstTwoLetters } from '$lib/utils/commonHelper';
	import { onMount } from 'svelte';

	onMount(() => {
		getMarketDataModified();
	});

	async function getMarketDataModified() {
		const currentUnixTimeStamp = Math.floor(Date.now() / 1000);
		const timeStampOneDayBeforeCurrent = currentUnixTimeStamp - 86400;

		const marketDataFromSubgraph = await getMarketDataFromSubgraph(timeStampOneDayBeforeCurrent);

		const askRequestsOfLastDay = marketDataFromSubgraph.data.askRequests;
		const askRequestsPerMarketInLastOneDay = askRequestsOfLastDay.reduce((acc, curr) => {
			if (acc[curr.market.market_id]) {
				acc[curr.market.market_id] += 1;
			} else {
				acc[curr.market.market_id] = 1;
			}
			return acc;
		}, {});

		const marketDataModified = marketDataFromSubgraph.data.markets.map((market) => {
			let modifiedMetadata;
			const hexString = market.metadata.slice(2); // remove the '0x' prefix
			const str = hexString
				.match(/.{1,2}/g)
				.map((byte) => String.fromCharCode(parseInt(byte, 16)))
				.join('');
			modifiedMetadata = JSON.parse(str);
			const oneDayChange = market.total_proofs
				? (
						((askRequestsPerMarketInLastOneDay[market.id] || 0) / market.total_proofs) *
						100
				  ).toFixed(2)
				: 0;

			return {
				...market,
				oneDayChange,
				metadata: modifiedMetadata
			};
		});

		marketDataStore.set({
			loading: false,
			data: marketDataModified
		});
		selectedMarket.set(marketDataModified[0]);
	}

	const nameBadgeColors = ['#2DB8E3', '#FCC35B', '#1EA7FF', '#E46C8A', '#5967FF'];

	function getNameBadgeColor(index: number) {
		return nameBadgeColors[index % nameBadgeColors.length];
	}

	function getNameBadgeBackgroundColor(index: number) {
		// we add '19' at the end to lower color alpha. Ref. https://stackoverflow.com/questions/7015302/css-hexadecimal-rgba
		return nameBadgeColors[index % nameBadgeColors.length].concat('19');
	}

	function getFormattedId(id: string) {
		if (id.length < 8) {
			return id;
		}
		return id.slice(0, 4) + '...' + id.slice(id.length - 4, id.length);
	}
</script>

<div class="zk-market rounded-box flex h-[514px] min-h-[514px] flex-col bg-base-100 px-4 py-6">
	<div class="join w-full">
		<input
			type="text"
			placeholder="Search"
			class="input input-bordered input-md w-full rounded-e-none border-r-0 bg-base-200"
		/>
		<button class="btn join-item rounded-e-lg border-y border-l-0 border-r border-base-content/20"
			><img src="/icons/search.svg" alt="Search" /></button
		>
	</div>
	<div class="mt-6 text-lg font-semibold text-base-content">ZKDapp List</div>
	<ul class="mt-3 h-full">
		{#if $marketDataStore.loading}
			<div class="flex h-full w-full items-center justify-center">
				<span class="loading loading-spinner loading-lg" />
			</div>
		{:else if $marketDataStore.data.length === 0 && !$marketDataStore.loading}
			<div class="flex h-full w-full items-center justify-center">
				<span class="text-center text-base-content">No ZKDapp found</span>
			</div>
		{:else if $marketDataStore.data.length > 0 && !$marketDataStore.loading}
			{#each $marketDataStore.data as market, index (market.id)}
				<li class="relative border-b border-[##E3EBEE]">
					<button
						on:click={() => {
							selectedMarket.set(market);
						}}
						class="flex w-full items-center justify-between rounded-xl px-3 py-[10.5px] hover:bg-[#F3F7FA] {$selectedMarket.id ===
						market.id
							? 'content-none before:absolute before:-left-4 before:top-4 before:h-9 before:w-1 before:rounded-e-lg before:bg-primary'
							: ''}"
					>
						<div class="flex">
							<div
								class="flex h-[46px] min-h-[46px] w-[46px] min-w-[46px] items-center justify-center rounded-xl"
								style="background-color: {getNameBadgeBackgroundColor(index)};"
							>
								<span style="color: {getNameBadgeColor(index)};"
									>{market.metadata.zkAppName
										? getFirstTwoLetters(market.metadata.zkAppName)
										: market.id.slice(0, 2)}</span
								>
							</div>
							<div class="ml-2 flex shrink flex-col items-start justify-center">
								<span
									class="max-w-[120px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal text-base-content 2xl:max-w-[181px]"
									>{market.metadata.zkAppName
										? capitaliseFirstLetters(market.metadata.zkAppName)
										: getFormattedId(market.id)}</span
								>
								<span class="text-xs font-normal text-base-300">USDC</span>
							</div>
						</div>
						<div
							class="flex flex-col items-end
				"
						>
							<span class="base-content text-sm font-medium"
								>{parseInt(market.total_asks).toLocaleString('en-US')}</span
							>
							{#if market.oneDayChange < 0}
								<span class="flex gap-1 text-xs font-normal text-error">
									<img src="/icons/chevron_red.svg" alt="downtrend indicator" />{Math.abs(
										market.oneDayChange
									)}%</span
								>
							{:else}
								<span class="flex gap-1 text-xs font-normal text-success"
									><img src="/icons/chevron_green.svg" alt="uptrend indicator" />{Math.abs(
										market.oneDayChange
									)}%</span
								>
							{/if}
						</div>
					</button>
				</li>
			{:else}
				<div class="flex h-full w-full items-center justify-center">
					<span class="text-base-content text-center"
						>Uh Oh. Seems like our servers are gone fishing! Please retry.</span
					>
				</div>
			{/each}
		{/if}
	</ul>
</div>
