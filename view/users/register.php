<?php
session_start();

require_once 'phpass/Phpass.php';
require_once __DIR__ . '/dao/UserDAO.php';

$userDAO = new UserDAO();

$errors = array();
if(!empty($_POST)) {
	if(empty($_POST['email'])) {
		$errors['email'] = 'Please enter your email';
	} else {
		$existing = $userDAO->selectByEmail($_POST["email"]);

		if(!empty($existing)) {
			$errors['email'] = 'Email address is already in use';
		}
	}

	if(empty($_POST['password'])) {
		$errors['password'] = 'Please enter a password';
	}

	if($_POST['confirm_password'] != $_POST['password']) {
		$errors['confirm_password'] = 'Passwords do not match';
	}
	
	if(empty($errors)) {
		$hasher = new \Phpass\Hash;
		$passwordHash = $hasher->hashPassword($_POST['password']);

		$newUser = array(
			"email"=>$_POST['email'],
			"password"=>$passwordHash
		);

		$user = $userDAO->insert($newUser);
		if(!empty($user)) {
			$_SESSION['info'] = 'Registration successful';
			header('Location: index.php');
			exit();
		} else {
			$errors = $userDAO->getValidationErrors($newUser);
			$_SESSION['error'] = 'Registration failed';
		}
	} else {
		$_SESSION['error'] = 'Please complete the form';
	}
}

include 'header.php';
?>
	<section>
		<header><h1>Register</h1></header>
		<form action="register.php" method="post">
			<fieldset>
				<legend>Register</legend>
				<div class="input text">
					<label>
						Email:
						<input type="email" name="email" value="<?php if(!empty($_POST['email'])) echo $_POST['email'];?>" />
						<?php if(!empty($errors['email'])) echo '<span class="error">' . $errors['email'] . '</span>'; ?>
					</label>
				</div>
				<div class="input password">
					<label>
						Password:
						<input type="password" name="password" />
						<?php if(!empty($errors['password'])) echo '<span class="error">' . $errors['password'] . '</span>'; ?>
					</label>
				</div>
				<div class="input password">
					<label>
						Confirm Password:
						<input type="password" name="confirm_password" />
						<?php if(!empty($errors['confirm_password'])) echo '<span class="error">' . $errors['confirm_password'] . '</span>'; ?>
					</label>
				</div>
				<div class="input checkbox">
					<label>
						<input type="checkbox" name="log_me_in">
						Log me in
					</label>
				</div>
				<div class="input submit"><input type="submit" value="register"></div>
			</fieldset>
		</form>
	</section>
<?php
include 'footer.php';
?>