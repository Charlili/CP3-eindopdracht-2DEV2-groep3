<section class="group">

    <aside>
      <!-- <h2><a href="index.php?page=groupdetail&amp;id=<?php echo $group['id'];?>"><?php echo $group['name'];?></a></h2> -->
      <h2><a href="index.php?page=group&amp;groupid=<?php echo $group['id'];?>&amp;detailid=<?php echo $group['id'];?>"><?php echo $group['name'];?></a></h2>
      <ul>

<!--         <?php foreach($users as $user){
            echo '<li>'.$user['username'].'</li>';
        };?>

        <ul>
        <?php foreach($flowcharts as $flowchart){
            echo '<li><a href="index.php?page=group&amp;groupid='.$group['id'].'&amp;id='.$flowchart['id'].'">'.$flowchart['name'].'</a></li>';
        };?>
        </ul> -->

        <?php foreach($users as $user){
            echo '<li>'.$user['username'].'</li>';
            echo '<ul>';
            
            foreach($flowcharts as $flowchart){
              echo '<li><a href="index.php?page=group&amp;groupid='.$group['id'].'&amp;id='.$flowchart['id'].'">'.$flowchart['name'].'</a></li>';
            }
            echo '</ul>';
        };?>
        
      </ul>

      <p><a href="index.php?page=listgroups">Back</a></p>
    </aside>

    <?php if(!empty($detail)):;?>
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
      <span><a href="index.php?page=sendInvite">+</a></span>
      <p>Invite someone</p>
    </div>
   <?php endif;;?>

   <?php if(empty($detail)):;?>
    <section class="createflow">

    <div class='app'>
    </div>
    <canvas id="cnvs">
      <p>no canvas support</p>
    </canvas>
    
    </section>
  <?php endif;?>
  

</section>