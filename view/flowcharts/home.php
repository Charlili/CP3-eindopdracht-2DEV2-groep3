<section class="index">
	<?php if(empty($_SESSION['user'])):;?>
	<h1>Welcome to Whiteboard!</h1>
	
	<ul>
		<li class="groen">
			<a href="index.php?page=add">Create flowchart</a>
		</li>
		
		<li class="groen">
			<a class="login" href="index.php?page=ingelogd">Login</a>
	
				<!-- bij klik login-->
				<form method="post" action="index.php?page=login" class="loginform hidden">
					<div>
						<label for="username">Username:</label>
						<input type="text" name="username">
					</div>
		
					<div>
						<label for="password">Password:</label>
						<input type="password" name="password">
					</div>
		
					<div>
						<input type="submit" value="Log in">
					</div>
				</form>
		</li>
	
		<li class="yellow">
			<a href="index.php?page=register">Register</a>
		</li>
	</ul>
	<?php endif;
	if(!empty($_SESSION['user'])):;?>

	<h1>Welcome User!</h1>
	
	<ul>
		<li class="groen">
			<a href="index.php?page=overview">My flowcharts</a>
		</li>
		
		<li class="groen">
			<a href="index.php?page=groups">My groups</a>
		</li>
	</ul>

	<div class="back">
		<a href="index.php?page=logout">Log out</a>
	</div>

	<div class="info_user">
		<!-- <span><a href="addnewgroup.html">+</a></span> -->
		<p>Logged in as User</p>
		<!--<?php echo $user['username'];?>-->
	</div>

	<?php endif;?>
</section>
