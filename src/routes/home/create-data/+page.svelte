<script lang="ts">
    import DataEntryLayout from '$layouts/DataEntryLayout.svelte';
    import ActionDataCard from '$components/ActionDataCard.svelte';
    import Note from '$lib/assets/input.svg';
    import Trash from '$lib/assets/remove.svg';
    import WhiteProtect from '$lib/assets/protectwhite.svg';

    let rawText = $state<string>('');

    function handleClearText() {
        rawText = '';
    }
</script>

<DataEntryLayout>
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
</DataEntryLayout>