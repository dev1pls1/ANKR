<?php
  require 'vendor/autoload.php';

  use Aws\Ses\SesClient;
  use Aws\Exception\AwsException;

  $name = ( isset($_POST["Name"]) ) ? trim($_POST["Name"]) : '';
  $email = ( isset($_POST["Email"]) ) ? trim($_POST["Email"]) : '';
  $phone = ( isset($_POST["Phone"]) ) ? trim($_POST["Phone"]) : '';
  $option = ( isset($_POST["Option"]) ) ? trim($_POST["Option"]) : '';
  $company = ( isset($_POST["Company"]) ) ? trim($_POST["Company"]) : '';
  $companyWeb = ( isset($_POST["CompanyWeb"]) ) ? trim($_POST["CompanyWeb"]) : '';
  $text = trim($_POST["Message"]);
  $file = false;

  if ($_FILES['file']['size']) {
    $tmp_file = $_FILES["file"]["tmp_name"];
    $file = './' . basename($_FILES['file']['name']);
    move_uploaded_file($tmp_file, $file);
  }

  $to = "info@ankr.network";

  $sitename = "ANKR-Network";

  $subject = "$sitename Feedback from $email";

  $message = '
    <html>
      <head>
        <title>'.$subject.'</title>
      </head>
      <body>
        <p>Name: '.$name.'</p>
        <p>Email: '.$email.'</p>
        <p>Phone: '.$phone.'</p>
        <p>Position: '.$option.'</p>
        <p>Message: '.$text.'</p>';
        if($company) {
          $message .= '<p>Company: '.$company.'</p> ';
        }
        if($companyWeb) {
          $message .= '<p>Company website: '.$companyWeb.'</p> ';
        }
        if($file){
          $message .= '<p>File: '.basename($_FILES['file']['name']).'</p> ';
        }
  $message .=                              
      '</body>
    </html>';

  $result = sendMailAttachment($to, $email, $subject, $message, $file);
  if($file){
    unlink($file);
  }
  

echo $result ? 'SUCCESS. Email has been sent!' : 'ERROR';

function sendMailAttachment($to_email, $reply_email, $subject, $html_body, $file = false){
  try {
    $SesClient = new SesClient([
      'version' => '2010-12-01',
      'region'  => 'us-west-2'
    ]);

    $char_set = 'UTF-8';
    $separator = md5(time());
    $sender_email = 'no-reply@ankr.network';

    $headers = "From: $sender_email\n";
    $headers .= "To: $to_email\nReply-To: $reply_email\n";
    $headers .= "Subject: $subject\n";
    $headers .= "MIME-Version: 1.0\n";
    $headers .= "Content-Type: multipart/mixed; boundary=\"$separator\"\n";

    $bodyMail = "--$separator\n";
    $bodyMail .= "Content-Type: text/html; charset=\"$char_set\"\n";
    $bodyMail .= "Content-Transfer-Encoding: 8bit\n";
    $bodyMail .= $html_body."\n";

    if($file){
      $bodyMail .= "--$separator\n";
      $fileRead = fopen($tmp_file, "r");
      $contentFile = fread($fileRead, filesize($tmp_file));
      fclose($fileRead);
      $bodyMail .= "Content-Type: application/octet-stream; name=\"=?utf-8?B?".base64_encode(basename($file))."?=\"\n";
      $bodyMail .= "Content-Transfer-Encoding: base64\n";
      $bodyMail .= "Content-Disposition: attachment; filename=\"=?utf-8?B?".base64_encode(basename($file))."?=\"\n\n";
      $bodyMail .= chunk_split(base64_encode($contentFile))."\n";
      $bodyMail .= "--".$separator ."--\n";
    }

    $result = $SesClient->sendRawEmail([
      'Destination' => [
          'ToAddresses' => [$to_email],
      ],
      'ReplyToAddresses' => [$reply_email],
      'Source' => $sender_email,
      'RawMessage' => [
          'Data' => "$headers\n$bodyMail",
      ]
    ]);
    $messageId = $result['MessageId'];

    // echo("Email sent! Message ID: $messageId"."\n");
    return true;
  } catch (AwsException $e) {
    // output error message if fails
    // echo $e->getMessage();
    // echo("The email was not sent. Error message: ".$e->getAwsErrorMessage()."\n");
    return false;
  }
}
?>