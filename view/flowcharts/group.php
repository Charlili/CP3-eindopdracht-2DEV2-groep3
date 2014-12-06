<section class="group">

    <aside>
      <h2><a href="index.php?page=groupdetail&amp;id=<?php echo $group['id'];?>"><?php echo $group['name'];?></a></h2>
      <ul>

        <?php foreach($users as $user){
            echo '<li>'.$user['username'].'</li>';
        };?>
          <ul>
            <li><a href="#">Flowchart 1</a></li>
            <li><a href="#">Flowchart 2</a></li> 
          </ul>
      </ul>

      <p><a href="index.php?page=listgroups">Back</a> | <a class="save" href="index.php?page=addme">Add me in group</a></p>
    </aside>

    <section class="createflow">

    <div class='app'>
    </div>
    <canvas id="cnvs">
      <p>no canvas support</p>
    </canvas>
    
    </section>

</section>