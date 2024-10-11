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


            var banbox = document.createElement("div");
            banbox.className = `banbox${playerName}`;
            var bansousbox = document.createElement("div");
            bansousbox.className = `bansousbox${playerName}`;
            var ban = document.createElement("span");
            ban.innerHTML = "ban"; ban.id = `banbutton${playerName}`;

            bottom.appendChild(banbox);
            banbox.appendChild(bansousbox);
            bansousbox.appendChild(ban);

            var kickbox = document.createElement("div");
            kickbox.className = `kickbox${playerName}`;
            var kicksousbox = document.createElement("div");
            kicksousbox.className = `kicksousbox${playerName}`;
            var kick = document.createElement("span");
            kick.innerHTML = "kick"; kick.id = `kickbutton${playerName}`;

            bottom.appendChild(kickbox);
            kickbox.appendChild(kicksousbox);
            kicksousbox.appendChild(kick);

            var style = document.createElement('style');
            style.innerHTML = `
            .kickbox${playerName} {
                width: inherit;
                display: flex;
                justify-content: center;
                align-items: center;
                align-self: flex-end;
                padding: 5px;
                border-radius: 5px;
            }
            .kicksousbox${playerName} {
                line-height: 50px;
                height: 50px;
                text-align: center;
                width: inherit;
                cursor: pointer;
                color: #ebebeb;
                transition: all 0.5s;
                position: relative;
            }
            .kicksousbox${playerName} span {
                z-index: 998;
                display: block;
                position: absolute;
                width: inherit;
                height: inherit;
            }

            .kicksousbox${playerName}::before {
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

            .kicksousbox${playerName}::after {
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

            .kicksousbox-clicked${playerName}::before {
                transform: rotate(-225deg)  scaleX(1.5);
                background-color: rgba(255, 0, 0, 0.5);
                backdrop-filter: blur(2px);
                border-color: rgba(255, 0, 0, 0.5);
                border-radius: 0;
            }

            .kicksousbox-clicked${playerName}::after {
                transform: rotate(225deg) scaleX(1.5);
                background-color: rgba(255, 0, 0, 0.5);
                backdrop-filter: blur(2px);
                border-color: rgba(255, 0, 0, 0.5);
                border-radius: 0;
            }
            .banbox${playerName} {
                width: inherit;
                display: flex;
                justify-content: center;
                align-items: center;
                align-self: flex-end;
                padding: 5px;
                border-radius: 5px;
            }
            .bansousbox${playerName} {
                line-height: 50px;
                height: 50px;
                text-align: center;
                width: inherit;
                cursor: pointer;
                color: #ebebeb;
                transition: all 0.5s;
                position: relative;
            }
            .bansousbox${playerName} span {
                z-index: 998;
                display: block;
                position: absolute;
                width: inherit;
                height: inherit;
            }

            .bansousbox${playerName}::before {
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

            .bansousbox${playerName}::after {
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

            .bansousbox-clicked${playerName}::before {
                transform: rotate(-225deg)  scaleX(1.5);
                background-color: rgba(255, 0, 0, 0.5);
                backdrop-filter: blur(2px);
                border-color: rgba(255, 0, 0, 0.5);
                border-radius: 0;
            }

            .bansousbox-clicked${playerName}::after {
                transform: rotate(225deg) scaleX(1.5);
                background-color: rgba(255, 0, 0, 0.5);
                backdrop-filter: blur(2px);
                border-color: rgba(255, 0, 0, 0.5);
                border-radius: 0;
            }`;

            // -- kick section -- //

            document.getElementsByTagName('head')[0].appendChild(style);
            const kickbutton = document.getElementById(`kickbutton${playerName}`);
            // Variable pour compter les clics
            let kickclickCount = 0;
            // Fonction qui exécute l'action après 2 clics
            function handlekickClick() {
                kickclickCount++;
                if (kickclickCount == 1) {
                    kickbutton.innerText = `Kick ${playerName} ?`;
                    $(`.kicksousbox${playerName} `).toggleClass(`kicksousbox-clicked${playerName} `);
                }
                if (kickclickCount === 2) {
                    kickbutton.innerText = "Action effectuée";
                }
            }
            // Réinitialise le bouton à l'état initial quand la souris quitte le bouton
            function resetkickButton() {
                if (kickclickCount != 0) {
                    kickbutton.innerText = "kick";
                    $(`.kicksousbox${playerName}`).toggleClass(`kicksousbox-clicked${playerName}`);
                    kickclickCount = 0;
                }
            }
            // Ajoute les événements
            kickbutton.addEventListener('click', handlekickClick);
            kickbutton.addEventListener('mouseleave', resetkickButton);

            // -- ban section -- //

            const banbutton = document.getElementById(`banbutton${playerName}`);
            // Variable pour compter les clics
            let banclickCount = 0;
            // Fonction qui exécute l'action après 2 clics
            function handleBanClick() {
                banclickCount++;
                if (banclickCount == 1) {
                    banbutton.innerText = `Ban ${playerName} ?`;
                    $(`.bansousbox${playerName} `).toggleClass(`bansousbox-clicked${playerName} `);
                }
                if (banclickCount === 2) {
                    banbutton.innerText = "Action effectuée";
                }
            }
            // Réinitialise le bouton à l'état initial quand la souris quitte le bouton
            function resetBanButton() {
                if (banclickCount != 0) {
                    banbutton.innerText = "ban";
                    $(`.bansousbox${playerName}`).toggleClass(`bansousbox-clicked${playerName}`);
                    banclickCount = 0;
                }
            }

            // Ajoute les événements
            banbutton.addEventListener('click', handleBanClick);
            banbutton.addEventListener('mouseleave', resetBanButton);
        }
    }
}



