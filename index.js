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

  if (commandName === "game") {
    await interaction.reply("Pong!");
  } else if (commandName === "rspgame") {
    const input = interaction.options.getInteger("input");
    const num = Math.floor(Math.random() * 3 + 1);
    let state = 0;

    const list = new Map();
    list.set(1, ":fist:");
    list.set(2, ":v:");
    list.set(3, ":hand_splayed:");

    const _state = new Map();
    _state.set(1, ":o: Win");
    _state.set(2, ":x: Lose");
    _state.set(3, ":grey_question: Draw");

    if (input == 1) {
      if (num == 1) {
        state = 3;
      } else if (num == 3) {
        state = 2;
      } else if (num == 2) {
        state = 1;
      }
    } else if (input == 2) {
      if (num == 1) {
        state = 2;
      } else if (num == 2) {
        state = 3;
      } else if (num == 3) {
        state = 1;
      }
    } else if (input == 3) {
      if (num == 1) {
        state = 1;
      } else if (num == 2) {
        state = 2;
      } else if (num == 3) {
        state = 3;
      }
    }
    console.log(num);
    await interaction.reply(
      `:robot: : [${list.get(num)}], You : [${list.get(
        input
      )}] \nYou ${_state.get(state)}!`
    );
  }
});

// Login to Discord with your client's token
client.login(token);
