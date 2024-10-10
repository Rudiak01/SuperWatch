fetch('http://arthonetwork.fr:8001/api')
.then(response => response.json())
.then(data => tri(data));


function tri(data){
    var nb = 0;
    for (players in data.players.list) {
        addElement();
    }
    console.log(nb);}
function addElement() {
    var article = document.createElement("article");
    var img = document.createElement("img");
    var pseudo = document.createElement("pseudo");
    var uuid = document.createElement("uuid")
    var version = document.createElement("version");
    article.className = "etiquette";
    img.src="assets/body.png";img.height="170";img.width="170";
    pseudo.innerHTML ="pseudo"; pseudo.className="username";
    uuid.innerHTML="uuid";
    version.innerHTML="version";
    const parent = document.querySelector("section");
    parent.appendChild(article);
    article.appendChild(img);
    article.appendChild(pseudo);
    article.appendChild(uuid);
    article.appendChild(version);
}

/*

    const playerCounter = document.getElementById("player-counter");
    playerCounter.innerHTML = data.players.online;


    const player = document.getElementById("UUID");
    player.innerHTML = data.players.list.Rudiak.uuid;
    const playerusername = document.getElementById("username");
    playerusername.innerHTML = data.players.list;
*/