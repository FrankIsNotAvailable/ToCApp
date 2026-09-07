<script>
	import HomeDataAvaliable from '$components/HomeDataAvaliable.svelte';
	import Sayhello from '$components/SayHello.svelte';
	import NavBar from '$components/NavBar.svelte';
</script>
<NavBar />
<div class="flex justify-center my-auto">
	<HomeDataAvaliable />
</div>

<!-- <style>
  :global(html),
  :global(body) {
    background-color: #c6dfffff;
  }
  turn this thing on in order to debug components.
</style> -->
