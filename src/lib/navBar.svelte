<script>
    import HomeButton from '$lib/assets/homeButton.svg';
</script>

<div class='navBar'>
    <div class='navBarTitle'>
        Obscura+
    </div>
    <div class='navBarButtons'>
        <a href="/" class='navBarHomePage'><img src={HomeButton} alt='Home'/></a>
        <a href="/createData" class='navBarCreatePage'>+</a>
    </div>
</div>

<style>
    .navBar {
        background: #fff3d985;
        display: flex;
        justify-content: space-between;
        box-shadow: 0px 4px 20px 0px rgba(0, 0, 0, 0.20);
        position: sticky;
        top: 0px;

        border: 16px;
        padding: 1rem 0.5rem;
    }

    .navBarTitle {
        font-family: 'Iosevka Charon Mono';
        font-size: 6rem;
        padding: 0rem 2rem;
    }

    .navBarButtons {
        display: flex;
        width: 15rem;
        justify-content: space-between;
        align-items: center;
        padding: 0rem 2rem;
    }

    .navBarHomePage {
        height: 5rem;
        width: 5rem;
        border: 0.25rem solid black;
        border-radius: 50%;
        padding: 0.8rem;
    }

    .navBarCreatePage {
        display: flex;
        align-items: center;
        justify-content: center;
        height: 5rem;
        width: 5rem;
        
        border: 0.25rem solid black;
        border-radius: 50%;
        font-size: 6rem;
        font-weight: 250;
    }
</style>