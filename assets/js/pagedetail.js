// Fonction pour obtenir le nom du joueur depuis l'URL
function getPlayerNameFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("name");
}


/*
// Fonction pour convertir la valeur numérique en icônes
function getIconString(value, maxValue, icon) {
  const iconCount = Math.round((value / maxValue) * 10);
  return icon.repeat(iconCount);
}

function formatDate(timestamp) {
  const date = new Date(timestamp);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
*/
// Fonction pour mettre à jour l'interface utilisateur avec les données du joueur
function updatePlayerUI(player) {
  const playerName = getPlayerNameFromURL();

  // Mise à jour du pseudo
  var pseudo = document.getElementById("pseudo");
  pseudo.innerHTML = `${playerName}`;

  // Mise à jour de l'uuid
  var uuid = document.getElementById("uuid_player");
  uuid.innerHTML = `<b>UUID</b> : ${player.uuid}`;

  // Mise à jour de l'activité
  var status = document.getElementById("status_player");
  status.innerHTML = `<b>En ligne : </b>${
    player.status === "online" ? "Oui" : "Non"
  }`;

  // Mise à jour du mode de jeu
  var gamemode = document.getElementById("gamemode_player");
  gamemode.innerHTML = `<b>Mode de jeu</b> : ${player.gamemode}`;

  // Vie
  const infosJoueur = document.getElementById("barre_statistiques");
  const health_bar = document.createElement("div");
  health_bar.id='health_bar'
  infosJoueur.appendChild(health_bar);
  if (player.health % 2 == 0) {
    for (let i = 0; i < player.health/2; i++) {
      const health = document.createElement("img");
      health.src =
        "assets/img/minecraft/textures/gui/sprites/hud/heart/full.png";
      health_bar.appendChild(health);
    }
  } else {
    for (let i = 0; i < player.health/2 - 1; i++) {
      const health = document.createElement("img");
      health.src =
        "assets/img/minecraft/textures/gui/sprites/hud/heart/full.png";
      health_bar.appendChild(health);
    }
    const health = document.createElement("img");
    health.src = "assets/img/minecraft/textures/gui/sprites/hud/heart/half.png";
    health_bar.appendChild(health);
  }
  const health_value = document.createElement("p");
  health_value.innerHTML = player.health/2;
  health_value.id="health_value"
  infosJoueur.appendChild(health_value)

  // Food
  const food_bar = document.createElement("div");
  food_bar.id='food_bar'
  infosJoueur.appendChild(food_bar);
  if (player.food % 2 == 0) {
    for (let i = 0; i < player.food/2; i++) {
      const food = document.createElement("img");
      food.src = "assets/img/minecraft/textures/gui/sprites/hud/food_full.png";
      food_bar.appendChild(food);
    }
  } else {
    for (let i = 0; i < player.food/2 - 1; i++) {
      const food = document.createElement("img");
      food.src = "assets/img/minecraft/textures/gui/sprites/hud/food_full.png";
      food_bar.appendChild(food);
    }
    const food = document.createElement("img");
    food.src = "assets/img/minecraft/textures/gui/sprites/hud/food_half.png";
    food_bar.appendChild(food);
  }
  const food_value = document.createElement("p");
  food_value.innerHTML = player.food/2;
  food_value.id="food_value"
  infosJoueur.appendChild(food_value)
  // Armor
  /*
  const armor_bar = document.createElement("div");
  infosJoueur.appendChild(armor_bar);
  if (player.protection % 2 == 0) {
    for (let i = 0; i < player.protection; i++) {
      const health = document.createElement("img");
      protection.src =
        "assets/img/minecraft/textures/gui/sprites/hud/armor_full.png";
      armor_bar.appendChild(protection);
    }
  } else {
    for (let i = 0; i < player.protection - 1; i++) {
      const protection = document.createElement("img");
      health.src =
        "assets/img/minecraft/textures/gui/sprites/hud/armor_half.png";
      armor_bar.appendChild(protection);
    }
  }


  //Date de la première connexion
  /*var date_premiere_connexion = document.createElement("p");
    date_premiere_connexion = "date_premiere_connexion";
    date_premiere_connexion.innerHTML = `Date de la première connexion : ${player.}`*/

  // Mise à jour de l'image du skin
  /*
    const skinImage = document.querySelector(".img_joueur");
    if (skinImage) {
      // Vous pouvez utiliser un service de skin Minecraft comme ceci:
      skinImage.src = ``;
    }*/
}
function Inventory(player) {
  const inventory = document.getElementById("inventory");
  inventory.id = "inventory";
  const armor = document.createElement("div");
  armor.id = "armor";
  const inventory_box = document.createElement("div");

  inventory.appendChild(armor);
  inventory.appendChild(inventory_box);
  const inventory_content = document.createElement("div");
  inventory_content.id = "inventory_content";
  inventory_box.appendChild(inventory_content);
  let i = 39;
  while (i >= 36) {
    const armor_item = document.createElement("div");
    const armorImage = document.createElement("img");
    const item_slot = player.inventory.find((x) => x.slot === i)?.slot;
    if (item_slot != null) {
      armorImage.src = `assets/img/inventory ico/${
        player.inventory.find((x) => x.slot === i)?.type
      }.png`;
      armor_item.appendChild(armorImage);
      armor_item.className = "armor_item";
      armor.appendChild(armor_item);
    } else {
      armorImage.src = `assets/img/inventory ico/canUse_unknown.png`;
      armor_item.appendChild(armorImage);
      armor_item.className = "armor_item";
      armor.appendChild(armor_item);
    }
    i--;
  }
  for (let i = 9; i < 36; i++) {
    const item = document.createElement("div");
    const itemImage = document.createElement("img");
    const item_slot = player.inventory.find((x) => x.slot === i)?.slot;
    if (item_slot != null) {
      itemImage.src = `assets/img/inventory ico/${
        player.inventory.find((x) => x.slot === i)?.type
      }.png`;
      item.appendChild(itemImage);
      item.className = "item";
      inventory_content.appendChild(item);
      const itemText = document.createElement("p");
      if (player.inventory.find((x) => x.slot === i)?.amount != 1) {
        itemText.innerHTML = `${
          player.inventory.find((x) => x.slot === i)?.amount
        }`;
        itemText.className = "item_text";
        item.appendChild(itemText);
      }
    } else {
      itemImage.src = `assets/img/inventory ico/canUse_unknown.png`;
      item.appendChild(itemImage);
      item.className = "item";
      inventory_content.appendChild(item);
    }
  }
  const hotbar = document.createElement("div");
  hotbar.id = "hotbar";
  inventory_box.appendChild(hotbar);
  for (let i = 0; i < 9; i++) {
    const item = document.createElement("div");
    const itemImage = document.createElement("img");
    const item_slot = player.inventory.find((x) => x.slot === i)?.slot;
    if (item_slot != null) {
      itemImage.src = `assets/img/inventory ico/${
        player.inventory.find((x) => x.slot === i)?.type
      }.png`;
      item.appendChild(itemImage);
      item.className = "item";
      hotbar.appendChild(item);
      const itemText = document.createElement("p");
      if (player.inventory.find((x) => x.slot === i)?.amount != 1) {
        itemText.innerHTML = `${
          player.inventory.find((x) => x.slot === i)?.amount
        }`;
        itemText.className = "item_text";
        item.appendChild(itemText);
      }
    } else {
      itemImage.src = `assets/img/inventory ico/canUse_unknown.png`;
      item.appendChild(itemImage);
      item.className = "item";
      hotbar.appendChild(item);
    }
  }
}

async function loadPlayerData() {
  const playerName = getPlayerNameFromURL();

  if (!playerName) {
    console.error("Nom du joueur non spécifié dans l'URL");
    return;
  }

  try {
    const response = await fetch(
        `http://127.0.0.1:8090/api/player/${playerName}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      const playerData = await response.json();
    updatePlayerUI(playerData);
    Inventory(playerData);
    console.log(playerData.uuid);
    localStorage.setItem('uuid',  playerData.uuid);
  } catch (error) {
    console.error("Erreur:", error);
  }
}

document.addEventListener("DOMContentLoaded", loadPlayerData);
