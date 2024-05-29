<?php 

$name = $_POST['name'];
$email = $_POST['email'];
$message = $_POST['message'];

// новички часто попадаются на ошибку использовать переменные с зарезервированными именами то есть 
// нельзя использовать переменную mail потому что есть команда mail


require_once('phpmailer/PHPMailerAutoload.php');
$mail = new PHPMailer;
$mail->CharSet = 'utf-8';

// $mail->SMTPDebug = 3;                               // Enable verbose debug output

$mail->isSMTP();                                      // Set mailer to use SMTP
$mail->Host = 'smtp.mail.ru';  // Specify main and backup SMTP servers
$mail->SMTPAuth = true;                               // Enable SMTP authentication
$mail->Username = 'vasya.osipov02@mail.ru';                 // Наш логин
$mail->Password = 'b4Y7kmTvQrELGtnecrh6';                           // Наш пароль от ящика
$mail->SMTPSecure = 'ssl';                            // Enable TLS encryption, `ssl` also accepted
$mail->Port = 465;                                    // TCP port to connect to

$mail->setFrom('vasya.osipov02@mail.ru', 'Portfolio');   // От кого письмо 
$mail->addAddress('vasya.osipov02@mail.ru');     // Add a recipient
//$mail->addAddress('ellen@example.com');               // Name is optional
//$mail->addReplyTo('info@example.com', 'Information');
//$mail->addCC('cc@example.com');
//$mail->addBCC('bcc@example.com');
//$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
//$mail->addAttachment('/tmp/image.jpg', 'new.jpg');    // Optional name
$mail->isHTML(true);                                  // Set email format to HTML

$mail->Subject = 'Данные';
$mail->Body    = '
		Пользователь оставил данные <br> 
		Имя: ' . $name . ' <br>
		Сообщение: ' . $message . '<br>
		E-mail: ' . $email . '';

if(!$mail->send()) {
    return false;
} else {
    return true;
}

?>