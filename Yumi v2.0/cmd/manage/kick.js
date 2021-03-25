const baseCmd = require('../../utils/structures/baseCmd');
const StateManager = require("../../utils/StateManager");
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class kick extends baseCmd {
    constructor () {
        super('kick', 'system', ['k'], 'Kick out user from guild.', '.kick <@user> <reason>');
		this.connection = StateManager.connection;
    }

    async run (bot, message, args) {
        if(message.guild.region === 'russia') lang = rus;
        if(message.guild.region != 'russia') lang = eng;
    
        if(!message.member.hasPermission('KICK_MEMBERS')) return message.channel.send(`${lang.permsuser}`);
        if(!message.guild.me.hasPermission('KICK_MEMBERS')) return message.channel.send(`${lang.permsbot}`);
    
        const us = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!us) return message.channel.send(`${lang.selectUser}`);
        if (us.hasPermission('ADMINISTRATOR')) return message.channel.send(`${lang.manage.kick.unkick}`);
        const reason = args.slice(1).join(' ');
        if (!reason) return message.channel.send(`${lang.selectReason}`);
    
        us.send(`${lang.manage.kick.uskSend} ${message.guild.name}, ${lang.manage.usReas}: ${reason}`).then(() =>
            us.kick()).catch(err => console.log(err));
    
        const emsbed = new Discord.MessageEmbed()
            .setAuthor('Yumi Manage', bot.user.displayAvatarURL())
            .setDescription(`**${us.user.username}** ${lang.manage.kick.guilds}`)
            .setColor('#d60a4c')
            .setTimestamp()
        message.channel.send(emsbed);
    
        const embed = new Discord.MessageEmbed()
            .setColor('#FF1111')
            .setAuthor('Yumi Logs', bot.user.displayAvatarURL)
            .addField(`${lang.manage.command}`, 'kick')
            .addField(`${lang.manage.user}`, us.user.username)
            .addField(`${lang.manage.moder}`, message.author.username)
            .addField(`${lang.manage.reass}`, reason)
            .setTimestamp();
    
		const [rows] = await this.connection.execute(`select * from guildconfig where guildId = '${message.guild.id}'`);

        const rChannel = message.guild.channels.cache.find(c => c.id === rows[0].logChannelId);
        if(!rows[0].logChannelId) {return;}
        else if(rChannel === null) {return;}
        else{rChannel.send(embed);}
    }
}