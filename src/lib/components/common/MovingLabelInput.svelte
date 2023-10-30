<script lang="ts">
	export let value = '';
</script>

<div class="relative">
	<input
		{...$$restProps}
		class="block px-3.5 pb-3.5 pt-4 w-full text-md text-md text-white bg-base-300 rounded-lg appearance-none focus:outline-none focus:ring-0 peer"
		class:pr-16={$$restProps.unitText}
		placeholder=" "
		bind:value
	/>
	<label
		for={$$restProps.id}
		class="absolute text-md text-[#7A8699] duration-300 transform -translate-y-4 scale-75 top-1 z-10 origin-[0] px-3.5 peer-focus:px-3.5 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1 peer-focus:scale-75 peer-focus:-translate-y-4 left-1"
		>{$$restProps.label}</label
	>
	{#if $$restProps.unitText}
		<div class="absolute text=[#9699BC] uppercase -translate-y-1/2 top-1/2 right-0 px-3.5">
			{$$restProps.unitText}
		</div>
	{/if}
</div>
