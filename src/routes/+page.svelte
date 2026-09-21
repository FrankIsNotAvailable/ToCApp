<script lang="ts">
	import { onMount } from 'svelte';
	import NavBar from '$components/navigation/LandingNavBar.svelte';
	import HeroSection from '$components/sections/HeroSection.svelte';
	import AboutSection from '$components/sections/AboutSection.svelte';
	import FeaturesSection from '$components/sections/FeaturesSection.svelte';
	import SupportedDataSection from '$components/sections/SupportedDataSection.svelte';
	import MoreInfoSection from '$components/sections/MoreInfoSection.svelte';

	let scrollContainer: HTMLDivElement | undefined = $state();
	let aboutSection: HTMLDivElement | undefined = $state();

	let progress = $state(0);
	let arrowProgress = $state(0);

	function handleScroll() {
		if (!scrollContainer || !aboutSection) return;

		const sectionTop = aboutSection.offsetTop;
		const scrollTop = scrollContainer.scrollTop;

		const start = sectionTop - scrollContainer.clientHeight;
		const end = sectionTop;
		progress = Math.min(1, Math.max(0, (scrollTop - start) / (end - start)));

		const arrowStart = sectionTop;
		const arrowEnd = sectionTop + scrollContainer.clientHeight;
		arrowProgress = Math.min(1, Math.max(0, (scrollTop - arrowStart) / (arrowEnd - arrowStart)));
	}

	let navHeight = $state(0);

	onMount(() => {
		const navbar = document.getElementById('landingNav');
		if (!navbar) return;

		const updateHeight = () => {
			navHeight = navbar.offsetHeight;
			document.documentElement.style.setProperty('--navbar-height', `${navHeight}px`);
		};

		updateHeight();

		const observer = new ResizeObserver(() => {
			updateHeight();
		});

		observer.observe(navbar);

		return () => {
			observer.disconnect();
		};
	});
</script>

<div class="flex h-screen flex-col font-[family-name:var(--inter-font)]">
	<NavBar />
	<div
		bind:this={scrollContainer}
		onscroll={handleScroll}
		class="nice-scrollbar relative h-0 flex-1 overflow-y-auto scroll-smooth"
	>
		<HeroSection />
		<AboutSection bind:aboutSectionElement={aboutSection} {progress} {arrowProgress} />
		<FeaturesSection />
		<SupportedDataSection />
		<MoreInfoSection />
	</div>
</div>
