<script lang="ts">
	const zkAppList = [
		{
			name: 'MI App 1',
			id: '1123123',
			currency: 'USDC',
			totalEvaluation: 362436,
			oneDayChange: 20.0
		},
		{
			name: 'MI App 2',
			id: '15326633',
			currency: 'USDC',
			totalEvaluation: 42069.69,
			oneDayChange: -420.69
		},
		{ id: '152355332', currency: 'USDC', totalEvaluation: 666.666, oneDayChange: 11.11 },
		{
			name: 'MI App 4',
			id: '8892384754',
			currency: 'USDC',
			totalEvaluation: 5173.808,
			oneDayChange: 9.11
		},
		{
			name: 'MI App 5',
			id: '0912793432',
			currency: 'USDC',
			totalEvaluation: 58008,
			oneDayChange: -3.14
		}
	];
	const nameBadgeColors = ['#2DB8E3', '#FCC35B', '#1EA7FF', '#E46C8A', '#5967FF'];

	function getNameBadgeColor(index: number) {
		return nameBadgeColors[index % nameBadgeColors.length];
	}
	function getNameBadgeBackgroundColor(index: number) {
		// we add '19' at the end to lower color alpha. Ref. https://stackoverflow.com/questions/7015302/css-hexadecimal-rgba
		return nameBadgeColors[index % nameBadgeColors.length].concat('19');
	}

	function getFormattedId(id: string) {
		if (id.length < 8) {
			return id;
		}
		return id.slice(0, 4) + '...' + id.slice(id.length - 4, id.length);
	}

	function getFirstTwoLetters(name: string) {
		if (name.length < 2) {
			return name;
		}
		return name.slice(0, 2);
	}
</script>

<div class="zk-market rounded-box flex h-[514px] min-h-[514px] flex-col bg-base-200 px-4 py-6">
	<input type="text" placeholder="Search" class="input input-bordered input-md w-full" />
	<div class="mt-6 text-lg font-semibold">ZKDapp List</div>
	<ul class="mt-3">
		{#each zkAppList as zkApp, index (zkApp.id)}
			<li class=" border-b border-[##E3EBEE]">
				<button
					class="flex w-full items-center justify-between rounded-xl px-3 py-[10.5px] hover:bg-[#F3F7FA]"
				>
					<div class="flex">
						<div
							class="flex h-[46px] w-[46px] items-center justify-center rounded-xl"
							style="background-color: {getNameBadgeBackgroundColor(index)};"
						>
							<span style="color: {getNameBadgeColor(index)};"
								>{zkApp.name ? getFirstTwoLetters(zkApp.name) : zkApp.id.slice(0, 2)}</span
							>
						</div>
						<div class="ml-2 flex flex-col items-start justify-center">
							<span class="text-sm font-normal"
								>{zkApp.name ? zkApp.name : getFormattedId(zkApp.id)}</span
							>
							<span class="text-xs font-normal">{zkApp.currency}</span>
						</div>
					</div>
					<div
						class="flex flex-col items-end
					"
					>
						<span class="text-sm font-medium">{zkApp.totalEvaluation.toLocaleString('en-US')}</span>
						{#if zkApp.oneDayChange < 0}
							<span class="flex gap-1 text-xs font-normal text-[#FF2B61]">
								<img src="/icons/chevron_red.svg" alt="downtrend indicator" />{Math.abs(
									zkApp.oneDayChange
								)}%</span
							>
						{:else}
							<span class="flex gap-1 text-xs font-normal text-[#4CC18B]"
								><img src="/icons/chevron_green.svg" alt="uptrend indicator" />{Math.abs(
									zkApp.oneDayChange
								)}%</span
							>
						{/if}
					</div>
				</button>
			</li>
		{/each}
	</ul>
</div>
