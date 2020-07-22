const Discord = require("discord.js");
const client = new Discord.Client();

client.config = require('./config.json');
client.commands = new Map();
client.dispatchers = new Map();
client.guildStreams = new Map();

const helpCommand = require('./commands/help');
const listCommand = require('./commands/list');
const playCommand = require('./commands/play');
const volumeCommand = require('./commands/volume');
const songCommand = require('./commands/song');
client.commands.set('help', helpCommand);
client.commands.set('list', listCommand);
client.commands.set('play', playCommand);
client.commands.set('volume', volumeCommand);
client.commands.set('song', songCommand);

const ready = require('./events/ready');
const message = require('./events/message');
client.on('ready', ready.bind(null, client));
client.on('message', message.bind(null, client));

client.login(client.config.token);