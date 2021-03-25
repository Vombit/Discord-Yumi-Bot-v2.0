const baseCmd = require('../../utils/structures/baseCmd');
const StateManager = require("../../utils/StateManager");
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class pay extends baseCmd {
    constructor () {
        super('pay', 'system', ['donate'], 'Pay for user', '.pay <@user> <count>');
		this.connection = StateManager.connection;
    }

    async run (bot, message, args) {
        if(message.guild.region === 'russia') lang = rus;
        if(message.guild.region != 'russia') lang = eng;
    
        if (isNaN(args[1])) {
            message.channel.send(`choose user`).then(msg => {msg.delete({timeout:5000});}); //${lang.pay.err}
            return;
        }
        const pUser = message.mentions.users.first() || message.guild.members.get(args[0]);
    
        const embed = new Discord.MessageEmbed()
            .setAuthor('Yumi Pay', bot.user.displayAvatarURL())
            .setDescription(`${lang.pay.vb}.`)
            .setColor('#d60a4c')
            .setTimestamp()

        if(pUser.bot) return message.channel.send(embed);

		const [rows] = await this.connection.execute(`select coins from users where id = '${pUser.id}'`);
        const [rows1] = await this.connection.execute(`select coins from users where id = '${message.author.id}'`);

        if(rows1[0].coins < args[1]) return message.reply(`${lang.pay.ncoins}`);
        await this.connection.query(`update users set coins=${rows[0].coins + parseInt(args[1])} where id = '${pUser.id}'`);
        await this.connection.query(`update users set coins=${rows1[0].coins - parseInt(args[1])} where id = '${message.author.id}'`);

    
        const Sembed = new Discord.MessageEmbed()
            .setAuthor('Yumi Pay', bot.user.displayAvatarURL())
            .setDescription(`${message.author} ${lang.pay.gv} ${pUser} ${args[1]} 💸.`)
            .setColor('#d60a4c')
            .setTimestamp()

        message.channel.send(Sembed);

    }
}