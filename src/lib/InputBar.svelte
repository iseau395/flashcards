<script lang="ts">

    export let thumbsup_click;
    export let thumbsdown_click;
    export let flip_click;

</script>

<div>
    <button on:click={thumbsdown_click}><img src="../assets/thumbsdown.png" alt="thumbs down"/></button>
    <button on:click={flip_click}><img src="../assets/flip.png" alt="flip"/></button>
    <button on:click={thumbsup_click}><img src="../assets/thumbsup.png" alt="thumbs up"/></button>
</div>

<style>
    div {
        background-color: white;
        border-radius: 20px;

        width: 40vw;

        display: flex;
        align-items: center;
        justify-content: space-evenly;

        margin-top: 20px;
    }

    button {
        width: 50px;
        height: 50px;

        margin: 10px;

        border-radius: 100%;
        border-color: rgb(102, 102, 102);
        border-style: solid;

        display: inline-flex;
        align-items: center;
        justify-content: center;

        background-color: transparent;

        padding: 0;
    }

    img {
        width: 30px;
        height: 30px;
        
        filter: invert(40%);
    }

    button:hover {
        border-color: rgb(153, 153, 153);
    }
    button:hover img {
        filter: invert(60%);
    }
</style>