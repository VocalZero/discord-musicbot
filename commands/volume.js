const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    if (!message.member.hasPermission("ADMINISTRATOR")) {
        const embed = new MessageEmbed()
            .setColor('#eb4034')
            .setDescription("You can't use this command because you don't have permissions. 😖")
        return message.channel.send(embed);
    }
    if (!client.dispatchers.get(message.guild.id)) {
        const embed = new MessageEmbed()
            .setColor('#eb4034')
            .setDescription("You can't use this command because the bot is not playing. 😖")
        return message.channel.send(embed);
    }

    let volume = Number(args[0]);
    if (!volume || volume > 100 || volume < 0) {
        const embed = new MessageEmbed()
            .setColor('#eb4034')
            .setDescription('Usage: ' + String(`{prefix}volume <0-100>`).replace('{prefix}', client.config.prefix))
        return message.channel.send(embed);
    }
    client.dispatchers.get(message.guild.id).setVolume(volume / 100);
    const embed = new MessageEmbed()
        .setColor('#26e320')
        .setDescription(`Volume set to ${args[0]}. 🔉`)
    return message.channel.send(embed);
};