<script>
	import NavBar from '$components/LandingNavBar.svelte';
    import SupportedData from '$components/SupportedData.svelte';
    import KeyArt from '$lib/assets/keyart.txt?raw';
    import LockArt from '$lib/assets/lockart.txt?raw';
    import Arrow from '$lib/assets/arrow.svg';
    import Pen from '$lib/assets/pen.svg';
    import Plus from '$lib/assets/plus.svg';
    import Lock from '$lib/assets/lock.svg';
    import CreditCard from '$lib/assets/creditcard.svg';
    import Mail from '$lib/assets/email.svg';
    import Phone from '$lib/assets/phone.svg';
    import Calendar from '$lib/assets/calendar.svg';
    import Pin from '$lib/assets/pin.svg';
    import Github from '$lib/assets/githublogo.svg';
    import Youtube from '$lib/assets/youtubelogo.svg';
    import MiniFacebook from '$lib/assets/minifacebook.svg';
    import MiniInstagram from '$lib/assets/miniinstagram.svg';
    import MiniPhone from '$lib/assets/miniphone.svg';
    
    let scrollContainer;
	let aboutSection;
    
	let progress = 0;
    let arrowProgress = 0;
    let currentNumber = 1;

	function handleScroll() {
		const container = scrollContainer;
		const section = aboutSection;

		const sectionTop = section.offsetTop;
		const scrollTop = container.scrollTop;
        
        const start = sectionTop - container.clientHeight;
		const end = sectionTop;

		progress = Math.min(
			1,
			Math.max(0, (scrollTop - start) / (end - start))
		);

        const arrowStart = sectionTop;
        const arrowEnd = sectionTop + container.clientHeight;

        arrowProgress = Math.min(
            1,
            Math.max(0, (scrollTop - arrowStart) / (arrowEnd - arrowStart))
        );
	}

    const SupportedCards = [
        {
            picture: CreditCard,
            pictureAlt: 'credit card picture',
            title: 'Credit Card Number',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            pattern: 'xxxx-xxxx-xxxx-3456'
        },
        {
            picture: Mail,
            pictureAlt: 'mail picture',
            title: 'E-mail',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
            pattern: 's*******d@company.com'
        },
        {
            picture: Phone,
            pictureAlt: 'phone picture',
            title: 'Phone Number',
            description: 'Lorem ipsum dolor sit ameagna aliqua.',
            pattern: 'xxx-xxx-7867'
        },
        {
            picture: Calendar,
            pictureAlt: 'calendar picture',
            title: 'Date of Birth',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            pattern: 'XX/XX/25XX'
        },
        {
            picture: Pin,
            pictureAlt: 'pin picture',
            title: 'Address',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
            pattern: 'XXX ซอยลาดกระบัง 19 ถนนลาดกระบัง แขวงลาดกระบัง กรุงเทพฯ'
        }
    ];

    import { onMount } from 'svelte';
    import { fly } from 'svelte/transition';
    onMount(() => {
        const interval = setInterval(() => {
            currentNumber = currentNumber === 5 ? 1 : currentNumber + 1;
        }, 2750);

        return () => clearInterval(interval);
    });
</script>

<div class='flex h-screen flex-col font-[family-name:var(--inter-font)]'>
	<div bind:this={scrollContainer} on:scroll={handleScroll}
        class='relative h-0 flex-1 overflow-y-auto nice-scrollbar
                scroll-smooth'>
        <NavBar />
		<div class='h-full flex items-center justify-center'>
			<div class='relative -translate-y-[6rem] px-[2rem] text-[12.5rem]
                        font-[family-name:var(--navbar-font)]'>
                Obscura+
            </div>
        </div>

        <div class='absolute bottom-0 left-0 px-[2rem] py-[2rem] '>
            <div class='text-[2.25rem]'>
                RegEX
            </div>
            <div class='mt-[-0.25rem] text-[1.5rem] text-[#676767]'>
                Project Based
            </div>
        </div>

        <div bind:this={aboutSection} class='relative h-full' id='about-us'>
            <div class='pl-[7rem] pt-[3rem]'>
                <div class='text-[10rem] font-[family-name:var(--navbar-font)]'
                    style={`transform: translateX(${progress * 100 - 100}%)`}>
                    ABOUT US
                </div>
                <div class='text-[2.5rem] font-light'>
                    "Precision masking, one regular expression at a time."
                </div>
            </div>
            <pre class='absolute right-[13rem] top-[1rem] font-mono text-[0.4rem]
                        rotate-[33.69deg]'>
                {KeyArt}
            </pre>
            <pre class='absolute right-[7rem] top-[12rem] font-mono text-[0.3rem]
                        rotate-[3.16deg]'>
                {KeyArt}
            </pre>
            <div class='flex w-full items-end pl-[7rem] pr-[7rem]'>
                <pre class='font-mono text-[0.6rem] mt-[4.5rem]'>{LockArt}</pre>
                
                <div class='flex ml-auto items-end gap-[4rem]'>

                    <div class='flex flex-col items-center gap-[0.75rem] pt-[10rem]'>
                        <div class='text-[4rem] font-light'>
                            PDPA Data Masking Tool
                        </div>

                        <div class='font-medium text-[#424752] text-center max-w-[35rem]'>
                            Automatically detect and obscure sensitive Personal Data
                            Protection Act (PDPA) information within raw text. Ensure
                            compliance by securely masking credit cards, emails, 
                            phone numbers, dates of birth, and addresses using
                            advanced regex patterns.
                        </div>
                    </div>

                    <div class='flex h-[12rem] w-[12rem] shrink-0 items-center justify-center
	                            rounded-full border border-white/35 bg-white/28
	                            shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)]'>
                        <img src={Arrow} alt='arrow' class='h-[6rem] w-[6rem] object-contain'
                            style={`transform: rotate(${arrowProgress * 90}deg)`}/>
                    </div>

                </div>
            </div>
        </div>

        <div class='h-full' id='features'>
            <div class='flex h-full flex-col items-center pt-[3rem] pb-[8rem]
                        px-[20rem] gap-[3rem]'>
                <div class='text-[10rem] font-[family-name:var(--navbar-font)]'>
                    FEATURES
                </div>

                <div class='flex w-full flex-1 justify-between gap-[2rem]'>
                    <div class='flex items-center justify-center
                                bg-[#D9D9D9]/20 border border-white/25 rounded-[17px]
                                shadow-[0px_4px_38px_0px_rgba(0,0,0,0.25)] flex-1'>
                        <img src={Pen} alt='pen'/>
                    </div>

                    <div class='group flex flex-1 cursor-pointer flex-col justify-center
                            items-center rounded-[17px] border border-white/25 gap-[1rem]
                            bg-[#D9D9D9]/20 shadow-[0px_4px_38px_0px_rgba(0,0,0,0.25)]
                            overflow-hidden transition-all duration-500 ease-in-out
                            hover:flex-[1.6] hover:bg-white/50'>
                        <div
                            class='max-h-0 overflow-hidden opacity-0 text-[2rem]
                                transition-all duration-500 group-hover:mt-[2rem]
                                group-hover:max-h-[4rem] group-hover:opacity-100'>
                            Create data
                        </div>
                        <div
                            class='flex flex-1 items-center justify-center
                                transition-all duration-500 group-hover:flex-none
                                group-hover:my-[1.5rem]'>
                            <img src={Plus} alt='plus'
                                class='transition-transform duration-500
                                    group-hover:-translate-y-2'/>
                        </div>
                        <div class='max-h-0 overflow-hidden px-[2rem] pb-0 text-center
                                text-[#424752] text-[0.8rem] opacity-0 transition-all
                                duration-500 group-hover:max-h-[10rem] group-hover:pb-[2rem]
                                group-hover:opacity-100'>
                            Automatically detect and obscure sensitive Personal Data Protection Act
                            (PDPA) information within raw text. Ensure compliance by securely masking
                            credit cards, emails, phone numbers, dates of birth, and addresses using
                            advanced regex patterns.
                        </div>
                    </div>

                    <div class='flex items-center justify-center
                                bg-[#D9D9D9]/20 border border-white/25 rounded-[17px]
                                shadow-[0px_4px_38px_0px_rgba(0,0,0,0.25)] flex-1'>
                        <img src={Lock} alt='lock'/>
                    </div>
                </div>
            </div>
        </div>

        <div class='h-screen'>
            <div class='flex h-full items-stretch justify-between px-[20rem] py-[10rem]'>
                <div class="text-[8rem] font-[family-name:var(--navbar-font)] whitespace-nowrap">
                    <div>SUPPORTED</div>
                    <div>DATA</div>
                    <div>TYPE</div>
                </div>
                
                <div class="w-[40%] h-full shrink-0">
                    <div class="relative w-full h-full min-h-0 overflow-hidden bg-white/50
                                border border-white/25 rounded-[17px]
                                shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)]">

                        {#key currentNumber}
                            <div class="absolute inset-0 w-full h-full"
                                in:fly={{ x: 500, duration: 1000 }}
                                out:fly={{ x: -500, duration: 1000 }}>
                                <SupportedData
                                    {...SupportedCards[currentNumber - 1]}
                                />
                            </div>
                        {/key}

                        <div
                            class="absolute bottom-[2rem] left-0 right-0
                                    z-10 flex items-center justify-center gap-[0.5rem]">
                            {#each Array(5) as _, i}
                                <div class={`h-[0.75rem] w-[0.75rem] rounded-full ${
                                        i + 1 === currentNumber
                                            ? 'bg-[#484848]'
                                            : 'bg-[#929292]'
                                    }`}>
                                </div>
                            {/each}
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class='relative h-full' id='more-info'>
            <div class='flex flex-col pt-[3rem] px-[7rem] gap-[3rem]'>
                <div class='text-[10rem] font-[family-name:var(--navbar-font)] self-end'>
                    MORE INFO
                </div>
                <div class='flex justify-center items-center gap-[2rem]'>
                    <div class='group grid grid-cols-[auto_0fr] hover:grid-cols-[auto_1fr]
                                items-center bg-[#D9D9D9]/20 border border-white/25
                                rounded-[17px] p-[3rem] overflow-hidden
                                shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)]
                                transition-[grid-template-columns] duration-500 ease-in-out'>
                        <img src={Youtube} alt='youtube logo'
                            class='w-[10rem] h-[10rem] shrink-0'>
                        <div class='flex flex-col min-w-0 ml-0 group-hover:ml-[3rem]
                                    opacity-0 group-hover:opacity-100 transition-all
                                    duration-500 ease-in-out overflow-hidden
                                    whitespace-nowrap'>
                            <div class='text-[3rem]'>
                                Youtube
                            </div>
                            <a href='https://youtu.be/dQw4w9WgXcQ'
                                class='text-[2.5rem] text-[#7B7B7B] hover:underline
                                        active:translate-y-[1px]'>
                                www.youtube.com/placeholder
                            </a>
                        </div>
                    </div>

                    <div class='group grid grid-cols-[0fr_auto] hover:grid-cols-[1fr_auto]
                                items-center bg-[#D9D9D9]/20 border border-white/25
                                rounded-[17px] p-[3rem] overflow-hidden
                                shadow-[0px_4px_25px_0px_rgba(0,0,0,0.25)]
                                transition-[grid-template-columns] duration-500 ease-in-out'>
                        <div class='flex flex-col items-end min-w-0 mr-0 group-hover:mr-[3rem]
                                    opacity-0 group-hover:opacity-100 transition-all duration-500
                                    ease-in-out overflow-hidden whitespace-nowrap'>
                            <div class='text-[3rem]'>
                                Source code
                            </div>
                            <a href='https://youtu.be/dQw4w9WgXcQ'
                                class='text-[2.5rem] text-[#7B7B7B] hover:underline
                                        active:translate-y-[1px]'>
                                www.github.com/placeholder
                            </a>
                        </div>
                        <img src={Github} alt='github logo'
                            class='w-[10rem] h-[10rem] shrink-0'>
                    </div>
                </div>
            </div>

            <div class='absolute bottom-0 left-0 px-[2rem] py-[2rem]'>
                <div class='flex flex-col text-[1.875rem] gap-[0.5rem]'>
                    <p>Terms of Use</p>
                    <p>Privacy Policy</p>
                    <p>Community Guidelines</p>
                    <div class='flex gap-[1rem] pt-[0.5rem]'>
                        <img src={MiniFacebook} alt='facebook'>
                        <img src={MiniInstagram} alt='instagram'>
                        <img src={MiniPhone} alt='phone'>
                    </div>
                </div>
            </div>

            <div class="absolute text-[1.875rem] bottom-0 left-1/2 -translate-x-1/2 py-[2rem] font-light">
                © 2026 Obscura
            </div>
        </div>
	</div>
</div>
