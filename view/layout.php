<!DOCTYPE html>
<html>
    <head>
        <meta charset="utf-8">
        <title>Flowchart Application</title>
        <link rel="stylesheet" href="css/screen.css">
    </head>
    <body>        
        <header>
        </header>
        <div class="main-centered">
            <?php if(!empty($_SESSION['error'])): ?><div class="error box"><?php echo $_SESSION['error'];?></div><?php endif; ?>
            <?php echo $content; ?>
        </div>
        <footer>
        </footer>
    </body>
    <!-- loads fallback and init scripts. This is to use cloud-based scripts if available-->
    <script src="js/vendor/fallback/fallback.min.js"></script>
    <script src='js/src/init.js'></script>
</html>