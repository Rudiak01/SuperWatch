<?php session_start(); ?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="assets/css/styles.css" rel="stylesheet">
    <link rel="icon" href="assets/img/ico.png">
    <title>SuperWatch</title>
</head>

<body>

    <nav>
        <div id="navbar-left">
            <img src="assets/img/ico.png" alt="Icon" id="icon">
        </div>
        <div id="navbar-center">
            <a href="index.php" style="text-decoration: none"><span id="title">Overview</span></a>
        </div>
    </nav>

    <main>
        <div class="login">
            <form class="login_form" method="post" action="sql_get.php">
                <input type="hidden" name="action" value="login">

                <span id="login_title">Sign in</span>

                <label for="email"><b>Email</b></label>
                <input type="text" placeholder="Enter Email" name="email" id="email" required>

                <label for="password"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" id="password" required>

                <button type="submit" class="login_btn"><b>Sign in</b></button>
            </form>
        </div>
    </main>

</body>

<script type="text/javascript" src="https://code.jquery.com/jquery-1.7.1.min.js"></script>
<script src="js/navbar.js"></script>
<script src="js/pagedetail.js"></script>

</html>
