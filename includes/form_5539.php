<?php	
	if (empty($_POST['name_5539']) && strlen($_POST['name_5539']) == 0 || empty($_POST['email_5539']) && strlen($_POST['email_5539']) == 0 || empty($_POST['message_5539']) && strlen($_POST['message_5539']) == 0)
	{
		return false;
	}
	
	$name_5539 = $_POST['name_5539'];
	$email_5539 = $_POST['email_5539'];
	$message_5539 = $_POST['message_5539'];
	$optin_5539 = $_POST['optin_5539'];
	
	$to = 'receiver@yoursite.com'; // Email submissions are sent to this email

	// Create email	
	$email_subject = "Message from a Blocs website.";
	$email_body = "You have received a new message. \n\n".
				  "Name_5539: $name_5539 \nEmail_5539: $email_5539 \nMessage_5539: $message_5539 \nOptin_5539: $optin_5539 \n";
	$headers = "MIME-Version: 1.0\r\nContent-type: text/plain; charset=UTF-8\r\n";	
	$headers .= "From: contact@yoursite.com\n";
	$headers .= "Reply-To: $email_5539";	
	
	mail($to,$email_subject,$email_body,$headers); // Post message
	return true;			
?>