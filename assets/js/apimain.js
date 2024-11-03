fetch("http://arthonetwork.fr:8001/apiP")
  .then((response) => response.json())
  .then((data) => {
    API_Data = data;
    Name.classList.add("sortclicked");
    croissant.classList.add("sortclicked");
    sorted = 1;
    sortedByName = 1;
    sortByName();
    Init(API_Data);
  });
/*
setTimeout(function () {
    window.location.reload(1);
}, 5000);
*/
function Init(data) {
  // ----- Copy Pasta All js files ----- //
  const playerCounter = document.getElementById("navbar-counter");
  playerCounter.innerHTML = data.players.online;
  const playerTotal = document.getElementById("navbar-total");
  playerTotal.innerHTML = data.players.max;
  // ----- ----------------------------- //
  const isMobile = window.matchMedia("(max-width: 768px)").matches;
  for (const playerName in data.players.list) {
    if (data.players.list.hasOwnProperty(playerName)) {
      const player = data.players.list[playerName];
      var article = document.createElement("article");
      var sousarticle = document.createElement("div");
      var pseudo = document.createElement("p");
      var uuid = document.createElement("p");
      var version = document.createElement("p");
      var skin = document.createElement("img");
      var pagedetail = document.createElement("a");
      var text = document.createElement("a");
      transferplayer();
      article.classList.add("etiquette");
      sousarticle.className = "sous-etiquette";
      text.className = "text-etiquette";
      skin.className = "skin";
      skin.title = `Page détaillé de ${playerName}`;
      skin.alt = `skin de ${playerName}`;
      pseudo.innerHTML = `${playerName}`;
      pseudo.className = "username";
      uuid.innerHTML = `UUID : ${player.uuid}`;
      uuid.className = "uuid";
      version.innerHTML = `Version : ${player.player_version}`;
      version.className = "version";
      const parent = document.querySelector("section");
      parent.appendChild(article);
      article.setAttribute("player-id", playerName.toLowerCase())
      if (isMobile) {
        skin.src = `https://mineskin.eu/helm/${playerName}/100.png`;
        article.appendChild(pseudo);
        article.appendChild(pagedetail);
        pagedetail.appendChild(skin);
        article.appendChild(sousarticle);
        sousarticle.appendChild(text);
      } else {
        skin.src = `https://mineskin.eu/armor/body/${playerName}/100.png`;
        article.appendChild(pagedetail);
        pagedetail.appendChild(skin);
        article.appendChild(sousarticle);
        sousarticle.appendChild(text);
        text.appendChild(pseudo);
        text.appendChild(uuid);
      }
      text.appendChild(version);
      if (player.permissions.isOp == true) {
        pseudo.style = "color : purple";
      }
      if (player.status === "online") {
        article.style =
          "box-shadow: lime 0 0 0 3px, 0 2px 20px rgba(0, 0, 0, 1),inset 0 0 50px rgba(0, 0, 0, 0.5)";
      } else {
        article.style =
          "box-shadow: red 0 0 0 3px, 0 2px 20px rgba(0, 0, 0, 1),inset 0 0 50px rgba(0, 0, 0, 0.5)";
      }

      var bottom = document.createElement("div");
      sousarticle.append(bottom);
      bottom.className = "bottom";

      var banbox = document.createElement("div");
      banbox.className = `banbox${playerName}`;
      var bansousbox = document.createElement("div");
      bansousbox.className = `bansousbox${playerName}`;
      var ban = document.createElement("span");
      ban.innerHTML = "ban";
      ban.id = `banbutton${playerName}`;

      bottom.appendChild(banbox);
      banbox.appendChild(bansousbox);
      bansousbox.appendChild(ban);

      var kickbox = document.createElement("div");
      kickbox.className = `kickbox${playerName}`;
      var kicksousbox = document.createElement("div");
      kicksousbox.className = `kicksousbox${playerName}`;
      var kick = document.createElement("span");
      kick.innerHTML = "kick";
      kick.id = `kickbutton${playerName}`;

      bottom.appendChild(kickbox);
      kickbox.appendChild(kicksousbox);
      kicksousbox.appendChild(kick);

      var style = document.createElement("style");
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

      document.getElementsByTagName("head")[0].appendChild(style);
      const kickbutton = document.getElementById(`kickbutton${playerName}`);
      // Variable pour compter les clics
      let kickclickCount = 0;
      // Fonction qui exécute l'action après 2 clics
      function handlekickClick() {
        kickclickCount++;
        if (kickclickCount == 1) {
          if (player.status == "offline") {
            if (isMobile) {
              kickbutton.innerText = "hors ligne";
              kickbutton.style = "font-size:small";
            } else {
              kickbutton.innerText = "Joueur hors ligne";
            }
            kickclickCount = 0;
          } else {
            if (isMobile) {
              kickbutton.innerText = `Vraiment ?`;
              kickbutton.style = "font-size:small";
            } else {
              kickbutton.innerText = `Kick ${playerName} ?`;
            }
            $(`.kicksousbox${playerName} `).toggleClass(
              `kicksousbox-clicked${playerName} `
            );
          }
        }
        if (kickclickCount === 2) {
          kickbutton.innerText = "Kicked";
          kickbutton.style = "font-size:large";

          /* -- A FAIRE -- WAITING ON API -- */

          fetch(`http://arthonetwork.fr:8001/api/kick`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uuid: player.uuid }),
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(`${playerName} a été kick.`);
              //alert(`${playerName} a été kick.`);
            })
            .catch((error) => {
              console.error("Erreur, impossible de kick le joueur:", error);
              alert(`Erreur, impossible de kick ${playerName}.`);
            });

          /* -----------------------  */
        }
      }
      // Resetkick //
      function resetkickButton() {
        window.setTimeout(function () {
          kickbutton.innerText = "kick";
          kickbutton.style = "font-size:extralarge";
          if (player.status == "online" && kickclickCount != 0) {
            $(`.kicksousbox${playerName}`).toggleClass(
              `kicksousbox-clicked${playerName}`
            );
            kickclickCount = 0;
          }
        }, 350);
      }
      // Ajoute les événements
      kickbutton.addEventListener("click", handlekickClick);
      kickbutton.addEventListener("mouseleave", resetkickButton);

      // -- ban section -- //

      const banbutton = document.getElementById(`banbutton${playerName}`);
      // Variable pour compter les clics
      let banclickCount = 0;
      // Fonction qui exécute l'action après 2 clics
      function handleBanClick() {
        banclickCount++;
        if (banclickCount == 1) {
          if (isMobile) {
            banbutton.innerText = `Vraiment ?`;
            banbutton.style = "font-size:small";
          } else {
            banbutton.innerText = `Ban ${playerName} ?`;
          }

          $(`.bansousbox${playerName} `).toggleClass(
            `bansousbox-clicked${playerName} `
          );
        }
        if (banclickCount === 2) {
          if (isMobile) {
            banbutton.innerText = `banni`;
            banbutton.style = "font-size:large";
          } else {
            banbutton.innerText = `${playerName} banni`;
            banbutton.style = "font-size:large";
          }

          /* -- A FAIRE -- WAITING ON API -- */

          fetch(`http://arthonetwork.fr:8001/api/ban`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ uuid: player.uuid }),
          })
            .then((response) => response.json())
            .then((result) => {
              console.log(`${playerName} a été banni.`);
              //alert(`${playerName} a été banni.`);
            })
            .catch((error) => {
              console.error("Erreur, impossible de bannir le joueur:", error);
              alert(`Erreur, impossible de bannir ${playerName}.`);
            });
          /* -----------------------  */
        }
      }
      // Réinitialise le bouton à l'état initial quand la souris quitte le bouton
      function resetBanButton() {
        if (banclickCount != 0) {
          window.setTimeout(function () {
            banbutton.innerText = "ban";
            banbutton.style = "font-size:extralarge";
            $(`.bansousbox${playerName}`).toggleClass(
              `bansousbox-clicked${playerName}`
            );
            banclickCount = 0;
          }, 350);
        }
      }

      // Ajoute les événements
      banbutton.addEventListener("click", handleBanClick);
      banbutton.addEventListener("mouseleave", resetBanButton);

      /* Mobile Specific */

      if (isMobile) {
        $(document).on("scroll", function () {
          if (banclickCount != 0) {
            banbutton.innerText = "ban";
            banbutton.style = "font-size:large";
            $(`.bansousbox${playerName}`).toggleClass(
              `bansousbox-clicked${playerName}`
            );
            banclickCount = 0;
          }
          kickbutton.innerText = "kick";
          kickbutton.style = "font-size:large";
          if (player.status == "online" && kickclickCount != 0) {
            $(`.kicksousbox${playerName}`).toggleClass(
              `kicksousbox-clicked${playerName}`
            );
            kickclickCount = 0;
          }
        });
      }

      function transferplayer() {
        url = "./2.html?name=" + encodeURIComponent(playerName);
        pagedetail.href = url;
        text.href = url;
      }
    }
  }
}
// ------------- sorter ------------------ //

var sortedByName, sortedByOnline, sortedByCheater, sorted, sortedReversed;

const Name = document.getElementById("name");
const online = document.getElementById("online");
const cheating = document.getElementById("cheating");
const croissant = document.getElementById("croissant");
const decroissant = document.getElementById("decroissant");

Name.addEventListener("click", sortname);
online.addEventListener("click", sortonline);
cheating.addEventListener("click", sortcheating);
croissant.addEventListener("click", sortcroissant);
decroissant.addEventListener("click", sortdecroissant);

function sortname() {
  console.log("name");
  Name.classList.add("sortclicked");
  online.classList.remove("sortclicked");
  cheating.classList.remove("sortclicked");
  if (sorted == 1) {
    sortByName();
  } else if (sortedReversed == 1) {
    sortByNameReverse();
  }
  sortedByName = 1;
  sortedByOnline = 0;
  sortedByCheater = 0;
  reloadPlayers();
}
function sortonline() {
  console.log("online");
  Name.classList.remove("sortclicked");
  online.classList.add("sortclicked");
  cheating.classList.remove("sortclicked");
  if (sorted == 1) {
    sortByOnline();
  } else if (sortedReversed == 1) {
    sortByOnlineReverse();
  }
  sortedByName = 0;
  sortedByOnline = 1;
  sortedByCheater = 0;
  reloadPlayers();
}
function sortcheating() {
  console.log("cheating");
  Name.classList.remove("sortclicked");
  online.classList.remove("sortclicked");
  cheating.classList.add("sortclicked");
  sortedByName = 0;
  sortedByOnline = 0;
  sortedByCheater = 1;
  reloadPlayers();
}

function sortcroissant() {
  console.log("croissant");
  croissant.classList.add("sortclicked");
  decroissant.classList.remove("sortclicked");
  if (sortedByName == 1) {
    sortByName();
  } else if (sortedByOnline == 1) {
    sortByOnline();
  }
  //else if(sortedByCheater==1){sortByCheater();}
  sortedReversed = 0;
  sorted = 1;
  reloadPlayers();
}
function sortdecroissant() {
  console.log("decroissant");
  croissant.classList.remove("sortclicked");
  decroissant.classList.add("sortclicked");
  if (sortedByName == 1) {
    sortByNameReverse();
    console.log("done");
  } else if (sortedByOnline == 1) {
    sortByOnlineReverse();
  }
  //else if(sortedByCheater==1){sortByCheaterReverse();}
  sortedReversed = 1;
  sorted = 0;
  reloadPlayers();
}

function sortByName() {
  const nameList = Object.keys(API_Data.players.list)
    .sort()
    .reduce((acc, key) => {
      acc[key] = API_Data.players.list[key];
      return acc;
    }, {});
  API_Data.players.list = nameList;
}
function sortByNameReverse(functionName) {
  const reverseNameList = Object.keys(API_Data.players.list)
    .sort()
    .reverse()
    .reduce((acc, key) => {
      acc[key] = API_Data.players.list[key];
      return acc;
    }, {});
  API_Data.players.list = reverseNameList;
}

function sortByOnline() {
  const sortedPlayers = Object.entries(API_Data.players.list)
    .sort(([playerA, dataA], [playerB, dataB]) => {
      if (dataA.status === "online" && dataB.status === "offline") {
        return -1; // Place 'online' avant 'offline'
      } else if (dataA.status === "offline" && dataB.status === "online") {
        return 1; // Place 'offline' après 'online'
      } else {
        return 0; // Garde l'ordre initial si les deux sont dans le même état
      }
    })
    .reduce((acc, [playerName, playerData]) => {
      acc[playerName] = playerData; // Reconstruire l'objet avec les joueurs triés
      return acc;
    }, {});

  API_Data.players.list = sortedPlayers;
}

function sortByOnlineReverse() {
  const sortedPlayers = Object.entries(API_Data.players.list)
    .sort(([playerA, dataA], [playerB, dataB]) => {
      if (dataA.status === "online" && dataB.status === "offline") {
        return -1; // Place 'online' avant 'offline'
      } else if (dataA.status === "offline" && dataB.status === "online") {
        return 1; // Place 'offline' après 'online'
      } else {
        return 0; // Garde l'ordre initial si les deux sont dans le même état
      }
    })
    .reverse()
    .reduce((acc, [playerName, playerData]) => {
      acc[playerName] = playerData; // Reconstruire l'objet avec les joueurs triés
      return acc;
    }, {});

  API_Data.players.list = sortedPlayers;
}

function reloadPlayers() {
  const parent = document.querySelector("section");
  parent.innerHTML = "";
  Init(API_Data);
  searchPlayers();
}

// --------------- research ------------------ //

function searchPlayers() {

  const input = document.getElementById("search").value.toLowerCase();
  const players = document.querySelectorAll(".playersection article");

  players.forEach(function (player) {
    const playerId = player.getAttribute("player-id");
    if (playerId.includes(input)) {
      player.style.display = "";
    } else {
      player.style.display = "none";
    }
  });
}
