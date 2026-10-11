<script lang="ts">
	let cursorX = $state(0);
	let cursorY = $state(0);
	let cursorVisible = $state(false);

	function handleCursorMove(event: MouseEvent) {
		const rect = (event.currentTarget as HTMLElement).getBoundingClientRect();
		cursorX = event.clientX - rect.left;
		cursorY = event.clientY - rect.top;
	}

	function handleCursorEnter() {
		cursorVisible = true;
	}

	function handleCursorLeave() {
		cursorVisible = false;
	}
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="relative flex min-h-screen items-center justify-center overflow-hidden">
	<div
		class="relative -translate-y-[3rem] cursor-none px-4 text-center font-[family-name:var(--navbar-font)] text-[clamp(4rem,15vw,12.5rem)] leading-none sm:-translate-y-[4rem] md:-translate-y-[6rem]"
		onmousemove={handleCursorMove}
		onmouseenter={handleCursorEnter}
		onmouseleave={handleCursorLeave}
	>
		Obscura+

		<div
			class="pointer-events-none absolute z-20 hidden h-[12rem] w-[12rem] rounded-full bg-[#D9D9D9]/20 shadow-[0_4px_48px_rgba(0,0,0,0.25)] ring-1 ring-white/75 backdrop-blur-sm transition-opacity duration-200 md:block md:h-[20rem] md:w-[20rem]"
			class:opacity-0={!cursorVisible}
			class:opacity-100={cursorVisible}
			style={`left: ${cursorX}px; top: ${cursorY}px; transform: translate(-50%, -50%);`}
		></div>
	</div>

	<div class="absolute bottom-0 left-0 px-5 py-5 sm:px-6 sm:py-6 md:px-8 md:py-8">
		<div class="text-[1.5rem] sm:text-[1.75rem] md:text-[2.25rem]">RegEX</div>
		<div class="mt-[-0.25rem] text-[1rem] text-[#676767] sm:text-[1.25rem] md:text-[1.5rem]">
			Project Based
		</div>
	</div>
</div>
