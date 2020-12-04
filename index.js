const { TOKEN }= require('./config')
const { Client, Collection } = require('discord.js');
const { loadCommands, loadEvents } = require("./util/loader");

const client = new Client();

client.Tickets = new Map()
client.commands = new Collection();
[loadCommands, loadEvents].forEach(x => x(client))

client.login(TOKEN);
