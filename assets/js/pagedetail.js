// Fonction pour obtenir le nom du joueur depuis l'URL
function getPlayerNameFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get("name");
}

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

// Fonction pour mettre à jour l'interface utilisateur avec les données du joueur
  function updatePlayerUI(playerData) {
    var article_general = document.createElement("div");
    article_general.className = "stats_general";
    
    // Mise à jour du pseudo
    var pseudo = document.createElement("p");
    pseudo.className = "username";
    pseudo.innerHTML = `${playerName}`;

    // Mise à jour de l'uuid
    var uuid = document.createElement("p");
    uuid.className = "uuid";
    uuid.innerHTML = `UUID : ${player.uuid}`;

    // Mise à jour de l'activité
    const statusText = `En ligne : ${playerData.status === "online" ? "Oui" : "Non"}`;

    //Date de la première connexion
    /*var date_premiere_connexion = document.createElement("p");
    date_premiere_connexion = "date_premiere_connexion";
    date_premiere_connexion.innerHTML = `Date de la première connexion : ${player.}`*/






    // Calcul des niveaux avec icônes
    const protectionLevel = getIconString(20, 20, "🛡️"); // Maximum protection assumed as 20
    const healthLevel = getIconString(playerData.health, 20, "❤️");
    const foodLevel = getIconString(playerData.food, 20, "🍗");

    // Mise à jour du contenu
    infosJoueur.innerHTML = `
        <br><br><br>${uuidText}
        <br><br>${statusText}
        <br><br>Niveau de protection : ${protectionLevel}
        <br><br>Niveau de vie : ${healthLevel}
        <br><br>Niveau de faim : ${foodLevel}
        <br><br>Dernière connexion : ${formatDate(playerData.lastSeen)}
    `;

    // Mise à jour de l'image du skin
    const skinImage = document.querySelector(".img_joueur");
    if (skinImage) {
      // Vous pouvez utiliser un service de skin Minecraft comme ceci:
      skinImage.src = `https://crafatar.com/renders/body/${playerData.uuid}?overlay=true`;
    }

    stats_general.appendChild(text);
    text.appendChild(pseudo);
    text.appendChild(uuid);
  }





  // Fonction principale pour charger les données du joueur
  async function loadPlayerData() {
    const playerName = getPlayerNameFromURL();

    if (!playerName) {
      console.error("Nom du joueur non spécifié dans l'URL");
      return;
    }

    try {
      const response = await fetch(
        `http://arthonetwork.fr:8001/apiP?player=${playerName}`
      );
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }

      const playerData = await response.json();
      updatePlayerUI(playerData);
    } catch (error) {
      console.error("Erreur:", error);
    }
  }

  document.addEventListener("DOMContentLoaded", loadPlayerData);
