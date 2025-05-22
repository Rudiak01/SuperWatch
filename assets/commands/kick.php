<?php 
require_once "Rcon.php";

$host = '127.0.0.1'; // Server host name or IP
$port = 25575;                      // Port rcon is listening on
$password = 'azeAZE123-'; // rcon.password setting set in server.properties
$timeout = 3;                       // How long to timeout.

use Thedudeguy\Rcon;

$rcon = new Rcon($host, $port, $password, $timeout);
$name = $_POST['name'];
if ($rcon->connect())
{
  $rcon->sendCommand("kick {$name}");
}