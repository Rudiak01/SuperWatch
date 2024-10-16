fetch('http://arthonetwork.fr:8001/api')
    .then(response => response.json())
    .then(data => Init(data));
/*
setTimeout(function () {
    window.location.reload(1);
}, 5000);
*/
function Init(data) {
    // ----- Copy Pasta All js files ----- //
    const playerCounter = document.getElementById("navbar-counter");
    playerCounter.innerHTML = data.players.online;
    const playerTotal = document.getElementById('navbar-total');
    playerTotal = data.players.max;
    // ----------------------------------- //
    const isMobile = window.matchMedia('(max-width: 768px)').matches;
    for (const playerName in data.players.list) {
        if (data.players.list.hasOwnProperty(playerName)) {
            const player = data.players.list[playerName];
            var article = document.createElement("article");
            var text = document.createElement("div");
            var pseudo = document.createElement("p");
            var uuid = document.createElement("p")
            var version = document.createElement("p");
            var skin = document.createElement("img");
            var pagedetail = document.createElement("a");
            transferplayer();
            article.classList.add("etiquette");
            text.className = "text-etiquette";
            skin.className = "skin";
            skin.title = `Page détaillé de ${playerName}`;
            skin.alt = `skin de ${playerName}`;
            pseudo.innerHTML = `${playerName}`; pseudo.className = "username";
            uuid.innerHTML = `UUID : ${player.uuid}`; uuid.className = "uuid";
            version.innerHTML = "version **API**"; version.className = "version";
            const parent = document.querySelector("section");
            parent.appendChild(article);
            if (isMobile) {
                skin.src = `https://mineskin.eu/helm/${playerName}/100.png`;
                article.appendChild(pseudo);
                article.appendChild(pagedetail);
                pagedetail.appendChild(skin);
                article.appendChild(text);
            }
            else {
                skin.src = `https://mineskin.eu/armor/body/${playerName}/100.png`;
                article.appendChild(pagedetail);
                pagedetail.appendChild(skin);
                article.appendChild(text);
                text.appendChild(pseudo);
            }
            text.appendChild(uuid);
            text.appendChild(version);
                if (player.status === "online") {
                    article.style = "box-shadow: lime 0 0 0 3px, 0 2px 20px rgba(0, 0, 0, 1),inset 0 0 50px rgba(0, 0, 0, 0.5)"
                }
                else {
                    article.style = "box-shadow: red 0 0 0 3px, 0 2px 20px rgba(0, 0, 0, 1),inset 0 0 50px rgba(0, 0, 0, 0.5)"
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
                transform: rotate(-225deg)  scaleX(1.2);
                background-color: rgba(255, 0, 0, 0.5);
                backdrop-filter: blur(2px);
                border-color: rgba(255, 0, 0, 0.5);
                border-radius: 0;
            }

            .kicksousbox-clicked${playerName}::after {
                transform: rotate(225deg) scaleX(1.2);
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
                transform: rotate(-225deg)  scaleX(1.2);
                background-color: rgba(255, 0, 0, 0.5);
                backdrop-filter: blur(2px);
                border-color: rgba(255, 0, 0, 0.5);
                border-radius: 0;
            }

            .bansousbox-clicked${playerName}::after {
                transform: rotate(225deg) scaleX(1.2);
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
                    if (player.status == "offline") {
                        if (isMobile) {
                            kickbutton.innerText = "hors ligne"; kickbutton.style = "font-size:small";
                        }
                        else {
                            kickbutton.innerText = "Joueur hors ligne";
                        }
                        kickclickCount = 0;
                    }
                    else {
                        if (isMobile) {
                            kickbutton.innerText = `Vraiment ?`; kickbutton.style = "font-size:small";
                        }
                        else {
                            kickbutton.innerText = "Joueur hors ligne";
                        }
                        $(`.kicksousbox${playerName} `).toggleClass(`kicksousbox-clicked${playerName} `);

                    }
                }
                if (kickclickCount === 2) {
                    kickbutton.innerText = "Kicked"; kickbutton.style = ("font-size:large");

                    /* -- A FAIRE -- WAITING ON API -- */

                    fetch(`http://arthonetwork.fr:8001/api/kick`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ uuid: player.uuid })
                    })
                        .then(response => response.json())
                        .then(result => {
                            console.log(`${playerName} a été kick.`);
                            //alert(`${playerName} a été kick.`);
                        })
                        .catch(error => {
                            console.error('Erreur, impossible de kick le joueur:', error);
                            alert(`Erreur, impossible de kick ${playerName}.`);
                        });

                    /* -----------------------  */

                }
            }
            // Resetkick //
            function resetkickButton() {
                window.setTimeout(function () {
                    kickbutton.innerText = "kick"; kickbutton.style = "font-size:extralarge"
                    if (player.status == "online" && kickclickCount != 0) {
                        $(`.kicksousbox${playerName}`).toggleClass(`kicksousbox-clicked${playerName}`);
                        kickclickCount = 0;
                    }
                }, 350);

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
                    if (isMobile) {
                        banbutton.innerText = `Vraiment ?`; banbutton.style = "font-size:small";
                    }
                    else {
                        banbutton.innerText = `Ban ${playerName} ?`;
                    }

                    $(`.bansousbox${playerName} `).toggleClass(`bansousbox-clicked${playerName} `);
                }
                if (banclickCount === 2) {
                    if (isMobile) {
                        banbutton.innerText = `banni`; banbutton.style = "font-size:large";
                    }
                    else {
                        banbutton.innerText = `${playerName} banni`; banbutton.style = "font-size:large";
                    }

                    /* -- A FAIRE -- WAITING ON API -- */

                    fetch(`http://arthonetwork.fr:8001/api/ban`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ uuid: player.uuid })
                    })
                        .then(response => response.json())
                        .then(result => {
                            console.log(`${playerName} a été banni.`);
                            //alert(`${playerName} a été banni.`);
                        })
                        .catch(error => {
                            console.error('Erreur, impossible de bannir le joueur:', error);
                            alert(`Erreur, impossible de bannir ${playerName}.`);
                        });
                    /* -----------------------  */
                }
            }
            // Réinitialise le bouton à l'état initial quand la souris quitte le bouton
            function resetBanButton() {
                if (banclickCount != 0) {
                    window.setTimeout(function () {
                        banbutton.innerText = "ban"; banbutton.style = "font-size:extralarge";
                        $(`.bansousbox${playerName}`).toggleClass(`bansousbox-clicked${playerName}`);
                        banclickCount = 0;
                    }, 350);
                }
            }

            // Ajoute les événements
            banbutton.addEventListener('click', handleBanClick);
            banbutton.addEventListener('mouseleave', resetBanButton);

            /* Mobile Specific */

            if (isMobile) {
                $(document).on("scroll", function () {
                    if (banclickCount != 0) {
                        banbutton.innerText = "ban"; banbutton.style = "font-size:large";
                        $(`.bansousbox${playerName}`).toggleClass(`bansousbox-clicked${playerName}`);
                        banclickCount = 0;
                    }
                    kickbutton.innerText = "kick"; kickbutton.style = "font-size:large";
                    if (player.status == "online" && kickclickCount != 0) {
                        $(`.kicksousbox${playerName}`).toggleClass(`kicksousbox-clicked${playerName}`);
                        kickclickCount = 0;
                    }
                });
            }



            function transferplayer() {
                url = './2.html?name=' + encodeURIComponent(playerName);
                pagedetail.href = url;
            }
        }
    }
}





