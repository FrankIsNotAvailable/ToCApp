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
		try {
			isLoading = true;
			const result = await maskDataForGuest(rawText);
			if (result && result.maskedText) {
				maskedText = result.maskedText;
			}
		} catch (error) {
			console.error('Error masking data:', error);
		} finally {
			isLoading = false;
		}
	}

	function handleClearText() {
		rawText = '';
		maskedText = '';
	}
</script>

<div class="flex min-h-screen flex-col">
	<NavBar />

	<main class="flex flex-1 flex-col items-center justify-center px-4 py-6 sm:px-6 sm:py-10 md:px-8">
		<BaseCard>
			<div class="flex w-full flex-col gap-3 sm:gap-4 md:gap-6">
				<div class="flex flex-col gap-1">
					<h1 class="text-xl font-bold tracking-tight text-gray-900 sm:text-2xl md:text-3xl">
						Text Masking Tool
					</h1>
					<p class="text-xs font-normal text-[#424752] sm:text-sm md:text-base">
						Paste raw text below to automatically apply PDPA masking rules.
					</p>
				</div>

				<ActiveMaskingRules />

				<TestMaskingDataCard
					bind:rawText
					{maskedText}
					onCopy={handleCopyText}
					onMask={handleMaskedData}
					onClear={handleClearText}
				/>
			</div>
		</BaseCard>
	</main>
</div>
