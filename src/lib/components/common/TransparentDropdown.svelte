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

<div class="dropdown dropdown-bottom z-10 h-full">
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<div
		class="btn no-animation btn-md h-full overflow-hidden rounded-l-2xl rounded-r-none border-opacity-0 bg-transparent font-normal capitalize text-base-content"
		tabindex="0"
	>
		{selectedOptionLabel}
		<img src="/icons/dropdown.svg" alt="dropdown-icon" class="ml-3" />
	</div>
	<!-- svelte-ignore a11y-no-noninteractive-tabindex -->
	<ul
		class={`menu dropdown-content rounded-box mt-1 bg-base-100 p-2 shadow ${dropdownClass}`}
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
					class="btn btn-ghost btn-md h-full cursor-pointer bg-transparent font-normal text-base-content"
					on:click|stopPropagation={onOptionClick}
				>
					{option.label || option.value}
				</option>
			</slot>
		{/each}
	</ul>
</div>
