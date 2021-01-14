let { createRoom_jsonFile, createMessage } = require('../../utilities/utilities');
module.exports = (client) => {

    client.on('joinRoom', (user, callback) => {
        client.username = user.username;
        client.room = user.room;
        client.join(user.room);
        createRoom_jsonFile(client.id, client.username, client.room);
        client.broadcast.to(client.room).emit('joinedRoom', { username: client.username });
        callback();
    });

    client.on('sendMessage', (user, callback) => {
        let msg = createMessage(user.user.username, user.msg);
        client.broadcast.to(client.room).emit('recieveMessage', msg);
        callback(msg)
    })

    client.on('sendPlay', ({ username, play }, callback) => {
        client.broadcast.to(client.room).emit('recievePlay', { username, play });
        callback();
    });

    client.on('claimWinner', ({ username }, callback) => {
        client.broadcast.to(client.room).emit('winner', { username });
        callback();
    });
}