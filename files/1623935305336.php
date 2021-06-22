<?php

var_dump($_FILES);
if(!empty($_POST['name']) && !empty($_FILES['img']['name'])){
    $name=$_POST['name'];
    $file=$_FILES['img'];

    $filename=$file['name'];
    $tempName=$file['tmp_name'];

    $extensionArray=explode(".",$filename);
    $extension=end($extensionArray);

    $randomName=round(microtime(true) * 1000);

    $newName=$randomName.".".$extension;

    $url= "http://localhost/loima/files/".$newName;

    $uploadUrl="../files/".$newName;

    move_uploaded_file($tempName,$uploadUrl);

    require_once("db.php");

    $query="INSERT INTO  files (name,downloadUrl) VALUES (?,?)";
    $stmt=$con->prepare($query) or die($con->error);
    $stmt->bind_param("ss",$name,$url);
    $stmt->execute();

    echo '<script>
    alert("success");
    window.location.replace("../admn/index.html");
    </script>';

}else{
    echo "One or more data not set";
}