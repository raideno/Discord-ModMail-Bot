const { DATA } = require('../config')

module.exports = client => {

  client.checkStuff = (guildID, categoryID, roleID, logChannelID) => {
    const guild = client.guilds.cache.get(guildID);
    if(!guild) {
      console.log('[⛔] Invalid Guild ID. (Bot-Crashed)')
      return process.exit();
    }
    const category = guild.channels.cache.get(categoryID);
    if(!category || category.type !== 'category') {
      console.log('[⛔] Invalid Category ID. (Bot-Crashed)')
      return process.exit();
    }
    const role = guild.roles.cache.get(roleID);
    if(!role) {
      console.log('[⛔] Invalid Role ID. (Bot-Crashed)')
      return process.exit();
    }
    const logChannel = guild.channels.cache.get(logChannelID);
    if(!logChannel || logChannel.type !== 'text') {
      console.log('[⛔] Invalid Log-Channel ID. (Bot-Crashed)')
      return process.exit();
    }
    return {
      guild: guild,
      category:  category, 
      role: role, 
      logChannel: logChannel
    }
  }

}