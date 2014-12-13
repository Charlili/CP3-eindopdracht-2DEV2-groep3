<section class="group">

    <aside>
      <!-- <h2><a href="index.php?page=groupdetail&amp;id=<?php echo $group['id'];?>"><?php echo $group['name'];?></a></h2> -->
      <!-- <h2><a href="index.php?page=group&amp;groupid=<?php echo $group['id'];?>&amp;detailid="><?php echo $group['name'];?></a></h2> -->
      <ul>

        <?php foreach($users as $user){
            echo '<li>'.$user['username'].'</li>';
        };?>

        <ul>
        <?php foreach($flowcharts as $flowchart){
            echo '<li><a href="index.php?page=group&amp;groupid='.$group['id'].'&amp;id='.$flowchart['id'].'">'.$flowchart['name'].'</a></li>';
        };?>
        </ul>
<!--           <ul>
            <li><a href="index.php?page=group&amp;groupid=<?php echo $group['id'];?>&amp;id=">Flowchart 1</a></li>
            <li><a href="#">Flowchart 2</a></li> 
          </ul> -->
      </ul>

      <p><a href="index.php?page=listgroups">Back</a></p>
    </aside>

    <section class="createflow">

    <div class='app'>
    </div>
    <canvas id="cnvs">
      <p>no canvas support</p>
    </canvas>
    
    </section>

</section>