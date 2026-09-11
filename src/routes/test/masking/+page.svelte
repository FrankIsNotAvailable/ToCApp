<script lang="ts">
	import NavBar from '$components/NavBar.svelte';
	import BaseCard from '$layouts/BaseCard.svelte';
	import TestMaskingDataCard from '$components/TestMaskingDataCard.svelte';
	import ActiveMaskingRules from '$components/ActiveMaskingRules.svelte';
	import { useMaskingData } from '$hooks/useMaskingData';

	const { maskDataForGuest } = useMaskingData();

	let rawText = $state<string>('');
	let maskedText = $state<string>('');
	let isLoading = $state<boolean>(false);

	async function handleCopyText() {
		if (maskedText && maskedText.trim() !== '') {
			await navigator.clipboard.writeText(maskedText);
		}
	}

	async function handleMaskedData() {
		if (!rawText || rawText.trim() === '') {
			maskedText = '';
			return;
		}

		isLoading = true;
		const result = await maskDataForGuest(rawText);
		isLoading = false;

		if (result && result.maskedText) {
			maskedText = result.maskedText;
		}
	}

	function handleClearText() {
		rawText = '';
		maskedText = '';
	}
</script>

<div class="flex min-h-screen flex-col">
	<NavBar />
	<div class="flex flex-1 flex-col items-center justify-center">
		<BaseCard>
			<div class="flex flex-col">
				<p class="text-[2rem]">Text Masking Tool</p>
				<p class="font-normal text-[#424752]">
					Paste raw text below to automatically apply PDPA masking rules.
				</p>
			</div>
			<ActiveMaskingRules />
			<TestMaskingDataCard
				bind:rawText
				{maskedText}
				// {isLoading}
				onCopy={handleCopyText}
				onMask={handleMaskedData}
				onClear={handleClearText}
			/>
		</BaseCard>
	</div>
</div>
