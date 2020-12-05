const { DATA } = require('../config')

module.exports = client => {

  client.FTOAfterRestart = async () => {
    const Tickets = client.Tickets.get('Tickets');
    const stuff = await client.checkStuff(DATA.GUILDID, DATA.TICKETCATEGORY, DATA.STAFFROLEID, DATA.LOGCHANNELID);
    if(stuff.category.children.size <= 0) return;
    const channels = stuff.guild.channels.cache;
    let num = 0;
    await channels.forEach(c => {
      if(c.parentID !== stuff.category.id || Array.from(Tickets.values()).includes(c.id) || Tickets.has(c.name)) return;
      const user = stuff.guild.members.cache.get(c.name);
      if(user) {
        Tickets.set(c.name, c.id)
        num = num+1
      }
    })
    console.log('[✅] I Synchronized', num, 'Ticket(s)')
  }

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