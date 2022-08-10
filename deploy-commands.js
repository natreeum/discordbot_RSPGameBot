const { SlashCommandBuilder, Routes } = require("discord.js");
const { REST } = require("@discordjs/rest");
const { clientId, guildId, token } = require("./config.json");

const commands = [
  new SlashCommandBuilder()
    .setName("game")
    .setDescription("Start Rock Scissors Paper Game"),
  new SlashCommandBuilder()
    .setName("rspgame")
    .setDescription("Rock Scissors Paper Game start")
    .addIntegerOption((option) =>
      option
        .setName("choice")
        .setDescription("Rock? Scissors? Paper?")
        .setRequired(true)
        .addChoices(
          { name: "Rock", value: 1 },
          { name: "Scissors", value: 2 },
          { name: "Paper", value: 3 }
        )
    ),
].map((command) => command.toJSON());

const rest = new REST({ version: "10" }).setToken(token);

rest
  .put(Routes.applicationGuildCommands(clientId, guildId), { body: commands })
  .then(() => console.log("Successfully registered application commands."))
  .catch(console.error);
