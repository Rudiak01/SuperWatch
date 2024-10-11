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
            var bottom = document.createElement("div");
            text.append(bottom); bottom.className = "bottom"

/*
            var banbox = document.createElement("div");
            banbox.className = `boxbtnkick${playerName}`;
            var bansousbox = document.createElement("div");
            bansousbox.className = `btnkick${playerName}`;
            var ban = document.createElement("span");
            ban.innerHTML = "ban";

            bottom.appendChild(banbox);
            banbox.appendChild(bansousbox);
            bansousbox.appendChild(ban);
*/
            var kickbox = document.createElement("div");
            kickbox.className = `boxbtn${playerName}`;
            var kicksousbox = document.createElement("div");
            kicksousbox.className = `btnsousbox${playerName}`;
            var kick = document.createElement("span");
            kick.innerHTML = "kick"; kick.id = `button${playerName}`;

            bottom.appendChild(kickbox);
            kickbox.appendChild(kicksousbox);
            kicksousbox.appendChild(kick);

            var style = document.createElement('style');
            style.innerHTML = `
            .boxbtn${playerName} {
                width: inherit;
                display: flex;
                justify-content: center;
                align-items: center;
                align-self: flex-end;
                padding: 5px;
                border-radius: 5px;
            }
            .btnsousbox${playerName} {
                line-height: 50px;
                height: 50px;
                text-align: center;
                width: inherit;
                cursor: pointer;
                color: #ebebeb;
                transition: all 0.5s;
                position: relative;
            }



            .btnsousbox${playerName} span {
                z-index: 998;
                display: block;
                position: absolute;
                width: inherit;
                height: inherit;
            }

            .btnsousbox${playerName}::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: inherit;
                height: inherit;
                z-index: 997;
                transition: all 0.5s;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 5px;
            }

            .btnsousbox${playerName}::after {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: inherit;
                height: inherit;
                z-index: 997;
                transition: all 0.5s;
                border: 1px solid rgba(255, 255, 255, 0.2);
                background-color: rgba(255, 255, 255, 0.1);
                border-radius: 5px;
            }

            .btnsousbox-clicked${playerName}::before {
                transform: rotate(-225deg)  scaleX(1.5);
                background-color: rgba(255, 0, 0, 0.5);
                backdrop-filter: blur(2px);
                border-color: rgba(255, 0, 0, 0.5);
                border-radius: 0;
            }

            .btnsousbox-clicked${playerName}::after {
                transform: rotate(225deg) scaleX(1.5);
                background-color: rgba(255, 0, 0, 0.5);
                backdrop-filter: blur(2px);
                border-color: rgba(255, 0, 0, 0.5);
                border-radius: 0;
            }`;
            document.getElementsByTagName('head')[0].appendChild(style);
            const button = document.getElementById(`button${playerName}`);

            // Variable pour compter les clics
            let clickCount = 0;

            // Fonction qui exécute l'action après 2 clics
            function handleClick() {
                clickCount++;
                if (clickCount == 1) {
                    button.innerText = 'Are You Sure ?';
                    $(`.btnsousbox${playerName} `).toggleClass(`btnsousbox-clicked${playerName} `);
                }
                if (clickCount === 2) {
                    button.innerText = "Action effectuée";
                }
            }

            // Réinitialise le bouton à l'état initial quand la souris quitte le bouton
            function resetButton() {
                if (clickCount != 0) {
                    button.innerText = "kick";
                    $(`.btnsousbox${playerName}`).toggleClass(`btnsousbox-clicked${playerName}`);
                    clickCount = 0;
                }
            }

            // Ajoute les événements
            button.addEventListener('click', handleClick);
            button.addEventListener('mouseleave', resetButton);
        }
    }
}




