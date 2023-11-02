<script lang="ts">
	import { tokensPairList } from '$lib/constants/common';
	import { allHeaderTradingPairs, generalData } from '$lib/stores/general-data';
	let selMarket = 'c1/ta';
	generalData.subscribe((value) => {
		selMarket = value.selected;
	});
	function onButtonClick(event: any) {
		selMarket = event?.target.value;
	}
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

<div class={`tabs w-full justify-center rounded-lg bg-transparent p-0`}>
	{#each $allHeaderTradingPairs
		.map((cur) => tokensPairList.find((_) => _.value == cur))
		.filter((_) => !!_) as tab}
		{#if tab}
			<button
				value={tab.value}
				class="tab relative h-full rounded-full bg-transparent pr-7 text-[#9699BC]"
				class:tab-active={selMarket == tab.value}
				style={selMarket == tab.value
					? 'background: linear-gradient(90deg, #9753EE 0%, #417FF8 100%); color: #FFFFFF;'
					: ''}
				on:click|stopPropagation={onButtonClick}
			>
				{tab.label}
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<!-- svelte-ignore a11y-no-static-element-interactions -->
				<span
					class="btn btn-ghost btn-xs absolute right-1 top-[5px] h-6 w-6 rounded-full p-0"
					data-value={tab.value}
					on:click|stopPropagation={onStarClick}
				>
					<img
						alt="star_icon"
						class="pointer-events-none"
						src={$generalData.favourites.indexOf(tab.value) != -1
							? '/icons/star_filled.svg'
							: '/icons/star_empty.svg'}
					/>
				</span>
			</button>
		{/if}
	{/each}
</div>
