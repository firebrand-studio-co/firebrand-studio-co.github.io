<?php  
header('Content-Type: application/json');

$errors = [];
$myemail = 'hello@kerrysherin.com';

if (empty($_POST['name']) || empty($_POST['email']) || empty($_POST['subject']) || empty($_POST['message'])) {
    $errors[] = "All fields are required.";
}

$name = $_POST['name'] ?? '';
$email_address = $_POST['email'] ?? '';
$subject = $_POST['subject'] ?? '';
$message = $_POST['message'] ?? '';

if (!filter_var($email_address, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email address.";
}

if (empty($errors)) {
    $to = $myemail;
    $email_subject = "Contact form submission: $subject";
    $email_body = "You have received a new contact form message. ".
                  "Here are the details:\n Name: $name \n Email: $email_address \n Subject: $subject \n Message: \n $message";

    $headers = "From: $myemail\n";
    $headers .= "Reply-To: $email_address";

    if (mail($to, $email_subject, $email_body, $headers)) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Unable to send email.']);
    }
} else {
    echo json_encode(['success' => false, 'error' => implode(' ', $errors)]);
}
?>
