let params = new URLSearchParams(window.location.search);

// check params exist | not empty in URL
function getParamsURL() {
    if (!params.get('username') || !params.get('room') || !params.get('host')) {
        window.location = "index.html";
    } else {
        return {
            username: params.get('username'),
            room: params.get('room'),
            host: (params.get('host') === "true" ? true : false)
        }
    }
}