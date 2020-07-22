module.exports = async (client, message) => {
  if (message.guild === null || message.guild.id === null) {
    return;
  }
  if (message.author.bot) return;

  const prefix = client.config.prefix;
  const prefixMention = new RegExp(`^<@!?${client.user.id}>( |)$`);
  if (message.content.match(prefixMention)) {
    return;
  }

  if (message.content.indexOf(prefix) !== 0) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if (message.guild && !message.member) await message.guild.fetchMember(message.author);

  const cmd = client.commands.get(command);
  if (!cmd) return;

  cmd.run(client, message, args);
}