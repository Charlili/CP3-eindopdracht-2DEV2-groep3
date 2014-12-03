<section class="mygroups">
	<h1>My groups</h1>

	<a href="#">Add existing group</a>

	<!-- bij klik  -->

	<form method="get" class="hidden">
		<input type="search"> 
	</form>
	
	<ul>

		<?php 
			foreach($groups as $group){
				echo '<li class="groen">
					<a href="index.php?page=group&amp;id='.$group['id'].'">'. $group['name'].'</li>';
			}
		;?>
	</ul>

	<div class="back">
		<a href="index.php">Go back</a>
	</div>

	<div class="add">
		<span><a href="index.php?page=add">+</a></span>
		<p>add new group</p>
	</div>

</section>