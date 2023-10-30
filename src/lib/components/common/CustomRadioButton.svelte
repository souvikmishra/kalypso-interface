<script lang="ts">
	export let options: {
		key: string;
		label?: string;
		value: string;
	}[] = [];
	export let selected: string;
	function onOptionClick(event: any) {
		selected = event?.target.value;
	}
</script>

<div class="flex gap-4">
	{#each options as option}
		<label
			class="cursor-pointer h-11 flex-1 flex items-center bg-[#181C2E] border border-[#1E2438] rounded-xl px-4 py-3"
		>
			<input
				type="radio"
				name="radio-10"
				class="radio checked:bg-primary"
				value={option.value}
				checked={option.value === selected}
				on:click|stopPropagation={onOptionClick}
			/>
			<span class="text-xs font-semibold text-white ml-2">{option.label || option.value}</span>
		</label>
	{/each}
</div>
