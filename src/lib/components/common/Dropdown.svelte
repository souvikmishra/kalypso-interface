<script lang="ts">
	export let options: {
		key: string;
		label?: string;
		value: string;
	}[] = [];
	export let selected: string;
	let open = false;
	function onClick() {
		open = true;
	}
	function onOptionClick(event: any) {
		selected = event?.target.value;
		open = !open;
	}
</script>

<div class="dropdown dropdown-end dropdown-bottom" class:dropdown-open={open}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="btn btn-sm mb-1 h-9 text-xs capitalize" on:click={onClick}>{selected}</div>
	<ul class="menu dropdown-content rounded-box w-36 bg-base-100 p-2 shadow">
		{#each options as option}
			<option
				value={option.value}
				class="btn btn-ghost btn-sm h-10 cursor-pointer text-left text-xs capitalize"
				on:click|stopPropagation={onOptionClick}
			>
				{option.label || option.value}
			</option>
		{/each}
	</ul>
</div>
