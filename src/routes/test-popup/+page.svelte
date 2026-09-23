<script lang="ts">
    import NavBar from '$components/navigation/NavBar.svelte';
    import LoadingMaskingpopup from '$components/LoadingMaskingpopup.svelte';
    import Bg from '$lib/assets/background.svg';

    let showToast = false;
    
    let currentStatus: 
        | 'masking_text' 
        | 'done_masking_text' 
        | 'masking_data' 
        | 'done_masking_data' 
        | 'editing_data' 
        | 'done_editing_data' = 'masking_data';

    function showState(state: typeof currentStatus) {
        currentStatus = state;
        showToast = true;
    }

    function simulateFlow(startState: typeof currentStatus, endState: typeof currentStatus) {
        currentStatus = startState;
        showToast = true;

        setTimeout(() => {
            currentStatus = endState;
        }, 2000);
    }
</script>

<div class="min-h-screen" style="background-image: url({Bg});">
    <NavBar />
    <div class="absolute inset-0 z-0 bg-[#F6F4E9]/66">
        <div class="flex min-h-[calc(100vh-80px)] items-center justify-center p-6">
            <div class="w-full max-w-3xl rounded-2xl border border-gray-200 bg-white p-8 shadow-[0_12px_30px_rgba(15,23,42,0.08)]">
                <h1 class="mb-8 text-center text-3xl font-semibold text-gray-800">Popup Component Test</h1>

                <div class="mb-8">
                    <h2 class="mb-3 text-lg font-medium text-gray-700">1. Masking Text</h2>
                    <div class="flex flex-wrap gap-4">
                        <button type="button" class="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                            on:click={() => showState('masking_text')}>
                            Test Loading
                        </button>
                        <button type="button" class="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
                            on:click={() => showState('done_masking_text')}>
                            Test Success
                        </button>
                        <button type="button" class="rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700"
                            on:click={() => simulateFlow('masking_text', 'done_masking_text')}>
                            Simulate Flow
                        </button>
                    </div>
                </div>

                <div class="mb-8">
                    <h2 class="mb-3 text-lg font-medium text-gray-700">2. Masking Data</h2>
                    <div class="flex flex-wrap gap-4">
                        <button type="button" class="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                            on:click={() => showState('masking_data')}>
                            Test Loading
                        </button>
                        <button type="button" class="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
                            on:click={() => showState('done_masking_data')}>
                            Test Success
                        </button>
                        <button type="button" class="rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700"
                            on:click={() => simulateFlow('masking_data', 'done_masking_data')}>
                            Simulate Flow
                        </button>
                    </div>
                </div>

                <div>
                    <h2 class="mb-3 text-lg font-medium text-gray-700">3. Editing Data</h2>
                    <div class="flex flex-wrap gap-4">
                        <button type="button" class="rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-blue-700"
                            on:click={() => showState('editing_data')}>
                            Test Loading
                        </button>
                        <button type="button" class="rounded-xl bg-emerald-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-emerald-700"
                            on:click={() => showState('done_editing_data')}>
                            Test Success
                        </button>
                        <button type="button" class="rounded-xl bg-violet-600 px-5 py-3 text-sm font-medium text-white shadow-sm transition hover:bg-violet-700"
                            on:click={() => simulateFlow('editing_data', 'done_editing_data')}>
                            Simulate Flow
                        </button>
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>

<LoadingMaskingpopup bind:isVisible={showToast} status={currentStatus} />