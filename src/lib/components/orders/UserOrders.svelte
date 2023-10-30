<script lang="ts">
	import Tabs from '../common/Tabs.svelte';
	import UserOrdersTable from '../table/UserOpenOrdersTable.svelte';
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

<div class="flex flex-col w-full min-h-[220px] rounded-[20px] overflow-hidden">
	<Tabs tabs={orderTypes} variant="bordered" bind:selected={orderType} />
	{#if orderType === 'open-orders'}
		<UserOrdersTable />
	{:else}
		<UserOrdersTable />
	{/if}
</div>
