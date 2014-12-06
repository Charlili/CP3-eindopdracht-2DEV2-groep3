<div class='content'>
<section class="create">

  <aside>
<<<<<<< HEAD
    <h2>Existing flowcharts</h2>

=======
    <h2>Your existing flowcharts</h2>
>>>>>>> 8892989c7e4bbfcec347a60de96f04baad0fe46c
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

<<<<<<< HEAD
    <p><a href="index.php?page=index">Cancel</a> | <a href="#" class="save">Save flowchart</a></p>
=======
    <p><a href='#'>Cancel</a> | <a  href="index.php?page=overview" class='save-flowchart'>Save flowchart</a></p>
>>>>>>> 8892989c7e4bbfcec347a60de96f04baad0fe46c
  </aside>

  <section class="createflow">

    <form method="post">
      <div>
<<<<<<< HEAD
        <input type="text" placeholder="Untitled" class="title" id="viewerchanger" name="name_flowchart">
=======
        <input type="text" placeholder="Untitled" class="test" name="name_flowchart" id='name_flowchart'>
>>>>>>> 8892989c7e4bbfcec347a60de96f04baad0fe46c
      </div>
    </form>

    <div class='app'>
    </div>
    <canvas id="cnvs">
      <p>no canvas support</p>
    </canvas>

  </section>

</section>
<<<<<<< HEAD

<?php endif;?>

<?php if(!empty($_GET['id'])):;?>

  <aside>
    <h2><?php echo $flowchart['name'];?></h2>

    <p><a href="index.php?page=overview">Cancel</a> | <a href="#" class="save">Save flowchart</a></p>
  </aside>

  <section class="createflow">

    <div class='app'>
    </div>
    <canvas id="cnvs">
      <p>no canvas support</p>
    </canvas>

  </section>

<?php endif;?>
=======
>>>>>>> 8892989c7e4bbfcec347a60de96f04baad0fe46c
</div>