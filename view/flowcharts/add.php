<section class="create">

  <aside>
    <h2>Add new group</h2>
    <ul>
      <li><a href="#">Untitled</a></li>
    </ul>

    <p><a href="index.php?page=groups">Cancel</a> | <a href="#">Save group</a></p>
  </aside>

  <section class="createflow">

    <form method="post" action="index.php?page=addgroup">
      <div>
        <label for="groupname">Groupname:</label>
          <input type="text" placeholder="Untitled" name="groupname">
      </div>

      <div>
        <label for="description">Description:</label>
        <textarea name="description"></textarea>
      </div>

      <div>
        <label for="invite">Send invites:</label>
        <input type="text" name="invite1"/>
        <input type="text" name="invite2"/>
      </div>
    </form>

    <!-- <a href="#">Save group</a> -->
    <div class="add">
    <span><a href="save.html">+</a></span>
    <p>save</p>
  </div>
  </section>

</section>