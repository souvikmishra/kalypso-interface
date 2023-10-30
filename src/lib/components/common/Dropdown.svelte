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

<div class="dropdown dropdown-bottom dropdown-end" class:dropdown-open={open}>
	<!-- svelte-ignore a11y-click-events-have-key-events -->
	<div class="btn btn-sm h-9 mb-1 capitalize text-xs" on:click={onClick}>{selected}</div>
	<ul class="p-2 shadow menu dropdown-content bg-base-100 rounded-box w-36">
		{#each options as option}
			<option
				value={option.value}
				class="btn btn-ghost btn-sm h-10 text-left cursor-pointer text-xs capitalize"
				on:click|stopPropagation={onOptionClick}
			>
				{option.label || option.value}
			</option>
		{/each}
	</ul>
</div>
