import type { CardContent } from "./lib/Card.svelte";

export const vocab: CardContent[] = [
    {
        term: "multivalent",
        definition: "having or susceptible of many applications, interpretations, meanings, or values. (adj)"
    },
    {
        term: "beget",
        definition: "(typically of a man, sometimes of a man and a woman) bring (a child) into existence by the process of reproduction. (verb)"
    },
    {
        term: "cajole",
        definition: "persuade (someone) to do something by sustained coaxing or flattery. (verb)"
    },
    {
        term: "deportment",
        definition: "a person's behavior or manners. (noun)"
    },
    {
        term: "sanction",
        definition: "give official permission or approval for (an action). (verb)"
    },
    {
        term: "corroborate",
        definition: "confirm or give support to (a statement, theory, or finding). (verb)"
    },
    {
        term: "synesthesia",
        definition: "the production of a sense impression relating to one sense or part of the body by stimulation of another sense or part of the body. (noun)"
    },
    {
        term: "vacuous",
        definition: "having or showing a lack of thought or intelligence; mindless. (adj)"
    },
    {
        term: "impasse",
        definition: "a situation in which no progress is possible, especially because of disagreement; a deadlock. (noun)"
    },
    {
        term: "ennui",
        definition: "a feeling of listlessness and dissatisfaction arising from a lack of occupation or excitement. (noun)"
    },
    {
        term: "limn",
        definition: "depict or describe in painting or words. (verb)"
    },
    {
        term: "inexorable",
        definition: "impossible to stop or prevent. (adj)"
    },
    {
        term: "scrupulous",
        definition: "(of a person or process) diligent, thorough, and extremely attentive to details. (adj)"
    },
    {
        term: "excoriate",
        definition: "censure or criticize severely. (verb)"
    },
    {
        term: "delimit",
        definition: "determine the limits or boundaries of. (verb)"
    }
]

const correct_counts = new Array<number>();
const last_pulled_time = new Array<number>();
let current_pull = 0;

for (const _ of vocab)
{
    correct_counts.push(0);
    last_pulled_time.push(0);
}

export function get_card()
{
    current_pull += 1;

    const scores = correct_counts.map((v, i) => v - ((current_pull - last_pulled_time[i]) / 5) + Math.random());

    const lowest_score = Math.min(...scores);
    const words = vocab.filter((_, i) => scores[i] == lowest_score);
    const word = words[Math.floor(Math.random() * (words.length))];

    console.log(lowest_score, scores);

    last_pulled_time[vocab.indexOf(word)] = current_pull;

    return word;
}

export function add_correct_point(vocab_word: string)
{
    const index = vocab.findIndex((v) => v.term == vocab_word);

    correct_counts[index] += 1;
}