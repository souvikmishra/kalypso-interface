<script lang="ts">
	import { tokensPairList } from '$lib/constants/common';
	import { generalData } from '$lib/stores/general-data';
	import TransparentDropdown from '../common/TransparentDropdown.svelte';
	import HeaderPriceInfo from './HeaderPriceInfo.svelte';
	import type { PairPriceInfo } from './types';
	let curPairPriceInfo: PairPriceInfo;
	const dummyPairPriceInfo: Record<string, PairPriceInfo> = {
		'c1/ta': {
			avgCostUSD: 1200,
			avgTimeInMinutes: 65,
			price: 18520,
			priceByTimeUSD: 1200,
			proofsExecuted: 42191
		},
		'c2/ta': {
			avgCostUSD: 1330,
			avgTimeInMinutes: 120,
			price: 24025,
			priceByTimeUSD: 1500,
			proofsExecuted: 40697
		},
		'c3/ta': {
			avgCostUSD: 1330,
			avgTimeInMinutes: 120,
			price: 24025,
			priceByTimeUSD: 1500,
			proofsExecuted: 40697
		}
	};
	generalData.subscribe((value) => {
		curPairPriceInfo = dummyPairPriceInfo[value.selected];
	});

	function onStarClick(event: any) {
		const curValue = event.target.dataset['value'] || '';
		generalData.update((cur) => {
			let _favourites;
			if (cur.favourites.indexOf(curValue) != -1) {
				_favourites = [...cur.favourites].filter((_) => _ != curValue);
			} else {
				_favourites = [...cur.favourites, curValue];
			}
			return {
				favourites: _favourites,
				selected: cur.selected
			};
		});
	}
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<div class="card rounded-[20px] bg-base-200 w-full h-full flex flex-row">
	<TransparentDropdown
		options={tokensPairList}
		bind:selected={$generalData.selected}
		dropdownClass={'!w-[125%]'}
	>
		<svelte:fragment slot="option" let:value let:label let:onClick>
			<button
				class="btn btn-md gap-2 p-1 btn-ghost h-full w-full bg-transparent font-normal cursor-pointer text-white no-animation capitalize"
				{value}
				on:click|stopPropagation={onClick}
			>
				{label}
				<span
					class="btn btn-xs btn-ghost p-0 h-6 w-6 rounded-full"
					data-value={value}
					on:click|stopPropagation={onStarClick}
				>
					<img
						alt="star_icon"
						class="pointer-events-none"
						src={$generalData.favourites.indexOf(value) != -1
							? '/icons/star_filled.svg'
							: '/icons/star_empty.svg'}
					/>
				</span>
			</button>
		</svelte:fragment>
	</TransparentDropdown>
	<!-- {selMarket} -->
	<div class="w-[1px] h-[calc(100%-20px)] my-[10px] bg-[#202740]" />
	<HeaderPriceInfo pairPriceInfo={curPairPriceInfo} />
</div>
