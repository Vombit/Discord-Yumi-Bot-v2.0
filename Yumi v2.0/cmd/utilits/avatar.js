const baseCmd = require('../../utils/structures/baseCmd');
const Discord = module.require('discord.js');

module.exports = class avatar extends baseCmd {
    constructor () {
        super('avatar', 'utilits', ['a', 'ava'], 'View user avatar', '.avatar <@user>');
    }

    async run (bot, message, args) {
        const user = message.mentions.users.first() || message.author;
	    const embed = new Discord.MessageEmbed()
		    .setColor('RANDOM')
		    .setDescription(user.tag)
		    .setImage(`${user.displayAvatarURL()}?size=2048`);
	    message.channel.send(embed);
    }
}