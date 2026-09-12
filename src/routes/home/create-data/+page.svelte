<script lang="ts">
    import Navbar from '$components/NavBar.svelte';
	import BaseCard from '$layouts/BaseCard.svelte';
    import ActionDataCard from '$components/ActionDataCard.svelte';
    import Note from '$lib/assets/input.svg';
    import Trash from '$lib/assets/remove.svg';
    import WhiteProtect from '$lib/assets/protectwhite.svg';
    import Back from '$lib/assets/previous.svg';

	let rawText = $state<string>('');

	function handleClearText() {
		rawText = '';
	}
</script>

<div class="relative flex flex-col flex-1 items-center justify-center">
    <a href="/home"
    class="absolute top-38 left-60 flex h-18 w-18 items-center justify-center rounded-full
        border border-white/40 bg-white/25">
        <img src={Back} alt="previous" class="h-8"/>
    </a>
    <BaseCard>
        <div class="flex flex-col">
            <p class="text-[3rem]">Personal Information Entry</p>
        </div>
        <ActionDataCard
            bind:text={rawText}
            width="w-full"
            header="Raw Input Text"
            headerImg={Note}
            headerImgAlt="Note"
            headerBgColor="bg-white"
            textAreaBgColor="bg-white"
            isReadOnly={false}
            textAreaPlaceholder="012-345-6789 DOB:01/01/2559 john.doe@example.com..."
            topButton={true}
            topButtonImage={Trash}
            topButtonAlt="Trash"
            topButtonText="Clear"
            onclickTopButton={handleClearText}
            actionButton={true}
            actionButtonTitle="Mask Text"
            actionButtonImage={WhiteProtect}
            actionButtonAlt="Shield"
            actionButtonBackgroundColor="bg-black"
            actionButtonTextColor="text-white"
            actionButtonBorderColor="border-black cursor-pointer hover:border-gray-200"
        />
    </BaseCard>
</div>