<script>
	import '../app.css';
    
	let { children } = $props();
</script>

<div class="flex min-h-screen flex-col font-main">
	{@render children()}
</div>
