const express = require('express');
const cors = require('cors');

const { GoogleGenerativeAI } = require('@google/generative-ai')
const genAI = new GoogleGenerativeAI("AIzaSyDR2WDnon59BCwqOxF2Q6fvQCMuJL20BL8");

async function runModel(prompt) {
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const txt = await response.text();
    return txt;
}

const PORT = 50000;
express()

    .use(cors())
    .use(express.json())
    .get('/', (req, res) => res.send('Server is running!'))
    .post('/generateResponse', async (req, res) => {
        try {
            const userMessage = req.body.defaultPrompt;
            const answer = await runModel(userMessage);
            // const ansObj = JSON.parse(answer);
            res.json({ answer });
        } catch (error) {
            console.error("Failed to generate response", error);
        }
    })

    .listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
