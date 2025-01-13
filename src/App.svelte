<script lang="ts">
    import Card, { type CardContent } from "./lib/Card.svelte";
    import InputBar from "./lib/InputBar.svelte";
    import { get_card, add_correct_point } from "./vocab";

    let card_flipped = false;

    let mark_correctness: (correctness: boolean) => void;

    let current_card: CardContent = get_card();

    function flip() {
        card_flipped = !card_flipped;
    }

    function correct() {
        mark_correctness(true);
        add_correct_point(current_card.term);

        current_card = get_card();
        card_flipped = false;
    }

    function incorrect() {
        mark_correctness(false);

        current_card = get_card();
        card_flipped = false;
    }

    let last_keypress: string | undefined;
    function keydown(ev: KeyboardEvent) {
        if (!last_keypress || ev.code != last_keypress) {
            if (ev.code == "ArrowUp" || ev.code == "Space") {
                flip();
            } else if (ev.code == "ArrowLeft") {
                incorrect();
            } else if (ev.code == "ArrowRight") {
                correct();
            }

            last_keypress = ev.code;
        }
    }

    function keyup() {
        last_keypress = undefined;
    }

    document.onkeydown = keydown;
    document.onkeyup = keyup;
</script>

<main>
    <div>
        {#key current_card}
            <Card
                flipped={card_flipped}
                content={current_card}
                bind:mark_correctness
            ></Card>
        {/key}
    </div>
    <InputBar
        flip_click={flip}
        thumbsup_click={correct}
        thumbsdown_click={incorrect}
    ></InputBar>
</main>

<style>
    main {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 100%;
    }

    div {
        width: 40vw;
        height: 25vw;
    }
</style>
