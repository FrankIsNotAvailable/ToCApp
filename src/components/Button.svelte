<script>
    export let svg;
    export let svgAlt;
    export let title;
    export let text;
    export let border;
    export let background;
</script>

<button class='flex justify-center items-center border rounded-lg px-[1.5rem] py-[0.5rem]
            font-medium gap-[0.5rem] shadow-[0px_1px_2px_0px_rgba(0,0,0,0.5)]
            {border} {background} {text}'>
    <img src={svg} alt={svgAlt} class="w-[1.25rem] h-[1.25rem]"/>
    {title}
</button>

<!-- 
    !!! Add whatever onclick event for each type of button !!!
    !!! Currently button has copy + mask. Check it from title !!!
    !!! title = Mask Text -> mask data !!!
    !!! title = Copy to Clipboard -> copy !!!
-->