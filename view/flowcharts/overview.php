<div class='content'>
<section class="create">

  <aside>
    <h1>Your existing flowcharts</h1>
    <ul>
      <li id="viewer">Untitled</li>
      <?php 
        if(!empty($_SESSION['user']) && !empty($flowcharts)){
          foreach($flowcharts as $flowchart){
            if(!empty($chosen) && $flowchart['id'] == $chosen['id']){
              echo '<li class="chosen"><a href="index.php?page=overview&amp;id='.$flowchart['id'].'">'.$flowchart['name'].'</a></li>';
            }else{
              echo '<li><a href="index.php?page=overview&amp;id='.$flowchart['id'].'">'.$flowchart['name'].'</a></li>';
            }
          }
        }
      ?>
    </ul>

    <p>
    <a href='<?php if(empty($_GET['id'])){?>index.php?page=index<?php }else{ ?>index.php?page=overview<?php } ?>'>Cancel</a>
     | 
     <a  href="index.php?page=overview" class='save-flowchart'>Save flowchart</a>
     </p>
  </aside>

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

</section>
</div>