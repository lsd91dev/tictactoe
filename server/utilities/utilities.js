const fs = require('fs');

// insert new room - write json file

const createRoom_jsonFile = (id, username, room) => {
    let data = require('../data/db.json');
    if (roomExists(room) == -1) {
        let users = [];
        let user = {
            id,
            username
        }
        users.push(user);
        let dataJson = {
            room,
            users
        }
        try {
            data.push(dataJson);
        } catch (error) {
            console.log('Initializing Data');
            data = [];
            data.push(dataJson);
        }
        fs.writeFile('./server/data/db.json', JSON.stringify(data), (err) => {
            if (err) console.log(err);
        });

        return user;
    } else {
        joinRoom_jsonFile(id, username, room);
    }

}

// insert user in an existent room - write json file

const joinRoom_jsonFile = (id, username, room) => {
    let data = require('../data/db.json');
    let result = data.findIndex(data => data.room === room);
    if (data[result].users.length < 2) {
        let user = {
            id,
            username,
        }
        data[result].users.push(user);
        fs.writeFile('./server/data/db.json', JSON.stringify(data), (err) => {
            if (err) console.log(err);
        });
        return { ok: true, user }
    } else {
        return {
            ok: false,
            errors: [{
                param: 'room',
                msg: 'Maximum people reached'
            }]
        }
    }
}

// remove user from room - write json file

const leftRoom_jsonFile = (id, room) => {
    const data = require('../data/db.json');
    console.log(room);
    console.log('id: ' + id);
    let result = roomExists(room);
    if (result == -1) {
        return {
            ok: false,
            errors: [{
                param: 'room',
                msg: `Room ${room} is not available`
            }]
        }
    } else {
        let userIndex = data[result].users.findIndex(obj => obj.id === id);
        if (userIndex == -1) {
            return {
                ok: false,
                error: `User ${id} couldn't been remove`
            }
        }
        data[result].users.splice(userIndex, 1);
        if (data[result].users.length === 0) {
            data.splice(result, 1);
        }
        fs.writeFile('./server/data/db.json', JSON.stringify(data), (err) => {
            if (err) console.log(err);
        });
    }
}


function roomExists(room) {
    const data = require('../data/db.json');
    return data.findIndex(data => data.room === room);
}

function createMessage(username, content) {
    let date = new Date();
    return {
        username: username,
        time: date.getHours() + ':' + date.getMinutes(),
        content: content
    }
}





module.exports = { createRoom_jsonFile, joinRoom_jsonFile, leftRoom_jsonFile, roomExists, createMessage }