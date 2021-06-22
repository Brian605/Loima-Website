<?php
if(!empty($_POST['name'])
&& !empty($_POST['institution'])
&& !empty($_POST['year'])
&& !empty($_POST['ward'])
&& !empty($_POST['regno'])
&& !empty($_POST['phone'])
&& !empty($_FILES['docs']['name'])){
    $name=$_POST['name'];
    $institution=$_POST['institution'];
$year=$_POST['year'];
$ward=$_POST['ward'];
$regno=$_POST['regno'];
$phone=$_POST['phone'];

    $file=$_FILES['docs'];

    $filename=$file['name'];
    $tempName=$file['tmp_name'];

    $extensionArray=explode(".",$filename);
    $extension=end($extensionArray);


    $newName=$regno." application.".$extension;

    $url= "https://hostel.themarket.co.ke/loima/files/".$newName;

    $uploadUrl="../files/".$newName;

    move_uploaded_file($tempName,$uploadUrl);

    require_once("db.php");

    $status="Pending";

    $query="INSERT INTO  bursary(name,regno,phone,ward,institution,year,docs,app_date,status) VALUES (?,?,?,?,?,?,?,CURDATE(),?)";
    $stmt=$con->prepare($query) or die($con->error);
    $stmt->bind_param("ssssssss",$name,$regno,$phone,$ward,$institution,$year,$url,$status) or die($con->error);
    $stmt->execute();

    echo '<script>
    alert("success");
    window.location.replace("../bursary.html");
    </script>';
    exit;

}

if(!empty($_POST['get_status'])){
    require_once("db.php");
   $query= "SELECT * FROM bursary_status";
   $stm=$con->prepare($query);
   $stm->execute();
   $stm->bind_result($status);

   $stm->fetch();

   echo $status;
   exit;
}

if(!empty($_POST['get_all_applications'])){
    require_once("db.php");
   $query= "SELECT * FROM bursary";
   $stm=$con->prepare($query);
   $stm->execute();
   $stm->bind_result($id,$name,$regno,$phone,$ward,$institution,$year,$docs,$app_date,$status);

   $response=array();
   while($stm->fetch()){
$arr=["name"=>$name,
"regno"=>$regno,
"id"=>$id,
"phone"=>$phone,
"ward"=>$ward,
"institution"=>$institution,
"year"=>$year,
"docs"=>$docs,
"status"=>$status,
"date"=>$app_date];
array_push($response,$arr);
   }
   echo json_encode($response);  
   exit;
}

if(!empty($_POST['get_my_applications']) && !empty($_POST['regno'])){
    require_once("db.php");
    $regno=$_POST['regno'];

   $query= "SELECT * FROM bursary WHERE regno='$regno'";
   $stm=$con->prepare($query);
   $stm->execute();
   $stm->bind_result($id,$name,$regno,$phone,$ward,$institution,$year,$docs,$app_date,$status);

   $response=array();
   while($stm->fetch()){
$arr=["name"=>$name,
"regno"=>$regno,
"phone"=>$phone,
"ward"=>$ward,
"institution"=>$institution,
"year"=>$year,
"docs"=>$docs,
"status"=>$status,
"date"=>$app_date];
array_push($response,$arr);
   }
   echo json_encode($response);  
   exit;
}

if(!empty($_POST['enable'])){
require_once("db.php");
$query="UPDATE bursary_status SET status='active'";
$con->query($query) or die($con->error);

$title="NOTICE: Bursary Application ";
$description="Bursary Application Window is now OPEN. You can apply through the website Bursary page or manually through our office. Note that the Application closes soon so you should apply ASAP";
$url="none";

 $query="INSERT INTO  blog (title,description,downloadUrl) VALUES (?,?,?)";
    $stmt=$con->prepare($query) or die($con->error);
    $stmt->bind_param("sss",$title,$description,$url);
    $stmt->execute();

echo "success";
exit;
}

if(!empty($_POST['disable'])){
require_once("db.php");
$query="UPDATE bursary_status SET status='inactive'";
$con->query($query) or die($con->error);

$title="NOTICE: Bursary Application ";
$description="Bursary Application Window is now CLOSED. You can NO LONGER apply through the website Bursary page or manually through our office. You can see the status of your application through the website Bursary page";
$url="none";

 $query="INSERT INTO  blog (title,description,downloadUrl) VALUES (?,?,?)";
    $stmt=$con->prepare($query) or die($con->error);
    $stmt->bind_param("sss",$title,$description,$url);
    $stmt->execute();

echo "success";
exit;
}

if(!empty($_POST['award']) && !empty($_POST['status']) && !empty($_POST['id'])){
require_once("db.php");

$status=$_POST['status'];
$id=$_POST['id'];

$query="UPDATE bursary SET status='$status' WHERE Id='$id'";
$con->query($query) or die($con->error);

//TODO: send user an sms

echo "success";
exit;
}

if(!empty($_POST['reject']) && !empty($_POST['status']) && !empty($_POST['id'])){
require_once("db.php");

$status=$_POST['status'];
$id=$_POST['id'];

$query="UPDATE bursary SET status='$status' WHERE Id='$id'";
$con->query($query) or die($con->error);

//TODO: send user an sms

echo "success";
exit;
}

if(!empty($_POST['delete_bursar'])  && !empty($_POST['id'])){
require_once("db.php");

$id=$_POST['id'];

$query="DELETE FROM bursary WHERE Id='$id'";
$con->query($query) or die($con->error);
echo "success";
exit;
}