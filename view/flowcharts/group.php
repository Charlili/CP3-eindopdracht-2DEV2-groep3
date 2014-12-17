<section class="group">

    <aside>
      <!-- <h2><a href="index.php?page=groupdetail&amp;id=<?php echo $group['id'];?>"><?php echo $group['name'];?></a></h2> -->
      <h2><a href="index.php?page=group&amp;groupid=<?php echo $group['id'];?>&amp;detailid=<?php echo $group['id'];?>"><?php echo $group['name'];?></a></h2>
      <ul>
        <?php foreach($users as $user){
          echo "<li class='together'>";
          if($user['id'] == $_SESSION['user']['id']){
            echo '<p>'.$user['username'].' (me) </p>';  
          }else{
            echo '<p>'.$user['username'].'</p>';
          }
          echo '<ul>';
            
            if(!empty($user['flowcharts'])){
              foreach($user['flowcharts'] as $flowchart){
                if(!empty($chosen) && $flowchart['id'] == $chosen['id']){
                  echo '<li class="chosen"><a href="index.php?page=group&amp;groupid='.$group['id'].'&amp;id='.$flowchart['id'].'">'.$flowchart['name'].'</a></li>';
                }else{
                  echo '<li><a href="index.php?page=group&amp;groupid='.$group['id'].'&amp;id='.$flowchart['id'].'">'.$flowchart['name'].'</a></li>';
                }
              }
            }
          echo '</ul>';
          echo '</li>';
        };?>
        
      </ul>

      <p>
      <a href='<?php if(empty($_GET['id'])){?>index.php?page=listgroups<?php }else{ ?>index.php?page=group&amp;groupid=<?php echo $_GET['groupid'];} ?>'>Back</a>
      | 
      <a  href="index.php?page=group&amp;groupid=<?php echo $_GET['groupid']; ?>" class='save-flowchart'>Save flowchart</a>
      </p>
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
        <ul class="users">

         <?php           
            foreach($users as $user){
              echo '<li><img src="uploads/'. $user['username']. '/'. $user['username'] . '_th.'. $user['extension'].'"/>';
              echo '<p>'.$user['username'].'</p></li>';  
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
    <?php if(!empty($chosen)){
      echo '<input type="text" class="title" id="viewerchanger" name="name_flowchart" value="'.$chosen['name'].'">';
    }else{ ?>
      <input type="text" placeholder="Untitled" class="title" id="viewerchanger" name="name_flowchart">
    <?php } ?> 
    <div class='app'>
    </div>
    <canvas id="cnvs">
      <p>no canvas support</p>
    </canvas>
    
    </section>
  <?php endif;?>
  

</section>