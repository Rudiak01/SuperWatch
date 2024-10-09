fetch('http://arthonetwork.fr:8001/api')
.then(response => response.json())
.then(data => tri(data));

function tri(data){
    console.log(data);
    const playerCounter = document.getElementById("player-counter");
    playerCounter.innerHTML = data.players.online;


    const player = document.getElementById("UUID");
    player.innerHTML = data.players.list.Rudiak.uuid;
    const playerusername = document.getElementById("username");
    playerusername.innerHTML = data.players.list;
} 