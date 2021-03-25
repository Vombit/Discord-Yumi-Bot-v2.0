const baseCmd = require('../../utils/structures/baseCmd');
const StateManager = require("../../utils/StateManager");
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;
const timely = new Set();
const timelyhours = 24;

module.exports = class like extends baseCmd {
    constructor () {
        super('like', 'system', ['l'], 'Send a like to the user', '.like <@user>');
		this.connection = StateManager.connection;
    }

    async run (bot, message, args) {
        if(message.guild.region === 'russia') lang = rus;
        if(message.guild.region != 'russia') lang = eng;

    
        if(timely.has(message.author.id)) {
            const embedtimely = new Discord.MessageEmbed()
                .setTimestamp()
                .setColor('RED')
                .addField(`${lang.like.kd} ${timelyhours}${lang.like.hrs}.`);
            //message.delete();
            message.channel.send(embedtimely);
            return;
        }
        const user = message.mentions.users.first() || message.author;
    
        if(user.bot) return message.channel.send(`${lang.like.er}`);
        timely.add(message.author.id);
    
        const [rows] = await this.connection.execute(`select * from users where id = '${user.id}'`);
		await this.connection.query(`update users set rep=${rows[0].rep+1} where id = '${user.id}'`);
    
        const embed = new Discord.MessageEmbed()
            .setTimestamp()
            .setColor('GREEN')
            .addField(`${lang.like.cool}`, `${lang.like.send}: \`\`${user.username}\`\``);
        message.channel.send(embed);
        setTimeout(() => {
            timely.delete(message.author.id);
        }, timelyhours * 3600000);
    }
}