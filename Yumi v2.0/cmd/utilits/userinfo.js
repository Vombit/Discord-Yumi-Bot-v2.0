const baseCmd = require('../../utils/structures/baseCmd');
const StateManager = require("../../utils/StateManager");
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class userinfo extends baseCmd {
    constructor () {
        super('userinfo', 'utilits', ['ui'], 'User information', '.userinfo <@user>');
		this.connection = StateManager.connection;
    }

    async run (bot, message, args) {
        if(message.guild.region === 'russia') lang = rus;
        if(message.guild.region != 'russia') lang = eng;
    
        const a = message.mentions.users.first() || message.author;

        let prem;
        let days;
		const [rows] = await this.connection.execute(`select DATE_FORMAT(dateEnd, '%e %M %Y') from premiumusers where id = '${a.id}'`);
        if (rows < 1){
            prem = 'none';
            days = '0 days';
        } else {
            prem = (rows[0]['DATE_FORMAT(dateEnd, \'%e %M %Y\')'] );
            const [rows1] = await this.connection.execute(`SELECT DATEDIFF(dateEnd, Now()) from premiumusers where id = '${a.id}'`);
            days = `${(rows1[0]['DATEDIFF(dateEnd, Now())'] )} days`;
        }

        const embed = new Discord.MessageEmbed()
            .setDescription(`${lang.useri.info}`)
            .setColor('#10c7e2')
            .addField(`${lang.useri.name}`, a.username, true)
            .addField(`${lang.useri.discr}`, a.discriminator, true)
            .addField('ID', a.id, true)
            .addField(`Premium to:`, `${prem} \n \`\`(${days})\`\``, true)
            .setThumbnail(a.displayAvatarURL())
            .setTimestamp(new Date(a.createdAt))
            .setFooter(`${lang.useri.create}:`, a.displayAvatarURL())
    
        message.channel.send(embed);
    }
}