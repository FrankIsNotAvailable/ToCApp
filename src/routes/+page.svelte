<script>
	import Sayhello from '$components/SayHello.svelte';
	import NavBar from '$components/NavBar.svelte';
	import PersonalInfo from '$components/PersonalInfo.svelte';
</script>

<NavBar />
<div class="flex justify-center my-auto">
	<!-- <Sayhello /> -->
	<PersonalInfo 
	personalTitle='Personal Information Entry'
	/>
</div>