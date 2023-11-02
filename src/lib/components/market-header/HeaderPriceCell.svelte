<script lang="ts">
	export let data: string;
	export let label: string;
</script>

<div class="flex flex-col">
	<div class="text-center text-xs font-medium text-base-content">
		{data}
	</div>
	<div class="m-[2px] text-xs font-normal text-base-300">{label}</div>
</div>
