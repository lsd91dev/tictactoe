let yourTurn = user.host;
let host = yourTurn;
let cells = $('td');

cells.on('click', function() {
    if (yourTurn) {
        let cell = $(this);
        if (!cell.hasClass('x')) {
            new Audio('/assets/music/chip.wav').play();
            let x = cell.data('x');
            let y = cell.data('y');
            let play = { x, y }
            let username = user.username;
            socket.emit('sendPlay', { username, play }, function(response) {});

            cell.append(`<div class="dot ${(host ? 'host' : 'rival')}"></div>`);
            cell.attr('data-marked', user.username);
            yourTurn = !yourTurn;
            cell.addClass('x');
            checkVictory(x, y);
            checkGameFinished();
        }

    }
});




socket.on('recievePlay', function(response) {
    let x = response.play.x;
    let y = response.play.y;
    let cell = $(`td[data-x="${x}"][data-y="${y}"]`);
    cell.addClass('x');
    cell.attr('data-marked', response.username)
    cell.append(`<div class="dot ${(host ? 'rival' : 'host')}"></div>`);
    checkGameFinished();
    yourTurn = !yourTurn;
    const audio = new Audio('/assets/music/chip.wav');
    var promise = audio.play();

    if (promise !== undefined) {
        promise.then(_ => {
            audio.play();
        }).catch(error => {
            console.log(error);
        });
    }
});

function checkVictory(x, y) {
    if (horizontalX(x, y) == 3 || verticalY(x, y) == 3) {
        new Audio('/assets/music/win.wav').play();
        socket.emit('claimWinner', { username: user.username }, function() {});
        $('#table').append(`<div id="resultGame"><p>The winner is <b>${user.username}</b>!. Congratulations!</p></div>`);
    }

}

socket.on('winner', function(response) {
    cells.off('click');
    $('#table').append(`<div id="resultGame"><p>The winner is <b>${response.username}</b>!. Congratulations!</p></div>`);
    const audio = new Audio('/assets/music/win.wav');
    var promise = audio.play();

    if (promise !== undefined) {
        promise.then(_ => {
            audio.play();
        }).catch(error => {
            console.log(error);
        });
    }
});



function horizontalX(initX, y) {
    let coincidences = 1;
    if (initX != 2) {
        let x = initX;
        do {
            x++;
            let cell = $(`td[data-x="${x}"][data-y="${y}"]`);
            let markedBy = $(cell).attr('data-marked');
            if (markedBy !== undefined && markedBy === user.username) {
                coincidences++;
            }
        } while (x < 3)
    }
    if (initX != 0) {
        let x = initX;
        do {
            x--
            let cell = $(`td[data-x="${x}"][data-y="${y}"]`);
            let markedBy = $(cell).attr('data-marked');
            if (markedBy !== undefined && markedBy === user.username) {
                coincidences++;
            }
        } while (x > -1)
    }
    return coincidences;
}

function verticalY(x, initY) {
    let coincidences = 1;
    if (initY != 2) {
        let y = initY;
        do {
            y++;
            let cell = $(`td[data-x="${x}"][data-y="${y}"]`);
            let markedBy = $(cell).attr('data-marked');
            if (markedBy !== undefined && markedBy === user.username) {
                coincidences++;
            }
        } while (y < 3)
    }
    if (initY != 0) {
        let y = initY;
        do {
            y--
            let cell = $(`td[data-x="${x}"][data-y="${y}"]`);
            let markedBy = $(cell).attr('data-marked');
            if (markedBy !== undefined && markedBy === user.username) {
                coincidences++;
            }
        } while (y > -1)
    }
    return coincidences;
}

function checkGameFinished() {
    let cells = $('td').toArray();
    let cellsMarked = 0;
    cells.forEach(function(value) {
        ($(value).hasClass('x') ? cellsMarked++ : "");
    })

    if (cellsMarked == cells.length) {
        console.log('game finished');
    }

}