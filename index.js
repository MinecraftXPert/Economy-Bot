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

const CLASSICNOAH = "592825756095348748";

const prefix = "!";
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

setInterval(updateSolana, 5 * 60 * 1000); // updates cost of solana every 5 minutes

function commafy(num) {
  num = num.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(num)) num = num.replace(pattern, "$1,$2");
  return num;
}

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

const jobs = [
  {
    title: "Street cleaner",
    description: "Sweep streets and collects trash",
    income: 100,
    level: 1,
    cooldown: 300000,
  },
  {
    title: "Cashier",
    description: "Handle transactions and assist customers.",
    income: 100,
    level: 1,
    cooldown: 300000,
  },
  {
    title: "Barista",
    description: "Prepare and serve coffee.",
    income: 100,
    level: 1,
    cooldown: 300000,
  },
  {
    title: "Retail Associate",
    description: "Assist customers and restock shelves.",
    income: 100,
    level: 1,
    cooldown: 300000,
  },
  {
    title: "Delivery Driver",
    description: "Deliver packages to customers.",
    income: 100,
    level: 1,
    cooldown: 300000,
  },
  {
    title: "Customer Service Representative",
    description: "Assist customers with inquiries.",
    income: 120,
    level: 2,
    cooldown: 330000,
  },
  {
    title: "Discord Mod",
    description: "Get fat and don't ever touch grass.",
    income: 120,
    level: 2,
    cooldown: 330000,
  },
  {
    title: "Administrative Assistant",
    description: "Perform clerical tasks and support office operations.",
    income: 150,
    level: 3,
    cooldown: 390000,
  },
  {
    title: "Sales Associate",
    description: "Promote products and achieve sales targets.",
    income: 150,
    level: 3,
    cooldown: 390000,
  },
  {
    title: "Warehouse Worker",
    description: "Handle inventory and pack orders.",
    income: 150,
    level: 3,
    cooldown: 390000,
  },
  {
    title: "Receptionist",
    description: "Greet visitors and manage front desk.",
    income: 150,
    level: 3,
    cooldown: 390000,
  },
  {
    title: "Data Entry Clerk",
    description: "Input and update data.",
    income: 175,
    level: 4,
    cooldown: 420000,
  },
  {
    title: "Security Guard",
    description: "Protect property and individuals.",
    income: 175,
    level: 4,
    cooldown: 420000,
  },
  {
    title: "Technical Support Specialist",
    description: "Provide technical assistance.",
    income: 175,
    level: 4,
    cooldown: 420000,
  },
  {
    title: "Marketing Coordinator",
    description: "Assist in marketing campaigns.",
    income: 200,
    level: 5,
    cooldown: 480000,
  },
  {
    title: "Software Developer",
    description: "Develop and maintain software.",
    income: 200,
    level: 5,
    cooldown: 480000,
  },
  {
    title: "Project Manager",
    description: "Oversee and manage projects.",
    income: 200,
    level: 5,
    cooldown: 480000,
  },
  {
    title: "Data Scientist",
    description: "Analyze and interpret data.",
    income: 200,
    level: 5,
    cooldown: 480000,
  },
  {
    title: "Lawyer",
    description: "Send ppl to jail.",
    income: 500,
    level: 6,
    cooldown: 1020000,
  },
  {
    title: "Doctor",
    description: "Fix ppl.",
    income: 500,
    level: 6,
    cooldown: 1020000,
  },
  {
    title: "CEO of Discord",
    description: "Make lots of money while not touching grass.",
    income: 1000,
    level: 7,
    cooldown: 1980000,
  },
];

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

  // COMMANDS

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
    storage[message.author.id].hasJob = false;
    storage[message.author.id].numJobsCanApply = 5;
    // here for filtering out the all the other jobs when someone tries to apply because obviously they're gonna be at level one when first joining
    storage[message.author.id].jobLevel = 1;

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
            value: `**<:points:1102646967659659294> ${commafy(
              storage[message.author.id].bank
            )}**`,
            inline: true,
          },
          {
            name: "**Cash**",
            value: `**<:points:1102646967659659294> ${commafy(
              storage[message.author.id].money
            )}**`,
            inline: true,
          },
          {
            name: "**Total**",
            value: `**<:points:1102646967659659294> ${commafy(totalMoney)}**`,
            inline: true,
          },
          {
            name: "**Solana**",
            value: `**<:points:1102646967659659294> ${commafy(
              storage[message.author.id].solana
            )}**`,
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
      .setDescription(`Here is the balance for ${targetUser.username}`)
      .addFields(
        {
          name: "**Bank**",
          value: `**<:points:1102646967659659294> ${commafy(
            targetStorage.bank
          )}**`,
          inline: true,
        },
        {
          name: "**Cash**",
          value: `**<:points:1102646967659659294> ${commafy(
            targetStorage.money
          )}**`,
          inline: true,
        },
        {
          name: "**Total**",
          value: `**<:points:1102646967659659294> ${commafy(totalMoney)}**`,
          inline: true,
        },
        {
          name: "**Solana**",
          value: `**<:points:1102646967659659294> ${commafy(
            targetStorage.solana
          )}**`,
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
        `These are the list of commands and the current prefix is \`${prefix}\`\n\n**ping**\nChecks to see if the bot is online\n\n**join**\nCreate an account\n\n**daily**\nAllows you to collect your daily income\n\n**crime**\nAllows you to commit a crime\n\n**weekly**\nAllows you to collect your weekly income\n\n**bal**\nChecks your current balance\n\n**beg**\nBeg for money if you're jobless\n\n**stream**\nStream for some money\n\n**leaderboard**\nChecks what position you are on the leaderboard\n\n**with (amount)**\nWill withdraw a certain amount of money from your bank account to your cash amount\n\n**dep (amount)**\nWill deposit a certain amount of money from your cash account to your bank account\n\n**buy (amount)**\nWill allow you buy solana\n\n**sell (amount)**\nWill allow you to sell solana\n\n**cost**\nWill show the current cost of solana (updates every 5 minutes)\n\n**give**\nWill allow you to give a certain amount of money to someone\n\n**apply**\nAllows you to apply for a job in which you can make more money the more you use the command\n\n**work**\n\nAllows you to work for your money\n**resign**\nResign from a job\n\n**list (optional: desc)**\nAllows you to see all the list of jobs that you can potentially have\n\n**job**\nSee what job you have now`
      )
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }

  if (command === "apply") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    if (storage[message.author.id].hasJob) {
      message.channel.send(
        `Looks like you already have a job as a ${
          storage[message.author.id].job
        }. If you would like a new job, please use the \`${prefix}resign\` command to resign your position and get a new job.`
      );
      return;
    }

    const jobPick = parseInt(args[0]);

    if (!jobPick) {
      // filters through the jobs at your level. For example, if your level is 2, then it'll show you levels 1 and 2 for the jobs array and so on
      let jobsList = jobs
        .filter((job) => job.level <= storage[message.author.id].jobLevel)
        .map((job, i) => {
          return {
            name: `${i + 1}) Title: ${job.title}`,
            value: `**Income:** <:points:1102646967659659294> \`${job.income}\``,
          };
        });

      const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setTitle("Job Application")
        .setDescription(
          `Here are the list of jobs available. If you're just starting out then you can only apply for certain jobs. Once you work more then you can get better jobs. Please choose which job you want to apply for by doing \`${prefix}apply (job number)\`. **For example, if you want to be a cashier, it would be \`${prefix}apply 2\`.**`
        )
        .addFields(jobsList)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
      return;
    } else {
      if (jobPick <= 0 || isNaN(jobPick)) {
        return message.channel.send("You must pick a valid job.");
      }
      if (jobPick > storage[message.author.id].numJobsCanApply) {
        return message.channel.send(
          "You can only apply for the jobs listed until you move up in the ranks."
        );
      }
      storage[message.author.id].job = jobs[jobPick - 1].title;
      storage[message.author.id].hasJob = true;
      storage[message.author.id].income = jobs[jobPick - 1].income;
      storage[message.author.id].workCoolDowns = jobs[jobPick - 1].cooldown;

      const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setTitle("Applied Success")
        .setDescription(
          `You have successfully applied for the job as a ${
            storage[message.author.id].job
          }! You will now have an income of <:points:1102646967659659294> ${
            storage[message.author.id].income
          } until you start moving up the ranks.`
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
      save();
      // placed down here so you can actually keep your progress
      if (storage[message.author.id].numTimesWorked > 0) {
        return;
      } else {
        storage[message.author.id].numTimesWorked = 0;
      }
    }
  }

  if (command === "resign") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    if (!storage[message.author.id].hasJob) {
      return message.channel.send(
        "You don't even have a job yet so why are you quitting lol?"
      );
    }

    storage[message.author.id].hasJob = false;
    delete storage[message.author.id].job;
    delete storage[message.author.id].income;
    const embed = new EmbedBuilder()
      .setColor("Red")
      .setAuthor({
        name: `${message.author.username}`,
        iconURL: `${message.author.displayAvatarURL()}`,
        url: `https://discord.com/users/${message.author.id}`,
      })
      .setTitle("Resign Success")
      .setDescription(`You have resigned your position.`)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
    save();
  }

  if (command === "work") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    if (!storage[message.author.id].hasJob) {
      return message.channel.send(
        `It looks you don't have a job so you can't use this command. Use the \`${prefix}apply\` command to get a job.`
      );
    }

    const lastUsage = storage[message.author.id].lastWorked || 0;
    const now = Date.now();

    const embed2 = new EmbedBuilder()
      .setColor("Green")
      .setTitle("Promotion")
      .setDescription(
        "Your boss was impressed and gave you a promotion! You can now apply for better jobs."
      )
      .setAuthor({
        name: `${message.author.username}`,
        iconURL: `${message.author.displayAvatarURL()}`,
        url: `https://discord.com/users/${message.author.id}`,
      })
      .setTimestamp();

    if (now - lastUsage >= storage[message.author.id].workCoolDowns) {
      const embed = new EmbedBuilder()
        .setColor("Green")
        .setTitle("Worked Shift")
        .setDescription(
          `You worked as a ${
            storage[message.author.id].job
          } and earned <:points:1102646967659659294> ${
            storage[message.author.id].income
          }`
        )
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setTimestamp();
      storage[message.author.id].numTimesWorked++;
      storage[message.author.id].money += storage[message.author.id].income;
      storage[message.author.id].lastWorked = now;
      save();
      message.channel.send({ embeds: [embed] });
      console.log(storage[message.author.id].numTimesWorked);
    } else {
      const timeRemaining =
        storage[message.author.id].workCoolDowns - (now - lastUsage);
      const daysRemaining = Math.floor(timeRemaining / (24 * 60 * 60 * 1000));
      const hoursRemaining = Math.floor(
        (timeRemaining % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000)
      );
      const minutesRemaining = Math.floor(
        (timeRemaining % (60 * 60 * 1000)) / (60 * 1000)
      );
      const secondsRemaining = Math.floor((timeRemaining % (60 * 1000)) / 1000);

      const embed3 = new EmbedBuilder()
        .setColor("Green")
        .setDescription(
          `This command is on cooldown. Please wait ${daysRemaining} day${
            daysRemaining !== 1 ? "s" : ""
          }, ${hoursRemaining} hour${
            hoursRemaining !== 1 ? "s" : ""
          }, ${minutesRemaining} minute${
            minutesRemaining !== 1 ? "s" : ""
          }, and ${secondsRemaining} second${
            secondsRemaining !== 1 ? "s" : ""
          } before trying again.`
        )
        .setTimestamp();
      message.channel.send({ embeds: [embed3] });
    }

    switch (storage[message.author.id].numTimesWorked) {
      case 20:
        message.channel.send({ embeds: [embed2] });
        storage[message.author.id].numJobsCanApply += 2;
        storage[message.author.id].jobLevel++;
        delete storage[message.author.id].lastWorked;
        save();
        break;
      case 50:
        message.channel.send({ embeds: [embed2] });
        storage[message.author.id].numJobsCanApply += 4;
        storage[message.author.id].jobLevel++;
        delete storage[message.author.id].lastWorked;
        save();
        break;
      case 80:
        message.channel.send({ embeds: [embed2] });
        storage[message.author.id].numJobsCanApply += 3;
        storage[message.author.id].jobLevel++;
        delete storage[message.author.id].lastWorked;
        save();
        break;
      case 140:
        message.channel.send({ embeds: [embed2] });
        storage[message.author.id].numJobsCanApply += 4;
        storage[message.author.id].jobLevel++;
        delete storage[message.author.id].lastWorked;
        save();
        break;
      case 200:
        message.channel.send({ embeds: [embed2] });
        storage[message.author.id].numJobsCanApply += 2;
        storage[message.author.id].jobLevel++;
        delete storage[message.author.id].lastWorked;
        save();
        break;
      case 300:
        message.channel.send({ embeds: [embed2] });
        storage[message.author.id].numJobsCanApply += 1;
        storage[message.author.id].jobLevel++;
        delete storage[message.author.id].lastWorked;
        save();
        break;
    }
  }

  if (command === "list") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    const arg1 = args[0];

    if (arg1 === "desc" || arg1 === "description") {
      let jobsDescriptions = jobs.map((job) => {
        return {
          name: `Title: ${job.title}`,
          value: `**Description:** ${job.description}`,
        };
      });

      const embed = new EmbedBuilder()
        .setColor("Green")
        .setAuthor({
          name: `${message.author.username}`,
          iconURL: `${message.author.displayAvatarURL()}`,
          url: `https://discord.com/users/${message.author.id}`,
        })
        .setTitle("Job Descriptions")
        .setDescription(
          `Here are the list of jobs available and the description. If you're just starting out then you can only apply for certain jobs. Once you work more then you can get better jobs.`
        )
        .addFields(jobsDescriptions)
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
      return;
    }

    let jobsList = jobs.map((job) => {
      return {
        name: `Title: ${job.title}`,
        value: `**Income:** <:points:1102646967659659294> \`${job.income}\``,
      };
    });

    const embed = new EmbedBuilder()
      .setColor("Green")
      .setAuthor({
        name: `${message.author.username}`,
        iconURL: `${message.author.displayAvatarURL()}`,
        url: `https://discord.com/users/${message.author.id}`,
      })
      .setTitle("Job list")
      .setDescription(
        `Here are the list of jobs available. If you're just starting out then you can only apply for certain jobs. Once you work more then you can get better jobs.`
      )
      .addFields(jobsList)
      .setTimestamp();

    message.channel.send({ embeds: [embed] });
  }

  if (command === "beg") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    if (storage[message.author.id].hasJob) {
      return message.channel.send(
        "Looks like you already have a job so you don't need to beg."
      );
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
              } - <:points:1102646967659659294> ${commafy(
                storage[member.id].money + storage[member.id].bank
              )}`
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
          `You have successfully withdrawn <:points:1102646967659659294> ${amountNumber} out of your bank account`
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
          `You have successfully deposited <:points:1102646967659659294> ${amountNumber} `
        )
        .setTimestamp();

      message.channel.send({ embeds: [embed] });
    }

    save();
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
        "You do not have enough money to buy that amount of Solana."
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
          `You have successfully bought all the Solana you can afford for $${costOfSolana} each`
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
        `You have successfully bought ${numSolana} Solana for <:points:1102646967659659294> ${commafy(
          costOfSolana * numSolana
        )}`
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
          `You have sold all of your Solana for <:points:1102646967659659294> ${commafy(
            costOfSolana * sellNumSolana
          )} at ${costOfSolana} each.`
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
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

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
        `You have successfully given <:points:1102646967659659294> ${amount} to ${recipientUser.username}.`
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
    const bet = args[1]?.toLowerCase();

    if (!betAmount) {
      return message.channel.send("You must put in an amount to bet.");
    }

    if (!betAmount || betAmount > 10000 || betAmount < 0) {
      return message.channel.send("You must put in a valid amount to bet");
    }

    if (!bet || !["heads", "tails"].includes(bet)) {
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

  if (command === "job") {
    if (!storage[message.author.id].joined) {
      message.channel.send(
        `Whoops! You need to join first! Use the \`${prefix}join\` command to join in and get started!`
      );
      return;
    }

    if (!storage[message.author.id].job) {
      return message.channel.send("You don't have a job right now");
    }

    message.channel.send(
      `Your current job is a ${storage[message.author.id].job}`
    );
  }

  if (command === "backup" && storage[message.author.id].contributor) {
    backup();
    message.channel.send("Data succesfully backed up to `./backup.json`");
    return;
  }

  if (command === "debug") {
    if (message.author.id !== CLASSICNOAH) {
      return message.channel.send("Sorry, but you can't use this command.");
    }

    const arg1 = args[0];
    const arg2 = args[1];

    if (arg1 === "work") {
      message.channel.send(
        "This user has used the $work commmand " +
          storage[arg2].numTimesWorked +
          " times"
      );
    }
  }
});

client.login(TOKEN);
