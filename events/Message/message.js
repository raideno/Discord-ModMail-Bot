const { PREFIX, DATA } = require('../../config');
const { MessageAttachment } = require('discord.js')

module.exports = async (client, message) => {

  if (message.author.bot) return;
  
  const stuff = await client.checkStuff(DATA.GUILDID, DATA.TICKETCATEGORY, DATA.STAFFROLEID, DATA.LOGCHANNELID)

  const Tickets = client.Tickets.get('Tickets');

  if (message.channel.type === 'dm') return client.emit("directMessage", message);

  if (message.channel.parentID === stuff.category.id && Array.from(Tickets.values()).includes(message.channel.id) && !message.content.startsWith(PREFIX)) {
    const UserChannel = Tickets.findKey(data => data === message.channel.id)
    if(message.channel.id !== Tickets.get(UserChannel)) return;
    const TicketOwner = message.guild.members.cache.get(UserChannel)
    if (message.attachments.size > 0) {
      const attachment = new MessageAttachment(message.attachments.first().url);
      try{TicketOwner.send(`**${message.author.tag}** : ${message.content}`, attachment)} catch{
        console.log(`[⛔] Error DM of the Member are Locked.`)
      };
    } else {
      try {TicketOwner.send(`**${message.author.tag}** : ${message.content}`)} catch{
        console.log(`[⛔] Error DM of the Member are Locked.`)
      };
    }
  }

  if (!message.content.startsWith(PREFIX)) return;

  const args = message.content.slice(PREFIX.length).split(/ +/);
  const commandName = args.shift().toLowerCase();

  const command = client.commands.get(commandName);
  if (!command) return; 

  if (command.help.isUserAdmin && !message.member.hasPermission('ADMINISTRATOR')) {
    return require('../../util/Other/perms')(message, need = 'Administrator', type = 'Permission')
  };

  if(command.help.isUserStaff && !message.member._roles.includes(DATA.STAFFROLEID)) {
    return require('../../util/Other/perms')(message, need = `<@&${DATA.STAFFROLEID}>`, type = 'Role')
  }

  command.run(client, message, args); 

}