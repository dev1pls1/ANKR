<?php
  require 'vendor/autoload.php';

  use Aws\Ses\SesClient;
  use Aws\Exception\AwsException;

  $sender_email = 'no-reply@ankr.network';

  $email = ( isset($_POST["Email"]) ) ? trim($_POST["Email"]) : '';
  $recipient_emails = ['info@ankr.network'];
  $subject = "Ankr Network Feedback from subscriber $email";

  $SesClient = new SesClient([
    'version' => '2010-12-01',
    'region'  => 'us-west-2'
  ]);

  $html_body = '
    <html>
      <head>
        <title>'.$subject.'</title>
      </head>
      <body>
        <p>Email: '.$email.'</p>
      </body>
    </html>';
  $char_set = 'UTF-8';

  try {
    if ($email) {
      $result = $SesClient->sendEmail([
          'Destination' => [
              'ToAddresses' => $recipient_emails,
          ],
          'ReplyToAddresses' => [$sender_email],
          'Source' => $sender_email,
          'Message' => [
            'Body' => [
                'Html' => [
                    'Charset' => $char_set,
                    'Data' => $html_body,
                ]
            ],
            'Subject' => [
                'Charset' => $char_set,
                'Data' => $subject,
            ],
          ]
      ]);
      $messageId = $result['MessageId'];
      // echo("Email sent! Message ID: $messageId"."\n");
    }
    echo("SUCCESS. Email has been sent!");
  } catch (AwsException $e) {
    // output error message if fails
    // echo $e->getMessage();
    // echo("The email was not sent. Error message: ".$e->getAwsErrorMessage()."\n");
    echo "ERROR";
  }
?>
