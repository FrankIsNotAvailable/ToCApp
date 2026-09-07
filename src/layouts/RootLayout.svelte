<script>
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
    
	let { children } = $props();
</script>

<svelte:head>
	<title>TOC | KMITL</title>
	<meta
		name="description"
		content="Application for Theory of Computation assignment."
	/>
	<link rel="icon" href={favicon} />
</svelte:head>

<div class="background fixed inset-0 -z-10 bg-cover bg-no-repeat opacity-40 mix-blend-luminosity"
  	style="background-image: url('/src/lib/assets/mainbackground.png')"></div>

<div class="flex min-h-screen flex-col font-main">
	{@render children()}
</div>
