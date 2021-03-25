const baseCmd = require('../../utils/structures/baseCmd');
const StateManager = require("../../utils/StateManager");
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class softban extends baseCmd {
    constructor () {
        super('softban', 'system', ['sb'], 'Ban and unban (softban) user guilds', '.softban <@user>');
		this.connection = StateManager.connection;
    }

    async run (bot, message, args) {
        if(message.guild.region === 'russia') lang = rus;
        if(message.guild.region != 'russia') lang = eng;
    
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`${lang.permsuser}`);
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`${lang.permsbot}`);
    
        let us = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!us) return message.channel.send(`${lang.selectUser}`);
        if (us.hasPermission("ADMINISTRATOR")) return message.channel.send(`${lang.manage.ban.unban}.`);
    
            us.send(`${lang.manage.ban.usSend} **${message.guild.name}**, ${lang.manage.usReas}: softban.`).then(() =>
            message.guild.members.ban(us, {days: 1, reason: "softban"})).then(() => message.guild.members.unban(us.id, { reason: "softban"})).catch(err => console.log(err))

            const emsbed = new Discord.MessageEmbed()
                .setAuthor('Yumi Manage', bot.user.displayAvatarURL())
                .setDescription(`**${us.user.username}** ${lang.manage.ban.guilds}.`)
                .setColor('#d60a4c')
                .setTimestamp()
            message.channel.send(emsbed);

    
        let embed = new Discord.MessageEmbed()
            .setColor("#FF1111")
            .setAuthor(`Yumi Logs`, bot.user.displayAvatarURL)
            .addField(`${lang.manage.command}`, "softban")
            .addField(`${lang.manage.user}`, us.user.username)
            .addField(`${lang.manage.moder}`, message.author.username)
            .addField(`${lang.manage.reass}`, 'softban')
            .setTimestamp()
    
            
            const [rows] = await this.connection.execute(`select * from guildconfig where guildId = '${message.guild.id}'`);
            const rChannel = message.guild.channels.cache.find(c => c.id === rows[0].logChannelId);

            if(!rows[0].logChannelId) {return;}
            else if(rChannel === null) {return;}
            else{rChannel.send(embed);}
    }
}