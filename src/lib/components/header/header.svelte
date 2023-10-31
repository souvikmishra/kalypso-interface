<script>
	import ConnectButton from '../wallet/ConnectButton.svelte';
</script>

<div class="navbar p-0 bg-base-200 my-6 flex justify-between items-center h-[92px] rounded-box">
	<div class="ml-8 flex items-center">
		<a class="" href="/"> <img src="/logo.svg" alt="logo" /></a>
		<span class="ml-[11.5px]">/</span>
		<span class="text-xl font-semibold ml-[11.5px]">Proof Market</span>
	</div>
	<div class="flex-none mr-6">
		<ConnectButton />
	</div>
</div>
