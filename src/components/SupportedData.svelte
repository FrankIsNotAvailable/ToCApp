<script>
    export let picture = "";
    export let pictureAlt = "";
    export let title = "";
    export let description = "";
    export let pattern = "";
</script>

<div class='flex h-full w-full flex-col items-center
            rounded-[17px]
            px-[4rem] pt-[4rem] pb-[1.5rem]
            font-[family-name:var(--inter-font)]'>
    
    <img src={picture} alt={pictureAlt} class='w-[10rem] h-[10rem]'/>

    <div class='text-[2.25rem] pt-[2rem]'>
        {title}
    </div>

    <div class='text-[1.125rem] text-[#656565] text-center leading-loose
                pt-[1rem] h-[20%]'>
        {description}
    </div>

    <div class='text-[1.5rem] pt-[2rem] h-[20%]'>
        Pattern: {pattern}
    </div>
</div>