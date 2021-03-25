const baseCmd = require('../../utils/structures/baseCmd');
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class invite extends baseCmd {
    constructor () {
        super('invite', 'system', ['inv'], 'Invite Yumi to a server', '.invite');
    }

    async run (bot, message, args) {
        if(message.guild.region === 'russia') lang = rus;
        if(message.guild.region != 'russia') lang = eng;
    
        const embed = new Discord.MessageEmbed()
            .setColor('#d60a4c')
            .setAuthor('Yumi Bot', bot.user.displayAvatarURL())
            .setTitle(`${lang.invYumi}`)
            .setURL('https://discordapp.com/oauth2/authorize?&client_id=643676300879331359&scope=bot&permissions=8');
        message.channel.send(embed);
    }
}