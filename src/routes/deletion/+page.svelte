<script>
    import NavBar from '$components/NavBar.svelte';
    import Deletion from '$components/Confirm-deletion.svelte';

    let open = $state(false);

    function handleDelete() {
        // ใส่โค้ดลบข้อมูลของจริงที่นี่ เช่น ลบใน Database หรือลบ State 
        console.log("Data deleted successfully!");
        
        // **ไม่ต้องสั่ง open = false ที่นี่** เพื่อให้ Popup ค้างอยู่และแสดงหน้า Success
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
</div>