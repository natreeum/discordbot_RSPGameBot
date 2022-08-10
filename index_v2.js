// Require the necessary discord.js classes
const { Client, GatewayIntentBits } = require("discord.js");
const { token } = require("./config.json");
//const config = require("./config.js");
// Create a new client instance
const client = new Client({ intents: [GatewayIntentBits.Guilds] });

// When the client is ready, run this code (only once)
client.once("ready", () => {
  console.log("Ready!");
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const { commandName } = interaction;

  if (commandName === "rspgame") {
    const myChoice = interaction.options.getInteger("choice");
    const enemyChoice = Math.floor(Math.random() * 3 + 1);
    let winner = "";
    let areYouWin = "";
    const chat = {
      1: ":fist:",
      2: ":v:",
      3: ":hand_splayed:",
    };
    //1 : rock, 2: scissors, 3: paper
    const weapons = {
      1: { weakTo: "3", strongTo: "2" },
      2: { weakTo: "1", strongTo: "3" },
      3: { weakTo: "2", strongTo: "1" },
    };

    if (weapons[myChoice].weakTo == enemyChoice) winner = "bot";
    else if (weapons[myChoice].strongTo == enemyChoice) winner = "you";
    else winner = "draw";

    if (winner == "you") {
      areYouWin = "Win :o:";
    } else if (winner == "bot") {
      areYouWin = "Lose :x:";
    } else if (winner == "draw") {
      areYouWin = "Draw :grey_question:";
    }

    await interaction.reply(
      `:robot: : [${chat[enemyChoice]}], You : [${chat[myChoice]}] \nYou ${areYouWin}`
    );
  }
});

// Login to Discord with your client's token
client.login(token);
