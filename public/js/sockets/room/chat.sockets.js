const socket = io();

/* variables jquery */
let chat = $('#chatarea');
let panelHost = $('#panel-host');
let panelRival = $('#panel-rival');
let buttonChat = $('#sendMessage');


let user = getParamsURL();
socket.on('connect', function() {
    socket.emit('joinRoom', user, function(response) {});

    socket.on('alert', function(message) {
        console.log(message);
    });

    $('#chat').append('<p id="message-welcome">You have joined the room</p>');

});

socket.on('joinedRoom', function(response) {
    $('#chat').append(`<p id="message-welcome"> ${response.username} joined the room</p>`)
})

socket.on('recieveMessage', function(response) {
    $('#chat').append(`<div class="${(host ? 'message-rival' : 'message-host')} message-receiver"><small id="chat-username">${response.username}:</small><p id="message-content">${response.content}</p><small id="chat-time">${response.time}</small></div>`);
    const audio = new Audio('/assets/music/message.wav');
    var promise = audio.play();

    if (promise !== undefined) {
        promise.then(_ => {
            audio.play();
        }).catch(error => {
            console.log(error);
        });
    }
});

socket.on('leftRoom', function(response) {
    $('#chat').append(`<p id="message-welcome"> ${response.username} left the room </p>`)
})

chat.on('keypress', function(e) {
    let msg = chat.val();
    if (e.code == "Enter") {
        chat.val('');
        new Audio('/assets/music/message.wav').play();
        socket.emit('sendMessage', { user, msg }, function(response) {
            $('#chat').append(`<div class="${(host ? 'message-host' : 'message-rival')} message-sender"><small id="chat-username">${response.username}:</small><p id="message-content">${response.content}</p><small id="chat-time">${response.time}</small></div>`);
        });
    }
})

buttonChat.on('click', function() {
    let msg = chat.val();
    chat.val('');
    socket.emit('sendMessage', { user, msg }, function(response) {
        $('#chat').append(`<div class="${(host ? 'message-host' : 'message-rival')} message-sender"><small id="chat-username">${response.username}:</small><p id="message-content">${response.content}</p><small id="chat-time">${response.time}</small></div>`);
    });
})