<script>
	import Checklist from '$lib/assets/checklist.svg';
	import Person from '$lib/assets/person.svg';
	import Email from '$lib/assets/email.svg';
	import Phone from '$lib/assets/phone.svg';
	import Calendar from '$lib/assets/calendar.svg';
	import Home from '$lib/assets/home.svg';
</script>

<div
	class="flex items-center justify-between rounded-[0.5rem] border
                border-[#C5C5D3] bg-white p-[1rem]"
>
	<div class="flex items-center gap-[0.5rem] font-bold">
		<img src={Checklist} alt="Checklist" class="h-[1rem] w-[1rem]" />
		Active Masking Rules:
	</div>

	<div class="flex shrink-0 items-center gap-[0.5rem] text-[0.75rem]">
		<div
			class="flex items-center gap-2 rounded-[9999px] border
                        bg-[#1E3A8A1A] px-[0.5rem] py-[0.25rem] whitespace-nowrap"
		>
			<img src={Person} alt="Person" class="h-[0.75rem] w-[0.75rem]" />
			Credit Card Number
		</div>

		<div
			class="flex items-center gap-2 rounded-[9999px] border
                        bg-[#1E3A8A1A] px-[0.5rem] py-[0.25rem] whitespace-nowrap"
		>
			<img src={Email} alt="E-mail" class="h-[0.75rem] w-[0.75rem]" />
			E-mail
		</div>

		<div
			class="flex items-center gap-2 rounded-[9999px] border
                        bg-[#1E3A8A1A] px-[0.5rem] py-[0.25rem] whitespace-nowrap"
		>
			<img src={Phone} alt="Phone" class="h-[0.75rem] w-[0.75rem]" />
			Phone number
		</div>

		<div
			class="flex items-center gap-2 rounded-[9999px] border
                        bg-[#1E3A8A1A] px-[0.5rem] py-[0.25rem] whitespace-nowrap"
		>
			<img src={Calendar} alt="Calendar" class="h-[0.75rem] w-[0.75rem]" />
			Date of Birth
		</div>

		<div
			class="flex items-center gap-2 rounded-[9999px] border
                        bg-[#1E3A8A1A] px-[0.5rem] py-[0.25rem] whitespace-nowrap"
		>
			<img src={Home} alt="Address" class="h-[0.75rem] w-[0.75rem]" />
			Address
		</div>
	</div>
</div>
