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
        <div class="register">
            <form class="register_form" method="post" action="sql_get.php">
                <input type="hidden" name="action" value="register">

                <span id="register_title">Register</span>

                <label for="username"><b>Username</b></label>
                <input type="text" placeholder="Enter Username" name="username" id="username" required>

                <label for="email"><b>Email</b></label>
                <input type="email" placeholder="Enter Email" name="email" id="email" required>

                <label for="psw"><b>Password</b></label>
                <input type="password" placeholder="Enter Password" name="password" id="psw" required>

                <label for="psw-repeat"><b>Repeat Password</b></label>
                <input type="password" placeholder="Repeat Password" name="confirm_password" id="psw-repeat" required>

                <button type="submit" class="register_btn"><b>Register</b></button>
                <p>Already have an account? <a href="login.php">Sign in</a>.</p>
            </form>

        </div>
    </main>

</body>
<script type="text/javascript" src="https://code.jquery.com/jquery-1.7.1.min.js"></script>
<script src="js/navbar.js"></script>
<script src="js/pagedetail.js"></script>

</html>