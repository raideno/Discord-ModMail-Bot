const { Collection } = require("discord.js");
const { DATA } = require('../../config')

module.exports = async client => {

  await require('../../util/functions')(client)

  if (!client.Tickets.has('Tickets')) { client.Tickets.set('Tickets', new Collection()) }

  console.log(`[✅] Loged In As ${client.user.tag}`);
  
  await client.checkStuff(DATA.GUILDID, DATA.TICKETCATEGORY, DATA.STAFFROLEID, DATA.LOGCHANNELID)
  await client.FTOAfterRestart()

  if(client.guilds.cache.size > 1) {
    client.guilds.cache.forEach(g => {
      if(g.id !== DATA.GUILDID) {
        console.log(`[➡️ ] I Kicked my self from ${g.name}(${g.id})`)
        g.leave()
      }
    });
  }

  client.user.setPresence({ activity: { name: 'Dm For Help!', type: 'WATCHING'}, status: 'online' })

}