<script lang="ts">
	import Checklist from '$lib/assets/checklist.svg';
	import Person from '$lib/assets/person.svg';
	import Email from '$lib/assets/email.svg';
	import Phone from '$lib/assets/phone.svg';
	import Calendar from '$lib/assets/calendar.svg';
	import Home from '$lib/assets/home.svg';
</script>

<div
	class="flex w-full flex-col gap-3 rounded-lg border border-[#C5C5D3] bg-white p-3 sm:p-4 md:flex-row md:items-center md:justify-between md:gap-4"
>
	<div class="flex shrink-0 items-center gap-2 text-sm font-bold text-gray-900 sm:text-base">
		<img src={Checklist} alt="Checklist" class="h-4 w-4 object-contain sm:h-5 sm:w-5" />
		<span>Active Masking Rules:</span>
	</div>

	<div class="flex flex-wrap items-center gap-2 text-xs text-gray-800">
		<div
			class="flex items-center gap-1.5 rounded-full border border-blue-200/50
                    bg-[#1E3A8A1A] px-2.5 py-1 whitespace-nowrap"
		>
			<img src={Person} alt="Person" class="h-3 w-3 object-contain" />
			<span>Credit Card Number</span>
		</div>

		<div
			class="flex items-center gap-1.5 rounded-full border border-blue-200/50
                    bg-[#1E3A8A1A] px-2.5 py-1 whitespace-nowrap"
		>
			<img src={Email} alt="E-mail" class="h-3 w-3 object-contain" />
			<span>E-mail</span>
		</div>

		<div
			class="flex items-center gap-1.5 rounded-full border border-blue-200/50
                    bg-[#1E3A8A1A] px-2.5 py-1 whitespace-nowrap"
		>
			<img src={Phone} alt="Phone" class="h-3 w-3 object-contain" />
			<span>Phone number</span>
		</div>

		<div
			class="flex items-center gap-1.5 rounded-full border border-blue-200/50
                    bg-[#1E3A8A1A] px-2.5 py-1 whitespace-nowrap"
		>
			<img src={Calendar} alt="Calendar" class="h-3 w-3 object-contain" />
			<span>Date of Birth</span>
		</div>

		<div
			class="flex items-center gap-1.5 rounded-full border border-blue-200/50
                    bg-[#1E3A8A1A] px-2.5 py-1 whitespace-nowrap"
		>
			<img src={Home} alt="Address" class="h-3 w-3 object-contain" />
			<span>Address</span>
		</div>
	</div>
</div>
