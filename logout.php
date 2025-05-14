<?php
session_start();

// Supprime toutes les variables de session
$_SESSION = [];

session_destroy();

// Supprime le cookie "remember_token" s'il existe
if (isset($_COOKIE['remember_token'])) {
    setcookie('remember_token', '', time() - 3600, "/"); 
}

// Redirige l'utilisateur vers la page de connexion
header("Location: index.php");
exit;
?>