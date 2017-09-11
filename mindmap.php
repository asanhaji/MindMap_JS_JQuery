<?php session_start();
if (!isset($_SESSION['title'])) {
        header("location: "."index.php");
        exit;
}?>
<!DOCTYPE html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title></title>
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
    <script type="text/javascript" src="js/mindmap.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script type="text/javascript">
        $(document).ready(function () {
            $('#mindmap_container').mindmap(<?php echo "'".$_SESSION['title']."'"; ?>);
        });
    </script>
</head>

<body>

<div id="mindmap_container">
</div>
</body>
</html>