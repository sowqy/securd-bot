const map = new Map();

module.exports = {
  name: "messageCreate",

  async run(client, message) {
    if (message.author.id === client.user.id) return;
    const channel = message.channel;
    if (!message.channel.tempMessages)
      message.channel.tempMessages = []

    if (!channel || !channel.guild) return;
    const guildManager = client.managers.guildManager.getOrCreate(message.guild?.id);
    const config = guildManager.get("automod")?.antispam;
    if (!config || !config?.toggle) return;
    let userdata = map.get(message.author.id) || 0;
    let bypass = false;
    if (message.author.id === client.user.id) return;
    if (message.author.id === message.guild.ownerId) bypass = true;
    if ((guildManager.get("crowns") || []).includes(message.author.id)) bypass = true;
    if (bypass) return;
    map.set(message.author.id, userdata + 1);
    message.channel.tempMessages.push(message.id);

    if (userdata > 6) {
      config.actions?.forEach(action => {


        if (action === "reply") message.channel.send(`${message.author}, you are sending too many messages, please slow down.`).then((m) => setTimeout(() => m.delete(), 5000));
        if (action === "mute") {
          let duration = '10s'
          message.member.timeout(require("ms")(duration), "Securd - AntiSpam").then(() => {
          }).catch((e) => {
            console.log('error' + e)
          })
        }
      })
      if (message.channel.timeout || message.channel.tempMessages.length > 90) {
        clearTimeout(message.channel.timeout)
        message.channel.timeout = null
      }
      message.channel.timeout = setTimeout(() => {
        message.channel.bulkDelete(message.channel.tempMessages)
        map.delete(message.author.id);
      })
    }

    setTimeout(() => {
      map.delete(message.author.id);
    }, 2500)


  }
}