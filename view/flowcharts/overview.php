<div class='content'>
<section class="create">

  <?php if(empty($_GET['id'])):;?>

  <aside>
    <h2>Existing flowcharts</h2>
    <ul>
      <?php 
        foreach($flowcharts as $flowchart){
          echo '<li><a href="index.php?page=overview&amp;id='.$flowchart['id'].'">'.$flowchart['name'].'</a></li>';
        }
      ;?>
    </ul>

    <p><a href="index.php?page=index">Cancel</a> | <a href="#">Save flowchart</a></p>
  </aside>

  <section class="createflow">

    <form method="post">
      <div>
        <input type="text" placeholder="Untitled" class="test" name="name_flowchart">
      </div>
    </form>

    <div class='app'>
    </div>
    <canvas id="cnvs">
      <p>no canvas support</p>
    </canvas>

  </section>

</section>

<?php endif;?>

<?php if(!empty($_GET['id'])):;?>

  <aside>
    <h2><?php echo $flowchart['name'];?></h2>

    <p><a href="index.php?page=overview">Cancel</a> | <a href="#">Save flowchart</a></p>
  </aside>

  <section class="createflow">

    <div class='app'>
    </div>
    <canvas id="cnvs">
      <p>no canvas support</p>
    </canvas>

  </section>

<?php endif;?>
</div>