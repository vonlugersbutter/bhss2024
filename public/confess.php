<html lang="en">
  <head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>BHSS FYC</title>
    <link rel = "icon" href ="icons/logo.jpg" type = "image/x-icon">
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display&family=Source+Sans+Pro:wght@200&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/bootstrap.min.css">
    <link rel="stylesheet" href="css/styles.css">
</head>

<body>
  <header><div id="navigation"></div></header>

  <div class="jumbotron-fluid">
    <img src="icons/banner.jpg" alt="">
  </div>

  <div class="container">
    <h1><span>Confessions</span></h1>

    <form action="">
      <input type="text" name="confession" id="confession" required>
      <label for="">Do it.</label>
      <input type="submit" value="Save">
    </form>
    
    <br>
    <br>
  </div>

  <footer class="panel-footer"><div id="footer"></div></footer>

  <script src="js/jquery-3.5.1.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/script.js"></script>

  <script src="/__/firebase/8.0.2/firebase-app.js"></script>
  <script src="/__/firebase/8.0.2/firebase-analytics.js"></script>
  <script src="/__/firebase/init.js"></script>


</body>
</html>

<?php

  ectract($_REQUEST);
  $file=fopen("data.txt", "a");
  fwrite($file, "confession: ");
  fwrite($file, $confession ."\n");
  fclose($file);

?>