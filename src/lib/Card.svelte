<script lang="ts" context="module">
    export interface CardContent {
        term: string;
        definition: string;
    }
</script>

<script lang="ts">
    import { cubicIn } from "svelte/easing";
    import { fly, scale } from "svelte/transition";

    let is_correct: boolean | null;

    export let flipped = false;
    export let content: CardContent;
    export const mark_correctness = (correctness: boolean) => {
        is_correct = correctness;
    };
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
    class={"card-outer " + (flipped ? "card-flipped" : "")}
    in:scale={{ start: 0.75, opacity: 0, delay: 200, duration: 100 }}
    out:fly={{
        x: (!is_correct ? "-" : "") + "75vw",
        opacity: 0.25,
        duration: 200,
        easing: cubicIn,
    }}
    on:click={() => flipped = !flipped}
>
    <div
        class={"card-inner " +
            (is_correct == true
                ? "correct"
                : is_correct == false
                  ? "incorrect"
                  : "")}
    >
        <div class="card-front">{content.term}</div>
        <div class="card-back">{content.definition}</div>
    </div>
</div>

<style>
    .card-outer {
        width: 40vw;
        height: 25vw;
        perspective: 1000px;

        position: absolute;
    }

    .card-inner {
        width: 100%;
        height: 100%;

        transition:
            transform 0.2s,
            background-color 0.4s;
        transform-style: preserve-3d;

        border-radius: 20px;

        background-color: white;

        text-align: center;
    }

    .card-inner.correct {
        background-color: #50a050;
    }
    .card-inner.incorrect {
        background-color: #a05050;
    }

    .card-outer.card-flipped .card-inner {
        transform: rotateX(180deg);
    }
    .card-front,
    .card-back {
        position: absolute;
        width: calc(100% - 100px);
        height: calc(100% - 100px);
        -webkit-backface-visibility: hidden; /* Safari */
        backface-visibility: hidden;

        padding: 50px;

        display: flex;
        justify-content: center;
        align-items: center;

        font-size: xx-large;

        transform: rotateX(0deg) 
    }

    .card-back {
        transform: rotateX(180deg);
    }
</style>
