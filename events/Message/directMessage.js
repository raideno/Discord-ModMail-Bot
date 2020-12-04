const { MessageAttachment } = require('discord.js')
const { DATA } = require("../../config");

module.exports = async (client, message) => {

  const Tickets = client.Tickets.get('Tickets');

  const stuff = await client.checkStuff(DATA.GUILDID, DATA.TICKETCATEGORY, DATA.STAFFROLEID, DATA.LOGCHANNELID)

  if(Tickets.has(message.author.id)) {
    const channel = stuff.guild.channels.cache.get(Tickets.get(message.author.id))
    if (message.attachments.size > 0) {
        const attachment = new MessageAttachment(message.attachments.first().url);
      channel.fetchWebhooks().then(wh => {
        wh.first().send(`${message.content}`,attachment)
      })
    } else {
      channel.fetchWebhooks().then(wh => {
      wh.first().send(`${message.content}`)
    })
    }
  } else {
    let channel = stuff.guild.channels.cache.find(channel => channel.name === message.author.id && channel.parentID === stuff.category.id);
    if(await !channel) {
      channel = await stuff.guild.channels.create(`${message.author.id}`, {type: 'text', 
        parent: stuff.category.id, 
        permissionOverwrites: [
          {id: stuff.role.id, allow: ["VIEW_CHANNEL", "READ_MESSAGE_HISTORY", "SEND_MESSAGES", "USE_EXTERNAL_EMOJIS", "ATTACH_FILES", "EMBED_LINKS", "ADD_REACTIONS"]},
        ]
      })
    }
    channel.createWebhook(message.author.username, {
      avatar: `https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.webp`,
      reason: `Ticket created by ${message.author.id}`
    }).then(w => {
      if (message.attachments.size > 0) {
        const attachment = new MessageAttachment(message.attachments.first().url);
        w.send(`${message.content}`,attachment)
      } else {
        w.send(`${message.content}`)
      }
    })
    Tickets.set(message.author.id, channel.id)
    require('../../util/Other/log.js')(client, channel, message.author, action = 'open')
  }
   
}