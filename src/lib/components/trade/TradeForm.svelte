<script lang="ts">
	import CustomRadioButton from '../common/CustomRadioButton.svelte';
	import Dropdown from '../common/Dropdown.svelte';
	import MovingLabelInput from '../common/MovingLabelInput.svelte';
	import Tabs from '../common/Tabs.svelte';
	import DropzoneNew from '../dragdrop/Dropzone.svelte';
	const MAX_FILE_UPLOAD_COUNT = 10;
	const dropdownOptions = [
		{
			label: 'Spot',
			key: 'spot',
			value: 'spot'
		},
		{
			label: 'Margin',
			key: 'margin',
			value: 'margin'
		}
	];
	let tradeType = 'spot';

	const orderTypeTabs = [
		{
			label: 'Ask',
			value: 'ask'
		},
		{
			label: 'Sell',
			value: 'sell'
		}
	];
	let orderType = 'ask';

	let inputTime = '';
	let inputPrice = '';
	let selectedFiles: File[] = [];

	function handleUploadFiles(files: File[]) {
		const selected = [...selectedFiles];
		files.some((file) => {
			if (selected.findIndex((f) => f.name === file.name) === -1) {
				selected.push(file);
			}
		});
		if (selected.length > MAX_FILE_UPLOAD_COUNT) {
			selected.length = MAX_FILE_UPLOAD_COUNT;
		}
		selectedFiles = selected;
	}
	function onFilesChange({ detail }: { detail: File[] }) {
		console.log(detail);
		// selectedFiles.push(d)
		handleUploadFiles(detail);
	}

	const priorityOptions = [
		{
			label: 'Time',
			key: 'time',
			value: 'time'
		},
		{
			label: 'Cost',
			key: 'cost',
			value: 'cost'
		}
	];
	let selectedPriority = 'time';

	function onSubmitBtnClick(event: any) {
		console.log(event);
	}
	function removeFile(event: any) {
		const dataset = event.target.dataset;
		selectedFiles = [...selectedFiles].filter((cur) => cur.name != dataset.fileName);
	}
</script>

<div class="trade-form flex flex-col h-full px-6 py-6 bg-base-200 rounded-box">
	<div class="flex flex-row justify-between items-center">
		<p class="font-medium text-[#ECECEC]">Trade</p>
		<Dropdown options={dropdownOptions} bind:selected={tradeType} />
	</div>
	<div class="mt-4" />
	<Tabs tabs={orderTypeTabs} bind:selected={orderType} />
	<div class="mt-8">
		<MovingLabelInput bind:value={inputTime} unitText="SECS" label="Time" />
	</div>
	<div class="mt-6">
		<MovingLabelInput bind:value={inputPrice} unitText="USDC" label="Price" />
	</div>
	<div class="mt-4 flex flex-col">
		<p class="font-medium text-[#ECECEC] mb-1">Public</p>
		{#each selectedFiles as file, idx}
			<div class="flex w-full rounded-2xl p-3 bg-base-300 mb-1">
				<p class="text-ellipsis whitespace-nowrap overflow-hidden flex-1 text-sm pr-3">
					{file.name}
				</p>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<button
					class="btn btn-square btn-xs h-6 w-6 p-[4px] bg-transparent border-0"
					data-file-name={file.name}
					on:click|stopPropagation={removeFile}
				>
					<img alt="rmeove file close icon" class="pointer-events-none" src="/icons/close.svg" />
					<!-- <span class="cursor-pointer" data-file-name={file.name} on:click|stopPropagation={removeFile}>x</span> -->
				</button>
			</div>
		{/each}
		<DropzoneNew on:onFilesChange={onFilesChange} />
	</div>
	<div class="mt-4 flex flex-col">
		<p class="font-medium text-[#ECECEC] mb-1">Priority</p>
		<CustomRadioButton options={priorityOptions} bind:selected={selectedPriority} />
	</div>
	<button class="btn w-full bg-primary mt-8" on:click={onSubmitBtnClick}>Submit</button>
</div>
