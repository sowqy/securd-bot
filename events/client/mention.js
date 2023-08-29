module.exports = {
    name: "messageCreate",

    async run(client, message) {
        if (message.author.bot) return;
        if (message.content.trim() === `<@${client.user.id}>`) {
            message.reply({
                content: `Use the prefix "/" followed by my commands to enhance security and protect your community.`,
            });
        }
    },
};
