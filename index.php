<?php session_start(); 

?>

<!DOCTYPE html>
<html lang="fr">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link href="assets/css/styles.css" rel="stylesheet" />
  <link rel="icon" href="assets/img/ico.webp" />
  <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r119/three.min.js"></script>
  <title>SuperWatch</title>
</head>

<body class="IndexPage">
  <nav>
    <div id="navbar-left">
      <img src="assets/img/ico.webp" alt="Icon" id="icon" />
      <div id="counter">
        <span id="navbar-counter">Online</span> /
        <span id="navbar-total">Total</span> en ligne
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
          <input type="text" class="search" id="search" placeholder="Search..." onkeyup="searchPlayers()" />
          <div id="searchicon">&#8981;</div>
        </div>
        <svg id="sorticon" xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-funnel sorticon"
          viewBox="0 0 16 16">
          <path
            d="M1.5 1.5A.5.5 0 0 1 2 1h12a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.128.334L10 8.692V13.5a.5.5 0 0 1-.342.474l-3 1A.5.5 0 0 1 6 14.5V8.692L1.628 3.834A.5.5 0 0 1 1.5 3.5zm1 .5v1.308l4.372 4.858A.5.5 0 0 1 7 8.5v5.306l2-.666V8.5a.5.5 0 0 1 .128-.334L13.5 3.308V2z" />
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
      <a href="index.php">Home</a>
      <a href="https://superwatch.arthonetwork.fr/" target="_blank">About</a>
      <a href="#">Contact</a>
      <a href="settings.php">Settings</a>
      <a href="logout.php">Logout</a>
    </div>
  </div>

  <div class="overlay-bg" id="overlay-bg"></div>

  <main id="main">
    <section class="playersection">
      <!-- Gérer dans apimain.js -->

    </section>
    <p id="copied">UUID copié dans le presse papier</p>
  </main> 
  <footer></footer>
  <script type="text/javascript" src="https://code.jquery.com/jquery-1.7.1.min.js"></script>
  <script src="assets/js/navbar.js"></script>
  <script src="assets/js/apimain.js"></script>
</body>

</html>
