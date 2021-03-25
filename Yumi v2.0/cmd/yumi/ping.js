const baseCmd = require('../../utils/structures/baseCmd');
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class ping extends baseCmd {
    constructor () {
        super('ping', 'system', ['pg'], 'Ping-Pong!', '.ping');
    }

    async run (bot, message, args) {
        const embed = new Discord.MessageEmbed()
	    	.setColor('GREEN')
	    	.setAuthor('Ping-Pong! 🏓')
	    	.setDescription(`${Date.now() - message.createdTimestamp}` + ' ms')
	    	.setTimestamp();
	    message.channel.send(embed);
    }
}