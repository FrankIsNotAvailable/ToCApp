<script lang="ts">
    import removeImg from '$lib/assets/remove.svg';
    // สมมติว่ามีไอคอนเครื่องหมายถูกสำหรับหน้า Success (คุณชายตาต้าสามารถเปลี่ยน Path ได้เลยครับ)
    // import successImg from '$lib/assets/success.svg'; 

    let {
        open = false,
        onCancel,
        onConfirm
    }: {
        open?: boolean;
        onCancel: () => void;
        onConfirm: () => void;
    } = $props();

    // 1. สร้าง State สำหรับจัดการหน้าของ Popup
    let step = $state<'confirm' | 'success'>('confirm');

    // 2. ฟังก์ชันจัดการเมื่อกดปุ่ม Delete
    function handleConfirm() {
        onConfirm(); // รันฟังก์ชันจาก Parent ตามปกติ (เช่น สั่งลบข้อมูลใน Database)
        step = 'success'; // เปลี่ยน UI เป็นหน้า Success
    }

    // 3. รีเซ็ตสถานะกลับเป็น 'confirm' เสมอเมื่อ Popup ถูกปิด
    // เพื่อให้การเปิดครั้งต่อไปเริ่มต้นที่หน้ายืนยันเสมอ
    $effect(() => {
        if (!open) {
            // หน่วงเวลาเล็กน้อย 200ms เพื่อให้ Animation ปิดทำงานเสร็จก่อนเปลี่ยน UI กลับ
            setTimeout(() => {
                step = 'confirm';
            }, 200); 
        }
    });
</script>

{#if open}
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
        <div
            class="flex w-full max-w-md flex-col items-center gap-4 rounded-3xl bg-white/70 px-10 py-12
            text-center shadow-[0px_4px_38px_0px_rgba(0,0,0,0.25)] backdrop-blur-2xl">
            
            <!-- ใช้ {#if ...} สลับ UI ตามค่าของ step -->
            {#if step === 'confirm'}
                <!-- ==================== หน้า 1: ยืนยันการลบ ==================== -->
                <div
                    class="flex h-16 w-16 items-center justify-center rounded-full bg-white
                    shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)]">
                    <img src={removeImg} alt="Remove" class="h-7 w-7 object-contain" />
                </div>

                <div class="flex flex-col gap-1">
                    <p class="font-masked-data text-xl font-normal text-black">Confirm Data Deletion?</p>
                    <p class="text-sm text-[#767676]">
                        Are you sure you want to delete this data?<br />
                        This action cannot be undone.
                    </p>
                </div>

                <div class="mt-2 flex w-full gap-3">
                    <button
                        type="button"
                        class="flex-1 rounded-full bg-white px-4 py-2 text-sm font-semibold text-black
                        shadow-sm hover:bg-gray-50"
                        onclick={onCancel}
                    >
                        Cancel
                    </button>
                    <!-- เปลี่ยน onclick มาใช้ handleConfirm แทน -->
                    <button
                        type="button"
                        class="flex-1 rounded-full bg-[#4a4a4a] px-4 py-2 text-sm font-semibold text-white
                        hover:bg-[#333]"
                        onclick={handleConfirm}
                    >
                        Delete
                    </button>
                </div>

            {:else if step === 'success'}
                <!-- ==================== หน้า 2: ลบสำเร็จ ==================== -->
                <div
                    class="flex h-16 w-16 items-center justify-center rounded-full bg-white
                    shadow-[0px_4px_16px_0px_rgba(0,0,0,0.2)]">
                    <!-- ใส่ไอคอน Success ตรงนี้ (ตอนนี้ใส่เป็น Text ชั่วคราวให้เห็นภาพ) -->
                    <span class="text-3xl font-bold text-green-500">✓</span>
                    <!-- <img src={successImg} alt="Success" class="h-7 w-7 object-contain" /> -->
                </div>

                <div class="flex flex-col gap-1">
                    <p class="font-masked-data text-xl font-normal text-black">Deleted Successfully</p>
                    <p class="text-sm text-[#767676]">
                        Your data has been successfully removed.
                    </p>
                </div>

                <div class="mt-2 flex w-full gap-3">
                    <!-- ปุ่มสำหรับปิด Popup เมื่อลบเสร็จ -->
                    <button
                        type="button"
                        class="flex-1 rounded-full bg-black px-4 py-2 text-sm font-semibold text-white
                        hover:bg-gray-800"
                        onclick={onCancel} 
                    >
                        Close
                    </button>
                </div>
            {/if}
            
        </div>
    </div>
{/if}