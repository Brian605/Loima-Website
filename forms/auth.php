<?php
if(!empty($_POST['mode']) && !empty($_POST['name']) && !empty($_POST['phone'])  && !empty($_POST['ward'])  && !empty($_POST['institution'])&&
!empty($_POST['email']) && !empty($_POST['pass']) && !empty($_POST['regno']) && !empty($_POST['year'])){
    $name=$_POST['name'];
    $phone=$_POST['phone'];
    $email=$_POST['email'];
    $pass=$_POST['pass'];
    $regno=$_POST['regno'];
    $year=$_POST['year'];

    $institution=$_POST['institution'];
    $ward=$_POST['ward'];

    $role="user";
    $pass=md5($pass);
    $status="pending activation";

    $response=[];

    require_once("db.php");

    $query="SELECT email FROM LoimaUsers WHERE email='$email' OR regno='$regno'";
    $retval=$con->query($query) or die($con->error);
    
    if($retval->num_rows>0){
$response['success']=false;
$response['message']="This User is already Registered";

echo json_encode($response);
exit;
    }


    $query="INSERT INTO LoimaUsers(stud_name,email,phone, regno, stud_year,institution,ward,pass,status,role) VALUES (?,?,?,?,?,?,?,?,?,?)";
    $stm=$con->prepare($query) or die($con->error);
    $stm->bind_param("ssssssssss",$name,$email,$phone,$regno,$year,$institution,$ward,$pass,$status,$role) or die($con->error);
    $stm->execute() or die(var_dump($con));

    $url="http://hostel.themarket.co.ke/loima/assets/img/default_avatar.png";
    $query="INSERT INTO  profile (url,regno) VALUES (?,?)";
    $stmt=$con->prepare($query) or die($con->error);
    $stmt->bind_param("ss",$url,$regno);
    $stmt->execute();

    $response['success']=true;
$response['message']="Registered";

echo json_encode($response);
exit;

}

if(!empty($_POST['email']) && !empty($_POST['pass']) && !empty($_POST['mode'])){
    $lemail=$_POST['email'];
    $lpass=$_POST['pass'];
    $lpass=md5($lpass);
    $response=[];

    require_once("db.php");

    $sql="SELECT * FROM LoimaUsers WHERE email='$lemail'";
$stm=$con->prepare($sql)  or die($con->error);
$stm->execute()  or die($con->error);
$stm->bind_result($id,$name,$email, $regno, $phone,$stud_year,$institution,$ward,$pass,$status,$role);

while($stm->fetch()){
if($lemail==$email && $lpass==$pass){
    $response['name']=$name;
    $response['email']=$email;
    $response['regno']=$regno;
    $response['phone']=$phone;
    $response['year']=$stud_year;
    $response['institution']=$institution;
    $response['ward']=$ward;
    $response['status']=$status;
    $response['role']=$role;
    $response['success']=true;
    $response['message']="Login Success";
    echo json_encode($response);
    exit;   
}
}

$response['success']=false;
$response['message']="This User does not exist or incorrect Password";
echo json_encode($response);
exit;   


}


if(!empty($_POST['task']) && !empty($_POST['regno'])){
$task=$_POST['task'];
$regno=$_POST['regno'];

if($task=="make admin"){
    require_once("db.php");
    $sql="UPDATE LoimaUsers SET role='admin' WHERE regno='$regno'";
    $stm=$con->prepare($sql);
    $stm->execute();
    echo "Success";
    exit;
}

if($task=="remove admin"){
    require_once("db.php");
    $sql="UPDATE LoimaUsers SET role='user'  WHERE regno='$regno' AND role!='super'";
    $stm=$con->prepare($sql);
    $stm->execute();
    echo "Success";
    exit;
}

if($task=="activate account"){
    require_once("db.php");
    $sql="UPDATE LoimaUsers SET status='active' WHERE regno='$regno'";
    $stm=$con->prepare($sql);
    $stm->execute();
    echo "Success";
    exit;
}

if($task=="activateall"){
    require_once("db.php");
    $sql="UPDATE LoimaUsers SET status='active' WHERE 1";
    $stm=$con->prepare($sql);
    $stm->execute();
    echo "Success";
    exit;
}

if($task=="deactivate account"){
    require_once("db.php");
    $sql="UPDATE LoimaUsers SET status='Pending Activation' WHERE regno='$regno' AND role!='super' ";
    $stm=$con->prepare($sql);
    $stm->execute();
    echo "Success";
    exit;
}

if($task=="deactivateall"){
    require_once("db.php");
    $sql="UPDATE LoimaUsers SET status='Pending Activation' WHERE 1 AND role!='super'";
    $stm=$con->prepare($sql);
    $stm->execute();
    echo "Success";
    exit;
}

if($task=="delete"){
    require_once("db.php");
    $sql="DELETE FROM LoimaUsers  WHERE regno='$regno' AND role !='super'";
    $stm=$con->prepare($sql);
    $stm->execute();
    echo "Success";
    exit;
}

if($task=="deleteall"){
    require_once("db.php");
    $sql="DELETE FROM LoimaUsers  WHERE 1 AND role !='super'";
    $stm=$con->prepare($sql);
    $stm->execute();
    echo "Success";
    exit;
}
}


