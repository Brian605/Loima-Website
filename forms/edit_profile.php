<?php
if (!empty($_FILES['img']['name']) && !empty($_POST['regno'])){
    $file=$_FILES['img'];
    $regno=$_POST['regno'];

    $filename=$file['name'];
    $tempName=$file['tmp_name'];

    $extensionArray=explode(".",$filename);
    $extension=end($extensionArray);

    $randomName=round(microtime(true) * 1000);

    $newName=$randomName.".".$extension;

    $url= "https://hostel.themarket.co.ke/loima/profiles/".$newName;

    $uploadUrl="../profiles/".$newName;

    move_uploaded_file($tempName,$uploadUrl);

    require_once("db.php");

    $query="UPDATE  profile SET url=? WHERE regno=?";
    $stmt=$con->prepare($query) or die($con->error);
    $stmt->bind_param("ss",$url,$regno);
    $stmt->execute();

}

if (!empty($_POST['year']) && !empty($_POST['regno'])){
    $year=$_POST['year'];
    $regno=$_POST['regno'];

    require_once("db.php");

    $query="UPDATE  LoimaUsers SET stud_year=? WHERE regno=?";
    $stmt=$con->prepare($query) or die($con->error);
    $stmt->bind_param("ss",$year,$regno);
    $stmt->execute();
}

echo '<script>
    window.location.replace("../profile.html");
    </script>';