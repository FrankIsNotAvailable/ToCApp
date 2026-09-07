<script>
    import profile from '$lib/assets/profileholder.png';
    export let userName = "Adobe Rizzler";
</script>

<div class='navBar bg-[var(--navbar-background)]/20 flex justify-between items-center
            py-[0.5rem] px-[0.5rem] font-[family-name:var(--navbar-font)] z-1 shrink-0
            shadow-[0px_4px_20px_0px_rgba(0,0,0,0.2)] border-b border-white/35
            backdrop-blur-[5px]'>
    <div class='navBarTitle text-[3.5rem] px-[2rem]'>
        Obscura+
    </div>
    <div class='navBarButtons flex justify-between gap-[1rem] items-center px-[2rem]
                font-[family-name:var(--inter-font)] text-[1.25rem]'>
        {userName}

        <button class='button w-[3rem] h-[3rem]'>
            <img src={profile} alt='profile' class='navBarCreatePage'>
        </button>
    </div>
</div>