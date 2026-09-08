<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import background from '$lib/assets/background.svg';

	let { children } = $props();
</script>

<svelte:head>
	<title>TOC | KMITL</title>
	<meta name="description" content="Application for Theory of Computation assignment." />
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="fixed inset-0 -z-20 bg-[#F6F4E9]"></div>

<div
    class="fixed inset-0 -z-10 bg-cover bg-center mix-blend-luminosity opacity-44"
    style="background-image: url('{background}')"
></div>
<div class="flex min-h-screen flex-col font-main">
	{@render children()}
</div>
