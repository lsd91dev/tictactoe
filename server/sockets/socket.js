const { io } = require('../server');
const { leftRoom_jsonFile } = require('../utilities/utilities');

io.on('connection', (client) => {

    require('./room/sockets.room')(client);

    client.on('disconnect', () => {
        leftRoom_jsonFile(client.id, client.room);

        client.broadcast.to(client.room).emit('leftRoom', { username: client.username });
    });
});