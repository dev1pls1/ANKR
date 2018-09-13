<?php

  $email = ( isset($_POST["Email"]) ) ? trim($_POST["Email"]) : '';

  $to = "info@anker.network";

  $sitename = "ANKR-Network";
  $subject = "$sitename Feedback from subscriber $email";

  $message = '
    <html>
      <head>
        <title>'.$subject.'</title>
      </head>
      <body>
        <p>Email: '.$email.'</p>';
  $message .=                              
      '</body>
    </html>';

  $result = sendMailAttachment($to, $email, $subject, $message);
  

echo $result ? 'SUCCESS. Email has been sent!' : 'ERROR';

function sendMailAttachment($mailTo, $from, $subject, $message){
  $separator = "---";

  $headers = "MIME-Version: 1.0\r\n";
  $headers .= "From: $from\nReply-To: $from\n";
  $headers .= "Content-Type: multipart/mixed; boundary=\"$separator\"";

  $bodyMail = "--$separator\n";
  $bodyMail .= "Content-Type:text/html; charset=\"utf-8\"\n";
  $bodyMail .= "Content-Transfer-Encoding: 7bit\n\n";
  $bodyMail .= $message."\n";
  $result = mail($mailTo, $subject, $bodyMail, $headers);
  return $result;
}


?>