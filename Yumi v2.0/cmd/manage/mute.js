const baseCmd = require('../../utils/structures/baseCmd');
const StateManager = require("../../utils/StateManager");
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class mute extends baseCmd {
    constructor () {
        super('mute', 'system', ['m'], 'Mute user from guild', '.mute <@user> <reason>');
		this.connection = StateManager.connection;
    }

    async run (bot, message, args) {
        if(message.guild.region === 'russia') lang = rus;
        if(message.guild.region != 'russia') lang = eng;
    
        if(!message.member.hasPermission('MANAGE_ROLES')) return message.channel.send(`${lang.permsuser}`);
        if(!message.guild.me.hasPermission('MANAGE_ROLES')) return message.channel.send(`${lang.permsbot}`);
    
        const us = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if (!us) return message.channel.send(`${lang.selectUser}`);
    
        const reason = args.slice(1).join(' ');
        if (!reason) return message.channel.send(`${lang.selectReason}`);
    
        let muterole = message.guild.roles.cache.find(r => r.name === 'Muted');
        if (!muterole) {
            muterole = await message.guild.roles.create({
                data: {
                    name: 'Muted',
                    color: 'BLACK',
                    permissions: []
                  }
            });
            message.guild.channels.cache.forEach(async (channel, id) => {
                await channel.createOverwrite(muterole, {
                    SEND_MESSAGES: false,
                    ADD_REACTIONS: false,
                    SEND_TTS_MESSAGES: false,
                    ATTACH_FILES: false,
                    CONNECT: false,
                    USE_VAD: false,
                    STREAM: false,
                    SPEAK: false
                });
            });
        }
        us.roles.add(muterole).then(() => {
            message.delete();
            us.send(`${lang.manage.mute.usmSend} ${message.guild.name}, ${lang.manage.usReas}: ${reason}.`);


            const emsbed = new Discord.MessageEmbed()
                .setAuthor('Yumi Manage', bot.user.displayAvatarURL())
                .setDescription(`${us.user.username} ${lang.manage.mute.guildsm}.`)
                .setColor('#d60a4c')
                .setTimestamp()
            message.channel.send(emsbed);
        });
    
        const embed = new Discord.MessageEmbed()
            .setColor('#FF1111')
            .setAuthor('Yumi Logs', bot.user.displayAvatarURL)
            .addField(`${lang.manage.command}`, 'mute')
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