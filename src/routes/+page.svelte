<script>
	import TradeForm from '$lib/components/trade/TradeForm.svelte';
	import MarketInfoHeader from '$lib/components/market-header/MarketInfoHeader.svelte';
	import UserOrders from '$lib/components/orders/UserOrders.svelte';
	import OrderBook from '$lib/components/orderbook/OrderBook.svelte';
	import ChartsSection from '$lib/components/charts-section/ChartsSection.svelte';
	import ZkMarketList from '$lib/components/zkmarket/ZkMarketList.svelte';
</script>

<svelte:head><title>Kalypso</title></svelte:head>

<div class="flex gap-5 2xl:gap-6">
	<div class="flex w-full min-w-[285px] max-w-[376px] flex-col gap-5 2xl:gap-6">
		<ZkMarketList />
		<TradeForm />
	</div>
	<div class="flex w-full max-w-[1118px] flex-col gap-5 2xl:max-w-none 2xl:gap-6">
		<div class="flex gap-5 2xl:gap-6">
			<div class="flex w-full min-w-[806px] max-w-[1046px] flex-col gap-2">
				<MarketInfoHeader />
				<ChartsSection />
			</div>
			<div class="row-span-2 w-full min-w-[291px] max-w-[402px]">
				<OrderBook />
			</div>
		</div>

		<div class="h-full max-h-[489px]">
			<UserOrders />
		</div>
	</div>
</div>
