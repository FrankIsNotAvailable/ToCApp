<script>
    import FieldCard from "./FieldCard.svelte";
    import Checklist from "$lib/assets/checklist.svg";
    import Person from "$lib/assets/person.svg";
    import Email from "$lib/assets/emailblack.svg";
    import Phone from "$lib/assets/phoneblack.svg";
    import Calendar from "$lib/assets/calendarblack.svg";
    import Home from "$lib/assets/home.svg";
</script>

<div class="flex flex-col w-[60%] px-[3.5rem] py-[3rem] rounded-3xl
            bg-white/40 shadow-[0px_4px_38px_0px_rgba(0,0,0,0.25)] isolate overflow-hidden transform-gpu
            font-[family-name:var(--inter-font)] text-[1rem] font-semibold
            border border-white/35 gap-[2rem]">
    <div class="flex flex-col">
        <p class="text-[2rem]">
            Text Masking Tool
        </p>
        <p class="font-normal text-[#424752]">
            Paste raw text below to automatically apply PDPA masking rules.
        </p>
    </div>

    <div class="flex items-center justify-between bg-white rounded-[0.5rem]
                p-[1rem] border border-[#C5C5D3]">
        <div class="flex items-center gap-[0.5rem] font-bold">
            <img src={Checklist} alt="Checklist" class="w-[1rem] h-[1rem]"/>
            Active Masking Rules:
        </div>

        <div class="flex shrink-0 items-center gap-[0.5rem] text-[0.75rem]">
            <div class="flex items-center gap-2 whitespace-nowrap bg-[#1E3A8A1A]
                        border rounded-[9999px] py-[0.25rem] px-[0.5rem]">
                <img src={Person} alt="Person" class="w-[0.75rem] h-[0.75rem]"/>
                Credit Card Number
            </div>

            <div class="flex items-center gap-2 whitespace-nowrap bg-[#1E3A8A1A]
                        border rounded-[9999px] py-[0.25rem] px-[0.5rem]">
                <img src={Email} alt="E-mail" class="w-[0.75rem] h-[0.75rem]"/>
                E-mail
            </div>

            <div class="flex items-center gap-2 whitespace-nowrap bg-[#1E3A8A1A]
                        border rounded-[9999px] py-[0.25rem] px-[0.5rem]">
                <img src={Phone} alt="Phone" class="w-[0.75rem] h-[0.75rem]"/>
                Phone number
            </div>

            <div class="flex items-center gap-2 whitespace-nowrap bg-[#1E3A8A1A]
                        border rounded-[9999px] py-[0.25rem] px-[0.5rem]">
                <img src={Calendar} alt="Calendar" class="w-[0.75rem] h-[0.75rem]"/>
                Date of Birth
            </div>

            <div class="flex items-center gap-2 whitespace-nowrap bg-[#1E3A8A1A]
                        border rounded-[9999px] py-[0.25rem] px-[0.5rem]">
                <img src={Home} alt="Address" class="w-[0.75rem] h-[0.75rem]"/>
                Address
            </div>
        </div>
    </div>

    <div class="flex justify-between">
        <FieldCard 
        type = {1}
        width = "w-[49%]"/>

        <FieldCard 
        type = {2}
        width = "w-[49%]"/>
    </div>
</div>