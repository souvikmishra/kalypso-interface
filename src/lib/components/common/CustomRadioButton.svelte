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
		<label class="flex flex-1 cursor-pointer items-center rounded-xl">
			<input
				type="radio"
				name="radio-10"
				class="radio h-[16px] w-[16px]"
				value={option.value}
				checked={option.value === selected}
				on:click|stopPropagation={onOptionClick}
			/>
			<span class="ml-2 text-sm text-base-content">{option.label || option.value}</span>
		</label>
	{/each}
</div>
