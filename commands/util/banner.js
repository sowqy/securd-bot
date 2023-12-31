const Discord = require("discord.js")

module.exports = {
    name: "banner",
    description: "Allows to have the banner of a user",
    options: [
        {
            name: "user",
            description: "User",
            type: 6,
        },
    ],

    async run(client, interaction) {
        let user = interaction.options.getUser("user") || interaction.user;
        user = await client.users.fetch(user.id, { force: true });
        if (!user.banner)
            return interaction.reply({
                content: `${user} has no banner`,
                ephemeral: true,
            });
        let embed = {
            color: process.env.COLOR,
            image: {
                url: user.bannerURL({ animated: true, size: 1024, format: "png" }),
            },
        };
      
        interaction.reply({
            embeds: [embed],
            ephemeral: false,
        });
    },
};
