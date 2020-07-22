module.exports = async (client) => {
  console.log(`${client.user.tag}, ready to serve ${client.users.cache.size} users.`);
  console.log(`Loading a total of ${client.commands.size} commands.`);
};
