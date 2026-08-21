<script>
    import ShortInput from "./ShortInput.svelte";
    import creditCardPic from '$lib/assets/creditcard.svg';
    import mailPic from '$lib/assets/email.svg';
    import phonePic from '$lib/assets/phone.svg';
    import calendarPic from '$lib/assets/calendar.svg';
    import pinPic from '$lib/assets/pin.svg';
    import savePic from '$lib/assets/save.svg';
    export let personalTitle = "";
    export let personalButtonTitle = "Save";
</script>

<div class='personalInformation w-[60%] px-[3.5rem] py-[3rem] rounded-3xl
            shadow-[0px_4px_38px_0px_rgba(0,0,0,0.25)] bg-white/35
            font-[family-name:var(--inter-font)] text-[1rem] font-semibold'>
    <div class='text-[3rem] pb-[2rem]'>
    {personalTitle}
    </div>

    <ShortInput personalInputTitle='Credit Card Number'
    personalInputImg={creditCardPic}
    personalInputImgAlt='Credit card logo'
    personalInputImgPlace='top-[var(--svg-norm)]'
    personalInputPlaceholder='1234-5678-9012-3456'
    personalInputId='creditCard'
    personalInputHeight='h-[var(--textarea-height)]'
    personalInputWidth='w-full'/>

    <div class="flex justify-between">
        <ShortInput personalInputTitle='Email'
        personalInputImg={mailPic}
        personalInputImgAlt='Mail logo'
        personalInputImgPlace='top-[var(--svg-norm)]'
        personalInputPlaceholder='example@domain.com'
        personalInputId='email'
        personalInputHeight='h-[var(--textarea-height)]'
        personalInputWidth='w-[49%]'/>

        <ShortInput personalInputTitle='Phone Number'
        personalInputImg={phonePic}
        personalInputImgAlt='Phone logo'
        personalInputImgPlace='top-[var(--svg-norm)]'
        personalInputPlaceholder='093-245-7894'
        personalInputId='phoneNumber'
        personalInputHeight='h-[var(--textarea-height)]'
        personalInputWidth='w-[49%]'/>
    </div>

    <ShortInput personalInputTitle='Date of Birth (DOB)'
    personalInputImg={calendarPic}
    personalInputImgAlt='Calendar logo'
    personalInputImgPlace='top-[var(--svg-norm)]'
    personalInputPlaceholder='25/12/2549'
    personalInputId='dateOfBirth'
    personalInputHeight='h-[var(--textarea-height)]'
    personalInputWidth='w-[49%]'/>

    <ShortInput personalInputTitle='Address'
    personalInputImg={pinPic}
    personalInputImgAlt='Pin logo'
    personalInputImgPlace='top-[var(--svg-large)]'
    personalInputPlaceholder='Address: 689 ซอยลาดกระบัง 19 ถนนลาดกระบัง...'
    personalInputId='address'
    personalInputHeight='h-[var(--textarea-large)]'
    personalInputWidth='w-full'/>

    <div class='flex justify-end border-t my-[1rem] pt-[1rem] gap-[1rem]
                border-white'>
        <button class='border rounded-lg px-[1rem] py-[0.5rem] bg-white
                        text-black'>Cancel</button>
        <button class='relative border rounded-lg px-[1rem] py-[0.5rem]
                        pl-[2.5rem] bg-black text-white'>
            <img src={savePic} alt='Save logo' 
            class="absolute left-[0.75rem] top-[0.65rem] w-[1.25rem] h-[1.25rem]
                    pointer-events-none"/>
            {personalButtonTitle} Information
        </button>
    </div>

</div>