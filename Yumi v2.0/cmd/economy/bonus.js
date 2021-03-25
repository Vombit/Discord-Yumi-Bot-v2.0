const baseCmd = require('../../utils/structures/baseCmd');
const StateManager = require("../../utils/StateManager");
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;
const timely = new Set();
const timelyhours = 6;

module.exports = class bonus extends baseCmd {
    constructor () {
        super('bonus', 'system', ['b', 'bon'], 'Get a bonus', '.bonus');
		this.connection = StateManager.connection;
    }

    async run (bot, message, args) {
        if(message.guild.region === 'russia') lang = rus;
        if(message.guild.region != 'russia') lang = eng;
    
        const avauser = message.author.avatarURL();
    
        if(timely.has(message.author.id)) {
            const embedtimely = new Discord.MessageEmbed()
                .setColor('RANDOM')
                .setFooter(`${message.author.username}`, avauser)
                .setDescription(`${lang.bonus.kd} - ${timelyhours} ${lang.bonus.hrs}.`, `\u200b`);
            message.delete();
            message.channel.send(embedtimely);
            return;
        }
        timely.add(message.author.id);
        
		const [rows] = await this.connection.execute(`select * from users where id = '${message.author.id}'`);
		await this.connection.query(`update users set coins=${rows[0].coins+200} where id = '${message.author.id}'`);
        const embed = new Discord.MessageEmbed()
            .setColor('RANDOM')
            .setFooter(`${lang.bonus.bns} ${message.author.username}`, avauser)
            .addField(`${lang.bonus.cool}`, `${lang.bonus.take} **200** coins\n ${lang.bonus.kd} - ${timelyhours} ${lang.bonus.hrs}.`);
        message.channel.send(embed);
        setTimeout(() => {
            timely.delete(message.author.id);
        }, timelyhours * 3600000);

    }
}