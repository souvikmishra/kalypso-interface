<script lang="ts">
	import Tabs from '../common/Tabs.svelte';
	import UserOpenOrdersTable from '../table/UserOpenOrdersTable.svelte';
	import UserCompleteOrdersTable from '../table/UserCompleteOrdersTable.svelte';
	import { onMount } from 'svelte';
	import { getAsksOfMarketForUserFromSubgraph } from '$lib/controller/subgraphController';
	import onboard from '$lib/stores/web3-onboard';
	import { connected, selectedMarket } from '$lib/stores/general-data';
	import ConnectButton from '../wallet/ConnectButton.svelte';
	import { getHumanReadableTime } from '$lib/utils/stringHelpers';

	let openAsks: any[];
	let completedAsks: any[];

	let tableDataLoading = true;

	async function getAskOrdersOfMarketForUserModified(userAccount: string, marketId: string) {
		tableDataLoading = true;
		const asksOfMarketForUserFromSubgraph = await getAsksOfMarketForUserFromSubgraph(
			userAccount,
			marketId
		);
		const openAsksOfMarketForUser = asksOfMarketForUserFromSubgraph.data.askRequests.filter(
			(ask) => ask.state !== 'COMPLETE'
		);
		const completedAsksOfMarketForUser = asksOfMarketForUserFromSubgraph.data.askRequests.filter(
			(ask) => ask.state === 'COMPLETE'
		);

		openAsks = openAsksOfMarketForUser?.map((ask) => {
			const date = new Date(ask.created_at_ts * 1000).toLocaleString();
			const orderStatus = ask.state === 'COMPLETE' ? 'COMPLETE' : 'OPEN';
			const assignTimeStamp = new Date(ask.task?.assigned_at_ts * 1000).toLocaleString() ?? 'N/A';
			const limitPrice = (BigInt(ask.reward) / 100000000n).toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 8
			});
			const expiryTime = new Date(ask.expiry * 1000).toLocaleString();
			const assignedTo = ask.task.generator
				? ask.task.generator.slice(0, 6) + '...' + ask.task.generator.slice(-6)
				: 'N/A';
			const matchedPrice =
				(parseInt(ask.task?.generator_info?.proof_generation_cost) / 100000000).toLocaleString(
					'en-US',
					{
						minimumFractionDigits: 2,
						maximumFractionDigits: 8
					}
				) ?? 'N/A';
			return {
				txId: ask.id,
				date,
				orderStatus,
				limitPrice,
				expiryTime,
				assignedTo,
				matchedPrice,
				assignTimeStamp
			};
		});

		completedAsks = completedAsksOfMarketForUser?.map((ask) => {
			const date = new Date(ask.created_at_ts * 1000).toLocaleString();
			const orderStatus = ask.state === 'COMPLETE' ? 'COMPLETE' : 'OPEN';
			const assignTimeStamp = new Date(ask.task?.assigned_at_ts * 1000).toLocaleString() ?? 'N/A';
			const limitPrice = (BigInt(ask.reward) / 100000000n).toLocaleString('en-US', {
				minimumFractionDigits: 2,
				maximumFractionDigits: 8
			});
			const expiryTime = new Date(ask.expiry * 1000).toLocaleString();
			const assignedTo = ask.task.generator
				? ask.task.generator.slice(0, 6) + '...' + ask.task.generator.slice(-6)
				: 'N/A';
			const matchedPrice =
				(parseInt(ask.task?.generator_info?.proof_generation_cost) / 100000000).toLocaleString(
					'en-US',
					{
						minimumFractionDigits: 2,
						maximumFractionDigits: 8
					}
				) ?? 'N/A';
			return {
				txId: ask.id,
				date,
				orderStatus,
				limitPrice,
				expiryTime,
				assignedTo,
				matchedPrice,
				assignTimeStamp
			};
		});

		tableDataLoading = false;
	}

	let orderType = 'open-orders';

	const orderTypes = [
		{
			label: 'Open Orders',
			value: 'open-orders'
		},
		{
			label: 'Orders History',
			value: 'orders-history'
		}
	];

	const wallets$ = onboard.state.select('wallets');
	$: connectedAccount = $wallets$?.[0]?.accounts?.[0].address;
	$: if ($selectedMarket.id !== '' && $selectedMarket.id !== undefined && $connected === true) {
		getAskOrdersOfMarketForUserModified(connectedAccount, $selectedMarket.id);
	}
</script>

<div class="flex h-full min-h-[220px] w-full flex-col overflow-hidden">
	<Tabs tabs={orderTypes} variant="bordered" bind:selected={orderType} />
	{#if !$connected}
		<div class="flex h-full w-full flex-col items-center justify-center bg-white">
			<span class="mb-2 font-medium">Connect your wallet to view your orders.</span>
			<ConnectButton />
		</div>
	{:else if orderType === 'open-orders'}
		<UserOpenOrdersTable bind:tableRows={openAsks} {tableDataLoading} />
	{:else if orderType === 'orders-history'}
		<UserCompleteOrdersTable bind:tableRows={completedAsks} {tableDataLoading} />
	{/if}
</div>
