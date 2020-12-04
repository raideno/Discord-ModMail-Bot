const { MessageEmbed } = require('discord.js')

module.exports = (message, need, type) => {
  
  const embed = new MessageEmbed()
    .setColor('#36393F')
    .setDescription(`**You need the **${need}** ${type} for this command.**`)
  message.channel.send(embed)

}