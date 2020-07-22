const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    const embed = new MessageEmbed()
        .setAuthor('Help', client.user.avatarURL)
        .setColor("#7289da")
        .setDescription('Simple Discord Musicbot written in discord.js v12.\nFell free to contribute if any features missing.\nhttps://github.com/VocalZero/discord-musicbot')
        .addField('Commands 🎶', String('`{prefix}play <name>` Starts playing music.\n`{prefix}volume <1-100>` Set the bot volume.\n`{prefix}help` Shows a list with all commands.\n`{prefix}list` Shows a list with all playable Webstreams.\n`{prefix}song` Shows the current playing song with cover.').split('{prefix}').join(client.config.prefix), true)
        .setFooter("🎶 discord-musicbot");
    return message.channel.send(embed);
};