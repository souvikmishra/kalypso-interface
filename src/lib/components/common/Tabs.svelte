<script lang="ts">
	export let tabs: {
		label?: string;
		value: string;
		labelSrc?: string;
	}[] = [];
	export let tabContClass: string = '';
	export let tabClass: string = '';
	export let selectedTabClass: string = '';
	export let selected: string;
	export let variant: 'boxed' | 'bordered' = 'boxed';
	function onButtonClick(event: any) {
		selected = event?.target.value;
	}
</script>

{#if variant === 'boxed'}
	<div class={`tabs-boxed tabs rounded-lg bg-base-300 ${tabContClass}`} style:padding="2px">
		{#each tabs as tab}
			<button
				value={tab.value}
				class={`tab h-9 flex-1 font-semibold ${tabClass} ${
					selectedTabClass && selected == tab.value ? selectedTabClass : ''
				}`}
				class:tab-active={selected == tab.value}
				on:click|stopPropagation={onButtonClick}
			>
				{#if tab.labelSrc}
					<img
						src={tab.labelSrc}
						alt={tab.label}
						class="pointer-events-none h-full w-auto object-contain"
					/>
				{:else}
					{tab.label || tab.value}
				{/if}
			</button>
		{/each}
	</div>
{:else}
	<div class="tabs bg-base-200" style:padding="2px">
		{#each tabs as tab}
			<button
				value={tab.value}
				class="tab tab-bordered h-12 px-7 font-semibold"
				class:text-[#18F9D8]={selected == tab.value}
				class:border-transparent={selected != tab.value}
				class:border-[#18F9D8]={selected == tab.value}
				on:click|stopPropagation={onButtonClick}
			>
				{tab.label || tab.value}
			</button>
		{/each}
	</div>
{/if}
