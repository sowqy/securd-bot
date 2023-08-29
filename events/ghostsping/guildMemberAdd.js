module.exports = {
    name: "guildMemberAdd",

    async run(client, member) {
        const guildData = client.managers.guildManager.getOrCreate(member.guild.id);
        let guildDataFor = guildData.get("ghostpings") || []
        if (!guildDataFor || Object.keys(guildDataFor) == undefined) return;

        for (const channelId of Object.keys(guildDataFor)) {
            const channel = member.guild.channels.cache.get(channelId)
            if(!channel) return;
            channel?.send(`${member}`).then((m) => m.delete()).catch(e => { })
        }
    }
}