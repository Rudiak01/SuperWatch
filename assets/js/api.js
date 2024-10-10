fetch('http://arthonetwork.fr:8001/api')
    .then(response => response.json())
    .then(data => addElement(data));



function addElement(data) {
    for (const playerName in data.players.list) {
        if (data.players.list.hasOwnProperty(playerName)) {
            const player = data.players.list[playerName];
            console.log(`Nom du joueur: ${playerName}`);
            console.log(`Statut: ${player.status}`);
            console.log(`uuid : ${player.uuid}`);
            console.log("-----");
            var article = document.createElement("article");
            var skin = document.createElement("img");
            var text = document.createElement("div");
            var pseudo = document.createElement("p");
            var uuid = document.createElement("p")
            var version = document.createElement("p");

            article.className = "etiquette";
            skin.src = `https://mineskin.eu/armor/body/${playerName}/100.png`;
            text.className = "text-etiquette";
            pseudo.innerHTML = `${playerName}`; pseudo.className = "username";
            uuid.innerHTML = `UUID : ${player.uuid}`; uuid.className = "uuid";
            version.innerHTML = "version **API**"; version.className = "version";
            const parent = document.querySelector("section");
            parent.appendChild(article);
            article.appendChild(skin);
            article.appendChild(text)
            text.appendChild(pseudo);
            text.appendChild(uuid);
            text.appendChild(version);
            if (player.status === "online") {
                article.style.boxShadow = " lime 0px 0px 0px 3px";
            }
            else {
                article.style.boxShadow = " red 0px 0px 0px 3px";
            }
        }
    }

}


