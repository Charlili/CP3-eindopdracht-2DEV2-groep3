<?php
session_start();
unset($_SESSION['user']);
$_SESSION['info'] = 'logged out';
header('Location: index.php');
exit();