// Add this at the top of the file with other variables
let banned_players = [];

// Add this function to parse the ban list
function parseBanList(banListText) {
  // Reset the array
  banned_players = [];

  try {
    // Remove the initial count text
    const withoutPrefix = banListText.split("ban(s):")[1];

    // Split by periods to separate each ban entry
    const banEntries = withoutPrefix.split(".");

    // Process each entry
    for (let entry of banEntries) {
      // Skip empty entries or null characters
      if (!entry.trim() || entry.includes("\x00")) continue;

      // Extract player name - everything before " was banned by"
      const playerName = entry.trim().split(" was banned by")[0];
      if (playerName && playerName.length > 0) {
        banned_players.push(playerName);
      }
    }
  } catch (error) {
    console.error("Error parsing ban list:", error);
  }

  console.log("Banned players:", banned_players);
  return banned_players;
}

async function loadPlayerData() {
  try {
    await $.post("/assets/commands/banlist.php", function (banListText) {
      parseBanList(banListText);
      console.log(banListText);
    });
    const response = await fetch(`http://127.0.0.1:8090/api/players`);
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }

    const data = await response.json();
    API_Data = data; // stock les données de l'api dans une variable
    console.log(API_Data);
    Name.classList.add("sortclicked"); // le bouton "name" est cliqué par défaut
    croissant.classList.add("sortclicked"); // le bouton "croissant" est cliqué par défaut
    sorted = 1; // permet aux fonctions de savoir qu'on tri par ordre croissant (l'autre est sortedreversed)
    sortedByName = 1; // permet aux fonctions de savoir qu'on tri par nom
    sortByName(); // appel tri par nom
    Init(API_Data); // chargement initial des joueurs
  } catch (error) {
    console.error("Erreur:", error);
  }
}
loadPlayerData();
/*
setTimeout(function () {
    window.location.reload(1);
}, 5000);
*/
function Init(data) {
  // ----- Copy Pasta All js files ----- //
  const playerCounter = document.getElementById("navbar-counter"); //joueur en ligne
  playerCounter.innerHTML = data.players.online;
  const playerTotal = document.getElementById("navbar-total"); //joueur maximal autorisé par le serveur
  playerTotal.innerHTML = data.players.max;
  // ----- ----------------------------- //
  const isMobile = window.matchMedia("(max-width: 768px)").matches; // si l'écran est plus petit que 768px, on considère que l'utilisateur est sur mobile
  for (const playerName in data.players.list) {
    //repet pour chaque joueur existant dans l'api
    if (data.players.list.hasOwnProperty(playerName)) {
      const player = data.players.list[playerName];
      const parent = document.querySelector("section");

      var article = document.createElement("article");
      article.className = "etiquette";
      article.setAttribute("player-id", playerName.toLowerCase());
      article.setAttribute("player-uuid", player.uuid.toLowerCase());

      var sousarticle = document.createElement("div");
      sousarticle.className = "sous-etiquette";

      var pseudo = document.createElement("a");
      pseudo.className = "username";
      pseudo.innerHTML = `${playerName}`;

      var uuid = document.createElement("p");
      uuid.className = "uuid";
      uuid.innerHTML = `UUID : ${player.uuid}`;
      uuid.id = player.uuid;

      var skin = document.createElement("canvas");
      skin.id = "player_canvas";

      // Initialiser la scène 3D
      if (initplayerScene(skin)) {
        // Charger le skin avec le nom récupéré
        loadSkinByUsername(playerName, skin);

        // Gérer le redimensionnement de la fenêtre
        //window.addEventListener("resize", handleResize);
      }

      var linkToDetailedView = document.createElement("a");
      linkToDetailedView.className = "LinkToDetailedView";
      var text = document.createElement("a");
      text.className = "text-etiquette";

      transferplayer();

      parent.appendChild(article);

      if (isMobile) {
        article.appendChild(linkToDetailedView);
        linkToDetailedView.appendChild(pseudo);
        linkToDetailedView.appendChild(skin);
        article.appendChild(sousarticle);
      } else {
        article.appendChild(linkToDetailedView);
        article.appendChild(sousarticle);

        linkToDetailedView.appendChild(skin);
        sousarticle.appendChild(text);
        text.appendChild(pseudo);
        text.appendChild(uuid);
      }

      //   ------- online / op ------- //
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

      // ban / kick buttons
      var bottom = document.createElement("div");
      bottom.className = "bottom";
      sousarticle.append(bottom);

      // banbutton
      var banbox = document.createElement("div");
      banbox.className = `banbox${playerName}`;

      var bansousbox = document.createElement("div");
      bansousbox.className = `bansousbox${playerName}`;

      var ban = document.createElement("span");
      ban.id = `banbutton${playerName}`;
      if (banned_players.includes(playerName)) {
        ban.innerHTML = "unban";
      } else {
        ban.innerHTML = "ban";
      }

      bottom.appendChild(banbox);
      banbox.appendChild(bansousbox);
      bansousbox.appendChild(ban);

      // kick button
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

          $.post("/assets/commands/kick.php", {
            name: playerName,
          });
        }
      }
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
          if (banned_players.includes(playerName)) {
            // Unban confirmation
            if (isMobile) {
              banbutton.innerText = `Vraiment ?`;
              banbutton.style = "font-size:small";
            } else {
              banbutton.innerText = `Unban ${playerName} ?`;
            }
          } else {
            // Ban confirmation
            if (isMobile) {
              banbutton.innerText = `Vraiment ?`;
              banbutton.style = "font-size:small";
            } else {
              banbutton.innerText = `Ban ${playerName} ?`;
            }
          }

          $(`.bansousbox${playerName}`).toggleClass(
            `bansousbox-clicked${playerName}`
          );
        }
        if (banclickCount === 2) {
          if (banned_players.includes(playerName)) {
            // Handle unban
            if (isMobile) {
              banbutton.innerText = `débanni`;
              banbutton.style = "font-size:large";
            } else {
              banbutton.innerText = `${playerName} débanni`;
              banbutton.style = "font-size:large";
            }

            $.post("/assets/commands/unban.php", {
              name: playerName,
            });
          } else {
            // Handle ban
            if (isMobile) {
              banbutton.innerText = `banni`;
              banbutton.style = "font-size:large";
            } else {
              banbutton.innerText = `${playerName} banni`;
              banbutton.style = "font-size:large";
            }

            $.post("/assets/commands/ban.php", {
              name: playerName,
            });
          }
        }
      }

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
      banbutton.addEventListener("click", handleBanClick);
      banbutton.addEventListener("mouseleave", resetBanButton);

      // ----- Mobile Specific ----- //

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
      //------- link beetween overview page and detailed page ------/
      function transferplayer() {
        url = "./player.php?name=" + encodeURIComponent(playerName);
        linkToDetailedView.href = url;
        pseudo.href = url;
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
  Name.classList.remove("sortclicked");
  online.classList.remove("sortclicked");
  cheating.classList.add("sortclicked");
  sortedByName = 0;
  sortedByOnline = 0;
  sortedByCheater = 1;
  reloadPlayers();
}

function sortcroissant() {
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
  croissant.classList.remove("sortclicked");
  decroissant.classList.add("sortclicked");
  if (sortedByName == 1) {
    sortByNameReverse();
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
    const playeruuid = player.getAttribute("player-uuid");
    if (playerId.includes(input) || playeruuid.includes(input)) {
      player.style.display = "";
    } else {
      player.style.display = "none";
    }
  });
}

const copied = document.getElementById("copied");
$(document).on("click", ".uuid", function () {
  const uuidText = $(this).text().split(": ")[1]; // Get the UUID part after ": "
  navigator.clipboard.writeText(uuidText);
  copied_message();
});

function copied_message() {
  copied.classList.add("open");
  setTimeout(() => {
    copied.classList.remove("open");
  }, 1500);
}

// ---------------- SKIN RENDERER ----------------- //

// Initialiser la scène Three.js
function initplayerScene(canvas) {
  try {
    // Create renderer
    const playerRenderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    playerRenderer.setSize(120, 240);
    playerRenderer.setPixelRatio(window.devicePixelRatio);

    // Create scene and camera
    const playerScene = new THREE.Scene();
    const playerCamera = new THREE.PerspectiveCamera(70, 120 / 240, 0.1, 1000);
    playerCamera.position.z = 30;
    playerCamera.position.y = -1;

    // Ajouter un éclairage
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    playerScene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    playerScene.add(directionalLight);

    // Créer un cube simple pour représenter le joueur en attendant la texture
    const playerModel = createSimpleCube(playerScene);

    // Store context
    canvas.playerContext = {
      renderer: playerRenderer,
      scene: playerScene,
      camera: playerCamera,
      model: playerModel,
    };

    // Start animation
    animate(canvas.playerContext);

    return true;
  } catch (error) {
    console.error("Erreur détaillée:", error);
    return false;
  }
}

function createSimpleCube(scene) {
  const model = new THREE.Group();

  // Create materials
  const materials = {
    head: new THREE.MeshLambertMaterial({
      color: 0x1a1a1a,
      opacity: 0.3,
      transparent: true,
    }),
    body: new THREE.MeshLambertMaterial({
      color: 0x1a1a1a,
      opacity: 0.3,
      transparent: true,
    }),
    limbs: new THREE.MeshLambertMaterial({
      color: 0x1a1a1a,
      opacity: 0.3,
      transparent: true,
    }),
  };

  // Create body parts
  const head = new THREE.Mesh(new THREE.BoxGeometry(8, 8, 8), materials.head);
  head.position.y = 10;
  model.add(head);

  const body = new THREE.Mesh(new THREE.BoxGeometry(8, 12, 4), materials.body);
  body.position.y = 0;
  model.add(body);

  const leftArm = new THREE.Mesh(
    new THREE.BoxGeometry(4, 12, 4),
    materials.limbs
  );
  leftArm.position.set(-6, 0, 0);
  model.add(leftArm);

  const rightArm = new THREE.Mesh(
    new THREE.BoxGeometry(4, 12, 4),
    materials.limbs
  );
  rightArm.position.set(6, 0, 0);
  model.add(rightArm);

  const leftLeg = new THREE.Mesh(
    new THREE.BoxGeometry(4, 12, 4),
    materials.limbs
  );
  leftLeg.position.set(-2, -12, 0);
  model.add(leftLeg);

  const rightLeg = new THREE.Mesh(
    new THREE.BoxGeometry(4, 12, 4),
    materials.limbs
  );
  rightLeg.position.set(2, -12, 0);
  model.add(rightLeg);

  scene.add(model);
  return model;
}

function animate(context) {
  const { renderer, scene, camera } = context;
  renderer.render(scene, camera);
  requestAnimationFrame(() => animate(context));
}

// Charger une texture à partir d'une URL
function loadTexture(url, callback) {
  const textureLoader = new THREE.TextureLoader();
  textureLoader.crossOrigin = "Anonymous";

  textureLoader.load(
    url,
    function (texture) {
      // Configuration pour améliorer la netteté
      texture.magFilter = THREE.NearestFilter;
      texture.minFilter = THREE.NearestFilter;
      texture.needsUpdate = true;

      if (callback) callback(texture);
    },
    // Fonction de progression (optionnelle)
    function (xhr) {
      console.log((xhr.loaded / xhr.total) * 100 + "% chargé");
    },
    // Fonction d'erreur
    function (error) {
      console.error("Erreur lors du chargement de la texture:", error);
      // Créer le modèle avec les matériaux transparents
      createSimpleCube();
    }
  );
}

// Créer une texture pour une face spécifique
function createTexture(originalTexture, x, y, width, height) {
  // Créer un canvas temporaire
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Dessiner la partie spécifique du skin sur le canvas
  ctx.drawImage(
    originalTexture.image,
    x,
    y, // Position source
    width,
    height, // Taille source
    0,
    0, // Position destination
    width,
    height // Taille destination
  );

  // Créer une nouvelle texture à partir du canvas
  const newTexture = new THREE.CanvasTexture(canvas);
  newTexture.magFilter = THREE.NearestFilter; // Définir le filtre à "nearest" pour les pixels nets
  newTexture.minFilter = THREE.NearestFilter;
  newTexture.needsUpdate = true;

  return newTexture;
}

// Créer un matériau pour une face spécifique
function createMaterialForFace(originalTexture, x, y, width, height) {
  const texture = createTexture(originalTexture, x, y, width, height);
  return new THREE.MeshLambertMaterial({
    map: texture,
    transparent: true,
  });
}

// Créer une fonction pour créer un matériau avec texture tournée
function createRotatedMaterialForFace(texture, x, y, width, height) {
  // Créer un canvas temporaire
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Dessiner d'abord la texture originale sur le canvas
  ctx.drawImage(
    texture.image,
    x,
    y, // Position source
    width,
    height, // Taille source
    0,
    0, // Position destination
    width,
    height // Taille destination
  );

  // Créer un second canvas pour la transformation finale
  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = width;
  finalCanvas.height = height;
  const finalCtx = finalCanvas.getContext("2d");

  // Appliquer la symétrie horizontale (miroir) et la rotation en une seule transformation
  finalCtx.translate(width / 2, height / 2);
  finalCtx.rotate(Math.PI); // 180 degrés en radians
  finalCtx.scale(-1, 1); // Symétrie horizontale
  finalCtx.translate(-width / 2, -height / 2);

  // Dessiner le canvas original avec les transformations appliquées
  finalCtx.drawImage(canvas, 0, 0);

  // Créer une nouvelle texture à partir du canvas transformé
  const newTexture = new THREE.CanvasTexture(finalCanvas);
  newTexture.magFilter = THREE.NearestFilter;
  newTexture.minFilter = THREE.NearestFilter;
  newTexture.needsUpdate = true;

  return new THREE.MeshLambertMaterial({
    map: newTexture,
    transparent: true,
  });
}

// Fonction pour créer un matériau pour une face spécifique de la deuxième couche
function createOverlayMaterialForFace(originalTexture, x, y, width, height) {
  const texture = createTexture(originalTexture, x, y, width, height);
  return new THREE.MeshLambertMaterial({
    map: texture,
    transparent: true,
    alphaTest: 0.1, // Ignorer les pixels presque transparents
  });
}

// Fonction pour créer un matériau avec texture tournée et symétrie axiale pour la deuxième couche
function createRotatedOverlayMaterialForFace(texture, x, y, width, height) {
  // Créer un canvas temporaire
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  // Dessiner d'abord la texture originale sur le canvas
  ctx.drawImage(
    texture.image,
    x,
    y, // Position source
    width,
    height, // Taille source
    0,
    0, // Position destination
    width,
    height // Taille destination
  );

  // Créer un second canvas pour la transformation finale
  const finalCanvas = document.createElement("canvas");
  finalCanvas.width = width;
  finalCanvas.height = height;
  const finalCtx = finalCanvas.getContext("2d");

  // Appliquer la symétrie horizontale (miroir) et la rotation en une seule transformation
  finalCtx.translate(width / 2, height / 2);
  finalCtx.rotate(Math.PI); // 180 degrés en radians
  finalCtx.scale(-1, 1); // Symétrie horizontale
  finalCtx.translate(-width / 2, -height / 2);

  // Dessiner le canvas original avec les transformations appliquées
  finalCtx.drawImage(canvas, 0, 0);

  // Créer une nouvelle texture à partir du canvas transformé
  const newTexture = new THREE.CanvasTexture(finalCanvas);
  newTexture.magFilter = THREE.NearestFilter;
  newTexture.minFilter = THREE.NearestFilter;
  newTexture.needsUpdate = true;

  return new THREE.MeshLambertMaterial({
    map: newTexture,
    transparent: true,
    alphaTest: 0.1, // Ignorer les pixels presque transparents
  });
}

// Applique la texture du skin Minecraft au modèle 3D
function applyTexture(texture, context) {
  try {
    const { scene, model } = context;

    // Supprimer l'ancien joueur s'il existe
    if (model) {
      scene.remove(model);
    }

    // Créer un groupe pour le nouveau joueur
    const playerModel = new THREE.Group();

    // Dimensions de la texture
    const textureWidth = texture.image.width;
    const textureHeight = texture.image.height;

    // Vérifier si c'est un skin de format 64x64 (nouveau format) ou 64x32 (ancien format)
    const isNewFormat = textureHeight === 64;

    // ------------------------- PREMIÈRE COUCHE (BASE) ------------------------- //
    // --- TÊTE --- //
    // CORRECTION DE L'ORDRE DES FACES
    // Le bon ordre pour BoxGeometry: [+x, -x, +y, -y, +z, -z] ou [droite, gauche, haut, bas, devant, derrière]
    const headMaterials = [
      createMaterialForFace(texture, 16, 8, 8, 8), // Droite (+x)
      createMaterialForFace(texture, 0, 8, 8, 8), // Gauche (-x)
      createMaterialForFace(texture, 8, 0, 8, 8), // Haut (+y)
      createRotatedMaterialForFace(texture, 16, 0, 8, 8), // Bas (-y)
      createMaterialForFace(texture, 8, 8, 8, 8), // Devant (+z)
      createMaterialForFace(texture, 24, 8, 8, 8), // Derrière (-z)
    ];

    // Créer la tête
    const headGeometry = new THREE.BoxGeometry(8, 8, 8);
    const head = new THREE.Mesh(headGeometry, headMaterials);
    head.position.y = 10;
    playerModel.add(head);

    // --- CORPS ---
    // CORRECTION DE L'ORDRE DES FACES DU CORPS
    const bodyMaterials = [
      createMaterialForFace(texture, 28, 20, 4, 12), // Droite (+x)
      createMaterialForFace(texture, 16, 20, 4, 12), // Gauche (-x)
      createMaterialForFace(texture, 20, 16, 8, 4), // Haut (+y)
      createMaterialForFace(texture, 28, 16, 8, 4), // Bas (-y)
      createMaterialForFace(texture, 20, 20, 8, 12), // Devant (+z)
      createMaterialForFace(texture, 32, 20, 8, 12), // Derrière (-z)
    ];

    // Créer le corps
    const bodyGeometry = new THREE.BoxGeometry(8, 12, 4);
    const body = new THREE.Mesh(bodyGeometry, bodyMaterials);
    body.position.y = 0;
    playerModel.add(body);

    // --- BRAS GAUCHE ---
    // Coordonnées UV pour le bras gauche (en fonction du format)
    let leftArmX = 40,
      leftArmY = 16;
    if (!isNewFormat) {
      leftArmX = 40;
      leftArmY = 16;
    }

    // CORRECTION DE L'ORDRE DES FACES DU BRAS GAUCHE
    const leftArmMaterials = [
      createMaterialForFace(texture, leftArmX + 8, leftArmY + 4, 4, 12), // Droite (+x)
      createMaterialForFace(texture, leftArmX + 0, leftArmY + 4, 4, 12), // Gauche (-x)
      createMaterialForFace(texture, leftArmX + 4, leftArmY + 4, 4, 4), // Haut (+y)
      createMaterialForFace(texture, leftArmX + 4, leftArmY + 16, 4, 4), // Bas (-y)
      createMaterialForFace(texture, leftArmX + 4, leftArmY + 4, 4, 12), // Devant (+z)
      createMaterialForFace(texture, leftArmX + 12, leftArmY + 4, 4, 12), // Derrière (-z)
    ];

    // Créer le bras gauche
    const leftArmGeometry = new THREE.BoxGeometry(4, 12, 4);
    const leftArm = new THREE.Mesh(leftArmGeometry, leftArmMaterials);
    leftArm.position.set(-6, 0, 0);
    playerModel.add(leftArm);

    // --- BRAS DROIT ---
    // Coordonnées UV pour le bras droit (en fonction du format)
    let rightArmX = 48,
      rightArmY = 32;
    if (isNewFormat) {
      // Le nouveau format a des textures séparées pour le bras droit
      rightArmX = 40;
      rightArmY = 16;
    }

    // CORRECTION DE L'ORDRE DES FACES DU BRAS DROIT
    const rightArmMaterials = [
      createMaterialForFace(texture, rightArmX + 0, rightArmY + 36, 4, 12), // Droite (+x)
      createMaterialForFace(texture, rightArmX + -8, rightArmY + 36, 4, 12), // Gauche (-x)
      createMaterialForFace(texture, rightArmX + 4, rightArmY + 4, 4, 4), // Haut (+y)
      createMaterialForFace(texture, rightArmX + 4, rightArmY + 16, 4, 4), // Bas (-y)
      createMaterialForFace(texture, rightArmX - 4, rightArmY + 36, 4, 12), // Devant (+z)
      createMaterialForFace(texture, rightArmX + 4, rightArmY + 36, 4, 12), // Derrière (-z)
    ];

    // Créer le bras droit
    const rightArmGeometry = new THREE.BoxGeometry(4, 12, 4);
    const rightArm = new THREE.Mesh(rightArmGeometry, rightArmMaterials);
    rightArm.position.set(6, 0, 0);
    playerModel.add(rightArm);

    // --- JAMBE GAUCHE ---
    // Coordonnées UV pour la jambe gauche (en fonction du format)
    let leftLegX = 0,
      leftLegY = 16;
    if (!isNewFormat) {
      leftLegX = 16;
      leftLegY = 48;
    }

    // CORRECTION DE L'ORDRE DES FACES DE LA JAMBE GAUCHE
    const leftLegMaterials = [
      createMaterialForFace(texture, leftLegX + 8, leftLegY + 0, 4, 12), // Droite (+x)
      createMaterialForFace(texture, leftLegX + 0, leftLegY + 4, 4, 12), // Gauche (-x)
      createMaterialForFace(texture, leftLegX + 4, leftLegY - 4, 4, 4), // Haut (+y)
      createMaterialForFace(texture, leftLegX + 8, leftLegY - 4, 4, 4), // Bas (-y)
      createMaterialForFace(texture, leftLegX + 4, leftLegY + 4, 4, 12), // Devant (+z)
      createMaterialForFace(texture, leftLegX + 12, leftLegY + 4, 4, 12), // Derrière (-z)
    ];

    // Créer la jambe gauche
    const leftLegGeometry = new THREE.BoxGeometry(4, 12, 4);
    const leftLeg = new THREE.Mesh(leftLegGeometry, leftLegMaterials);
    leftLeg.position.set(-2, -12, 0);
    playerModel.add(leftLeg);

    // --- JAMBE DROITE ---
    // Coordonnées UV pour la jambe droite (en fonction du format)
    let rightLegX = 0,
      rightLegY = 16;
    if (isNewFormat) {
      // Le nouveau format a des textures séparées pour la jambe droite
      rightLegX = 16;
      rightLegY = 48;
    }

    // CORRECTION DE L'ORDRE DES FACES DE LA JAMBE DROITE
    const rightLegMaterials = [
      createMaterialForFace(texture, rightLegX + 8, rightLegY + 4, 4, 12), // Droite (+x)
      createMaterialForFace(texture, rightLegX + 0, rightLegY + 4, 4, 12), // Gauche (-x)
      createMaterialForFace(texture, rightLegX + 4, rightLegY - 4, 4, 4), // Haut (+y)
      createMaterialForFace(texture, rightLegX + 8, rightLegY - 4, 4, 4), // Bas (-y)
      createMaterialForFace(texture, rightLegX + 4, rightLegY + 4, 4, 12), // Devant (+z)
      createMaterialForFace(texture, rightLegX + 12, rightLegY + 4, 4, 12), // Derrière (-z)
    ];

    // Créer la jambe droite
    const rightLegGeometry = new THREE.BoxGeometry(4, 12, 4);
    const rightLeg = new THREE.Mesh(rightLegGeometry, rightLegMaterials);
    rightLeg.position.set(2, -12, 0);
    playerModel.add(rightLeg);

    // ------------------------- DEUXIÈME COUCHE (OVERLAY) ------------------------- //
    // Seulement si c'est un skin au nouveau format 64x64 //
    if (isNewFormat) {
      // --- TÊTE OVERLAY (CHAPEAU) ---
      const headOverlayMaterials = [
        createOverlayMaterialForFace(texture, 48, 8, 8, 8), // Droite (+x)
        createOverlayMaterialForFace(texture, 32, 8, 8, 8), // Gauche (-x)
        createOverlayMaterialForFace(texture, 40, 0, 8, 8), // Haut (+y)
        createRotatedOverlayMaterialForFace(texture, 48, 0, 8, 8), // Bas (-y)
        createOverlayMaterialForFace(texture, 40, 8, 8, 8), // Devant (+z)
        createOverlayMaterialForFace(texture, 56, 8, 8, 8), // Derrière (-z)
      ];

      // Créer le chapeau (overlay de la tête)
      const headOverlayGeometry = new THREE.BoxGeometry(8.5, 8.5, 8.5);
      const headOverlay = new THREE.Mesh(
        headOverlayGeometry,
        headOverlayMaterials
      );
      headOverlay.position.y = 10;
      playerModel.add(headOverlay);

      // --- CORPS OVERLAY ---
      const bodyOverlayMaterials = [
        createOverlayMaterialForFace(texture, 28, 36, 4, 12), // Droite (+x)
        createOverlayMaterialForFace(texture, 16, 36, 4, 12), // Gauche (-x)
        createOverlayMaterialForFace(texture, 20, 32, 8, 4), // Haut (+y)
        createOverlayMaterialForFace(texture, 28, 32, 8, 4), // Bas (-y)
        createOverlayMaterialForFace(texture, 20, 36, 8, 12), // Devant (+z)
        createOverlayMaterialForFace(texture, 32, 36, 8, 12), // Derrière (-z)
      ];

      // Créer l'overlay du corps
      const bodyOverlayGeometry = new THREE.BoxGeometry(8.5, 12.5, 4.5);
      const bodyOverlay = new THREE.Mesh(
        bodyOverlayGeometry,
        bodyOverlayMaterials
      );
      bodyOverlay.position.y = 0;
      playerModel.add(bodyOverlay);

      // --- BRAS GAUCHE OVERLAY ---
      // Coordonnées UV pour l'overlay du bras gauche
      const leftArmOverlayX = 40,
        leftArmOverlayY = 32;

      const leftArmOverlayMaterials = [
        createOverlayMaterialForFace(
          texture,
          leftArmOverlayX + 8,
          leftArmOverlayY + 4,
          4,
          12
        ), // Droite (+x)
        createOverlayMaterialForFace(
          texture,
          leftArmOverlayX + 0,
          leftArmOverlayY + 4,
          4,
          12
        ), // Gauche (-x)
        createOverlayMaterialForFace(
          texture,
          leftArmOverlayX + 4,
          leftArmOverlayY + 0,
          4,
          4
        ), // Haut (+y)
        createOverlayMaterialForFace(
          texture,
          leftArmOverlayX + 8,
          leftArmOverlayY + 0,
          4,
          4
        ), // Bas (-y)
        createOverlayMaterialForFace(
          texture,
          leftArmOverlayX + 4,
          leftArmOverlayY + 4,
          4,
          12
        ), // Devant (+z)
        createOverlayMaterialForFace(
          texture,
          leftArmOverlayX + 12,
          leftArmOverlayY + 4,
          4,
          12
        ), // Derrière (-z)
      ];

      // Créer l'overlay du bras gauche
      const leftArmOverlayGeometry = new THREE.BoxGeometry(4.5, 12.5, 4.5);
      const leftArmOverlay = new THREE.Mesh(
        leftArmOverlayGeometry,
        leftArmOverlayMaterials
      );
      leftArmOverlay.position.set(-6, 0, 0);
      playerModel.add(leftArmOverlay);

      // --- BRAS DROIT OVERLAY ---
      // Coordonnées UV pour l'overlay du bras droit
      const rightArmOverlayX = 48,
        rightArmOverlayY = 48;

      const rightArmOverlayMaterials = [
        createOverlayMaterialForFace(
          texture,
          rightArmOverlayX + 8,
          rightArmOverlayY + 4,
          4,
          12
        ), // Droite (+x)
        createOverlayMaterialForFace(
          texture,
          rightArmOverlayX + 0,
          rightArmOverlayY + 4,
          4,
          12
        ), // Gauche (-x)
        createOverlayMaterialForFace(
          texture,
          rightArmOverlayX + 4,
          rightArmOverlayY + 0,
          4,
          4
        ), // Haut (+y)
        createOverlayMaterialForFace(
          texture,
          rightArmOverlayX + 8,
          rightArmOverlayY + 0,
          4,
          4
        ), // Bas (-y)
        createOverlayMaterialForFace(
          texture,
          rightArmOverlayX + 4,
          rightArmOverlayY + 4,
          4,
          12
        ), // Devant (+z)
        createOverlayMaterialForFace(
          texture,
          rightArmOverlayX + 12,
          rightArmOverlayY + 4,
          4,
          12
        ), // Derrière (-z)
      ];

      // Créer l'overlay du bras droit
      const rightArmOverlayGeometry = new THREE.BoxGeometry(4.5, 12.5, 4.5);
      const rightArmOverlay = new THREE.Mesh(
        rightArmOverlayGeometry,
        rightArmOverlayMaterials
      );
      rightArmOverlay.position.set(6, 0, 0);
      playerModel.add(rightArmOverlay);

      // --- JAMBE GAUCHE OVERLAY ---
      // Coordonnées UV pour l'overlay de la jambe gauche
      const leftLegOverlayX = 0,
        leftLegOverlayY = 32;

      const leftLegOverlayMaterials = [
        createOverlayMaterialForFace(
          texture,
          leftLegOverlayX + 8,
          leftLegOverlayY + 4,
          4,
          12
        ), // Droite (+x)
        createOverlayMaterialForFace(
          texture,
          leftLegOverlayX + 0,
          leftLegOverlayY + 4,
          4,
          12
        ), // Gauche (-x)
        createOverlayMaterialForFace(
          texture,
          leftLegOverlayX + 4,
          leftLegOverlayY + 0,
          4,
          4
        ), // Haut (+y)
        createOverlayMaterialForFace(
          texture,
          leftLegOverlayX + 8,
          leftLegOverlayY + 0,
          4,
          4
        ), // Bas (-y)
        createOverlayMaterialForFace(
          texture,
          leftLegOverlayX + 4,
          leftLegOverlayY + 4,
          4,
          12
        ), // Devant (+z)
        createOverlayMaterialForFace(
          texture,
          leftLegOverlayX + 12,
          leftLegOverlayY + 4,
          4,
          12
        ), // Derrière (-z)
      ];

      // Créer l'overlay de la jambe gauche
      const leftLegOverlayGeometry = new THREE.BoxGeometry(4.5, 12.5, 4.5);
      const leftLegOverlay = new THREE.Mesh(
        leftLegOverlayGeometry,
        leftLegOverlayMaterials
      );
      leftLegOverlay.position.set(-2, -12, 0);
      playerModel.add(leftLegOverlay);

      // --- JAMBE DROITE OVERLAY ---
      // Coordonnées UV pour l'overlay de la jambe droite
      const rightLegOverlayX = 0,
        rightLegOverlayY = 48;

      const rightLegOverlayMaterials = [
        createOverlayMaterialForFace(
          texture,
          rightLegOverlayX + 8,
          rightLegOverlayY + 4,
          4,
          12
        ), // Droite (+x)
        createOverlayMaterialForFace(
          texture,
          rightLegOverlayX + 0,
          rightLegOverlayY + 4,
          4,
          12
        ), // Gauche (-x)
        createOverlayMaterialForFace(
          texture,
          rightLegOverlayX + 4,
          rightLegOverlayY + 0,
          4,
          4
        ), // Haut (+y)
        createOverlayMaterialForFace(
          texture,
          rightLegOverlayX + 8,
          rightLegOverlayY + 0,
          4,
          4
        ), // Bas (-y)
        createOverlayMaterialForFace(
          texture,
          rightLegOverlayX + 4,
          rightLegOverlayY + 4,
          4,
          12
        ), // Devant (+z)
        createOverlayMaterialForFace(
          texture,
          rightLegOverlayX + 12,
          rightLegOverlayY + 4,
          4,
          12
        ), // Derrière (-z)
      ];

      // Créer l'overlay de la jambe droite
      const rightLegOverlayGeometry = new THREE.BoxGeometry(4.5, 12.5, 4.5);
      const rightLegOverlay = new THREE.Mesh(
        rightLegOverlayGeometry,
        rightLegOverlayMaterials
      );
      rightLegOverlay.position.set(2, -12, 0);
      playerModel.add(rightLegOverlay);
    }

    // Ajouter le joueur à la scène
    scene.add(playerModel);
    context.model = playerModel;
  } catch (error) {
    console.error("Erreur détaillée:", error);
    createSimpleCube(context.scene); // Fallback au cube simple en cas d'erreur
  }
}

// Charger le skin par nom d'utilisateur
function loadSkinByUsername(username, canvas) {
  if (!username || !canvas.playerContext) {
    console.error("Invalid username or canvas context");
    return;
  }

  const skinUrl = `https://mc-heads.net/skin/${encodeURIComponent(username)}`;

  loadTexture(skinUrl, function (texture) {
    if (texture && canvas.playerContext) {
      applyTexture(texture, canvas.playerContext);
    }
  });
}
