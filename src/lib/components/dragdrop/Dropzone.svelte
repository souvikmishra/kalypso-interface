<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	let isDragActive = false;
	let inputRef: HTMLInputElement;

	const dispatch = createEventDispatcher();
	function handleDrag(e: any) {
		if (e.type === 'dragenter' || e.type === 'dragover') {
			isDragActive = true;
		} else if (e.type === 'dragleave') {
			isDragActive = false;
		}
	}
	function handleChange(e: any) {
		if (e.target.files && e.target.files.length) {
			handleFiles(e.target.files);
		}
	}
	function handleDrop(e: any) {
		isDragActive = false;
		if (e.dataTransfer.files && e.dataTransfer.length) {
			handleFiles(e.dataTransfer.files);
		}
	}
	function onClick(e: any) {
		console.log(inputRef);
		if (inputRef) {
			inputRef.click();
		}
	}
	function handleFiles(files: any[]) {
		dispatch('onFilesChange', Array.prototype.slice.call(files));
	}
</script>

<form
	id="form-file-upload"
	class="appearance-none"
	on:dragenter|preventDefault|stopPropagation={handleDrag}
	on:submit|preventDefault
>
	<input
		bind:this={inputRef}
		type="file"
		tabindex="-1"
		id="input-file-upload"
		multiple={true}
		class="hidden"
		on:change|preventDefault={handleChange}
	/>
	<button
		class="flex h-[85px] w-full cursor-pointer flex-row content-center items-center gap-2 rounded-xl border border-dashed border-base-300 bg-base-200 px-6 py-4 backdrop-filter"
		on:click={onClick}
	>
		<img alt="" src="/icons/upload-file.svg" />
		<p class="text-center text-xs text-base-content">
			Drag'n drop your json file here, or click to select files
		</p>
	</button>
	{#if isDragActive}
		<div
			id="drag-file-element"
			class="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-2xl"
			on:dragenter|preventDefault|stopPropagation={handleDrag}
			on:dragleave|preventDefault|stopPropagation={handleDrag}
			on:dragover|preventDefault|stopPropagation={handleDrag}
			on:drop|preventDefault|stopPropagation={handleDrop}
		/>
	{/if}
</form>
