<?php
if(!empty($_POST['name']) && !empty($_FILES['img']['name'])){
    $name=$_POST['name'];
    $file=$_FILES['img'];

    $filename=$file['name'];
    $tempName=$file['tmp_name'];

    $extensionArray=explode(".",$filename);
    $extension=end($extensionArray);

    $randomName=round(microtime(true) * 1000);

    $newName=$randomName.".".$extension;

    $url= "https://hostel.themarket.co.ke/loima/files/".$newName;

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
    exit;

}

if(!empty($_POST['get_files'])){
    require_once("db.php");
    $query="SELECT * FROM files";
    $stm=$con->prepare($query);
    $stm->execute();
    $stm->bind_result($name,$url);

    $response=array();

    while($stm->fetch()){
        $arr=["name"=>$name,
        "url"=>$url];

        array_push($response,$arr);
    }

    echo json_encode($response);
    exit;
}


if(!empty($_POST['delete']) && !empty($_POST['name'])){
    require_once("db.php");
    $name=$_POST['name'];
    $sql="DELETE FROM files WHERE name='$name'";
    $con->query($sql);

    echo "Success";
    exit;
}