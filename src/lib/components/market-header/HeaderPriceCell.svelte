<script lang="ts">
	export let data: string;
	export let label: string;
</script>

<div class="flex flex-col">
	<div class="font-medium text-white text-xs text-center">
		{data}
	</div>
	<div class="font-normal text-xs m-[2px]">{label}</div>
</div>
