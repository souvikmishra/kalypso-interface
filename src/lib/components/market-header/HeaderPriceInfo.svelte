<script lang="ts">
	import { selectedMarket } from '$lib/stores/general-data';
	import PaddingBorder from '../common/PaddingBorder.svelte';
	import HeaderPriceCell from './HeaderPriceCell.svelte';
	import {
		getPendingOrAssignedAsksForMarketFromSubgraph
	} from '$lib/controller/subgraphController';

	let pendingAsks: any;
	let assignedAsks: any;

	async function getPendingOrAssignedAsks(marketId: string) {
		const asksReceived = await getPendingOrAssignedAsksForMarketFromSubgraph(marketId);
		const receivedAssigned = asksReceived.data.askRequests.filter(
			(ask) => ask.state === 'ASSIGNED'
		);
		const receivedPending = asksReceived.data.askRequests.filter(
			(ask) => ask.state === 'CREATE'
		);
		assignedAsks = receivedAssigned.length;
		pendingAsks = receivedPending.length;
	}

	$: priceByTime = $selectedMarket.avg_cost / ($selectedMarket.avg_time / 60);
	$: if ($selectedMarket.id !== '' && $selectedMarket.id !== undefined) {
		getPendingOrAssignedAsks($selectedMarket.id);
	}
</script>

<div class="ml-5 flex flex-row items-center gap-6">
	<div class="text-xl font-semibold text-base-content 2xl:text-2xl">
		{`$${parseInt($selectedMarket.total_value).toLocaleString('en-US', {
			minimumFractionDigits: 2
		})}`}
	</div>
	<PaddingBorder />
	<HeaderPriceCell
		data={`$${parseInt($selectedMarket.avg_cost).toLocaleString('en-US', {
			minimumFractionDigits: 2
		})}`}
		label={'Avg. Cost'}
	/>
	<PaddingBorder />
	<HeaderPriceCell data={`${$selectedMarket.total_proofs}`} label={'Completed Proofs'} />
	<PaddingBorder />
	<HeaderPriceCell
		data={`${pendingAsks}`}
		label={'Pending Orders'}
	/>
	<PaddingBorder />
	<HeaderPriceCell
		data={`${assignedAsks}`}
		label={'Assigned Orders'}
	/>
</div>
