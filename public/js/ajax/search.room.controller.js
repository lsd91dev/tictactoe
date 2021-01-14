$('form').on('submit', function(e) {
    let username = $('#username');
    let room = $('#room');
    if (!validateForm(username.val(), room.val())) {
        e.preventDefault();
    }
    $.ajax({

        type: 'POST',
        dataType: 'json',
        url: '/search',
        data: {
            username: username.val(),
            room: room.val()
        },
        success: function(response) {
            console.log(response);
            if (!response.ok) {
                let errors = response.errors;
                readErrors(errors);
            } else {
                window.location = 'room.html?room' + $.param(room) + "&username" + $.param(username) + "&host=" + false
            }
        },
        error: function() {
            console.log('Something went wrong');
        }
    });
    e.preventDefault();
});