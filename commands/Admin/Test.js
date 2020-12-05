module.exports.run = (client, message) => {

  const Tickets = client.Tickets.get('Tickets');

  console.log(Tickets);

}

module.exports.help = {
  name: "test",
  isUserAdmin: false,
  isUserStaff: true,
}