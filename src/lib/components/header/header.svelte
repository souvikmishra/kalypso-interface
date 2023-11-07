<script>
	import ConnectButton from '../wallet/ConnectButton.svelte';
</script>

<div
	class="navbar rounded-box my-4 flex h-[92px] items-center justify-between bg-base-100 p-0 2xl:my-6"
>
	<div class="ml-8 flex items-center">
		<a class="" href="/"> <img src="/logo.svg" alt="logo" /></a>
		<span class="ml-[11.5px]">/</span>
		<span class="ml-[11.5px] text-xl font-semibold">Proof Market</span>
	</div>
	<div class="mr-6 flex-none">
		<ConnectButton />
	</div>
</div>
