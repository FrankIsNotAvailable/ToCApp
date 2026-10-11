<script>
    export let personalInputTitle = "";
    export let personalInputImg = "";
    export let personalInputImgAlt = "";
    export let personalInputImgPlace = "";
    export let personalInputPlaceholder = "";
    export let personalInputId = "";
    export let personalInputHeight = "";
    export let personalInputWidth = "";
</script>

<div class='pb-[1rem] flex flex-col {personalInputWidth}'>
    <div class='font-semibold'>{personalInputTitle}</div>
    <div class='relative'>
        <img
            src={personalInputImg}
            alt={personalInputImgAlt}
            class="absolute left-[0.75rem] {personalInputImgPlace}
                    -translate-y-[0.65rem] w-[1.25rem] h-[1.25rem]"
        />
        <textarea class='text-[1.25rem] font-normal {personalInputHeight} pl-[2.5rem]
                        rounded-lg border-[#C5C5D3] w-full resize-none overflow-hidden' 
                id={personalInputId}
                placeholder={personalInputPlaceholder}></textarea>
    </div>
</div>