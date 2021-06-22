<?php

if(!empty($_POST['title']) && !empty($_POST['description']) && !empty($_FILES['img']['name'])){
    $title=$_POST['title'];
    $description=$_POST['description'];
    $file=$_FILES['img'];

    $filename=$file['name'];
    $tempName=$file['tmp_name'];

    $extensionArray=explode(".",$filename);
    $extension=end($extensionArray);

    $randomName=round(microtime(true) * 1000);

    $newName=$randomName.".".$extension;

    $url= "https://hostel.themarket.co.ke/loima/blog/".$newName;

    $uploadUrl="../blog/".$newName;

    move_uploaded_file($tempName,$uploadUrl);

    require_once("db.php");

    $query="INSERT INTO  blog (title,description,downloadUrl) VALUES (?,?,?)";
    $stmt=$con->prepare($query) or die($con->error);
    $stmt->bind_param("sss",$title,$description,$url);
    $stmt->execute();

    echo '<script>
    alert("success");
    window.location.replace("../admn/index.html");
    </script>';
    exit;
}

if(!empty($_POST['title']) && !empty($_POST['description'])){
    $title=$_POST['title'];
    $description=$_POST['description'];
    $url= "none";
    require_once("db.php");

    $query="INSERT INTO  blog (title,description,downloadUrl) VALUES (?,?,?)";
    $stmt=$con->prepare($query) or die($con->error);
    $stmt->bind_param("sss",$title,$description,$url);
    $stmt->execute();

    echo '<script>
    alert("success");
    window.location.replace("../admn/index.html");
    </script>';

    exit;

   
}

if(!empty($_POST['get_blogs'])){
    require_once("db.php");

    $query="SELECT * FROM blog ORDER BY Id DESC";
    $stm=$con->prepare($query);
    $stm->execute();
    $stm->bind_result($id,$title,$desc,$url);

    $response=array();

    while($stm->fetch()){
        $arr=["title"=>$title,
        "id"=>$id,
        "description"=>$desc,
        "url"=>$url];

        array_push($response,$arr);
    }

    echo json_encode($response);
    exit;
}

if(!empty($_POST['delete']) && !empty($_POST['id'])){
    require_once("db.php");
    $id=$_POST['id'];
    $sql="DELETE FROM blog WHERE Id='$id'";
    $con->query($sql);

    echo "Success";
    exit;
}

