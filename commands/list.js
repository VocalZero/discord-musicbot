const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    const embed = new MessageEmbed()
        .setAuthor('List', client.user.avatarURL)
        .setColor("#7289da")
        .setDescription('This list shows which streams can be played with this bot.')
        .setFooter("🎶 discord-musicbot");
    for (let stream of client.config.stream_list) {
        embed.addField(stream.name, stream.url);
    }
    return message.channel.send(embed);
};