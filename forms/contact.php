<?php
$receiving_email_address = 'contact@loima.co.ke';

$from_name = $_POST['name'];
$from_email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$message= $from_email."->".$from_name."->".$message;
if(mail($receiving_email_address, $subject,$message)){
  echo "OK";
}
?>
