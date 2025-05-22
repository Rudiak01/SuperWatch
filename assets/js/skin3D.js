// Variables globales
let scene,
  camera,
  renderer,
  player,
  animationId,
  isSlim = false;
const canvas = document.getElementById("player_canvas");
const statusElement = document.getElementById("status");

// Afficher les messages d'état
function setStatus(message, isError = false) {
  const statusElement = document.getElementById("status");
  if (statusElement) {
    statusElement.textContent = message;
    statusElement.style.color = isError ? "#ff6b6b" : "#4dc0b5";
  }
  console.log(isError ? "Erreur: " : "Info: ", message);
}

// Initialiser la scène Three.js
function initScene() {
  try {
    // Vérifier que Three.js est chargé
    if (typeof THREE === "undefined") {
      setStatus("La bibliothèque Three.js n'est pas chargée.", true);
      return false;
    }

    // Créer le renderer
    renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Amélioration de la netteté

    // Créer la scène
    scene = new THREE.Scene();
    renderer.setClearColor(new THREE.Color(0 / 255, 120 / 255, 215 / 255), 0.7);

    // Créer la caméra
    camera = new THREE.PerspectiveCamera(
      70,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 30;
    camera.position.y = -1;

    // Ajouter un éclairage
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Créer un cube simple pour représenter le joueur en attendant la texture
    createSimpleCube();

    // Démarrer l'animation
    animate();

    return true;
  } catch (error) {
    setStatus(
      "Erreur lors de l'initialisation de la scène: " + error.message,
      true
    );
    console.error("Erreur détaillée:", error);
    return false;
  }
}

// Créer un cube simple pour représenter le joueur
function createSimpleCube() {
  // Supprimer l'ancien joueur s'il existe
  if (player) {
    scene.remove(player);
  }

  // Créer un groupe pour contenir le joueur
  player = new THREE.Group();

  // Créer les parties du corps avec des cubes colorés
  const headMaterial = new THREE.MeshLambertMaterial({
    color: 0x1a1a1a, /// Noir
    opacity: 0.3,
    transparent: true,
  });

  const bodyMaterial = new THREE.MeshLambertMaterial({
    color: 0x1a1a1a, // Noir
    opacity: 0.3,
    transparent: true,
  });

  const limbsMaterial = new THREE.MeshLambertMaterial({
    color: 0x1a1a1a, // Noir
    opacity: 0.3,
    transparent: true,
  });

  // Tête
  const headGeometry = new THREE.BoxGeometry(8, 8, 8);
  const head = new THREE.Mesh(headGeometry, headMaterial);
  head.position.y = 10;
  player.add(head);

  // Corps
  const bodyGeometry = new THREE.BoxGeometry(8, 12, 4);
  const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
  body.position.y = 0;
  player.add(body);

  // Bras
  const armGeometry = new THREE.BoxGeometry(4, 12, 4);
  const leftArm = new THREE.Mesh(armGeometry, limbsMaterial);
  leftArm.position.set(-6, 0, 0);
  player.add(leftArm);

  const rightArm = new THREE.Mesh(armGeometry, limbsMaterial);
  rightArm.position.set(6, 0, 0);
  player.add(rightArm);

  // Jambes
  const legGeometry = new THREE.BoxGeometry(4, 12, 4);
  const leftLeg = new THREE.Mesh(legGeometry, limbsMaterial);
  leftLeg.position.set(-2, -12, 0);
  player.add(leftLeg);

  const rightLeg = new THREE.Mesh(legGeometry, limbsMaterial);
  rightLeg.position.set(2, -12, 0);
  player.add(rightLeg);

  // Ajouter le joueur à la scène
  scene.add(player);
}

// Animation de rotation du joueur
function animate() {
  animationId = requestAnimationFrame(animate);
  if (player) {
    player.rotation.y += 0.01;
  }
  renderer.render(scene, camera);
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
      setStatus("Erreur lors du chargement de la texture", true);
      // Créer le modèle avec les matériaux transparents
      createSimpleCube();
    }
  );
}

// Créer une texture pour une face spécifique
function createTexture(originalTexture, x, y, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");

  ctx.drawImage(
    originalTexture.image,
    x,
    y,
    width,
    height,
    0,
    0,
    width,
    height
  );

  const newTexture = new THREE.CanvasTexture(canvas);
  newTexture.magFilter = THREE.NearestFilter;
  newTexture.minFilter = THREE.NearestFilter;
  newTexture.needsUpdate = true;

  return newTexture;
}

// Nouvelle fonction pour détecter le modèle slim
function detectSlimModel(texture) {
  const canvas = document.createElement("canvas");
  canvas.width = 64;
  canvas.height = 64;
  const ctx = canvas.getContext("2d");

  // Dessiner l'image complète
  ctx.drawImage(texture.image, 0, 0);

  // Vérifier la zone spécifique du bras (pixel transparent à 47,52)
  const imageData = ctx.getImageData(47, 52, 1, 1);
  return imageData.data[3] === 0; // Si alpha = 0, c'est un modèle slim
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
function applyTexture(texture) {
  try {
    if (player) {
      scene.remove(player);
    }

    player = new THREE.Group();

    if (!texture.image || !texture.image.width) {
      setStatus("Texture non valide ou non chargée", true);
      return;
    }

    // Détecter si c'est un modèle slim avant de continuer
    isSlim = detectSlimModel(texture);
    console.log("Modèle slim détecté:", isSlim);

    // Dimensions de la texture
    const textureWidth = texture.image.width;
    const textureHeight = texture.image.height;

    // Vérifier si c'est un skin de format 64x64 (nouveau format) ou 64x32 (ancien format)
    const isNewFormat = textureHeight === 64;

    // ------------------------- PREMIÈRE COUCHE (BASE) -------------------------//
    // --- TÊTE ---//
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
    player.add(head);

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
    player.add(body);

    // --- BRAS GAUCHE ---
    // Coordonnées UV pour le bras gauche (en fonction du format)

    if (isSlim == true) {
      var leftArmX = 38,
        leftArmY = 16;
      if (!isNewFormat) {
        leftArmX = 38;
        leftArmY = 20;
      }
    } else {
      var leftArmX = 40,
        leftArmY = 16;
      if (!isNewFormat) {
        leftArmX = 40;
        leftArmY = 20;
      }
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
    player.add(leftArm);

    // --- BRAS DROIT ---
    // Coordonnées UV pour le bras droit (en fonction du format)

    if (isSlim == true) {
      var rightArmX = 46,
        rightArmY = 32;
      if (isNewFormat) {
        // Le nouveau format a des textures séparées pour le bras droit
        rightArmX = 38;
        rightArmY = 16;
      }
    } else {
      var rightArmX = 48,
        rightArmY = 32;
      if (isNewFormat) {
        // Le nouveau format a des textures séparées pour le bras droit
        rightArmX = 40;
        rightArmY = 16;
      }
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
    player.add(rightArm);

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
    player.add(leftLeg);

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
    player.add(rightLeg);

    // ------------------------- DEUXIÈME COUCHE (OVERLAY) -------------------------
    // Seulement si c'est un skin au nouveau format 64x64
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
      player.add(headOverlay);

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
      player.add(bodyOverlay);

      // --- BRAS GAUCHE OVERLAY ---
      // Coordonnées UV pour l'overlay du bras gauche
      if (isSlim == true) {
        var leftArmOverlayX = 38,
          leftArmOverlayY = 32;
      } else {
        var leftArmOverlayX = 40,
          leftArmOverlayY = 32;
      }
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
      player.add(leftArmOverlay);

      // --- BRAS DROIT OVERLAY ---
      // Coordonnées UV pour l'overlay du bras droit
      if (isSlim == true) {
        var rightArmOverlayX = 46,
          rightArmOverlayY = 48;
      } else {
        var rightArmOverlayX = 48,
          rightArmOverlayY = 48;
      }
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
      player.add(rightArmOverlay);

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
      player.add(leftLegOverlay);

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
      player.add(rightLegOverlay);
    }

    // Ajouter le joueur à la scène
    scene.add(player);
  } catch (error) {
    setStatus(
      "Erreur lors de l'application de la texture: " + error.message,
      true
    );
    console.error("Erreur détaillée:", error);
    createSimpleCube(); // Fallback au cube simple en cas d'erreur
  }
}

// Fonction pour obtenir le pseudo depuis l'URL
function getPlayerNameFromURL() {
  const urlParams = new URLSearchParams(window.location.search);
  const name = urlParams.get("name");
  return name || "^^^^^^^^^^^^^^^^"; // Valeur par défaut si aucun nom n'est spécifié
}

// Gestion du redimensionnement de la fenêtre
function handleResize() {
  if (camera && renderer) {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio); // Conserver le ratio de pixels lors du redimensionnement
  }
}

// Nettoyer la scène si nécessaire
function cleanupScene() {
  if (animationId) {
    cancelAnimationFrame(animationId);
  }
}

// Initialiser tout au chargement de la page
window.addEventListener("load", function () {
  // Initialiser la scène 3D
  if (initScene()) {
    // Récupérer le nom du joueur depuis l'URL
    const playerName = getPlayerNameFromURL();

    const playerUUID = localStorage.getItem("uuid");
    loadSkinByUUID(playerName);

    // Mettre à jour le titre de la page
    document.title = `Joueur - ${playerName}`;

    // Gérer le redimensionnement de la fenêtre
    window.addEventListener("resize", handleResize);
  }
});

// Nettoyer avant de quitter la page
window.addEventListener("unload", cleanupScene);

async function loadSkinByUUID(playerName) {
  const uuid = localStorage.getItem("uuid");
  if (!uuid) {
    console.error("No UUID found in localStorage");
    return null;
  }

  try {
    // Format UUID without hyphens for mc-heads.net
    const cleanUUID = uuid.replace(/-/g, "");

    // Use mc-heads.net as it supports CORS and provides skins directly
    const skinUrl = `https://mc-heads.net/skin/${playerName}`;

    loadTexture(skinUrl, function (texture) {
      if (texture) {
        applyTexture(texture);
      } else {
        throw new Error("Failed to load texture, using default");
        texture;
      }
    });
  } catch (error) {
    console.error("Error loading skin:", error);
    createSimpleCube(); // Fallback to simple cube
    return null;
  }
}
