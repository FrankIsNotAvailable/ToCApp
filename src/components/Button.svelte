<script lang="ts">
	interface Props {
		svg: string;
		svgAlt: string;
		title: string;
		text: string;
		border: string;
		background: string;
	}

	let { svg, svgAlt, title, text, border, background }: Props = $props();
</script>

<div
	class="flex items-center justify-center gap-[0.5rem] rounded-lg border px-[1.5rem]
            py-[0.5rem] font-medium shadow-[0px_1px_2px_0px_rgba(0,0,0,0.5)]
            {border} {background} {text}"
>
	<img src={svg} alt={svgAlt} class="h-[1.25rem] w-[1.25rem]" />
	{title}
</div>
