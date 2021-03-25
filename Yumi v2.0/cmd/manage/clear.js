const baseCmd = require('../../utils/structures/baseCmd');
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class clear extends baseCmd {
    constructor () {
        super('clear', 'system', ['cl'], 'Delete X messages are newer than two weeks', '.clear <count>');
    }

    async run (bot, message, args) {
	if(message.guild.region === 'russia') lang = rus;
	if(message.guild.region != 'russia') lang = eng;

	let ag = args[0];
	if(!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(`${lang.permsuser}`);
	if(!message.guild.me.hasPermission('READ_MESSAGE_HISTORY' || 'MANAGE_MESSAGES')) return message.channel.send(`${lang.permsbot}`);
	if(!ag) return message.reply('Number of messages to delete.');
	if(ag > 200) return message.reply(`${lang.clear.max}`);
	if(ag < 1) return message.reply(`${lang.clear.sel}`);
	ag++;
	message.channel.bulkDelete(ag--).then(() => {

		const embed = new Discord.MessageEmbed()
            .setAuthor('Yumi Clear', bot.user.displayAvatarURL())
            .setDescription(`${lang.clear.cl} ${ag--} ${lang.clear.msg}.`)
            .setColor('#d60a4c')
            .setTimestamp()
        message.channel.send(embed).then(msg => msg.delete({timeout: 2 * 1000}));
	}).catch(error => {
		message.channel.send(`${lang.clear.err}`).then(msg => msg.delete({timeout: 5 * 1000}));
	});
    }
}