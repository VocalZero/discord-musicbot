const Discord = require("discord.js");
const client = new Discord.Client();

client.config = require('./config.json');
client.commands = new Map();
client.dispatchers = new Map();

const helpCommand = require('./commands/help');
client.commands.set('help', helpCommand);

const ready = require('./events/ready');
const message = require('./events/message');
client.on('ready', ready.bind(null, client));
client.on('message', message.bind(null, client));

client.login(client.config.token);