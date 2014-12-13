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

    <p><a href='index.php?page=index'>Cancel</a> | <a  href="index.php?page=overview" class='save-flowchart'>Save flowchart</a></p>
  </aside>

  <section class="createflow">

    
        <input type="text" placeholder="Untitled" class="title" id="viewerchanger" name="name_flowchart">
     
     <div class="toolbar">
      <input type="button" class="button2" value="Select Tool"/>
      <input type="button" class="button2" value="Shape Tool"/>
      <input type="button" class="button2" value="Line Tool"/>
      <input type="button" class="button2" value="File Tool"/>
      <input type="button" class="button2" value="Delete Tool"/>
      <input type="button" class="button2" value="Shape Tool"/>

      <select class="button2" id="changeColor">
        <option value="">Choose color</option>
        <option value="groen"></option>
        <option value="geel"></option>
        <option value="oranje"></option>
      </select>

      <select class="button2" id="changeSize">
        <option value="">Change size</option>
        <option value="s">S</option>
        <option value="m">M</option>
        <option value="l">L</option>
      </select>
      
      <input type="button" class="button2" value="Align Tool"/>
     </div>

    <div class='app'>

    </div>
    <canvas id="cnvs">
      <p>no canvas support</p>
    </canvas>

  </section>

</section>
</div>