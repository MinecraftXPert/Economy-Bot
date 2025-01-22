const {
  Client,
  GatewayIntentBits,
  EmbedBuilder,
  PermissionsBitField,
  Permissions,
  Embed,
  AllowedMentionsTypes,
  DefaultWebSocketManagerOptions,
} = require(`discord.js`);
DefaultWebSocketManagerOptions.identifyProperties.browser = "Discord iOS";
const fs = require("fs");
let storage = require("./storage.json");
require("dotenv").config();
const TOKEN = process.env.DISCORD_TOKEN;
const { ActivityType } = require("discord.js");

const JOE = "682984131176431786";

// test again

const prefix = "$";
const timer = {};
const crimeTimer = {};
const weeklyTimer = {};
const fiveMinTimer = {};
const begTimer = {};
const streamTimer = {};
const monthlyTimer = {};
const date = new Date();
const daysOfTheWeek = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const currentDay = daysOfTheWeek[date.getDay()];
let costOfSolana = randomNumFromInterval(150, 200).toString();

// <:points:1102646967659659294>

// <:check:1088834644381794365>

/*
.setAuthor({
  name: `${message.author.username}`,
  iconURL: `${message.author.displayAvatarURL()}`,
  url: `https://discord.com/users/${message.author.id}`,
})
*/

const cooldownTimes = {
  command1: 86400000,
  command2: 600000,
  command3: 604800000,
  command4: 300000,
};

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
    GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildPresences,
  ],
});

client.on("guildCreate", async (guild) => {
  // Fetch the server owner's information
  const serverOwner = await guild.fetchOwner();

  // Sending the invite information to the bot owner
  try {
    const botOwner = await client.users.fetch("592825756095348748");
    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("New Server Invite")
      .addFields(
        { name: `Server name`, value: `${guild.name}` },
        {
          name: `Server Owner`,
          value: `${serverOwner.user.tag} (${serverOwner.user.id})`,
        }
      )
      .setTimestamp();
    await botOwner.send({ embeds: [embed] });
    console.log("Sent server invite information to bot owner.");
  } catch (error) {
    console.error("Failed to send server invite information:", error);
  }
});

function save() {
  fs.writeFileSync("./storage.json", JSON.stringify(storage));
}

function backup() {
  fs.writeFileSync("./backup.json", JSON.stringify(storage));
}

function randomNumFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function updateSolana() {
  costOfSolana = randomNumFromInterval(150, 200).toString();
}

function commafy(num){
  num = num.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(num))
        num = num.replace(pattern, "$1,$2");
    return num;
}

setInterval(updateSolana, 5 * 60 * 1000); // updates cost of solana every 5 minutes

client.on("ready", async () => {
  console.log("The bot is online!");

  console.log(`This bot is in ${client.guilds.cache.size} servers.`);

  save();

  client.user.setPresence({
    // status: "idle",
    activities: [
      {
        type: ActivityType.Custom,
        name: "custom",
        state: "Cashing in that mulah 🤑",
      },
    ],
  });
});

// Define a constant for the minimum and maximum amounts of money that can be won or lost
const MIN_CRIME_AMOUNT = -100;
const MAX_CRIME_AMOUNT = 100;

client.on("messageCreate", async (message) => {
  if (`${message.content.toLowerCase()}`.includes("rust")) {
    message.react("🚀").catch((error) => {
      console.log(error);
    });
  }

  if (`${message.content.toLowerCase()}`.includes("zig")) {
    message.react("⚡").catch((error) => {
      console.log(error);
    });
  }

  // If your message doesn't start with the prefix, the bot will ignore your message
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();

  const messageArray = message.content.split(" ");
  const argument = messageArray.slice(1);
  const cmd = messageArray[0];

  if (!storage[message.author.id]) {
    storage[message.author.id] = {
      joined: false,
    };
  }

  // COMMANDDS

  /*
      TO DO:

      - Ping command        | Done
      - Join command        | Done
      - Collect command     | Done
      - Crime command       | Done
      - Weekly command      | Done
      - Balance command     | Done
      - Help commmand       | Done
      - Withdraw command    | Done
      - Deposit command     | Done
      - Work command        | Done
      - Stream command      | Done
      - Leaderboard command | Done
      - Beg command         | Done
      - Give command        | Done
      - Shop command        | Not done

  */

  if (command === "ping") {
    const timeTaken = Date.now() - message.createdTimestamp;
    message.channel.send(
      `Pong! This message took ${timeTaken} milliseconds to respond.`
    );
  }

  if (command === "join") {
    if (storage[message.author.id].joined) {
      message.channel.send("You have already made an account.");
      return;
    }

    const serverId = message.guild.id; // get the ID of the server that the user joined in

    if (storage[message.author.id]) {
      const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setTitle("Created Account")
        .setDescription(
          "You have successfully made an account and got <:points:1102646967659659294> 500 added to your cash account."
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }

    let money = (storage[message.author.id].money =
      storage[message.author.id].money || 0);
    storage[message.author.id].joined = true;
    storage[message.author.id].money += 500;
    storage[message.author.id].bank = 0;
    storage[message.author.id].solana = 0;

    // Add the server ID to the user object in storage.json
    storage[message.author.id].serverId = serverId;

    save();
  }

  if (command === "daily" || command === "collect") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    // Check if the server has a timer entry
    if (!timer[message.guild.id]) {
      // If the server does not have a timer entry, create one
      timer[message.guild.id] = {};
    }
    // Check if the user has a timer entry for the server
    if (!timer[message.guild.id][message.author.id]) {
      // If the user does not have a timer entry, create one
      timer[message.guild.id][message.author.id] = Date.now();

      const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Daily collect")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setDescription(
          "You have collected you daily income of <:points:1102646967659659294> 500. Come back tomorrow for your next income :)"
        )
        .setTimestamp();

      storage[message.author.id].money += 500;
      message.channel.send({ embeds: [embed] });
      save();

      // Set the timer to expire in 24 hours
      setTimeout(() => {
        if (timer[message.guild.id]) {
          delete timer[message.guild.id][message.author.id];
        }
      }, cooldownTimes.command1);
    } else {
      // If the user has a timer entry, check how much time has passed since the last usage
      let timeSinceLastUsage =
        Date.now() - timer[message.guild.id][message.author.id];
      // If less than 24 hours have passed, send a message saying the command is on cooldown
      if (timeSinceLastUsage < cooldownTimes.command1) {
        let timeRemaining = cooldownTimes.command1 - timeSinceLastUsage;
        let minutesRemaining = Math.floor(timeRemaining / 60000);
        let hoursRemaining = Math.floor(minutesRemaining / 60);
        if (hoursRemaining > 0) {
          const embed = new EmbedBuilder()
            .setColor("Green")
            .setDescription(
              `This command is on cooldown. Please wait ${hoursRemaining} hour${
                hoursRemaining > 1 ? "s" : ""
              } before trying again.`
            )
            .setTimestamp();
          message.channel.send({ embeds: [embed] });
        } else {
          const embed2 = new EmbedBuilder()
            .setColor("Green")
            .setDescription(
              `This command is on cooldown. Please wait ${hoursRemaining} hour${
                hoursRemaining > 1 ? "s" : ""
              } before trying again.`
            )
            .setTimestamp();
          message.channel.send({ embeds: [embed2] });
        }
      } else {
        // If 24 hours or more have passed, delete the timer entry and run the command logic
        if (timer[message.guild.id]) {
          delete timer[message.guild.id][message.author.id];
        }
        // ...
      }
    }
  }

  if (command === "crime") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    if (!crimeTimer[message.author.id]) {
      // If the user does not have a crimeTimer entry, create one
      crimeTimer[message.author.id] = Date.now();

      // Run command logic...
      // Calculate a random amount of money to win or lose
      const crimeAmount =
        Math.floor(Math.random() * (MAX_CRIME_AMOUNT - MIN_CRIME_AMOUNT + 1)) +
        MIN_CRIME_AMOUNT;

      // Update the user's balance based on the crime result
      storage[message.author.id].money += crimeAmount;
      save();

      // Construct a message to send to the user based on the result of the crime
      positive = [
        "You have successfully robbed a bank and gained",
        "You successfully asassinated the leader of a gang and won",
        "You became a crimelord and won",
      ];
      negative = [
        "You were caught robbing a bank and lost",
        "You were injured during a gang fight and lost",
        "You tried to steal from a gas station and lost",
        "You forgot to tie your shoes and you slipped and fell and lost",
      ];
      if (crimeAmount < 0) {
        const badMessage = randomNumFromInterval(0, negative.length - 1);
        const embed = new EmbedBuilder()
          .setColor("Red")
          .setTitle("Crime")
          .setAuthor({
            name: `${message.author.username}`,
            iconURL: `${message.author.displayAvatarURL()}`,
            url: `https://discord.com/users/${message.author.id}`,
          })
          .setDescription(
            `${
              negative[badMessage]
            } <:points:1102646967659659294> ${-crimeAmount}`
          )
          .setTimestamp();
        message.channel.send({ embeds: [embed] });
      } else {
        const goodMessage = randomNumFromInterval(0, positive.length - 1);
        const embed = new EmbedBuilder()
          .setColor("Green")
          .setTitle("Crime")
          .setAuthor({
            name: `${message.author.username}`,
            iconURL: `${message.author.displayAvatarURL()}`,
            url: `https://discord.com/users/${message.author.id}`,
          })
          .setDescription(
            `${positive[goodMessage]} <:points:1102646967659659294> ${crimeAmount}`
          )
          .setTimestamp();
        message.channel.send({ embeds: [embed] });
      }

      // Set the crimeTimer to expire in 10 minutes
      setTimeout(() => {
        delete crimeTimer[message.author.id];
      }, cooldownTimes.command2);
    } else {
      // If the user has a crimeTimer entry, check how much time has passed since the last usage
      let timeSinceLastUsage = Date.now() - crimeTimer[message.author.id];
      // If less than 10 minutes have passed, send a message saying the command is on cooldown
      if (timeSinceLastUsage < cooldownTimes.command2) {
        let timeRemaining =
          (cooldownTimes.command2 - timeSinceLastUsage) / 60000;
        const embed = new EmbedBuilder()
          .setColor("Green")
          .setDescription(
            `This command is on cooldown. Please wait ${timeRemaining.toFixed(
              0
            )} more minutes before trying again.`
          )
          .setTimestamp();
        message.channel.send({ embeds: [embed] });
      } else {
        // If 10 minutes or more have passed, delete the timer entry and run the command logic
        delete crimeTimer[message.author.id];
        // ...
      }
    }
  }

  if (command === "weekly") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    if (!weeklyTimer[message.author.id]) {
      // If the user does not have a crimeTimer entry, create one
      weeklyTimer[message.author.id] = Date.now();

      // Run command logic...
      const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setTitle("Weekly Collect")
        .setDescription(
          "You have now collected your weekly allowance of <:points:1102646967659659294> 750."
        )
        .setTimestamp();

      storage[message.author.id].money += 750;
      message.channel.send({ embeds: [embed] });
      save();
    } else {
      // If the user has a weeklyTimer entry, check how much time has passed since the last usage
      let timeSinceLastUsage = Date.now() - weeklyTimer[message.author.id];
      // If less than 10 minutes have passed, send a message saying the command is on cooldown
      if (timeSinceLastUsage < cooldownTimes.command3) {
        let timeRemaining =
          (cooldownTimes.command3 - timeSinceLastUsage) / 60000;
        const embed = new EmbedBuilder()
          .setColor("Green")
          .setDescription(
            `This command is on cooldown. Please come back later to collect your weekly allowance.`
          )
          .setTimestamp();
        message.channel.send({ embeds: [embed] });
      } else {
        // If 10 minutes or more have passed, delete the timer entry and run the command logic
        delete weeklyTimer[message.author.id];
        // ...
      }
    }
  }

  if (command === "monthly") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    const lastUsage = storage[message.author.id].lastMonthlyUsage || 0;
    const now = Date.now();
    const oneMonth = 30 * 24 * 60 * 60 * 1000; // Approximate one month in milliseconds

    if (now - lastUsage >= oneMonth) {
      // Run command logic...
      const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setTitle("Monthly Collect")
        .setDescription(
          "You have now collected your monthly allowance of <:points:1102646967659659294> 10000."
        )
        .setTimestamp();

      storage[message.author.id].money += 10000;
      storage[message.author.id].lastMonthlyUsage = now; // Update the last usage timestamp
      message.channel.send({ embeds: [embed] });
      save();
    } else {
      const timeRemaining = oneMonth - (now - lastUsage);
      const daysRemaining = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
      const hoursRemaining = Math.floor(
        (timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      );

      const embed = new EmbedBuilder()
        .setColor("Green")
        .setDescription(
          `This command is on cooldown. Please wait ${daysRemaining} day${
            daysRemaining > 1 ? "s" : ""
          } and ${hoursRemaining} hour${
            hoursRemaining > 1 ? "s" : ""
          } before trying again.`
        )
        .setTimestamp();
      message.channel.send({ embeds: [embed] });
    }
  }

  if (command === "balance" || command === "bal") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    const userID = args[0];

    if (!userID) {
      const totalMoney =
        storage[message.author.id].bank + storage[message.author.id].money;

      const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Balance")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setDescription(`Here is your current balance`)
        .addFields(
          {
            name: "**Bank**",
            value: `**<:points:1102646967659659294> ${
              commafy(storage[message.author.id].bank)
            }**`,
            inline: true,
          },
          {
            name: "**Cash**",
            value: `**<:points:1102646967659659294> ${
              commafy(storage[message.author.id].money)
            }**`,
            inline: true,
          },
          {
            name: "**Total**",
            value: `**<:points:1102646967659659294> ${commafy(totalMoney)}**`,
            inline: true,
          },
          {
            name: "**Solana**",
            value: `**<:points:1102646967659659294> ${
              commafy(storage[message.author.id].solana)
            }**`,
            inline: true,
          }
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
      return;
    }

    const targetUser =
      message.mentions.users.first() || client.users.cache.get(userID);

    if (!targetUser) {
      message.channel.send(
        "Please mention a user or provide their ID to check their balance."
      );
      return;
    }

    const targetMember = message.guild.members.cache.get(targetUser.id);
    if (
      !targetMember ||
      !storage[targetMember.id] ||
      !storage[targetMember.id].joined
    ) {
      message.channel.send("That user has not joined or does not exist.");
      return;
    }

    const targetStorage = storage[targetMember.id];
    const totalMoney = targetStorage.bank + targetStorage.money;

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Balance")
      .setAuthor({
        name: `${targetUser.username}`,
        iconURL: `${targetUser.displayAvatarURL()}`,
        url: `https://discord.com/users/${targetUser.id}`,
      })
      .setDescription(`Here is the balance for ${commafy(targetUser.username)}`)
      .addFields(
        {
          name: "**Bank**",
          value: `**<:points:1102646967659659294> ${commafy(targetStorage.bank)}**`,
          inline: true,
        },
        {
          name: "**Cash**",
          value: `**<:points:1102646967659659294> ${commafy(targetStorage.money)}**`,
          inline: true,
        },
        {
          name: "**Total**",
          value: `**<:points:1102646967659659294> ${commafy(totalMoney)}**`,
          inline: true,
        },
        {
          name: "**Solana**",
          value: `**<:points:1102646967659659294> ${
            commafy(targetStorage.solana)
          }**`,
          inline: true,
        }
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }

  if (command === "commands" || command === "help") {
    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Help")
      .setAuthor({
        name: `${message.author.username}`,
        iconURL: `${message.author.displayAvatarURL()}`,
        url: `https://discord.com/users/${message.author.id}`,
      })
      .setDescription(
        `These are the list of commands and the current prefix is \`${prefix}\`\n\n**ping**\nChecks to see if the bot is online\n\n**join**\nCreate an account\n\n**daily**\nAllows you to collect your daily income\n\n**crime**\nAllows you to commit a crime\n\n**weekly**\nAllows you to collect your weekly income\n\n**bal**\nChecks your current balance\n\n**work**\nCollect money for work\n\n**beg**\nBeg for money\n\n**stream**\nStream for some money\n\n**leaderboard**\nChecks what position you are on the leaderboard\n\n**with (amount)**\nWill withdraw a certain amount of money from your bank account to your cash amount\n\n**dep (amount)**\nWill deposit a certain amount of money from your cash account to your bank account\n\n**buy (amount)**\nWill allow you buy solana\n\n**sell (amount)**\nWill allow you to sell solana\n\n**cost**\nWill show the current cost of solana (updates every 5 minutes)\n\n**give**\nWill allow you to give a certain amount of money to someone\n\n**bet (amount) (heads or tails)**\nWill allow you to bet either heads or tails (the max bet is $10,000).`
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }

  if (command === "work") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    if (!fiveMinTimer[message.author.id]) {
      // If the user does not have a fiveMinTimer entry, create one
      fiveMinTimer[message.author.id] = Date.now();

      // Run command logic...
      const workMessages = [
        "You worked hard today and earned",
        "Your boss was impressed with your work and gave you a bonus of",
        "You worked overtime and earned an additional",
        "Your hard work and dedication have paid off with a salary increase of",
        "You worked as a construction worker and earned",
        "You worked as a waiter/waitress and earned",
        "You worked as a retail sales associate and earned",
        "You worked as a freelance writer and earned",
        "You worked as a software developer and earned",
        "You worked as a teacher and earned",
        "You worked as a plumber and earned",
        "You worked as a chef and earned",
        "You worked as a landscaper and earned",
        "You worked as a customer service representative and earned",
        "You worked as a delivery driver and earned",
        "You worked as a data analyst and earned",
        "You worked as a security guard and earned",
        "You worked as a marketing specialist and earned",
        "You worked as a hair stylist and earned",
        "You worked as a mechanic and earned",
        "You worked as a social media manager and earned",
        "You worked as a financial advisor and earned",
      ];

      const workAmount = randomNumFromInterval(50, 150);
      storage[message.author.id].money += workAmount;
      save();

      const randomMesssage = randomNumFromInterval(0, workMessages.length - 1);
      const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Work")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setDescription(
          `${workMessages[randomMesssage]} <:points:1102646967659659294> ${workAmount}`
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });

      // Set the fiveMinTimer to expire in 5 minutes
      setTimeout(() => {
        delete fiveMinTimer[message.author.id];
      }, cooldownTimes.command4);
    } else {
      // If the user has a fiveMinTimer entry, check how much time has passed since the last usage
      let timeSinceLastUsage = Date.now() - fiveMinTimer[message.author.id];
      // If less than 10 minutes have passed, send a message saying the command is on cooldown
      if (timeSinceLastUsage < cooldownTimes.command4) {
        let timeRemaining =
          (cooldownTimes.command4 - timeSinceLastUsage) / 60000;
        const embed = new EmbedBuilder()
          .setColor("Green")
          .setDescription(
            `This command is on cooldown. Please wait ${timeRemaining.toFixed(
              0
            )} more minutes before trying again.`
          )
          .setTimestamp();
        message.channel.send({ embeds: [embed] });
      } else {
        // If 10 minutes or more have passed, delete the timer entry and run the command logic
        delete fiveMinTimer[message.author.id];
        // ...
      }
    }
  }

  if (command === "beg") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    const begMoney = randomNumFromInterval(50, 150);
    storage[message.author.id].money += begMoney;
    save();

    if (!begTimer[message.author.id]) {
      // If the user does not have a begTimer entry, create one
      begTimer[message.author.id] = Date.now();

      // Run command logic...
      const begMessages = [
        "Mr. Beast comes along and because you watched some of his videos, he gives you",
        "You are facing a financial situation and someone gives you",
        "You try to raise money for a soup charity and gain",
        "Someone sees you and feels bad for you. They offer you",
        "You ask for money to start up a small business and someone offers you",
        "You walk around and find",
        "You tell a sob story to your friend and they give you",
      ];
      const messageIndex = randomNumFromInterval(0, begMessages.length - 1);

      const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setDescription(
          `${begMessages[messageIndex]} <:points:1102646967659659294> ${begMoney}`
        )
        .setTimestamp();
      message.channel.send({ embeds: [embed] });

      // Set the begTimer to expire in 5 minutes
      setTimeout(() => {
        delete begTimer[message.author.id];
      }, cooldownTimes.command4);
    } else {
      // If the user has a begTimer entry, check how much time has passed since the last usage
      let timeSinceLastUsage = Date.now() - begTimer[message.author.id];
      // If less than 10 minutes have passed, send a message saying the command is on cooldown
      if (timeSinceLastUsage < cooldownTimes.command4) {
        let timeRemaining =
          (cooldownTimes.command4 - timeSinceLastUsage) / 60000;
        const embed = new EmbedBuilder()
          .setColor("Green")
          .setTitle("Beg")
          .setDescription(
            `This command is on cooldown. Please wait ${timeRemaining.toFixed(
              0
            )} more minutes before trying again.`
          )
          .setTimestamp();
        message.channel.send({ embeds: [embed] });
      } else {
        // If 10 minutes or more have passed, delete the timer entry and run the command logic
        delete begTimer[message.author.id];
        // ...
      }
    }
  }

  if (command === "stream") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    if (!streamTimer[message.author.id]) {
      // If the user does not have a streamTimer entry, create one
      streamTimer[message.author.id] = Date.now();

      // Run command logic...
      const streamAmount = randomNumFromInterval(50, 150);
      storage[message.author.id].money += streamAmount;
      save();

      const streamerNames = [
        "JoeIsPro",
        "Classic Noah",
        "Bob",
        "LunaStreams",
        "GamingWithGrace",
        "PixelPlaytime",
        "StreamQueen",
        "TheStreamMachine",
        "PlayfulPanda",
        "TechTonic",
        "StreamSiren",
        "GamerGoddess",
        "CyberSapien",
        "DigitalDreamer",
        "GameGeek",
        "PixelPirate",
        "TheGamingGuru",
        "PixelPal",
        "TheStreamingSorcerer",
        "DigitalDynamo",
        "Mrrrrrr BEEEEASSTT from Ohio",
      ];
      const messageIndex = randomNumFromInterval(0, streamerNames.length - 1);
      const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setTitle("Stream")
        .setDescription(
          `${streamerNames[messageIndex]} just donated <:points:1102646967659659294> ${streamAmount} for streaming an awesome game`
        )
        .setTimestamp();
      message.channel.send({ embeds: [embed] });

      // Set the streamTimer to expire in 5 minutes
      setTimeout(() => {
        delete streamTimer[message.author.id];
      }, cooldownTimes.command4);
    } else {
      // If the user has a streamTimer entry, check how much time has passed since the last usage
      let timeSinceLastUsage = Date.now() - streamTimer[message.author.id];
      // If less than 10 minutes have passed, send a message saying the command is on cooldown
      if (timeSinceLastUsage < cooldownTimes.command4) {
        let timeRemaining =
          (cooldownTimes.command4 - timeSinceLastUsage) / 60000;
        const embed = new EmbedBuilder()
          .setColor("Green")
          .setDescription(
            `This command is on cooldown. Please wait ${timeRemaining.toFixed(
              0
            )} more minutes before trying again.`
          )
          .setTimestamp();
        message.channel.send({ embeds: [embed] });
      } else {
        // If 10 minutes or more have passed, delete the timer entry and run the command logic
        delete streamTimer[message.author.id];
        // ...
      }
    }
  }

  if (command === "leaderboard" || command === "lb") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    const guildMembers = message.guild.members.cache.filter((member) => {
      return storage[member.id] && storage[member.id].joined;
    });

    const leaderboard = guildMembers
      .sort((a, b) => {
        const totalAmountA = storage[a.id].money + storage[a.id].bank;
        const totalAmountB = storage[b.id].money + storage[b.id].bank;
        return totalAmountB - totalAmountA;
      })
      .first(10); // Get the top 10 members based on their total amount

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setAuthor({
        name: `${message.author.username}`,
        iconURL: `${message.author.displayAvatarURL()}`,
        url: `https://discord.com/users/${message.author.id}`,
      })
      .setTitle(`Leaderboard for ${message.guild.name}`)
      .setDescription(
        leaderboard
          .map(
            (member, index) =>
              `${index + 1}. ${
                member.user.username
              } - <:points:1102646967659659294> ${
                commafy(storage[member.id].money + storage[member.id].bank)
              }`
          )
          .join("\n")
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }

  if (command === "withdraw" || command === "with") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }
    const amount = args[0];

    if (!amount) {
      message.channel.send("Please specify the amount");
      return;
    }

    if (amount === "all") {
      storage[message.author.id].money += storage[message.author.id].bank;
      storage[message.author.id].bank = 0;

      const embed = new EmbedBuilder()
        .setTitle("Withdraw")
        .setColor("Green")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setDescription(
          `You have successfully withdrawn all your money to your cash account`
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } else {
      const amountNumber = parseInt(amount);

      if (isNaN(amountNumber) || amountNumber <= 0) {
        message.channel.send(
          "Please choose an actual number or a reasonable number"
        );
        return;
      }

      if (amountNumber > storage[message.author.id].bank) {
        message.channel.send(
          "This is more than you have in your bank account. Please try again..."
        );
        return;
      }

      storage[message.author.id].bank -= amountNumber;
      storage[message.author.id].money += amountNumber;

      const embed = new EmbedBuilder()
        .setTitle("Withdraw")
        .setColor("Green")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setDescription(
          `You have successfully withdrawn <:points:1102646967659659294> ${commafy(amountNumber)} out of your bank account`
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }

    save();
  }

  if (command === "deposit" || command === "dep") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }
    const amount = args[0];

    if (!amount) {
      message.channel.send("Please specify an amount");
      return;
    }

    if (amount === "all") {
      storage[message.author.id].bank += storage[message.author.id].money;
      storage[message.author.id].money = 0;

      const embed = new EmbedBuilder()
        .setTitle("Deposit")
        .setColor("Green")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setDescription(
          `You have successfully deposit all your money to your bank account`
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    } else {
      const amountNumber = parseInt(amount);

      if (isNaN(amountNumber) || amountNumber <= 0) {
        message.channel.send(
          "Please choose an actual number or a reasonable number"
        );
        return;
      }

      if (amountNumber > storage[message.author.id].money) {
        message.channel.send(
          "This is more than you have in your cash account. Please try again..."
        );
        return;
      }

      storage[message.author.id].money -= amountNumber;
      storage[message.author.id].bank += amountNumber;

      const embed = new EmbedBuilder()
        .setTitle("Deposit")
        .setColor("Green")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setDescription(
          `You have successfully deposited <:points:1102646967659659294> ${commafy(amountNumber)} `
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }

    save();
  }

  if (command === "add") {
    if (!storage[message.author.id].joined) {
      message.channel.send(`Lol nice try bud`);
      return;
    }

    if (message.author.id != JOE) {
      message.channel.send("Nice try bud. That's not gonna work here :)");
      return;
    } else {
      let recipientUser;
      const userId = args[0];
      const amount = parseInt(args[1]);

      if (message.mentions.users.size > 0) {
        recipientUser = message.mentions.users.first();
      } else if (userId && client.users.cache.has(userId)) {
        recipientUser = client.users.cache.get(userId);
      } else {
        message.channel.send("Please mention a user or provide their ID.");
        return;
      }

      // const member = client.members.cache.get(message.author.id);

      if (!storage[userId].joined) {
        message.channel.send(
          `Whoops! Looks like this user needs to join first! Tell them to use the \`${prefix}join\` command to join in and get started!`
        );
        return;
      }

      if (!userId) {
        message.channel.send("Please specify the id");
        return;
      }

      if (!amount) {
        message.channel.send("Please specify the amount");
        return;
      }

      storage[userId].money += amount;
      save();

      const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Added Money")
        .setDescription(
          `Added <:points:1102646967659659294> ${commafy(amount)} to ${recipientUser.username}'s bank account.`
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }
  }

  if (command === "remove") {
    if (!storage[message.author.id].joined) {
      message.channel.send(`Lol nice try bud. Not gonna happen :)`);
      return;
    }

    if (message.author.id != JOE) {
      message.channel.send("Nice try bud. That's not gonna happen here :)");
      return;
    } else {
      let recipientUser;
      const userId = args[0];
      const amount = parseInt(args[1]);

      if (message.mentions.users.size > 0) {
        recipientUser = message.mentions.users.first();
      } else if (userId && client.users.cache.has(userId)) {
        recipientUser = client.users.cache.get(userId);
      } else {
        message.channel.send("Please mention a user or provide their ID.");
        return;
      }

      // const member = client.members.cache.get(message.author.id);

      if (!storage[userId].joined) {
        message.channel.send(
          `Whoops! Looks like this user needs to join first! Tell them to use the \`${prefix}join\` command to join in and get started!`
        );
        return;
      }

      if (!userId) {
        message.channel.send("Please specify the id");
        return;
      }

      if (!amount) {
        message.channel.send("Please specify the amount");
        return;
      }

      storage[userId].money -= amount;
      save();

      const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Removed Money")
        .setDescription(
          `Removed <:points:1102646967659659294> ${commafy(amount)} to ${recipientUser.username}'s bank account.`
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }
  }

  if (command === "buy") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    let numSolana = parseInt(args[0]);

    if (args[0] === "all") {
      numSolana = Math.floor(storage[message.author.id].money / costOfSolana);
    }

    if (!numSolana) {
      message.channel.send(
        'Please specify "all" or the amount of Solana you want to buy'
      );
      return;
    }

    if (isNaN(numSolana) || numSolana < 1) {
      message.channel.send(
        'Please choose an actual number, a reasonable number, or "all"'
      );
      return;
    }

    if (storage[message.author.id].money < costOfSolana * numSolana) {
      message.channel.send(
        "You do not have enough money to buy that amount of Solana. Maybe try `$buy all`"
      );
      return;
    }

    storage[message.author.id].money -= costOfSolana * numSolana;
    storage[message.author.id].solana += numSolana;
    save();

    if (args[0] === "all") {
      let embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Buy")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setDescription(
          `You have successfully bought all the Solana you can afford.`
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
      return;
    }

    let embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Buy")
      .setAuthor({
        name: `${message.author.username}`,
        iconURL: `${message.author.displayAvatarURL()}`,
        url: `https://discord.com/users/${message.author.id}`,
      })
      .setDescription(
        `You have successfully bought ${commafy(numSolana)} Solana for <:points:1102646967659659294> ${
          costOfSolana * numSolana
        }`
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }

  if (command === "sell") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    let sellNumSolana = parseInt(args[0]);

    if (args[0] === "all") {
      sellNumSolana = storage[message.author.id].solana;
    }

    if (!sellNumSolana && args[0] != "all") {
      message.channel.send(
        'Please specify "all" or the amount of Solana you want to sell'
      );
      return;
    } else if (!sellNumSolana) {
      message.channel.send("You do not have any Solana to sell");
      return;
    }

    if (isNaN(sellNumSolana) || sellNumSolana < 1) {
      message.channel.send(
        'Please choose an actual number, a reasonable number, or "all"'
      );
      return;
    }

    if (storage[message.author.id].solana < sellNumSolana) {
      message.channel.send(
        "You do not have enough Solana to sell that amount. Maybe try `$sell all`"
      );
      return;
    }

    storage[message.author.id].money += costOfSolana * sellNumSolana;
    storage[message.author.id].solana -= sellNumSolana;
    save();

    if (args[0] === "all") {
      let embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Sell")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setDescription(
          `You have sold all of your Solana for <:points:1102646967659659294> ${
            commafy(costOfSolana * sellNumSolana)
          }`
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });

      return;
    }

    let embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Sell")
      .setAuthor({
        name: `${message.author.username}`,
        iconURL: `${message.author.displayAvatarURL()}`,
        url: `https://discord.com/users/${message.author.id}`,
      })
      .setDescription(
        `You have sold ${sellNumSolana} Solana for <:points:1102646967659659294> ${
          costOfSolana * sellNumSolana
        }`
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }

  if (command === "cost") {
    const embed = new EmbedBuilder()
      .setTitle("Cost of Solana")
      .setColor("Green")
      .setDescription(
        `The current cost of Solana is <:points:1102646967659659294> ${costOfSolana}`
      )
      .setAuthor({
        name: `${message.author.username}`,
        iconURL: `${message.author.displayAvatarURL()}`,
        url: `https://discord.com/users/${message.author.id}`,
      })
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }

  if (command === "give" || command === "donate") {
    let recipientUser;
    const userID = args[0];
    const amount = parseInt(args[1]);

    if (message.mentions.users.size > 0) {
      recipientUser = message.mentions.users.first();
    } else if (userID && client.users.cache.has(userID)) {
      recipientUser = client.users.cache.get(userID);
    } else {
      message.channel.send("Please mention a user or provide their ID.");
      return;
    }

    const recipientData = storage[recipientUser.id];
    const senderData = storage[message.author.id];

    if (!recipientData || !recipientData.joined) {
      message.channel.send(
        "The recipient has not joined yet, so you cannot give them any money."
      );
      return;
    }

    if (!amount || isNaN(amount) || amount <= 0) {
      message.channel.send("Please specify a valid amount to give.");
      return;
    }

    if (senderData.money < amount) {
      message.channel.send("You do not have enough money to give.");
      return;
    }

    recipientData.money += amount;
    senderData.money -= amount;
    save();

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Give money")
      .setAuthor({
        name: `${message.author.username}`,
        iconURL: `${message.author.displayAvatarURL()}`,
        url: `https://discord.com/users/${message.author.id}`,
      })
      .setDescription(
        `You have successfully given <:points:1102646967659659294> ${commafy(amount)} to ${recipientUser.username}.`
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }

  if (command === "bet") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    const coinFlip = Math.random() > 0.5 ? "heads" : "tails";

    const betAmount = parseInt(args[0]);
    const bet = args[1].toLowerCase();

    if (!betAmount || betAmount > 10000 || betAmount < 0) {
      return message.channel.send("You must put in a valid amount to bet");
    }

    if (!bet||!["heads","tails"].includes(bet)) {
      return message.channel.send("You must either bet heads or tails");
    }

    if (betAmount > storage[message.author.id].money) {
      return message.channel.send("You do not have that much money to bet");
    }

    storage[message.author.id].money -= betAmount;
    save();

    if (bet === coinFlip) {
      const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Win money")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setDescription(
          `Congrats! You bet ${bet} and the coin landed on ${coinFlip} so you won!`
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
      storage[message.author.id].money += betAmount * 2;
      save();
    } else {
      const embed = new EmbedBuilder()
        .setColor("Red")
        .setTitle("Lost money")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setDescription(
          `Oof. You bet ${bet} and the coin landed on ${coinFlip} so you lost your money. Better luck next time.`
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }
  }

  // if (command === "shop") {
  // }

  if (command === "backup" && storage[message.author.id].contributor) {
    backup();
    message.channel.send("Data succesfully backed up to `./backup.json`");
    return;
  }
});

client.login(TOKEN);
