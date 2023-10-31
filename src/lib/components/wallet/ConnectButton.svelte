<script lang="ts">
	import onboard from '$lib/stores/web3-onboard';

	// Subscribe to wallet updates
	const wallets$ = onboard.state.select('wallets');

	const connect = async () => {
		await onboard.connectWallet();
	};
	const disconnect = () => {
		onboard.disconnectWallet({ label: $wallets$?.[0]?.label });
	};
	const trunc = (address: string) =>
		address ? address.slice(0, 6) + '...' + address.slice(-6) : null;

	// The first wallet in the array of connected wallets
	$: connectedAccount = $wallets$?.[0]?.accounts?.[0];
</script>

{#if connectedAccount}
	<button
		on:click={disconnect}
		class="btn btn-primary btn-active h-[50px] rounded-full text-sm font-normal normal-case"
	>
		<span>
			{trunc(connectedAccount.address)}
		</span>
	</button>
{:else}
	<button
		on:click={connect}
		class="btn btn-primary btn-active h-[50px] rounded-full text-sm font-normal normal-case"
	>
		<img src="/icons/wallet.svg" alt="" />Connect
	</button>
{/if}
