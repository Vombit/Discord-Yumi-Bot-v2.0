const baseCmd = require('../../utils/structures/baseCmd');
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class randomUser extends baseCmd {
    constructor () {
        super('randomuser', 'system', ['r', 'random'], 'Random user selection', '.random');
    }

    async run (bot, message, args) {
        if(message.guild.region === 'russia') lang = rus;
        if(message.guild.region != 'russia') lang = eng;
    
        const user = message.guild.members.cache.random();
        const random = new Discord.MessageEmbed()
            .setColor('#11FF00')
            .setDescription(`**${lang.manage.user}: ${user.user}**\n**ID ${lang.manage.userf}:**${user.id}`);
        message.channel.send(random);
    }
}