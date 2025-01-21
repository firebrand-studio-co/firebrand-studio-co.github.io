<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $message = trim($_POST["message"]);

    if (empty($name) || empty($message) || !filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo "Invalid input.";
        exit;
    }

    $recipient = "firebrandstudiollc@gmail.com";
    $subject = "Email form testing $name";
    $email_content = "Name: $name\nEmail: $email\n\nMessage:\n$message\n";
    $email_headers = "From: $name <$email>";

    if (mail($recipient, $subject, $email_content, $email_headers)) {
        echo "OK";
    } else {
        echo "Something went wrong, please try again.";
    }
} else {
    echo "Invalid request.";
}
?>
