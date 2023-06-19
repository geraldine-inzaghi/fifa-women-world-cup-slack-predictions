import pkg from "@slack/bolt";
import dotenv from "dotenv";
import express from "express";

const { App } = pkg;

dotenv.config();

const app = express();

app.set("port", process.env.PORT || 3000);

app.listen(app.get("port"), () => {
    console.log(`Server listening on port ${app.get("port")}`);
});

const slackApp = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
});

(async () => {
    await slackApp.start();
    console.log("⚡️ Bolt app started");
})();

slackApp.event("app_mention", async ({ event, context, client, say }) => {
    try {
        await say({
            blocks: [
                {
                    type: "section",
                    text: {
                        type: "mrkdwn",
                        text: `Thanks for the mention <@${event.user}>! Here's a button`,
                    },
                },
            ],
        });
    } catch (error) {
        console.error(error);
    }
});
