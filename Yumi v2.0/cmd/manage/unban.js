const baseCmd = require('../../utils/structures/baseCmd');
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class unban extends baseCmd {
    constructor () {
        super('unban', 'system', ['ub'], 'Unban user from guild', '.unban <id> <reason>');
    }

    async run (bot, message, args) {
        if(message.guild.region === 'russia') lang = rus;
        if(message.guild.region != 'russia') lang = eng;
    
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`${lang.permsuser}`);
        if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(`${lang.permsbot}`);


        let bannedMember = await bot.users.fetch(args[0]);
        if(!bannedMember) return message.channel.send(`${lang.manage.unban.unban}`)
    
        let reason = args.slice(1).join(" ");
        if (!reason) return message.channel.send(`${lang.selectReason}`);
    
        try {
            await message.guild.fetchBan(args[0])
        } catch(e){
            message.channel.send('This user is not banned.');
            return;
        }

        try{
            message.guild.members.unban(bannedMember, {reason: reason})

            const emsbed = new Discord.MessageEmbed()
                .setAuthor('Yumi Manage', bot.user.displayAvatarURL())
                .setDescription(`${bannedMember.tag} ${lang.manage.unban.guilds}`)
                .setColor('#d60a4c')
                .setTimestamp()
            message.channel.send(emsbed);

        } catch (err){
            console.log(e.message)
        }

        let embed = new Discord.MessageEmbed()
            .setColor("#FF1111")
            .setAuthor(`Yumi Logs`, bot.user.displayAvatarURL)
            .addField(`${lang.manage.command}`, "unban")
            .addField(`${lang.manage.user}`, us.user.username)
            .addField(`${lang.manage.moder}`, message.author.username)
            .addField(`${lang.manage.reass}`, reason)
            .setTimestamp()
    
        let chans = base[message.guild.id].logsChannel;
        let rChannel =message.guild.channels.find(c => c.name === chans)
        if(!base[message.guild.id].logsChannel) {return;}else if(rChannel === null){return;}else{rChannel.send(embed)}
    }
}