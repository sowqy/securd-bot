const { CommandInteraction } = require('discord.js'),
    Securd = require('../../structures/Securd');

module.exports = {
    name: "about",
    description: "About the bot",

    /**
     * @param {Securd} client
     * @param {CommandInteraction} interaction
     */

    async run(client, interaction) {
        const djs = require("discord.js").version;
        const node = process.version;
        const users = client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)
        let embed = {
            title: `About Melvy`,
            fields: [
                { name: `${client.botemojis.owner} Teams`, value: `<@164074664614821888>, <@1113227651038060616>,`, inline: true },
                { name: `${client.botemojis.djs} Discord.js`, value: `\`${djs}\``, inline: true },
                { name: `${client.botemojis.node} Node.js`, value: `\`${node}\``, inline: true },
                { name: `${client.botemojis.stats} Servers`, value: `\`${client.guilds.cache.size + 2}\``, inline: true },
                { name: `${client.botemojis.user} Users`, value: `\`${users}\``, inline: true },
                { name: `${client.botemojis.ping} Ping`, value: `\`${client.ws.ping}ms\``, inline: true },
                { name: `${client.botemojis.support} Support`, value: `[Click here](https://discord.gg/)`, inline: true },
            ],
            color: process.env.COLOR,
            url: "https://discord.gg/",
            image: {
                url: "https://media.discordapp.net/attachments/1135597856598798417/1136308183862878228/image.png?width=1440&height=145"
            },
            footer: { iconURL: client.user.avatarURL(), text: "Melvy - Your Security, Our Priority" }
        }
        interaction.reply({ embeds: [embed], content: "", ephemeral: false })

    }
}