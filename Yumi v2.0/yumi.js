require('dotenv').config();
const { Client } = require('discord.js');
const Discord = require('discord.js');
const bot = new Client();
const StateManager = require('./utils/StateManager');

const { registerCmd, registerEvents } = require('./utils/register');

(async () => {
	await registerEvents(bot, '../events');
	bot.commands = new Map();
	bot.aliases = new Map();
	await registerCmd(bot, '../cmd');

	await bot.login(process.env.BOT_TOKEN);
})();