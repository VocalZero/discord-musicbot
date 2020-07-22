const { MessageEmbed } = require('discord.js');

exports.run = (client, message, args) => {
    const voiceChannel = message.member.voice.channel;

    if(message.member.guild.me.hasPermission("CONNECT") || message.member.guild.me.hasPermission("SPEAK")) {
        if(!message.member.hasPermission("ADMINISTRATOR")) {
            const embed = new MessageEmbed()
				.setColor('#eb4034')
				.setDescription("You can't use this command because the bot don't have the right permissions. 😖")
            return message.channel.send(embed);
        }

        if(!voiceChannel) {
            const embed = new MessageEmbed()
				.setColor('#eb4034')
                .setDescription('You are not in a voice channel. 😖')
			return message.channel.send(embed);
        }

        let start_stream;
        for(let stream of client.config.stream_list) {
            if(String(stream.name).toLowerCase() === String(args[0]).toLowerCase()) {
                start_stream = stream;
            }
        }

        if(!start_stream || start_stream === undefined) {
            const cmd = client.commands.get('list');
            return cmd.run(client, message, args);
        }

        voiceChannel.join().then(connection => {
            const dispatcher = connection.play(start_stream.url, {highWaterMark: 50});
            dispatcher.on('end', async (reason) => {
                console.log(`Dispatcher stopped playing on ${message.guild.name} (${message.guild.id})`);
                client.dispatchers.set(message.guild.id, undefined);
            });
            client.dispatchers.set(message.guild.id, dispatcher);
            console.log(`Dispatcher started playing on ${message.guild.name} (${message.guild.id})`);
            const embed = new MessageEmbed()
				.setColor('#26e320')
				.setDescription(`Playing now ${start_stream.name}. 🎶`)
			return message.channel.send(embed);
        });
    }
};