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
			label: 'Prove',
			value: 'prove'
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

<div class="trade-form rounded-box flex h-full max-h-[656px] flex-col bg-base-100 px-6 py-6">
	<div class="flex flex-row items-center justify-center">
		<p class="text-center text-2xl font-medium text-base-content">Place Order</p>
		<!-- <Dropdown options={dropdownOptions} bind:selected={tradeType} /> -->
	</div>
	<div class="mt-5" />
	<Tabs tabs={orderTypeTabs} bind:selected={orderType} />
	<div class="mt-[18px]">
		<MovingLabelInput bind:value={inputTime} unitText="Secs" label="Time" />
	</div>
	<div class="mt-[18px]">
		<MovingLabelInput bind:value={inputPrice} unitText="USDC" label="Price" />
	</div>
	<div class="mt-[18px] flex flex-col">
		<p class="mb-1 text-sm text-base-300">Public</p>
		{#each selectedFiles as file, idx}
			<div class="mb-1 flex w-full rounded-2xl bg-base-300 p-3">
				<p class="flex-1 overflow-hidden text-ellipsis whitespace-nowrap pr-3 text-sm">
					{file.name}
				</p>
				<!-- svelte-ignore a11y-click-events-have-key-events -->
				<button
					class="btn btn-square btn-xs h-6 w-6 border-0 bg-transparent p-[4px]"
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
	<div class="mt-[18px] flex items-center justify-between">
		<p class="text-sm text-base-300">Priority</p>
		<CustomRadioButton options={priorityOptions} bind:selected={selectedPriority} />
	</div>
	<button class="btn btn-primary mt-8 w-full" on:click={onSubmitBtnClick}>Submit</button>
</div>
