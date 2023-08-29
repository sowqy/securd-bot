const { CommandInteraction, chatInputApplicationCommandMention } = require("discord.js"),
    Securd = require("../../structures/Securd");

module.exports = {
    name: "help",
    description: "This is the help command",
    options: [
        { name: "command", description: "Information about an command", type: 3 },
    ],

    /**
     * @param {Securd} client
     * @param {CommandInteraction} interaction
     */

    async run(client, interaction) {
        const cmdstr = interaction.options
            .getString("command")
            ?.trim()
            ?.toLowerCase();
        if (cmdstr) {
            const command =
                client.commands.get(cmdstr) ||
                client.commands.find((cmd) => cmd.name.includes(cmdstr));
            if (!command)
                return interaction.reply({
                    content: `No command found for \`${cmdstr}\``,
                });
            const embed = {
                title: `Command ${command.name}`,
                fields: [
                    { name: `Name:`, value: `> \`${command.name}\`` },
                    {
                        name: `About:`,
                        value: `> \`${command.description}\``,
                    },
                ],
                footer: { text: "Melvy - Your Security", icon_ur: client.user.displayAvatarURL() },
                color: process.env.COLOR,
                image: {
                    url: "https://media.discordapp.net/attachments/1145855646953123843/1145860936524111942/922fdf659dd51b73ea217eecef0978cf.jpg"
                }
            };
            interaction.reply({ embeds: [embed], ephemeral: true });
        } else {
            const commands = await client.application.commands.fetch();
            function findByName(name) {
                return commands.find(command => command.name === name)
            }

            let embeds = {
                description: `» Melvy is designed to keep your servers secure and protect against threats. Trust Melvy to maintain the integrity of your online community.`,
                fields: [
                    { name: "<:MAdmin:1145869612395810846> Admin", value: `${chatInputApplicationCommandMention("antiraid", findByName("antiraid").id)}, ${chatInputApplicationCommandMention("automod", findByName("automod").id)}, ${chatInputApplicationCommandMention("captcha", findByName("captcha").id)}, ${chatInputApplicationCommandMention("autorole", findByName("autorole").id)}, ${chatInputApplicationCommandMention("permissions", findByName("permissions").id)}, ${chatInputApplicationCommandMention("crown", findByName("crown").id)}, ${chatInputApplicationCommandMention("badword", findByName("badword").id)}, ${chatInputApplicationCommandMention("tempvoc", findByName("tempvoc").id)}, ${chatInputApplicationCommandMention("ghostpings", findByName("ghostpings").id)}, ${chatInputApplicationCommandMention("counter", findByName("counter").id)}, ${chatInputApplicationCommandMention("soutien config", findByName("soutien").id)}, ${chatInputApplicationCommandMention("soutien list", findByName("soutien").id)}` },
                    { name: "<:MModeration:1145870046493691977> Moderation", value: `${chatInputApplicationCommandMention("ban", findByName("ban").id)}, ${chatInputApplicationCommandMention("kick", findByName("kick").id)}, ${chatInputApplicationCommandMention("mute", findByName("mute").id)}, ${chatInputApplicationCommandMention("lock", findByName("lock").id)}, ${chatInputApplicationCommandMention("unlock", findByName("unlock").id)}, ${chatInputApplicationCommandMention("clear", findByName("clear").id)}, ${chatInputApplicationCommandMention("hide", findByName("hide").id)}, ${chatInputApplicationCommandMention("unhide", findByName("unhide").id)},`},
                    { name: "<:MOther:1145870035680759848> Other", value: `${chatInputApplicationCommandMention("help", findByName("help").id)}, ${chatInputApplicationCommandMention("avatar", findByName("avatar").id)}, ${chatInputApplicationCommandMention("banner", findByName("banner").id)}, ${chatInputApplicationCommandMention("about", findByName("about").id)}` },
                ],
                color: process.env.COLOR,
                image: {
                    url: ""
                }
            }

            interaction.reply({ embeds: [embeds] })
        }
    }
}