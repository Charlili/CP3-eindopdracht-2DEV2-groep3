<section class="mygroups">
	<h1>My groups</h1>

	<a class="addgroup" href="#">Add existing group</a>

	<!-- bij klik  -->

	<form method="post" class="searchgroup hidden" name="addme" id="myform" action="index.php?page=listgroups">
		<select id="mySelect">
			<option value="">Select a group</option>
		<?php
			foreach($groups as $group){
				echo '<option value="'.$group['id'].'">';
				echo $group['name'];
				echo '</option>';
			}
		 ;?>
		</select>
		<input type="submit" value="Add me"/>
	</form>
	
	<ul class="nav">

		<?php 
			foreach($mygroups as $mygroup){
				echo '<a href="index.php?page=group&amp;groupid='.$mygroup['id'].'"><li class="groen">'. $mygroup['name'].'</li></a>';

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