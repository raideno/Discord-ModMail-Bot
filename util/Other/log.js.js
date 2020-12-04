const { DATA } = require('../../config')
const { MessageEmbed } = require('discord.js')

module.exports = async (client, channel, ticketOwner, action, message) => {

  let stuff = await client.checkStuff(DATA.GUILDID, DATA.TICKETCATEGORY, DATA.STAFFROLEID, DATA.LOGCHANNELID)

  switch(action) {
    case 'open':
      const TicketOpen = new MessageEmbed() 
        .setColor('#66bb6a')
        .setDescription(`A Ticket has been opened by <@${ticketOwner.id}>**(${ticketOwner.id})**\nTicket channel : ${channel}`)
        .setTimestamp()
      stuff.logChannel.send(TicketOpen)
      break;
    case 'close':
      const TicketClose = new MessageEmbed() 
        .setColor('#ef5350')
        .setDescription(`A Ticket has been Closed by : <@${message.author.id}>**(${message.author.id})**\nTicket owner was : <@${ticketOwner.id}>**(${ticketOwner.id})**`)
        .setTimestamp()
      stuff.logChannel.send(TicketClose)
    break;
  }
  
}