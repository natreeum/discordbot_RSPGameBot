const { SlashCommandBuilder } = require("discord.js");
let isStarted = false;
const gamedata = {
  firstChoice: { user: null, choice: null },
  secondChoice: { user: null, choice: null },
};

module.exports = {
  // isStarted: false,
  // gamedata: {
  //   firstChoice: [{ user: "" }, { choice: 0 }],
  //   secondChoice: [{ user: "" }, { choice: 0 }],
  // },
  data: new SlashCommandBuilder()
    .setName("rsppvp")
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
  async execute(interaction) {
    const chat = {
      1: ":fist:",
      2: ":v:",
      3: ":hand_splayed:",
    };
    const weapons = {
      1: { weakTo: 3, strongTo: 2 },
      2: { weakTo: 1, strongTo: 3 },
      3: { weakTo: 2, strongTo: 1 },
    };
    const user = interaction.user;
    const myChoice = interaction.options.getInteger("choice");

    if (isStarted == false) {
      gamedata.firstChoice.user = user;
      gamedata.firstChoice.choice = myChoice;
      isStarted = true;

      await interaction.reply(`${gamedata.firstChoice.user} is waiting...`);
    } else if (isStarted == true) {
      gamedata.secondChoice.user = user;
      gamedata.secondChoice.choice = myChoice;
      let winner = "";

      if (
        weapons[gamedata.firstChoice.choice].weakTo ==
        gamedata.secondChoice.choice
      ) {
        winner = `Winner is ${gamedata.secondChoice.user}!`;
      } else if (
        weapons[gamedata.firstChoice.choice].strongTo ==
        gamedata.secondChoice.choice
      ) {
        winner = `Winner is ${gamedata.firstChoice.user}!`;
      } else winner = "Nobody wins. DRAW";

      await interaction.reply(
        `${gamedata.firstChoice.user} choiced ${
          chat[gamedata.firstChoice.choice]
        } \n${gamedata.secondChoice.user} choiced ${
          chat[gamedata.secondChoice.choice]
        }\n${winner}`
      );
      isStarted = false;
    }
  },
};
