<script>
	import HomeDataAvaliable from '$components/HomeDataAvaliable.svelte';
	import Sayhello from '$components/SayHello.svelte';
	import NavBar from '$components/NavBar.svelte';
</script>

<div class="flex h-screen flex-col">
	<header>
		<NavBar />
	</header>

	<div class="min-h-0 flex-1 overflow-y-auto">
		<div class="min-h-full flex items-center justify-center py-[1rem]">
			<!-- <HomeDataAvaliable /> -->
			<PersonalInfo personalTitle="Personal Information Entry" />
		</div>
	</div>
</div>
