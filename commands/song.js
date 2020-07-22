const { MessageEmbed } = require('discord.js');
const icy = require('icy');
const request = require('request');

exports.run = (client, message, args) => {
    if (!client.dispatchers.get(message.guild.id)) {
        const embed = new MessageEmbed()
            .setColor('#eb4034')
            .setDescription("You can't use this command because the bot is not playing. 😖")
        return message.channel.send(embed);
    }
    var stream = client.guildStreams.get(message.guild.id);

    icy.get(stream.url, function (res) {
        res.on('metadata', function (metadata) {
            let title = icy.parse(metadata).StreamTitle;
            let splitedTitle = String(title).split('-');
            request('https://itunes.apple.com/search?term=' + encodeURIComponent(title) + '&media=music&limit=1', {}, (err, response, body) => {
                if (err) {
                    return;
                }
                const data = JSON.parse(body);
                if (data.resultCount == 0) {
                    return;
                }
                const embed = new MessageEmbed()
                    .setColor('#eb4034')
                    .setDescription(`**${splitedTitle[0]}**\n${splitedTitle[1]}`)
                    .setThumbnail(data.results[0].artworkUrl60)
                return message.channel.send(embed);
            });
        });
    });

};