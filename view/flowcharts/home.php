<section class="index">
	<?php if(empty($_SESSION['user'])):;?>
	<h1>Welcome to Whiteboard!</h1>
	
	<ul>
		<li class="groen">
			<a href="index.php?page=overview">Create flowchart</a>
		</li>
		
		<li class="groen">
			<a class="login" href="index.php?page=ingelogd">Login</a>
	
				<!-- bij klik login-->
				<form method="post" action="index.php?page=login" class="loginform hidden">
					<div>
						<input type="text" name="username" placeholder="Username">
						<span>
							<?php if(!empty($errors['username'])){
      							echo $errors['username'];
      		    			};?>
						</span>
					</div>
		
					<div>
						<input type="password" name="password" placeholder="Password"/>
						<span>
							<?php if(!empty($errors['password'])){
      							echo $errors['password'];
      		    			};?>
						</span>
					</div>
		
					<div>
						<input type="submit" value="Log in!"/>
					</div>

				</form>
		</li>
	
		<li class="yellow">
			<a href="index.php?page=register">Register</a>
		</li>
	</ul>
	<?php endif;
	if(!empty($_SESSION['user'])):;?>

	<h1>Welcome <?php echo $_SESSION['user']['username'];?>!</h1>
	
	<ul>
		<li class="groen">
			<a href="index.php?page=overview">My flowcharts</a>
		</li>
		
		<li class="groen">
			<a href="index.php?page=listgroups">My groups</a>
		</li>
	</ul>

	<div class="back">
		<a href="index.php?page=logout">Log out</a>
	</div>

	<div class="info_user">
		<p>Logged in as <?php echo $_SESSION['user']['username'];?></p>
	</div>

	<?php endif;?>
</section>
