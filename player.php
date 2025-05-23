<?php session_start(); ?>
<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="assets/css/styles.css" rel="stylesheet" />
  <link rel="icon" href="assets/img/ico.webp" />
  <title>SuperWatch</title>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r119/three.min.js"></script>
</head>

<body>
  <nav>
    <div id="navbar-left">
      <img src="assets/img/ico.webp" alt="Icon" id="icon" />
    </div>
    <div id="navbar-center">
      <a href="index.php" class="no-style"><span id="title">Overview</span></a>
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
      <button id="menu-btn">&#9776;</button>
    </div>
  </nav>

  <div class="overlay-bg" id="overlay-bg"></div>

  <div class="overlay" id="overlay-menu">
    <div class="overlay-content">
      <a href="index.php">Home</a>
      <a href="https://superwatch.arthonetwork.fr/" target="_blank">About</a>
      <a href="#">Contact</a>
      <a href="settings.php">Settings</a>
      <a href="logout.php">Logout</a>
    </div>
  </div>

  <main>
    <section id="Main_Info">
      <div class="container">
        <div class="skin-viewer">
          <canvas id="player_canvas"></canvas>
        </div>
      </div>
      <article class="etiquette_info">
        <div class="infos_joueur flex-container">
          <div id="pseudo">?</div>
          <p id="uuid_player"><b>UUID :</b> ?</p>
          <p id="status_player"><b>En ligne :</b> ?</p>
          <p id="gamemode_player"><b>Mode de jeu :</b> ?</p>
          <div id="barre_statistiques"></div>
          <p id="time_played"><b>Temps de jeu :</b> 5j 21h 52m</p>
          <p id="lastSeen"><b>Connexion :</b> ?</p>
        </div>
      </article>
    </section>
    <section id="inventory"></section>
    <section class="etiquette_stats_joueur">
      <span id="titre_statistiques">Statistiques</span>
      <span id="stats_joueur">
        <span class="stats">
          <div class="stats_nom">Nombre de minerais minés</div>
          <div class="stats_valeur">150</div>
        </span>
        <span class="stats">
          <div class="stats_nom">Dégats reçus</div>
          <div class="stats_valeur">45</div>
        </span>
        <span class="stats">
          <div class="stats_nom">Dégats infligés</div>
          <div class="stats_valeur">200</div>
        </span>
        <span class="stats">
          <div class="stats_nom">Nombre de morts</div>
          <div class="stats_valeur">3</div>
        </span>
        <span class="stats">
          <div class="stats_nom">Distance parcourue</div>
          <div class="stats_valeur">5000m</div>
        </span>
        <span class="stats">
          <div class="stats_nom">Niveau d'expérience</div>
          <div class="stats_valeur">25</div>
        </span>
      </span>
    </section>
  </main>
</body>

<script type="text/javascript" src="https://code.jquery.com/jquery-1.7.1.min.js"></script>
<script src="assets/js/navbar.js" type="text/javascript"></script>
<script src="assets/js/skin3D.js" type="text/javascript"></script>
<script src="assets/js/pagedetail.js" type="text/javascript"></script>

</html>
