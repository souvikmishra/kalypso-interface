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
			avgCostUSD: 1730,
			avgTimeInMinutes: 160,
			price: 11025,
			priceByTimeUSD: 1400,
			proofsExecuted: 40117
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
<div class="card flex h-[62px] w-full flex-row rounded-[20px] bg-base-100">
	<TransparentDropdown
		options={tokensPairList}
		bind:selected={$generalData.selected}
		dropdownClass={'!w-[125%]'}
	>
		<svelte:fragment slot="option" let:value let:label let:onClick>
			<button
				class="btn btn-ghost no-animation btn-md h-full w-full cursor-pointer gap-2 bg-transparent p-1 font-normal capitalize text-base-content"
				{value}
				on:click|stopPropagation={onClick}
			>
				{label}
				<span
					class="btn btn-ghost btn-xs h-6 w-6 rounded-full p-0"
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
	<div class="my-[10px] h-[calc(100%-20px)] w-[1px] bg-[#202740]" />
	<HeaderPriceInfo />
</div>
