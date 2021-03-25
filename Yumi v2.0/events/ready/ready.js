const baseEvent = require('../../utils/structures/baseEvent');
const StateManager = require('../../utils/StateManager');

const guildCmdPrefix = new Map();

module.exports = class ReadyEvent extends baseEvent {
    constructor () {
        super('ready');
        this.connection = StateManager.connection;
    }

    async run (bot) {
        console.log(`${bot.user.tag} Good!`);

	    bot.guilds.cache.forEach(guild => {
		    this.connection.query(
		    	`select cmdPrefix from GuildConfig where guildId = '${guild.id}'`
		    ).then(result => {
                const guildID = guild.id;
                const prefix = result[0][0].cmdPrefix;

		    	guildCmdPrefix.set(guildID, prefix);
                StateManager.emit('prefixFetched', guildID, prefix);
		    }).catch(err => console.log(err));
	    });

    }
}