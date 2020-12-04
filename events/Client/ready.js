const { Collection } = require("discord.js");
const { DATA } = require('../../config')

module.exports = async client => {

  await require('../../util/functions')(client)

  if (!client.Tickets.has('Tickets')) { client.Tickets.set('Tickets', new Collection()) }

  console.log(`[✅] Loged In As ${client.user.tag}`);
  
  await client.checkStuff(DATA.GUILDID, DATA.TICKETCATEGORY, DATA.STAFFROLEID, DATA.LOGCHANNELID)

  if(client.guilds.cache.size > 1) {
    client.guilds.cache.forEach(g => {
      if(g.id !== DATA.GUILDID) {
        console.log(`[➡️ ] I Kicked my self from ${g.name}(${g.id})`)
        g.leave()
      }
    });
  }

  let activities = ['Dm For Help !', 'https://discord.gg/vNgxY95Wet', /*'acti vity 3'*/ ], i = 0;

  setInterval(()=> {
    client.user.setPresence({ activity: { name: activities[i++ % activities.length], type: 'WATCHING'}, status: 'online' })
  }, 6000);

}