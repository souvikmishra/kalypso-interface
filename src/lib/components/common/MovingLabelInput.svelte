<script lang="ts">
	export let value = '';
</script>

<div class="relative">
	<label for={$$restProps.id} class="mb-1 text-sm text-base-300 duration-300"
		>{$$restProps.label}</label
	>
	<input
		{...$$restProps}
		class="peer input input-bordered block w-full rounded-lg bg-base-200 px-3.5 pb-3.5 pt-4 font-semibold text-base-content"
		class:pr-16={$$restProps.unitText}
		placeholder=""
		bind:value
	/>
	{#if $$restProps.unitText}
		<div
			class="absolute right-0 top-[65%] -translate-y-1/2 px-3.5 text-base font-normal text-base-300"
		>
			{$$restProps.unitText}
		</div>
	{/if}
</div>
