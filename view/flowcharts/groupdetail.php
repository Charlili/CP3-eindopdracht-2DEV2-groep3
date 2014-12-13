<section class="group">

    <aside>
      <h2><?php echo $group['name'];?></h2>
      <ul>

<!--         <?php foreach($user as $user){

        };?> -->

        <li>User 1

          <ul>
            <li><a href="index.php?page=overview&amp;id=1">Flowchart 1</a></li>
            <li><a href="index.php?page=overview&amp;id=2">Flowchart 2</a></li>
          </ul>

        </li>

        <li>User 2

          <ul>
            <li><a href="#">Flowchart 1</a></li>
            <li><a href="#">Flowchart 2</a></li>
          </ul>

        </li>

      </ul>

      <p><a href="index.php?page=listgroups">Back</a></p>
    </aside>

    <section class="groupinfo">

      <h1><?php echo $group['name'];?></h1>

      <div>
        <label>Description:</label>
        <p>
          <?php echo $group['description'];?>
        </p>
      </div>

      <div>
        <label>Users:</label>
        <ul>


         <?php 

            foreach($users as $user){
              echo '<li><img src="uploads/'. $user['username'].'_th.'. $user['extension'].'"/></li>';
              echo $user['username'];  
            }
          ;?> 
        </ul>
	     </div>
    
    </section>



    <div class="add">
      <span><a href="#">+</a></span>
      <p>Invite someone</p>
    </div>

</section>