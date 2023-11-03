<script>
	import '../app.css';
	import Header from '$lib/components/header/header.svelte';
</script>

<div
	class="mx-auto my-0 w-[calc(100%-2rem)] max-w-[calc(1920px-3rem)] pb-6 2xl:w-[calc(100%-3rem)]"
>
	<Header />
	<slot />
</div>
