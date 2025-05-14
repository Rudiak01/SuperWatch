API_Data = {
  mods: [],
  software: null,
  players: {
    offline: 2,
    max: 20,
    online: 2,
    list: {
      Rudiak: {
        level: 0,
        permissions: {
          isOp: true,
          gameMode: "CREATIVE",
        },
        xp: 0,
        health: 20,
        uuid: "2939f22fc68f4deca8b7c62d9de7d2e1",
        food: 20,
        status: "online",
      },
    },
  },
  plugins: [],
  icon: null,
};
Init(API_Data);
function Init(data) {
  // ----- ----------------------------- //

  const isMobile = window.matchMedia("(max-width: 768px)").matches; // si l'écran est plus petit que 768px, on considère que l'utilisateur est sur mobile
  for (const playerName in data.players.list) {
    //repet pour chaque joueur existant dans l'api
    if (data.players.list.hasOwnProperty(playerName)) {
      // -- kick section -- //

      //document.getElementsByTagName("head")[0].appendChild(style);
      const kickbutton = document.getElementById(`kickbutton`);
      // Variable pour compter les clics
      let kickclickCount = 0;
      // Fonction qui exécute l'action après 2 clics
      function handlekickClick() {
        kickclickCount++;
        if (kickclickCount == 1) {
          if (isMobile) {
            kickbutton.innerText = `Vraiment ?`;
            kickbutton.style = "font-size:small";
          } else {
            kickbutton.innerText = `Kick  ?`;
          }
          $(`.kicksousbox `).toggleClass(`kicksousbox-clicked `);
        }
        if (kickclickCount === 2) {
          kickbutton.innerText = "Kicked";
          kickbutton.style = "font-size:large";
        }
      }
      function resetkickButton() {
        window.setTimeout(function () {
          kickbutton.innerText = "kick";
          kickbutton.style = "font-size:extralarge";
          if (kickclickCount != 0) {
            $(`.kicksousbox`).toggleClass(`kicksousbox-clicked`);
            kickclickCount = 0;
          }
        }, 350);
      }
      // Ajoute les événements
      kickbutton.addEventListener("click", handlekickClick);
      kickbutton.addEventListener("mouseleave", resetkickButton);

      // -- ban section -- //

      const banbutton = document.getElementById(`banbutton`);
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
            banbutton.innerText = `Ban  ?`;
          }

          $(`.bansousbox `).toggleClass(`bansousbox-clicked `);
        }
        if (banclickCount === 2) {
          if (isMobile) {
            banbutton.innerText = `banni`;
            banbutton.style = "font-size:large";
          } else {
            banbutton.innerText = ` banni`;
            banbutton.style = "font-size:large";
          }
        }
      }

      function resetBanButton() {
        if (banclickCount != 0) {
          window.setTimeout(function () {
            banbutton.innerText = "ban";
            banbutton.style = "font-size:extralarge";
            $(`.bansousbox`).toggleClass(`bansousbox-clicked`);
            banclickCount = 0;
          }, 350);
        }
      }
      banbutton.addEventListener("click", handleBanClick);
      banbutton.addEventListener("mouseleave", resetBanButton);

      // ----- Mobile Specific ----- //

      if (isMobile) {
        $(document).on("scroll", function () {
          if (banclickCount != 0) {
            banbutton.innerText = "ban";
            banbutton.style = "font-size:large";
            $(`.bansousbox`).toggleClass(`bansousbox-clicked`);
            banclickCount = 0;
          }
          kickbutton.innerText = "kick";
          kickbutton.style = "font-size:large";
          if (kickclickCount != 0) {
            $(`.kicksousbox`).toggleClass(`kicksousbox-clicked`);
            kickclickCount = 0;
          }
        });
      }
      //------- link beetween overview page and detailed page ------/
      function transferplayer() {
        url = "./player.php?name=" + encodeURIComponent(playerName);
        linkToDetailedView.href = url;
        pseudo.href = url;
        version.href = url;
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

// -------- Debug W/O API -------- //

Name.classList.add("sortclicked"); // le bouton "name" est cliqué par défaut
croissant.classList.add("sortclicked"); // le bouton "croissant" est cliqué par défaut
sorted = 1; // permet aux fonctions de savoir qu'on tri par ordre croissant (l'autre est sortedreversed)
sortedByName = 1; // permet aux fonctions de savoir qu'on tri par nom
//sortcroissant(); // ordre croissant
//sortByName(); // appel tri par nom

// ------------------------------- //
function sortname() {
  Name.classList.add("sortclicked");
  online.classList.remove("sortclicked");
  cheating.classList.remove("sortclicked");
  if (sorted == 1) {
    //sortByName();
  } else if (sortedReversed == 1) {
    //sortByNameReverse();
  }
  sortedByName = 1;
  sortedByOnline = 0;
  sortedByCheater = 0;
  //reloadPlayers();
}
function sortonline() {
  Name.classList.remove("sortclicked");
  online.classList.add("sortclicked");
  cheating.classList.remove("sortclicked");
  if (sorted == 1) {
    //sortByOnline();
  } else if (sortedReversed == 1) {
    //sortByOnlineReverse();
  }
  sortedByName = 0;
  sortedByOnline = 1;
  sortedByCheater = 0;
  //reloadPlayers();
}
function sortcheating() {
  Name.classList.remove("sortclicked");
  online.classList.remove("sortclicked");
  cheating.classList.add("sortclicked");
  sortedByName = 0;
  sortedByOnline = 0;
  sortedByCheater = 1;
  //reloadPlayers();
}

function sortcroissant() {
  croissant.classList.add("sortclicked");
  decroissant.classList.remove("sortclicked");
  if (sortedByName == 1) {
    //sortByName();
  } else if (sortedByOnline == 1) {
    //sortByOnline();
  }
  //else if(sortedByCheater==1){sortByCheater();}
  sortedReversed = 0;
  sorted = 1;
  //reloadPlayers();
}
function sortdecroissant() {
  croissant.classList.remove("sortclicked");
  decroissant.classList.add("sortclicked");
  if (sortedByName == 1) {
    //sortByNameReverse();
  } else if (sortedByOnline == 1) {
    //sortByOnlineReverse();
  }
  //else if(sortedByCheater==1){sortByCheaterReverse();}
  sortedReversed = 1;
  sorted = 0;
  //reloadPlayers();
}
/*
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
/*
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
    const playeruuid = player.getAttribute("player-uuid");
    if (playerId.includes(input) || playeruuid.includes(input)) {
      player.style.display = "";
    } else {
      player.style.display = "none";
    }
  });
}
*/
const copied = document.getElementById("copied");
$(".uuid").click(function () {
  navigator.clipboard.writeText($(this).attr("id"));
  copied_message();
});

function copied_message() {
  copied.classList.add("open");
  setTimeout(() => {
    copied.classList.remove("open");
  }, 1500);
}
