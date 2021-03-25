const path = require('path');
const fs = require('fs').promises;
const baseCmd = require('./structures/baseCmd');
const baseEvent = require('./structures/baseEvent');

async function registerCmd(bot, dir ='') {
    const filePath = path.join(__dirname, dir);
    //console.log(filePath);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) registerCmd(bot, path.join(dir, file));
        if (file.endsWith('.js')) {
            const Command = require(path.join(filePath, file));
            if (Command.prototype instanceof baseCmd) {
                const cmd = new Command();
                bot.commands.set(cmd.name, cmd);
            }
        }
    }
}

async function registerEvents(bot, dir ='') {
    const filePath = path.join(__dirname, dir);
    //console.log(filePath);
    const files = await fs.readdir(filePath);
    for (const file of files) {
        const stat = await fs.lstat(path.join(filePath, file));
        if (stat.isDirectory()) registerEvents(bot, path.join(dir, file));
        if (file.endsWith('.js')) {
            const Event = require(path.join(filePath, file));
            if (Event.prototype instanceof baseEvent) {
                const event = new Event();
                bot.on(event.name, event.run.bind(event, bot));
            }
        }
    }
}

module.exports = {registerCmd, registerEvents};