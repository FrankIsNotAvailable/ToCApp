<script>
    import NavBar from '$components/NavBar.svelte';
    import Deletion from '$components/Confirm-deletion.svelte';
    import DeletionOnProcess from '$components/Deletion-on-process.svelte';
    let open = $state(false);
    let processing = $state(false);

    function handleDelete() {
        open = false;
        processing = true;

        setTimeout(() => {
            processing = false;
            console.log("Data deleted");
        }, 1500);
    }
</script>

<NavBar/>
<div class="flex flex-1 items-center justify-center mb-[4rem]">
    <button type="button" class="rounded-full bg-black px-4 py-2 text-white" onclick={() => (open = true)}>
        Open deletion popup
    </button>
    <Deletion
        {open}
        onCancel={() => (open = false)}
        onConfirm={handleDelete}
    />
    <DeletionOnProcess open={processing} itemLabel="Data 01" />
</div>