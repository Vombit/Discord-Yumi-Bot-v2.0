const baseEvent = require("../../utils/structures/baseEvent");
const StateManager = require("../../utils/StateManager");

module.exports = class GuildCreateEvent extends baseEvent {
    constructor () {
        super('guildCreate');
        this.connection = StateManager.connection;
    }

    async run (bot, guild) {
        const [rows] = await this.connection.execute(`select * from Guilds where guildId = '${guild.id}'`);
	    if (rows < 1){
		    try {
			    await this.connection.query(
			    	`INSERT INTO Guilds VALUES('${guild.id}', '${guild.ownerID}')`
			    );
			    await this.connection.query(
			    	`INSERT INTO GuildConfig (guildId) VALUES ('${guild.id}')`
			    );
		    } catch(err) {console.log(err)};
	    }
    }
}