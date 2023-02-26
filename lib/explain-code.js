const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
    apiKey: "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",
});

const openai = new OpenAIApi(configuration);

async function explainCode(code) {
    const response = await openai.createCompletion({
        model: "code-davinci-002",
        prompt: code,
        temperature: 0,
        max_tokens: 64,
        top_p: 1.0,
        frequency_penalty: 0.0,
        presence_penalty: 0.0,
        stop: ["\"\"\""],
    });
    console.log(response.data.choices[0].text);
    return response;
}


module.exports = {explainCode};