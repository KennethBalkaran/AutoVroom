<?php
$name = $_POST['name'];
$visitor_email = $_POST['email'];
$subject = $_POST['subject'];
$message = $_POST['message'];

$email_form = '@gmail.com';

$email_subject = 'New Form Submission'

$email_body = "User Name: $name. \n". 
              "User Email: $visitor_email. \n". 
              "Subject: $subject. \n". 
              "User Message: $message. \n".

$to = 'kennethbalkaran8@gmail.com';

$headers = "From: $email.form \r\n";

$headers = "From: $email.form \r\n";

?>