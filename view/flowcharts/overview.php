<div class='content'>
<section class="create">

  <aside>
    <h2>Your existing flowcharts</h2>
    <ul>
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

    <p><a href='#'>Cancel</a> | <a  href="index.php?page=overview" class='save-flowchart'>Save flowchart</a></p>
  </aside>

  <section class="createflow">

    <form method="post">
      <div>
        <input type="text" placeholder="Untitled" class="test" name="name_flowchart" id='name_flowchart'>
      </div>
    </form>

    <div class='app'>
    </div>
    <canvas id="cnvs">
      <p>no canvas support</p>
    </canvas>

  </section>

</section>
</div>