module.exports = class baseCmd {
    constructor (name, category, aliases, description, usage) {
        this.name = name;
        this.category = category;
        this.aliases = aliases;
        this.description = description;
        this.usage = usage;
    }
}