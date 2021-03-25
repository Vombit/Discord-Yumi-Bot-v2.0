const baseCmd = require('../../utils/structures/baseCmd');
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class poll extends baseCmd {
    constructor () {
        super('poll', 'fun', [], 'Create a poll', '.poll <question>');
    }

    async run (bot, message, args) {
        if(message.guild.region === 'russia') lang = rus;
        if(message.guild.region != 'russia') lang = eng;
    
        const botmessage = args.join(' ');
    
        message.delete().catch();
        if (!args[0]) return message.reply(`${lang.poll.quest}`);
    
        const embed = new Discord.MessageEmbed()
            .setColor('#FF1111')
            .setAuthor('Yumi Bot', bot.user.displayAvatarURL())
            .addField(`${lang.poll.send}:`, `${message.author}`)
            .addField(`${lang.poll.poll}:`, botmessage)
            .setTimestamp();
    
        const pollTopic = await message.channel.send(embed);
        pollTopic.react('⛔');
        pollTopic.react('✅');
    }
}