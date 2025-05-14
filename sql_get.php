<?php
session_start();

function ConnectDB(){
    try {
        $db = new PDO('sqlite:database.db');
        $db->exec("CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT NOT NULL,
            email TEXT NOT NULL,
            password_hash TEXT NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            remember_token TEXT
        )");
        return $db;
    } catch (Exception $e) {
        echo 'erreur de connexion à la db';
    }
}

function validatePassword($password) {
    if (strlen($password) < 8) return "Le mot de passe doit contenir au moins 8 caractères.";
    if (!preg_match('/[A-Z]/', $password)) return "Le mot de passe doit contenir au moins une lettre majuscule.";
    if (!preg_match('/[a-z]/', $password)) return "Le mot de passe doit contenir au moins une lettre minuscule.";
    if (!preg_match('/[0-9]/', $password)) return "Le mot de passe doit contenir au moins un chiffre.";
    if (!preg_match('/[\W_]/', $password)) return "Le mot de passe doit contenir au moins un caractère spécial.";
    return true;
}

function EmailExiste($email) {
    $db = ConnectDB();
    if (!$db) return false;

    $sql = "SELECT COUNT(*) FROM users WHERE email = :email";
    $stmt = $db->prepare($sql);
    $stmt->execute(['email' => $email]);
    return $stmt->fetchColumn() > 0;
}

function UsernameExiste($username) {
    $db = ConnectDB();
    if (!$db) return false;

    $sql = "SELECT COUNT(*) FROM users WHERE username = :username";
    $stmt = $db->prepare($sql);
    $stmt->execute(['username' => $username]);
    return $stmt->fetchColumn() > 0;
}

function RegisterUser($username, $email, $password) {
    $db = ConnectDB();
    if (!$db) return false;

    if (UsernameExiste($username)) die("Ce nom d'utilisateur est déjà utilisé.");
    if (EmailExiste($email)) die("Cet email est déjà utilisé.");

    $password_hash = password_hash($password, PASSWORD_DEFAULT);
    $sql = "INSERT INTO users (username, email, password_hash) VALUES (:username, :email, :password_hash)";
    $stmt = $db->prepare($sql);
    return $stmt->execute([
        'username' => $username,
        'email' => $email,
        'password_hash' => $password_hash
    ]);
}

function LoginUser($email, $password) {
    $db = ConnectDB();
    if (!$db) return false;

    $sql = "SELECT * FROM users WHERE email = :email";
    $stmt = $db->prepare($sql);
    $stmt->execute(['email' => $email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['username'] = $user['username']; // <- username stocké en session
        return true;
    }

    return false;
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $action = $_POST['action'] ?? '';

    if ($action === 'register') {
        $username = trim($_POST['username']);
        $email = trim($_POST['email']);
        $password = $_POST['password'];
        $confirm_password = $_POST['confirm_password'];

        if ($password !== $confirm_password) {
            die("Les mots de passe ne correspondent pas.");
        }

        $password_validation = validatePassword($password);
        if ($password_validation !== true) {
            die($password_validation);
        }

        if (RegisterUser($username, $email, $password)) {
            echo "Inscription réussie ! Vous pouvez maintenant vous connecter.<br>";
            echo "<a href='index.php'><button>Retour à l'accueil</button></a>";
        } else {
            echo "Erreur lors de l'inscription.";
        }

    } elseif ($action === 'login') {
        $email = trim($_POST['email']);
        $password = $_POST['password'];

        if (LoginUser($email, $password)) {
            echo "Connexion réussie !";
            header("Location: index.php");
            exit;
        } else {
            echo "Email ou mot de passe incorrect.";
        }
    }
}
?>
