module.exports = {
    name: "unhide",
    description: "Allows you to unhide a channel",
    userPermissions: ["ManageChannels"],
    options: [
        { name: "salon", description: "Channel", required: false, type: 7 },
    ],

    async run(client, interaction,) {
        const channel = interaction.options.getChannel("salon") || interaction.channel;
        if (!channel.manageable) return interaction.reply({ content: "I don't have the necessary permissions", ephemeral: true })
        channel.permissionOverwrites.edit(interaction.guild.roles.everyone, { ViewChannel: true }).then(() => {
            interaction.reply({ content: `${channel} was unhidden` })
        }).catch((e) => {
            interaction.reply({ content: "An error occurred while modifying permissions", ephemeral: true })
            console.log(e)
        })
    }
}