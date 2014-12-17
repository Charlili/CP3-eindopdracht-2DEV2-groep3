<section class="index">
	<?php if(empty($_SESSION['user'])):;?>
	<h1>Welcome to Whiteboard</h1>
	<h2>The best application to make and share flowcharts!</h2>
	
	<ul class="nav">

		<a href="index.php?page=overview"><li class="groen">Create Flowchart</li></a>

		<a class="login" href="index.php?page=ingelogd"><li class="groen">Login</li></a>


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

		<a href="index.php?page=register"><li class="yellow">Register</li></a>


	</ul>
	<?php endif;
	if(!empty($_SESSION['user'])):;?>

	<h1>Welcome <?php echo $_SESSION['user']['username'];?>!</h1>
	
	<ul class="nav">
		<a href="index.php?page=overview"><li class="groen">My flowcharts</li></a>

		<a href="index.php?page=listgroups"><li class="groen">My groups</li></a>		
	</ul>

	<div class="back">
		<a href="index.php?page=logout">Log out</a>
	</div>

	<div class="info_user">
		<p>Logged in as <?php echo $_SESSION['user']['username'];?></p>
	</div>

	<?php endif;?>
</section>
