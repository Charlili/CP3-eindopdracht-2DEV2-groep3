<?php
session_start();
require_once 'phpass/Phpass.php';
require_once __DIR__ . "/dao/UserDAO.php";

$userDAO = new UserDAO();
$errors = array();

if(!empty($_POST)) {
	if(empty($_POST['email'])) {
		$errors['email'] = 'Please enter your email';
	}
	if(empty($_POST['password'])) {
		$errors['password'] = 'Please enter your password';
	}
	if(empty($errors)) {
		
		$existing = $userDAO->selectByEmail($_POST["email"]);

		if(!empty($existing)) {
			$hasher = new \Phpass\Hash;
			if ($hasher->checkPassword($_POST['password'], $existing['password'])) {
				$_SESSION['user'] = $existing;
			} else {
				$_SESSION['error'] = 'Unknown username / password';
			}
		} else {
			$_SESSION['error'] = 'Unknown username / password';
		}
	} else {
		$_SESSION['error'] = 'Unknown username / password';
	}
}
header('Location: index.php');
exit();