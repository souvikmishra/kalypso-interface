<script lang="ts">
	import { getMarketDataFromSubgraph } from '$lib/controller/subgraphController';
	import { marketDataStore } from '$lib/stores/general-data';
	import { capitaliseFirstLetters, getFirstTwoLetters } from '$lib/utils/stringHelpers';
	import { onMount } from 'svelte';

	onMount(() => {
		getMarketDataModified();
	});

	let marketList = [];

	async function getMarketDataModified() {
		const marketDataFromSubgraph = await getMarketDataFromSubgraph();
		const marketDataModified = marketDataFromSubgraph.data.markets.map((market) => {
			let modifiedMetadata;
			const hexString = market.metadata.slice(2); // remove the '0x' prefix
			const str = hexString
				.match(/.{1,2}/g)
				.map((byte) => String.fromCharCode(parseInt(byte, 16)))
				.join('');
			modifiedMetadata = JSON.parse(str);
			return {
				...market,
				metadata: modifiedMetadata
			};
		});
		console.log('after decode', marketDataModified);

		marketDataStore.set({
			loading: false,
			data: marketDataModified
		});

		// TODO: add one day change calulation
		marketList = marketDataModified.map((market) => {
			return {
				id: market.id,
				name: capitaliseFirstLetters(market.metadata?.zkAppName) ?? undefined,
				totalEvaluation: parseInt(market.total_value),
				oneDayChange: market.oneDayChange ?? 0
			};
		});
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
				<span class="loading loading-spinner loading-lg"></span>
			</div>
		{:else if $marketDataStore.data.length === 0 && !$marketDataStore.loading}
			<div class="flex h-full w-full items-center justify-center">
				<span class="text-base-content">No ZKDapp found</span>
			</div>
		{:else if $marketDataStore.data.length > 0 && !$marketDataStore.loading}
			{#each marketList as zkApp, index (zkApp.id)}
				<li class="border-b border-[##E3EBEE]">
					<button
						class="flex w-full items-center justify-between rounded-xl px-3 py-[10.5px] hover:bg-[#F3F7FA]"
					>
						<div class="flex">
							<div
								class="flex h-[46px] min-h-[46px] w-[46px] min-w-[46px] items-center justify-center rounded-xl"
								style="background-color: {getNameBadgeBackgroundColor(index)};"
							>
								<span style="color: {getNameBadgeColor(index)};"
									>{zkApp.name ? getFirstTwoLetters(zkApp.name) : zkApp.id.slice(0, 2)}</span
								>
							</div>
							<div class="ml-2 flex shrink flex-col items-start justify-center">
								<span
									class="max-w-[127px] overflow-hidden text-ellipsis whitespace-nowrap text-sm font-normal text-base-content 2xl:max-w-[193px]"
									>{zkApp.name ? zkApp.name : getFormattedId(zkApp.id)}</span
								>
								<span class="text-xs font-normal text-base-300">USDC</span>
							</div>
						</div>
						<div
							class="flex flex-col items-end
				"
						>
							<span class="base-content text-sm font-medium"
								>{zkApp.totalEvaluation.toLocaleString('en-US')}</span
							>
							{#if zkApp.oneDayChange < 0}
								<span class="flex gap-1 text-xs font-normal text-error">
									<img src="/icons/chevron_red.svg" alt="downtrend indicator" />{Math.abs(
										zkApp.oneDayChange
									)}%</span
								>
							{:else}
								<span class="flex gap-1 text-xs font-normal text-success"
									><img src="/icons/chevron_green.svg" alt="uptrend indicator" />{Math.abs(
										zkApp.oneDayChange
									)}%</span
								>
							{/if}
						</div>
					</button>
				</li>
			{:else}
				fuck
			{/each}
		{/if}
	</ul>
</div>
