module.exports = (client, channel) => {

  const Tickets = client.Tickets.get('Tickets');

  if(!Array.from(Tickets.values()).includes(channel.id)) return;

  const TicketOwner = channel.guild.members.cache.get(Tickets.findKey(data => data === channel.id))

  Tickets.delete(TicketOwner.id)

  TicketOwner.send('Your __Ticket__ has been closed.')
}