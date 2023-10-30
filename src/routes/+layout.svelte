<script>
	import '../app.css';
	import Header from '$lib/components/header/header.svelte';
</script>

<div class="my-0 mx-auto pb-16 w-[calc(100%-3rem)] max-w-[calc(1920px-3rem)]">
	<Header />
	<slot />
</div>
