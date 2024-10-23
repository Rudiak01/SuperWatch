fetch('http://arthonetwork.fr:8001/apiP')
    .then(response => response.json())
    .then(data => Init(data));

function Init(data) {
    // ----- Copy Pasta All js files ----- //
    const playerCounter = document.getElementById("navbar-counter");
    playerCounter.innerHTML = data.players.online;
    const playerTotal = document.getElementById('navbar-total');
    playerTotal.innerHTML = data.players.max;
    // ----------------------------------- //
    var url = document.location.href,
        params = url.split('?')[1].split('&'),
        transfer = {}, tmp;
    for (var i = 0, l = params.length; i < l; i++) {
        tmp = params[i].split('=');
        transfer[tmp[0]] = tmp[1];
    }
    document.getElementById('here').innerHTML = transfer.name;
    var skin = document.createElement("img");
    const parent = document.querySelector("main");
    skin.src = `https://mineskin.eu/armor/body/${transfer.name}/100.png`;
    parent.appendChild(skin);
}