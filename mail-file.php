<?php
  require 'vendor/autoload.php';

  use Aws\Ses\SesClient;
  use Aws\Exception\AwsException;

  $file = false;
  $sender_email = 'no-reply@ankr.network';
  $to_email = 'career@ankr.network';

  if ($_FILES['file']['size']) {
    $tmp_file = $_FILES["file"]["tmp_name"];
    $file = $_FILES['file']['name'];
    // move_uploaded_file($tmp_file, $file);
  }

  $recipient_emails = [$to_email];
  $subject = "Ankr Network Uploaded file";

  $SesClient = new SesClient([
    'version' => '2010-12-01',
    'region'  => 'us-west-2'
  ]);

  $html_body = '
<html>
  <head>
    <title>'.$subject.'</title>
  </head>
  <body>';
        if($file){
          $html_body .= '<p>File: '.basename($file).'</p> ';
        }
  $html_body .=
  '</body>
</html>';
  $char_set = 'UTF-8';

  try {
    $separator = md5(time());

    $headers = "From: $sender_email\n";
    $headers .= "To: $to_email\nReply-To: $sender_email\n";
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
      $result = $SesClient->sendRawEmail([
          'Destination' => [
              'ToAddresses' => $recipient_emails,
          ],
          'ReplyToAddresses' => [$sender_email],
          'Source' => $sender_email,
          'RawMessage' => [
              'Data' => "$headers\n$bodyMail",
          ]
      ]);
      $messageId = $result['MessageId'];
    }

    // echo("Email sent! Message ID: $messageId"."\n");
    echo("SUCCESS. Email has been sent!");
  } catch (AwsException $e) {
    // output error message if fails
    // echo $e->getMessage();
    // echo("The email was not sent. Error message: ".$e->getAwsErrorMessage()."\n");
    echo "ERROR";
  }

  if($file){
    unlink($tmp_file);
  }
?>
