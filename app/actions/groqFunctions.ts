const API_KEY = process.env.GROQ_API;
const API_URL = "https://api.groq.com/openai/v1/chat/completions";
const MODEL = "meta-llama/llama-4-scout-17b-16e-instruct";

export async function askGroq(prompt: string): Promise<any | null> {
    await new Promise((r) => setTimeout(r, 2000));
    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
    };

    const body = {
        model: MODEL,
        messages: [
            {
                role: "system",
                content:
                    "Your job is to only write a very detailed prompt for building an app and not build the app yourself. help the user by generating a proper detailed prompt to be pasted into an AI ide. The prompt should be in simple plain text and no emojis or highlighting. Donot add anything before or after the prompt, just return the prompt, no extra words to the user.",
            },
            {
                role: "user",
                content: prompt,
            },
        ]
    };

    let attempts = 0;
    const maxAttempts = 5;


    while (attempts < maxAttempts) {
        try {
            // console.log(`🔁 [Groq] Sending request (attempt ${attempts + 1}/${maxAttempts})...`);

            const res = await fetch(API_URL, {
                method: "POST",
                headers,
                body: JSON.stringify(body),
            });

            // Handle rate limiting
            if (res.status === 429) {
                const retryAfter = res.headers.get("retry-after") || "60";
                // console.log(res)
                const waitTime = (parseFloat(retryAfter) * 1000);
                console.warn(`⏳ Rate limited. Retrying in ${retryAfter} seconds...`);
                await new Promise((r) => setTimeout(r, waitTime));
                attempts++;
                continue;
            }

            const json = await res.json();
            // console.log("grok response: ", json)
            const content = json.choices?.[0]?.message?.content;
            // console.log(content)
            if (!content) {
                console.warn("⚠️ No content in Groq response.");
                return null;
            }

            // console.log("✅ [Groq] Response received.");
            // return parseGroqResponse(content);
            return content
        } catch (error) {
            console.error("❌ [Groq] Unexpected error:", error);
            attempts++;
            await new Promise((r) => setTimeout(r, 1000));
        }
    }

    console.error(`❌ [Groq] Exceeded ${maxAttempts} retry attempts. Aborting.`);
    return null;
}