<script>
	import TradeForm from '$lib/components/trade/TradeForm.svelte';
	import MarketInfoHeader from '$lib/components/market-header/MarketInfoHeader.svelte';
	import UserOrders from '$lib/components/orders/UserOrders.svelte';
	import OrderBook from '$lib/components/orderbook/OrderBook.svelte';
	import ChartsSection from '$lib/components/charts-section/ChartsSection.svelte';
</script>

<div class="grid grid-cols-[21%_1fr_1fr_1fr] grid-rows-[62px_1fr_auto] gap-8">
	<div class="row-span-3">
		<TradeForm />
	</div>
	<div class="min-h-14 col-span-2 row-span-1">
		<MarketInfoHeader />
	</div>
	<div class="col-span-1 row-span-2 min-h-[660px]">
		<OrderBook />
	</div>
	<div class="col-span-2 row-span-1">
		<ChartsSection />
	</div>
	<div class="col-span-3 row-span-1">
		<UserOrders />
	</div>
</div>
