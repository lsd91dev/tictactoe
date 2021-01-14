// route /new

$.ajax({
    type: 'GET',
    dataType: 'json',
    url: '/new',
    success: function(response) {
        $('#room').val(response.room);
    },
    error: function() {
        console.log('Ha ocurrido un error');
    }
});

// route /new/room

$('form').on('submit', function(e) {
    let username = $('#username');
    let room = $('#room');

    // validation Front-End
    if (!validateForm(username.val(), room.val())) {
        e.preventDefault();
    }

    $.ajax({
        type: 'POST',
        dataType: 'json',
        url: '/new/room',
        data: {
            username: username.val(),
            room: room.val()
        },
        success: function(response) {
            if (response.ok) {
                window.location = 'room.html?room' + $.param(room) + "&username" + $.param(username) + "&host=" + true
            } else {
                // validation Back-end
                let errors = response.errors;
                readErrors(errors);
            }
        },
        error: function(response) {
            console.log(response);
        }
    });

    e.preventDefault();

});