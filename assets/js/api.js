fetch('http://arthonetwork.fr:8001/api')
    .then(response => response.json())
    .then(data => Init(data));



function Init(data) {
    const playerCounter = document.getElementById("navbar-counter");
    playerCounter.innerHTML = data.players.online;
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
            var bottom=document.createElement("div");
            text.append(bottom); bottom.className="bottom"


            var banbox = document.createElement("div");
            banbox.className="boxbtnkick";
            var bansousbox=document.createElement("div");
            bansousbox.className="btnkick";
            var ban = document.createElement("span");
            ban.innerHTML = "ban";

            bottom.appendChild(banbox);
            banbox.appendChild(bansousbox);
            bansousbox.appendChild(ban);

            var kickbox = document.createElement("div");
            kickbox.className="boxbtnkick";
            var kicksousbox=document.createElement("div");
            kicksousbox.className="btnkick";
            var kick = document.createElement("span");
            kick.innerHTML = "kick";

            bottom.appendChild(kickbox);
            kickbox.appendChild(kicksousbox);
            kicksousbox.appendChild(kick);
        }
    }
    kickbox.addEventListener("click", function() {
        fetch(`http://arthonetwork.fr:8001/api/kick`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ uuid: player.uuid })
        })
        .then(response => response.json())
        .then(result => {
            console.log(`Player ${playerName} has been kicked.`);
            alert(`Player ${playerName} kicked successfully.`);
        })
        .catch(error => {
            console.error('Error kicking player:', error);
            alert(`Failed to kick player ${playerName}.`);
        });
    });
}


