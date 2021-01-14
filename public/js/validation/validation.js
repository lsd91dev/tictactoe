function validateField(field) {
    return (field != "" ? true : false);
}

function validateForm(username, room) {
    if (!validateField(username)) {
        showError('username', 'Username is required');
        return false;
    }
    if (!validateField(room)) {
        showError('room', 'Room is required');
        return false;
    }
}

function showError(field, msg) {
    $(`#${field}`).addClass('is-invalid');
    if (!$(`#error-${field}`).length) {
        let error = `<div id="error-${field}"><small class="text-danger" id="msg-${field}">${msg}</small></div>`;
        $(`label[data-id="${field}"`).append(error);
    }
}

function readErrors(errors) {
    errors.forEach(function(value) {
        switch (value.param) {
            case 'username':
                showError(value.param, value.msg);
                break;
            case 'room':
                if ($('#msg-room').length) {
                    $('#msg-room').text(value.msg)
                }
                showError(value.param, value.msg);
                break;
        }
    })
}