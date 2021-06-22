<?php

if(isset($_POST['analytics']) ){
    require_once("db.php");

    $sql="SELECT COUNT(email) AS cnt, stud_year FROM LoimaUsers GROUP BY stud_year";
    $stm=$con->prepare($sql)  or die($con->error);
$stm->execute()  or die($con->error);
$stm->bind_result($count,$year);

$response=array();

while($stm->fetch()){
    $arr=["year"=>$year,
    "count"=>$count];
    array_push($response,$arr);
}

echo json_encode($response);
exit;
}

if(isset($_POST['admin_users'])){
    require_once("db.php");

    $sql="SELECT * FROM LoimaUsers";
    $stm=$con->prepare($sql)  or die($con->error);
    $stm->execute()  or die($con->error);
    $stm->bind_result($name,$email, $regno, $phone,$stud_year,$pass,$status,$role);
    
    $response=array();

    while($stm->fetch()){
         $arr=['name'=>$name,
        'email'=>$email,
        'regno'=>$regno,
        'phone'=>$phone,
        'year'=>$stud_year,
        'status'=>$status,
        'role'=>$role
    ];

    array_push($response,$arr);
       
    }

echo json_encode($response);
exit;
}