<section class="register">
		 
      <h1>Register</h1>
 		
 	    <form method="post" action="index.php?page=register" enctype="multipart/form-data">

 		<div>
 		   <a href="#"><img src="images/addprofilepic.jpg"/></a>
               <!-- bij klik ->venster -->
 		   <input type="file" name="image">
  		   <span>
                  <?php if(!empty($errors['image'])){
      			   echo $errors['image'];
      		};?>
      	     </span>
 		</div>
		
 		<div>
 			<label for="username">Username:</label>
 			<input type="text" name="username" value="<?php if(!empty($_POST['username'])) echo $_POST['username'];?>">
                  <span>
 		     	   <?php if(!empty($errors['username'])){
      				echo $errors['username'];
      		    };?>
      		</span>
 		</div>
	
 		<div>
 			<label for="password">Password:</label>
 			<input type="password" name="password" value="<?php if(!empty($_POST['password'])) echo $_POST['password'];?>">
                  <span>
 		     	   <?php if(!empty($errors['password'])){
      			   echo $errors['password'];
      		    };?>
      		</span>
 		</div>
	
		<div>
 		   <label for="confirm_password">Confirm password:</label>
 		   <input type="password" name="confirm_password" value="<?php if(!empty($_POST['confirm_password'])) echo $_POST['confirm_password'];?>">
               <span>
                  <?php if(!empty($errors['confirm_password'])){
      			   echo $errors['confirm_password'];
      		};?>
            </span>
 	       </div>
		
 		<div>
 			<label for="email">Email address:</label>
 			<input type="email" name="email" value="<?php if(!empty($_POST['email'])) echo $_POST['email'];?>">
                  <span>
 		     	   <?php if(!empty($errors['email'])){
      			   echo $errors['email'];
      		    };?>
      		</span>
 		</div>
	
 		<div>
 			<a href="index.php">Cancel</a>
 			<input type="submit" value="Register">
 		</div>
	
	</form>
</section>