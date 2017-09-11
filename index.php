<?php session_start(); ?>
<!DOCTYPE html>

<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script type="text/javascript" src="js/script.js"></script>
</head>
<?php
if(isset($_POST['input']) && strlen($_POST['input']) > 6){
    $_SESSION['title'] = $_POST['input'];
    header('Location: mindmap.php');
    exit;
}else{
    $error = "Your title is too short";
}

?>
<body>
    <?php
var_dump($_POST);
    ?>
    <div class="form">
        <form class="login-form" action="index.php" method="post">
            <input type="text" id="input" name="input" placeholder="name of your new mind map">
            <button id="submit">create</button>
            <p class="error"><?php echo $error; ?> </p>
        </form>
    </div>
</body>

</html>