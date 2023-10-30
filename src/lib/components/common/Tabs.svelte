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
	<div class={`tabs tabs-boxed bg-base-300 rounded-lg ${tabContClass}`} style:padding="2px">
		{#each tabs as tab}
			<button
				value={tab.value}
				class={`tab flex-1 font-semibold h-9 ${tabClass} ${
					selectedTabClass && selected == tab.value ? selectedTabClass : ''
				}`}
				class:tab-active={selected == tab.value}
				on:click|stopPropagation={onButtonClick}
			>
				{#if tab.labelSrc}
					<img
						src={tab.labelSrc}
						alt={tab.label}
						class="h-full w-auto object-contain pointer-events-none"
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
				class="tab tab-bordered font-semibold h-12 px-7"
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
