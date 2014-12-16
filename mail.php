<html>
	<head>
		<title>Come join us at Whiteboard!</title>
		<?php 
			$invited = array(
				'username' => 'WouterD',
				'id' => '5',
				'email' => 'wouter.d@howest.be');
			$inviter = array(
				'username' => 'CharlotteVanroelen',
				'id' => '4',
				'email' => 'charlotte.vanroelen@gmail.com');
			$group = array(
				'id' => '4',
				'name' => 'Team Awesome');
		?> 
	</head>
	<body>
		<p>Hi <?php echo $invited['username']; ?>,</p>
		<p><span style="text-transform:capitalize"><?php echo $inviter['username']; ?></span> has invited you to join them at <a href='student.howest.be/charlotte.vanroelen/20142015/CPIII/whiteboard/index.php?page=home' title='Click to go to the Whiteboard app!'>Whiteboard.</a></p>
		<p>Whiteboard is an application where you can make flowcharts and share them in group.</p>
		<div>
			<p>Come join my group,  <a href='student.howest.be/charlotte.vanroelen/20142015/CPIII/whiteboard/index.php?page=addMe&amp;userId=<?php echo $invited['id'];?>&amp;groupId=<?php echo $group['id'];?>' title='Click to go to their group!'><?php echo $group['name']; ?></a>!</p>
			<p>- <?php echo $inviter['username']; ?></p>
			</div>
	</body>
</html>