<script>
    import NavBar from '$components/NavBar.svelte';
    import Deletion from '$components/Deletion.svelte';

    let open = $state(true);
</script>

<NavBar/>
<div class="flex flex-1 items-center justify-center mb-[4rem]">
    <button type="button" class="rounded-full bg-black px-4 py-2 text-white" onclick={() => (open = true)}>
        Open deletion popup
    </button>
    <Deletion {open} onCancel={() => (open = false)} onConfirm={() => (open = false)} />
</div>