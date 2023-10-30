<script lang="ts">
	// TODO: combine this with Dropdown
	export let options: {
		key: string;
		label?: string;
		value: string;
	}[] = [];
	export let selected: string;
	export let dropdownClass: string = '';
	let selectedOptionLabel: string;
	$: selectedOptionLabel = options.find((cur) => cur.value === selected)?.label || '';
	function onOptionClick(event: any) {
		selected = event?.target.value;
	}
</script>

<div class="dropdown dropdown-bottom h-full">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div
		class="btn btn-md h-full no-animation font-normal text-white bg-transparent rounded-r-none border-opacity-0 overflow-hidden capitalize"
		tabindex="0"
	>
		{selectedOptionLabel}
		<img src="/icons/dropdown.svg" alt="dropdown-icon" class="ml-3" />
	</div>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul
		class={`p-2 shadow menu dropdown-content bg-base-100 rounded-box mt-1 ${dropdownClass}`}
		tabindex="0"
	>
		{#each options as option}
			<slot
				name="option"
				label={option.label || option.value}
				value={option.value}
				onClick={onOptionClick}
			>
				<option
					class="btn btn-md btn-ghost h-full bg-transparent font-normal cursor-pointer text-white"
					on:click|stopPropagation={onOptionClick}
				>
					{option.label || option.value}
				</option>
			</slot>
		{/each}
	</ul>
</div>
