<script lang="ts">
	import MiniFacebook from '$lib/assets/minifacebook.svg';
	import MiniInstagram from '$lib/assets/miniinstagram.svg';
	import MiniPhone from '$lib/assets/miniphone.svg';
</script>

<footer
	class="relative mt-16 flex flex-col justify-between gap-8 px-5 pb-8 sm:px-8 md:mt-24 lg:mt-32 lg:flex-row lg:items-end lg:px-8"
>
	<div class="flex flex-col items-center text-center lg:items-start lg:text-left">
		<div class="flex flex-col gap-2 text-base sm:text-lg md:text-xl lg:text-[1.875rem]">
			<p>Terms of Use</p>
			<p>Privacy Policy</p>
			<p>Community Guidelines</p>

			<div class="flex justify-center gap-4 pt-2 lg:justify-start">
				<img src={MiniFacebook} alt="facebook" />
				<img src={MiniInstagram} alt="instagram" />
				<img src={MiniPhone} alt="phone" />
			</div>
		</div>
	</div>

	<div
		class="text-center text-base font-light sm:text-lg md:text-xl lg:absolute lg:left-1/2 lg:-translate-x-1/2 lg:text-[1.875rem]"
	>
		© 2026 Obscura
	</div>
</footer>
