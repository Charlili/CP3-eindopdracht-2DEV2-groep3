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

        <script id="toolTemplate" type="text/template">

        </script>
     
<!--      <div class="toolbar">

      <input type="button" class="button2" id="Select"/>
      <input type="button" class="button2" id="Shape"/>
      <input type="button" class="button2" id="Line"/>
      <input type="button" class="button2" id="File"/>
      <input type="button" class="button2" id="Delete"/>

      <select class="button2" id="changeColor">
        <option value=""></option>
        <option value="groen">#00b097</option>
        <option value="geel">#f8ee67</option>
        <option value="oranje">#fe7259</option>
      </select>

      <select class="button2" id="changeSize">
        <option value=""></option>
        <option value="s">S</option>
        <option value="m">M</option>
        <option value="l">L</option>
      </select>

      <select class="button2" id="changeAlign"/>
        <option value=""></option>
        <option value="left"><img src="images/left.jpg"></option>
        <option value="right"><img src="images/right.jpg"></option>
        <option value="center"><img src="images/center.jpg"></option>
      </select>
     </div> -->

    <div class='app'>

    </div>
    <canvas id="cnvs">
      <p>no canvas support</p>
    </canvas>

  </section>

</section>
</div>