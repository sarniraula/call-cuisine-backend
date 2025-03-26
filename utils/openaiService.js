const OpenAI = require("openai");
const config = require("../config/serverConfig");

const openai = new OpenAI({ apiKey: config.OPENAI_API_KEY });

const formatOrder = async (orderString) => {
    try {
        const completion = await openai.chat.completions.create({
            model: "gpt-4o-mini",
            messages: [
                {
                    role: "system",
                    content: "You are an AI that formats food orders into strict JSON. Do NOT add any explanations, headers, or extra text. Only return valid JSON."
                },
                {
                    role: "user",
                    content: `Format this order properly: "${orderString}". Provide JSON like { "items": [{ "name": "Burger", "quantity": 1 }, { "name": "Coke", "quantity": 1 }] }`
                }
            ]
        });

        return JSON.parse(completion.choices[0].message.content);
    } catch (error) {
        console.error("OpenAI Error:", error);
        return null;
    }
};

module.exports = { formatOrder };
