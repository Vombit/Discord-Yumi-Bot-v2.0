const baseCmd = require('../../utils/structures/baseCmd');
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class yumisay extends baseCmd {
    constructor () {
        super('yumisay', 'system', ['say'], 'Ask to write a bot', '.yumisay <message> || .yumisay #channel-name <message>');
    }

    async run (bot, message, args) {
        if(message.guild.region === 'russia') lang = rus;
        if(message.guild.region != 'russia') lang = eng;
    
        if(!message.member.hasPermission("MANAGE_MESSAGES" || "ADMINISTRATOR")) return message.channel.send(`${lang.permsuser}`);
    
        let mChan = message.mentions.channels.first();
        let argsresult;
        message.delete();
        if(!args[0]) return message.channel.send(`Input message`);
        if(mChan) {
            argsresult = args.slice(1).join(" ");
            mChan.send(argsresult)
        } else {
            argsresult = args.join(" ")
            message.channel.send(argsresult)
        }
    }
}