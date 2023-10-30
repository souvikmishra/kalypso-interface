<script lang="ts">
	import type { Context } from './effects';
	import { context } from './effects';

	export let value: Context;

	$: context(value);
</script>

<slot />
