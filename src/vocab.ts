import type { CardContent } from "./lib/Card.svelte";

export const vocab: CardContent[] = [
    {
        term: "sordid",
        definition: "involving ignoble actions and motives; arousing moral distaste and contempt. (adj)"
    },
    {
        term: "etymology",
        definition: "the study of the origin of words and the way in which their meanings have changed throughout history. (noun)"
    },
    {
        term: "indignation",
        definition: "anger or annoyance provoked by what is perceived as unfair treatment. (noun)"
    },
    {
        term: "acquiesce",
        definition: "accept something reluctantly but without protest. (verb)"
    },
    {
        term: "idiosyncratic",
        definition: "relating to idiosyncrasy; peculiar or individual. (adj)"
    },
    {
        term: "surfeit",
        definition: "an excessive amount of something. (noun)"
    },
    {
        term: "ignominious",
        definition: "deserving or causing public disgrace or shame. (adj)"
    },
    {
        term: "goad",
        definition: "provoke or annoy (someone) so as to stimulate some action or reaction. (adj)"
    },
    {
        term: "languor",
        definition: "the state or feeling, often pleasant, of tiredness or inertia. (noun)"
    },
    {
        term: "generalization",
        definition: "a general statement or concept obtained by inference from specific cases. (noun)"
    },
    {
        term: "allocation",
        definition: "the action or process of allocating or distributing something. (noun)"
    },
    {
        term: "wry",
        definition: "using or expressing dry, especially mocking, humor. (adj)"
    },
    {
        term: "admonish",
        definition: "warn or reprimand someone firmly. (verb)"
    },
    {
        term: "visage",
        definition: "a person's face, with reference to the form or proportions of the features. (noun)"
    },
    {
        term: "jovial",
        definition: "cheerful and friendly."
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