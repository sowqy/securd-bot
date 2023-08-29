module.exports = {
    name: "userUpdate",


    async run(client, oldUser, newUser) {
        if (oldUser.username === newUser.username) return;
        //
    }
}