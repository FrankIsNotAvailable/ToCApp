<script>
	import HomeDataAvaliable from '$components/HomeDataAvaliable.svelte';
	import Sayhello from '$components/SayHello.svelte';
	import NavBar from '$components/NavBar.svelte';
	import PersonalInfo from '$components/PersonalInfo.svelte';
</script>

<div class="background"></div>

<div class="page">
	<header>
		<NavBar />
	</header>

	<div class="content">
		<div class="min-h-full flex items-center justify-center py-[1rem]">
			<!-- <HomeDataAvaliable /> -->
			<PersonalInfo personalTitle="Personal Information Entry" />
		</div>
	</div>
</div>
