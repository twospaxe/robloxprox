// server.js
const express = require("express");
const bodyParser = require("body-parser");
const fetch = require("node-fetch");

const app = express();
app.use(bodyParser.json());

app.post("/discord-webhook", async (req, res) => {
    const { username, content } = req.body;
    
    const webhookURL = "https://discord.com/api/webhooks/1359741978220167168/SjrUIy67TFf2RgJ5Y5ubf7qDy614WpgoVPCeOuPBVTl12wjU6IbHxaIVeweWqVQOjC4p";

    try {
        await fetch(webhookURL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, content })
        });
        res.status(204).end(); // Success, no content
    } catch (err) {
        console.error("Error forwarding to Discord:", err);
        res.status(500).send("Error");
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Running on ${PORT}`));
