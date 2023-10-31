<script lang="ts">
	import PaddingBorder from '../common/PaddingBorder.svelte';
	import HeaderPriceCell from './HeaderPriceCell.svelte';
	import type { PairPriceInfo } from './types';

	export let pairPriceInfo: PairPriceInfo;
</script>

<div class="ml-5 flex flex-row items-center gap-6">
	<div class="text-2xl font-semibold text-white">
		{pairPriceInfo.price}
	</div>
	<HeaderPriceCell data={`$ ${pairPriceInfo['priceByTimeUSD']}`} label={'Price/Time'} />
	<PaddingBorder />
	<HeaderPriceCell data={`$ ${pairPriceInfo['avgCostUSD']}`} label={'Avg. Cost'} />
	<PaddingBorder />
	<HeaderPriceCell
		data={`${(pairPriceInfo['avgTimeInMinutes'] / 60).toFixed(2)} hours`}
		label={'Avg. Time'}
	/>
	<PaddingBorder />
	<HeaderPriceCell data={`${pairPriceInfo['proofsExecuted']}`} label={'Proofs Done'} />
	<PaddingBorder />
</div>
