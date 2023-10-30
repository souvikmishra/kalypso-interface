<script lang="ts">
	export let open = false;
	export let onClose: (() => void) | undefined = undefined;
	export let showCloseBtn = false;
	function onCrossBtnClick() {
		if (onClose) {
			onClose();
		}
	}
</script>

<div class="modal modal-bottom sm:modal-middle" class:modal-open={open}>
	<div class="modal-box relative">
		{#if showCloseBtn}
			<button class="btn btn-sm btn-circle absolute right-2 top-2" on:click={onCrossBtnClick}
				>✕</button
			>
		{/if}
		<slot name="header" />
		<slot name="content" />
		<slot name="footer" />
	</div>
</div>
