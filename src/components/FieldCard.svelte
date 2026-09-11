<script>
    import Button from "./Button.svelte";
    import Note from "$lib/assets/input.svg";
    import Trash from "$lib/assets/remove.svg";
    import Protect from "$lib/assets/protect.svg";
    import WhiteProtect from "$lib/assets/protectwhite.svg";
    import Copy from "$lib/assets/copy.svg";
    import WhiteCopy from "$lib/assets/copywhite.svg";

    export let type;
    export let width;

    let text = "";

    async function copyText() {
        await navigator.clipboard.writeText(text);
    }
</script>

<div class="border border-[#C5C5D3] rounded-[1.25rem] overflow-hidden {width}
            {type === 2 ? 'bg-[#F7F9FB]' : 'bg-white'}">
    <div class="flex justify-between items-center bg-[#ECEEF0] px-[1rem] py-[0.5rem]">
        {#if type === 1}
            <div class="flex gap-[0.25rem] items-center font-bold">
                <img src={Note} alt="Note" class="w-[1.25rem] h-[1.25rem]"/>
                Raw Input Text
            </div>
            
            <button class="flex active:translate-y-[1px] cursor-pointer
                            gap-[0.25rem] items-center text-[0.75rem]"
                            on:click={() => text = ""}>
                <img src={Trash} alt="Trash" class="w-[1rem] h-[1rem]"/>
                Clear
            </button>
        {:else if type === 2}
            <div class="flex gap-[0.25rem] items-center font-bold">
                <img src={Protect} alt="Shield" class="w-[1.25rem] h-[1.25rem]"/>
                Masked Output Text
            </div>

            <button class="flex active:translate-y-[1px] cursor-pointer
                            gap-[0.25rem] items-center text-[0.75rem]"
                            on:click={copyText}>
                <img src={Copy} alt="Copy" class="w-[1rem] h-[1rem]"/>
                Copy
            </button>
        {/if}
    </div>

    <textarea class="w-full h-[14rem] resize-none border-0 outline-none
                    p-[1rem] text-[0.875rem] text-[#333] font-medium
                    placeholder:text-[#9A9AA8] focus:outline-none focus:ring-0
                    {type === 2 ? 'bg-[#F7F9FB]' : 'bg-white'}"
        bind:value={text}
        readonly={type === 2}
        placeholder={type === 1 ? "Enter your data here..." : ""}></textarea>
    
    <div class="flex justify-end p-[1rem]">
        {#if type === 1}
            <Button
                svg={WhiteProtect}
                svgAlt="Shield"
                title="Mask Text"
                text="text-white"
                border="border-black"
                background="bg-black"
            />

            <!-- 
            !!! Use this button on reload !!!
            <Button
                svg={WhiteProtect}
                svgAlt="Shield"
                title="Mask Text"
                text="text-white"
                border="border-[#BABABA]"
                background="bg-[#BABABA]"
            /> -->
        {:else if type === 2}
            <Button
                svg={WhiteCopy}
                svgAlt="Copy"
                title="Copy to Clipboard"
                text="text-[#BABABA]"
                border="border-[#F7F9FB]"
                background="bg-transparent"
            />

            <!--
            !!! Use this button once data is available !!!
            <Button
                svg={Copy}
                svgAlt="Copy"
                title="Copy to Clipboard"
                text="text-black"
                border="border-black"
                background="bg-transparent"
            /> -->
        {/if}
    </div>
</div>