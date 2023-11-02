<script lang="ts">
	export let data: string;
	export let label: string;
</script>

<div class="flex flex-col">
	<div class="text-left text-xs font-medium text-base-content">
		{data}
	</div>
	<div class="text-left text-xs font-light text-base-300">{label}</div>
</div>
