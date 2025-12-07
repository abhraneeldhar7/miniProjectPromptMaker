"use server"

import { askGroq } from "./groqFunctions"

export const getDisplayPrompt = async (topicName: string) => {
    const prompt = `TOPIC_NAME="${topicName}"
write a very detailed prompt for making a basic mini project explaining all the features.
use nextjs, typescript, eslint all the build errors. make the app responsive. make it beautiful and modern looking. use shadcn for beautiful components.
This is a machine learning project but no time to train a model, so fake the responses by using groq api. the response should be displayed or used properly to simulate a model working behind the scenes. use nextjs server actions and make this work, just a demo i need to show. donot complicate things. this should deploy straight away without any build errors. 
make all of that a plain text prompt to paste into cursor.
Explain all the details thoroughly.
And instruct it to use a non-generic AI slop looking UI, make a great design for the landing page and the app.
Explain in great details how the groq prompt should look like while faking the results. and how to display that properly. 
`

    const res = askGroq(prompt);
    return res;
}