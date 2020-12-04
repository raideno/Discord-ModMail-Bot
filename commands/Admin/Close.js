const { MessageEmbed} = require('discord.js')

module.exports.run = (client, message) => {

  const Tickets = client.Tickets.get('Tickets');

  if(!Array.from(Tickets.values()).includes(message.channel.id)) {
    const embed = new MessageEmbed()
      .setColor('#36393F')
      .setDescription('This channel is not a ticket !')
    return message.channel.send(embed)
  }

  const TicketOwner = message.guild.members.cache.get(Tickets.findKey(data => data === message.channel.id))
  const Channel = message.guild.channels.cache.get(Tickets.get(TicketOwner.id));

  Tickets.delete(TicketOwner.id)
  Channel.delete();

  TicketOwner.send('Your __Ticket__ has been closed.')
  require('../../util/Other/log.js')(client, Channel, TicketOwner, action = 'close', message)

}

module.exports.help = {
  name: "close",
  category: 'informations',
  isUserAdmin: false,
  isUserStaff: true,
}