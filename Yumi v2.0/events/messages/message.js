const StateManager = require("../../utils/StateManager");
const baseEvent = require("../../utils/structures/baseEvent");
const Discord = require('discord.js');
const guildCmdPrefix = new Map();

const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class MessageEvent extends baseEvent {
    constructor () {
        super('message');
        this.connection = StateManager.connection;
    }

    async run (bot, message) {
        const mai = message.author.id;
	    const username = message.author.username;
	    const aaddxp = Math.floor(Math.random() * 5) + 3;

	    // log_dm_mess
	    	if (message.channel.type === 'dm') {
			if(message.author.bot) return;
	    	};
	    // /log_dm_mess
	    if(message.author.bot) return;
        const prefix = guildCmdPrefix.get(message.guild.id);
		
		if(message.content.toLowerCase().startsWith('.prefix') && (prefix != '.')){message.channel.send(`Server prefix: \`\`${prefix}\`\`, Use: \`\`${prefix}help\`\``)}

		const messageArray = message.content.split(/ +/);
		const command = messageArray[0].toLowerCase();
		const args = messageArray.slice(1);
	
		if(!message.content.startsWith(prefix)) return;
		if (prefix) {
		const cmf = bot.commands.get(command.slice(prefix.length)) || bot.commands.get(bot.aliases.get(command.slice(prefix.length)));
		if(cmf) cmf.run(bot, message, args);
	}
    }
}

StateManager.on('prefixFetched', (guildID, prefix) => {
    guildCmdPrefix.set(guildID, prefix);
});
StateManager.on('prefixUpdate', (guildID, prefix) => {
    guildCmdPrefix.set(guildID, prefix);
});