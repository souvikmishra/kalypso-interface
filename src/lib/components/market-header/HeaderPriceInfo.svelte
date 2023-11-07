<script lang="ts">
	import { selectedMarket } from '$lib/stores/general-data';
	import PaddingBorder from '../common/PaddingBorder.svelte';
	import HeaderPriceCell from './HeaderPriceCell.svelte';

	$: priceByTime = $selectedMarket.avg_cost / ($selectedMarket.avg_time / 60);
</script>

<div class="ml-5 flex flex-row items-center gap-6">
	<div class="text-xl font-semibold text-base-content 2xl:text-2xl">
		{`$${parseInt($selectedMarket.total_value).toLocaleString('en-US', {
			minimumFractionDigits: 2
		})}`}
	</div>
	<HeaderPriceCell data={`$${priceByTime.toFixed(2)}`} label={'Price/Time'} />
	<PaddingBorder />
	<HeaderPriceCell
		data={`$${parseInt($selectedMarket.avg_cost).toLocaleString('en-US', {
			minimumFractionDigits: 2
		})}`}
		label={'Avg. Cost'}
	/>
	<PaddingBorder />
	<HeaderPriceCell
		data={`${($selectedMarket.avg_time / 60).toFixed(2)} hours`}
		label={'Avg. Time'}
	/>
	<PaddingBorder />
	<HeaderPriceCell data={`${$selectedMarket.total_proofs}`} label={'Proofs Done'} />
	<PaddingBorder />
</div>
