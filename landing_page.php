<?php session_start(); ?>

<!DOCTYPE html>
<html lang="fr" ng-app="mySuperApp">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link href="assets/css/styles.css" rel="stylesheet" />
    <link rel="icon" href="assets/img/ico.png" />
    <title>Landing Step</title>
  </head>
  <body id="landing_body">
    <div id="Step1" class="landing">
      <div class="neon-block">
        <div class="block">
          <span class="rainbow"></span>
          <p class="Titre">Bienvenue !</p>
          <p>
            Ceci est un tutoriel d'introduction au mécanique fondamental du
            plugin
          </p>
        </div>
      </div>
    </div>
    <div id="Step2">
      <div class="neon-block">
        <div class="block">
          <div class="landing">
            <p class="Titre">L'interface</p>
          </div>
        </div>
      </div>
      <nav>
        <div id="navbar-left">
          <img src="assets/img/ico.webp" alt="Icon" id="icon" />
          <div id="counter">
            <span id="navbar-counter">290</span> /
            <span id="navbar-total">1000</span> en ligne
          </div>
        </div>
        <div id="navbar-center">
      <a href="#" id="alreadyhere"><span id="title" id="alreadyhere">Overview</span></a>
      <?php if (isset($_SESSION['username'])): ?>
        <!-- Si l'utilisateur est connecté -->
        <span class="user-info" id="title_2">Connected as <?= htmlspecialchars($_SESSION['username']) ?></span>
      <?php else: ?>
        <!-- Si l'utilisateur n'est pas connecté -->
        <a href="login.php" id="title_2">Sign in</a>
        <a href="register.php" id="title_2">Register</a>
      <?php endif; ?>
    </div>
        <div id="navbar-right">
          <div id="searchclick" class="searchclick">
            <div id="searchbar" class="searchbar">
              <input
                type="text"
                class="search"
                id="search"
                placeholder="Search..."
                onkeyup="searchPlayers()"
              />
              <div id="searchicon">&#8981;</div>
            </div>
            <svg
              id="sorticon"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              class="bi bi-funnel sorticon"
              viewBox="0 0 16 16"
            >
              <path
                d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z"
              />
            </svg>
            <div id="sortergroup" class="sortergroup">
              <div id="curved-corner-bottomright"></div>
              <div id="curved-corner-bottomleft"></div>
              <div id="sorter">
                <div id="sortername">
                  <div id="name">Nom</div>
                  <div id="online">en ligne</div>
                  <div id="cheating">cheating</div>
                </div>
                <div id="sortertype">
                  <div id="croissant">croissant</div>
                  <div id="decroissant">décroissant</div>
                </div>
              </div>
            </div>
          </div>
          <p id="menu-btn">&#9776;</p>
        </div>
      </nav>

      <div class="overlay" id="overlay-menu">
        <div class="overlay-content">
          <a href="#">Home</a>
          <a href="#">About</a>
          <a href="#">Contact</a>
          <a href="settings.php">Settings</a>
          <a href="logout.php">Logout</a>
          <a href="landing_page.php">Tutorial</a>
        </div>
      </div>

      <div class="overlay-bg" id="overlay-bg"></div>
    </div>
    <div id="Step3" class="landing">
      <p class="Titre">les joueurs</p>
      <section id="playertuto"></section>
      <article class="etiquette">
        <img class="skin" src="assets/img/body.png" alt="Skin du joueur" />
        <div class="sous-etiquette">
          <div class="text-etiquette">
            <a href="#" class="username">pseudo</a>
            <p class="uuid">UUID : h934f227c68h4decaib7c6239deidae2</p>
            <a href="#" class="version">Version : 1.16.2</a>
          </div>
          <div class="bottom">
            <div class="banbox">
              <div class="bansousbox">
                <span id="banbutton">ban</span>
              </div>
            </div>
            <div class="kickbox">
              <div class="kicksousbox">
                <span id="kickbutton">Kick</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
    <p id="copied">UUID copié dans le presse papier</p>
    <div id="btn_Tutorial">
      <a href="#" id="prevBtn" class="btn_Tutorial">&larr; Précédent</a>
      <a href="#" id="nextBtn" class="btn_Tutorial">Suivant →</a>
    </div>
  </body>
  <script
    type="text/javascript"
    src="https://code.jquery.com/jquery-1.7.1.min.js"
  ></script>
  <script src="assets/js/landing_page.js"></script>
  <script src="assets/js/apituto.js"></script>
</html>
