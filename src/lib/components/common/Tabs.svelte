<script lang="ts">
	export let tabs: {
		label?: string;
		value: string;
		labelSrc?: string;
	}[] = [];
	export let selected: string;
	export let variant: 'boxed' | 'bordered' = 'boxed';
	function onButtonClick(event: any) {
		selected = event?.target.value;
	}
</script>

{#if variant === 'boxed'}
	<div class="tabs-boxed tabs" style:padding="2px">
		{#each tabs as tab}
			<button
				value={tab.value}
				class="tab h-9 flex-1 font-semibold {selected === tab.value ? 'tab-active' : ''}"
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
	<div class="tabs rounded-t-2xl bg-base-100" style:padding="2px">
		{#each tabs as tab}
			<button
				value={tab.value}
				class="tab tab-bordered h-12 px-7 font-semibold {selected === tab.value
					? 'tab-active'
					: ''}"
				on:click|stopPropagation={onButtonClick}
			>
				{tab.label || tab.value}
			</button>
		{/each}
	</div>
{/if}
