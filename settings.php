<?php session_start(); ?>

<!DOCTYPE html>
<html lang="fr">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="assets/css/styles.css" rel="stylesheet" />
    <link rel="icon" href="assets/img/ico.png" />
    <title>SuperWatch</title>
  </head>

  <body id="body">
    <nav>
      <div id="navbar-left">
        <img src="assets/img/ico.png" alt="Icon" id="icon" />
      </div>
      <div id="navbar-center">
      <a href="index.php" id="alreadyhere"><span id="title" id="alreadyhere">Overview</span></a>
      <?php if (isset($_SESSION['username'])): ?>
        <!-- Si l'utilisateur est connecté -->
        <span class="user-info" id="title_2">Connected as <?= htmlspecialchars($_SESSION['username']) ?></span>
      <?php else: ?>
        <!-- Si l'utilisateur n'est pas connecté -->
        <a href="login.php" id="title_2">Sign in</a>
        <a href="register.php" id="title_2">Register</a>
      <?php endif; ?>
    </div>
      <div id="navbar-right"></div>
      <button id="menu-btn">&#9776;</button>
    </nav>
    <div class="overlay" id="overlay-menu">
      <div class="overlay-content">
        <a href="index.php">Home</a>
        <a href="#">About</a>
        <a href="#">Contact</a>
        <a href="#">Settings</a>
        <a href="logout.php">Logout</a>
        <a href="landing_page.php">Tutorial</a>
      </div>
    </div>

    <div class="overlay-bg" id="overlay-bg"></div>

    <main id="main" class="settings">
      <div>
        <h1>général</h1>
        <div>
          <label for="theme">Thème</label>
          <select id="theme" class="noir">
            <option value="light">Clair</option>
            <option value="dark">Sombre</option>
          </select>
          <button id="theme-btn" class="noir">Appliquer</button>
          <button id="reset-btn" class="noir">Réinitialiser</button>
        </div>
      </div>
      <div>
        <h1>accessibilité</h1>
        <button id="contrast" onclick="getContrast()">Générer</button>
        <div>
          <label for="contrast" >Contraste</label>
          <input type="range" id="contrast" min="1" max="100" />
          <span id="contrast-value"></span>
        </div>
        <div>
          <label for="font-size">Taille de police</label>
          <input type="range" id="font-size" min="0.5" max="2" />
          <span id="font-size-value"></span>
        </div>
      </div>
      <div>
        <h1>token</h1>
        <div>
          <label for="token-input">Token</label>
          <input type="text" id="token-input" />
          <button id="generate-btn">Générer</button>
      </div>
    </main>
    <footer></footer>
    <script
      type="text/javascript"
      src="https://code.jquery.com/jquery-1.7.1.min.js"
    ></script>
    <script src="assets/js/navbar.js"></script>
    <script src="assets/js/settings.js"></script>
  </body>
</html>
