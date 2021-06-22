<?php

if(!empty($_FILES['img'])){
   require_once("db.php");
    
$counter=0;
foreach($_FILES['img']['name'] as $fileName){
    $extensionArray=explode(".",$fileName);
    $extension=end($extensionArray);

    $randomName=round(microtime(true)*10000);
    $newName="Loima_".$randomName.".".$extension;

    $url="https://hostel.themarket.co.ke/loima/files/".$newName;
    $uploadDir="../files/".$newName;

    

    $tmpname=$_FILES['img']['tmp_name'][$counter];
    move_uploaded_file($tmpname,$uploadDir);

$query="INSERT INTO gallery(downloadUrl) VALUES(?)";
$stmt=$con->prepare($query) or die($con->error);
    $stmt->bind_param("s",$url);
    $stmt->execute();
    $counter++;
}

echo '<script>
    alert("success");
    window.location.replace("../admn/gallery.html");
    </script>';

    exit;
}

if(!empty($_POST['get_img'])){
    require_once("db.php");
    $query="SELECT * FROM gallery ORDER BY Id DESC ";
    $stmt=$con->prepare($query) or die($con->error);
    $stmt->execute();
    $stmt->bind_result($id,$url);

    $response=array();

    while($stmt->fetch()){
        $arr=["id"=>$id,
        "url"=>$url];
        array_push($response,$arr);
    }

    echo json_encode($response);
    exit;
     
}

if(!empty($_POST['id']) && !empty($_POST['delete'])){
    require_once("db.php");
    $id=$_POST['id'];

    $query="DELETE FROM gallery WHERE Id='$id'";
    $stmt=$con->prepare($query) or die($con->error);
    $stmt->execute();

    echo "success";
    exit;

}
