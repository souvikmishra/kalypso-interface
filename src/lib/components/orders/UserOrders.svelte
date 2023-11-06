<script lang="ts">
	import Tabs from '../common/Tabs.svelte';
	import UserOpenOrdersTable from '../table/UserOpenOrdersTable.svelte';
	import UserCompleteOrdersTable from '../table/UserCompleteOrdersTable.svelte';
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
	let orderType = 'open-orders';
</script>

<div class="flex min-h-[220px] w-full flex-col overflow-hidden">
	<Tabs tabs={orderTypes} variant="bordered" bind:selected={orderType} />
	{#if orderType === 'open-orders'}
		<UserOpenOrdersTable />
	{:else}
		<UserCompleteOrdersTable />
	{/if}
</div>
