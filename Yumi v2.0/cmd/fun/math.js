const baseCmd = require('../../utils/structures/baseCmd');
const StateManager = require("../../utils/StateManager");
const Discord = module.require('discord.js');
const rus = require('../../assets/language/ru.json');
const eng = require('../../assets/language/en.json');
let lang = eng;

module.exports = class math extends baseCmd {
    constructor () {
        super('math', 'system', [], 'For solving a mathematical expression you get ***coins***', '.math');
		this.connection = StateManager.connection;
    }

    async run (bot, message, args) {
        if(message.guild.region === 'russia') lang = rus;
        if(message.guild.region != 'russia') lang = eng;
        const [rows] =await this.connection.execute(`select * from users where id = '${message.author.id}'`);
    
        function random(low, high) {
            return Math.floor(Math.random() * (high + low + 1) - low);
        }
    
        const b = random(0, 100);
        const a = random(0, 100);
        const code = a + '+' + b;
        const code2 = (a + b);
    

        const embed = new Discord.MessageEmbed()
            .setAuthor('Yumi Pay', bot.user.displayAvatarURL())
            .setDescription(`\`\`${code} = ?\`\``)
            .setColor('#d60a4c')
        message.channel.send(embed);
        
        const collector = new Discord.MessageCollector(
            message.channel,
            (m) => m.author.id === message.author.id,
            { time: 15000, max: 1 }
        );
        collector.on('collect', (message) => {
    
            collector.stop();
            if (message.content == code2) {
                this.connection.query(`update users set coins=${rows[0].coins+10} where id = '${message.author.id}'`);

                const sembed = new Discord.MessageEmbed()
                    .setAuthor('Yumi Pay', bot.user.displayAvatarURL())
                    .setDescription(`${lang.math.get} **10** coins!`)
                    .setColor('#d60a4c')
                    .setTimestamp()
                message.channel.send(sembed);
            }
            else{
                const sembed = new Discord.MessageEmbed()
                    .setAuthor('Yumi Pay', bot.user.displayAvatarURL())
                    .setDescription(`${lang.math.try}`)
                    .setColor('#d60a4c')
                message.channel.send(sembed);
            }
            return;
        });
    }
}