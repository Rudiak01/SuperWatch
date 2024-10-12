window.onload = function () {
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        data = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        data[tmp[0]] = tmp[1];
    }
    document.getElementById('here').innerHTML = data.name;
}
fetch('http://arthonetwork.fr:8001/api')
    .then(response => response.json())
    .then(data => Init(data));

function Init(data) {
    // ----- Copy Pasta All js files ----- //
    const playerCounter = document.getElementById("navbar-counter");
    playerCounter.innerHTML = data.players.online;
    // ----------------------------------- //
}