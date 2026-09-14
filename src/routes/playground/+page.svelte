<script lang="ts">
	import NavBar from '$components/NavBar.svelte';
	import LoadingMaskingpopup from '$components/LoadingMaskingpopup.svelte';

	let showToast = false;
	let currentStatus: 'loading' | 'success' = 'loading';

	function testLoadingState() {
		currentStatus = 'loading';
		showToast = true;
	}

	function testSuccessState() {
		currentStatus = 'success';
		showToast = true;
	}

	function simulateFullFlow() {
		currentStatus = 'loading';
		showToast = true;

		setTimeout(() => {
			currentStatus = 'success';
		}, 2000);
	}
</script>

<div class="min-h-screen bg-[#f5f3ee]">
	<NavBar />

	<div class="flex min-h-[calc(100vh-80px)] items-center justify-center p-6">
		<div class="w-full max-w-2xl rounded-2xl border border-gray-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
			<h1 class="mb-8 text-center text-3xl font-semibold text-gray-800">Component Test</h1>

			<div class="flex flex-col gap-4 sm:flex-row sm:justify-center">
				<button
					type="button"
					class="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-black shadow-sm transition hover:bg-blue-700"
					on:click={testLoadingState}
				>
					Test Loading State
				</button>

				<button
					type="button"
					class="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-black shadow-sm transition hover:bg-emerald-700"
					on:click={testSuccessState}
				>
					Test Success State
				</button>

				<button
					type="button"
					class="rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-black shadow-sm transition hover:bg-violet-700"
					on:click={simulateFullFlow}
				>
					Simulate Full Flow
				</button>
			</div>
		</div>
	</div>
</div>

<LoadingMaskingpopup bind:isVisible={showToast} status={currentStatus} />
