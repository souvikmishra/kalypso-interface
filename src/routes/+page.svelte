<script>
	import TradeForm from '$lib/components/trade/TradeForm.svelte';
	import MarketInfoHeader from '$lib/components/market-header/MarketInfoHeader.svelte';
	import UserOrders from '$lib/components/orders/UserOrders.svelte';
	import OrderBook from '$lib/components/orderbook/OrderBook.svelte';
	import ChartsSection from '$lib/components/charts-section/ChartsSection.svelte';
</script>

<div class="flex gap-6">
	<div class="flex w-full max-w-[376px] flex-col">
		<TradeForm />
	</div>
	<div class="flex w-full flex-col gap-6">
		<div class="flex gap-6">
			<div class="flex w-full max-w-[982px] flex-col gap-2">
				<MarketInfoHeader />
				<ChartsSection />
			</div>
			<div class="row-span-2 w-full max-w-[466px]">
				<OrderBook />
			</div>
		</div>

		<UserOrders />
	</div>
</div>
