<?php
if(!empty($_POST['address']) && !empty($_POST['message'])){
    require_once("db.php");
    $address=$_POST['address'];
$message=$_POST['message'];
$subject="Loima Students Association";

mail($address,$subject,$message);
    echo "success";
    exit;

}