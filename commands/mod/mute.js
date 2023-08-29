module.exports = {
    name: "mute",
    description: "Allows you to temporarily timeout a member",
    userPermissions: ["ManageMembers"],
    options: [
        { name: "membre", description: "Member", required: true, type: 6 },
        { name: "durée", description: "Duration", required: true, type: 3 },
        { name: "raison", description: "Reason", required: false, type: 3 },
    ],

    async run(client, interaction) {
        const member = interaction.options.getMember("membre");
        if (!member) return interaction.reply({ content: "Invalid member", ephemeral: true });
        const reason = interaction.options.getString("raison") || "None";
        const duration = interaction.options.getString("durée");
        if (member.roles.highest.position >= interaction.member.roles.highest.position) return interaction.reply({ content: "You cannot temporarily exclude this user because he has several roles above you", ephemeral: true })
        member.timeout(require("ms")(duration), reason).then(() => {
            interaction.reply({ content: `${member} was timeout temporarily for ${reason} during ${duration}` })
        }).catch((e) => {
            interaction.reply({ content: "An error occurred while excluding", ephemeral: true })
        })
    }
}