const baseCmd = require('../../utils/structures/baseCmd');
const StateManager = require("../../utils/StateManager");
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class report extends baseCmd {
    constructor () {
        super('report', 'manage', [], 'Report on user', '.report <@user> <reason>');
		this.connection = StateManager.connection;
    }

    async run (bot, message, args) {
        if(message.guild.region === 'russia') lang = rus;
        if(message.guild.region != 'russia') lang = eng;
    
        if(!args[0]) return message.channel.send(`${lang.selectUser}`).then(msg => {msg.delete({timeout:5000});});
        const rUser = message.guild.member(message.mentions.users.first() || message.guild.members.cache.get(args[0]));
        if(!rUser) return message.channel.send(`${lang.csear}`).then(msg => {msg.delete({timeout:5000});});
        const rreason = args.join(' ').slice(22);
        if(!rreason) return message.channel.send(`${lang.selectReason}`).then(msg => {msg.delete({timeout:5000});});
    
        const embed = new Discord.MessageEmbed()
            .setColor('#800080')
            .addField(`📕${lang.manage.rep.claimon}`, `${rUser} with ID: ${rUser.id}`)
            .addField(`📝${lang.manage.rep.claimfor}`, `${message.author} with ID: ${message.author.id}`)
            .addField(`📢${lang.manage.rep.clan}`, message.channel)
            .addField(`📄${lang.manage.reass}`, rreason);
    
        const okaydm = new Discord.MessageEmbed()
            .setColor('#800080')
            .addField(`${lang.manage.rep.plzwait}`, `${rUser.user.tag}`);
    


        const [rows] = await this.connection.execute(`select * from guildconfig where guildId = '${message.guild.id}'`);

        //const chans = base[message.guild.id].logsChannel;
        const rChannel = message.guild.channels.cache.find(c => c.id === rows[0].logChannelId);

        if(!rows[0].logChannelId || (rows[0].logChannelId === null)) {
            message.channel.send(`${lang.manage.rep.err}`);
            return;
        } else{rChannel.send(embed);message.channel.send(okaydm);}
    }
}