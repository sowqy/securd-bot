const { ActionRowBuilder, ButtonBuilder, RoleSelectMenuBuilder, ChannelSelectMenuBuilder } = require("discord.js");

module.exports = {
    name: "captcha",
    description: "Configure the captcha",
    userPermissions: ["Administrator"],

    async run(client, interaction) {
        const guildManager = client.managers.guildManager.getOrCreate(interaction.guild.id);
        const config = guildManager.get("captcha") || { roles: undefined, toggle: undefined, channel: undefined }
        const message = await interaction.reply({ embeds: [embed()], components: [buttons()], fetchReply: true })

        function embed() {
            return {
                title: `Captcha`,
                color: process.env.COLOR,
                fields: [
                    { name: `Salon`, value: config.channel ? `<#${config.channel}>` : "```❌```", inline: false },
                    { name: `Roles`, value: config.roles?.map((r) => `<@&${r}>`).join(", ") || "```❌```", inline: false },
                ]
            }
        }
        function update() {
            interaction.editReply({ embeds: [embed()], components: [buttons()] })
            guildManager.set("captcha", config).save()
        }
        function buttons() {
            return new ActionRowBuilder()
                .setComponents(
                    new ButtonBuilder({ emoji: "<:channel:1107049196323876935> ", custom_id: "channel", style: 2 }),
                    new ButtonBuilder({ emoji: "<:role:1107049194528710666>", custom_id: "role", style: 2 }),
                    new ButtonBuilder({ emoji: config.toggle ? "<:no:1107240009746096138> " : "<:check_mark:1107239970231550014>", style: config.toggle ? 4 : 3, custom_id: "toggle" })
                )
        }

        const collector = message.createMessageComponentCollector({
            filter: (i) => i.user.id === interaction.user.id,
            time: 300000
        })
        collector.on("collect", async (collected) => {
            const value = collected.customId
            if (value === "channel") {
                const menu = new ActionRowBuilder().setComponents(
                    new ChannelSelectMenuBuilder({ customId: "channel-menu", channelTypes: [0, 5], placeholder: "Melvy" })
                )
                const reply = await collected.reply({ components: [menu], fetchReply: true })
                reply.createMessageComponentCollector({ filter: (i) => i.user.id === interaction.user.id, time: 120000, max: 1 }).on("collect", async (response) => {
                    const channel = response.values[0];
                    if (!channel) return response.reply({ content: "Invalid channel", ephemeral: true });
                    response.deferUpdate();
                    config.channel = channel;
                    collected.deleteReply();
                    update();
                })

            } else if (value === "toggle") {
                collected.deferUpdate();
                config.toggle = config.toggle ? false : true;
                update()
            } else if (value === "role") {
                const row = new ActionRowBuilder().setComponents(
                    new RoleSelectMenuBuilder()
                        .setPlaceholder("Melvy")
                        .setCustomId("roles")
                )
                const button = new ActionRowBuilder().setComponents(
                    new ButtonBuilder({ emoji: { id: client.util.getEmojiId(client.botemojis.yes) }, style: 3, custom_id: "ok" })
                )
                const reply = await collected.reply({ content: "Please select one or more role(s)", components: [row, button], fetchReply: true })
                const roles = [];
                reply.createMessageComponentCollector({
                    filter: (i) => i.user.id === interaction.user.id,
                    time: 120000
                }).on("collect", async (response) => {
                    const v = response.customId;
                    if (v === "roles") {
                        const role = response.roles.first();
                        if (role.managed) return response.reply({ content: "Invalid role", ephemeral: true });
                        if (!client.util.roleManageable(interaction.member, role, interaction.guild.ownerId)) return response.reply({ content: "You can't manage this role", ephemeral: true });
                        response.deferUpdate();
                        roles.push(role.id);
                        response.message.edit({ content: `Please select one or more role(s)\n${roles.map((role) => `<@&${role}>`).join(" ,") || ""}`, components: [row, button], fetchReply: true })
                    } else if (v === "ok") {
                        config.roles = roles;
                        collected.deleteReply();
                        update();
                    }
                })
            }
        })
    }
}