<script lang="ts">
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
</script>

<div class="flex h-screen flex-col font-[family-name:var(--inter-font)]">
	<div
		bind:this={scrollContainer}
		onscroll={handleScroll}
		class="nice-scrollbar relative h-0 flex-1 overflow-y-auto scroll-smooth"
	>
		<NavBar />
		<HeroSection />
		<AboutSection bind:aboutSectionElement={aboutSection} {progress} {arrowProgress} />
		<FeaturesSection />
		<SupportedDataSection />
		<MoreInfoSection />
	</div>
</div>
