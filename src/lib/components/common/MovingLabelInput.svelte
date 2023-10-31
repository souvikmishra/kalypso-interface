<script lang="ts">
	export let value = '';
</script>

<div class="relative">
	<input
		{...$$restProps}
		class="text-md text-md peer block w-full appearance-none rounded-lg bg-base-300 px-3.5 pb-3.5 pt-4 text-white focus:outline-none focus:ring-0"
		class:pr-16={$$restProps.unitText}
		placeholder=" "
		bind:value
	/>
	<label
		for={$$restProps.id}
		class="text-md absolute left-1 top-1 z-10 origin-[0] -translate-y-4 scale-75 transform px-3.5 text-[#7A8699] duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-1 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-3.5"
		>{$$restProps.label}</label
	>
	{#if $$restProps.unitText}
		<div class="text=[#9699BC] absolute right-0 top-1/2 -translate-y-1/2 px-3.5 uppercase">
			{$$restProps.unitText}
		</div>
	{/if}
</div>
