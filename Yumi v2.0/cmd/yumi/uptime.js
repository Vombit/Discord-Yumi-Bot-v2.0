const baseCmd = require('../../utils/structures/baseCmd');
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class uptime extends baseCmd {
    constructor () {
        super('uptime', 'system', ['ut'], 'Working time Yumi', '.uptime');
    }

    async run (bot, message, args) {
        if(message.guild.region === 'russia') lang = rus;
        if(message.guild.region != 'russia') lang = eng;
        function duration(ms) {
            const sec = Math.floor((ms / (1000)) % 60).toString();
            const min = Math.floor((ms / (1000 * 60)) % 60).toString();
            const hrs = Math.floor((ms / (1000 * 60 * 60)) % 60).toString();
            const days = Math.floor((ms / (1000 * 60 * 60 * 24)) % 60).toString();
            return `${days.padStart(1, '0')} ${lang.uptime.days}, ${hrs.padStart(2, '0')} ${lang.uptime.hrs}, ${min.padStart(2, '0')} ${lang.uptime.min}, ${sec.padStart(2, '0')} ${lang.uptime.sec}`;
        }

        const embed = new Discord.MessageEmbed()
	    	.setColor('#d60a4c')
	    	.setAuthor('Yumi', bot.user.displayAvatarURL())
	    	.setDescription(`${lang.uptime.send}: ${duration(bot.uptime)}`)
	    	.setTimestamp();
	    message.channel.send(embed);
    }
}