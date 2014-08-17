<?php
        $name     = '';
        $email    = ''; 
        $message = ''; 
        $subject = '';
        
         
        if(isset($_POST['email'])) {
        
            $name = $_POST['name'];
            $email = $_POST['email'];
            $subject = $_POST['subject'];
            $message = $_POST['message'];

            if(get_magic_quotes_gpc()) {
                    $message = stripslashes($message);
            }

             $address = "yourmail@here.com";

             if($subject!='') {
                $e_subject = $subject;
             } else {
                $e_subject = 'Mike CV: You have a message from ' . $name . '.';
             }

             $e_body = "You have a message from $name, here is the message.\r\n\n";

             $e_content = "\"$message\"\r\n\n";

             $e_reply = "You can contact $name via email, $email";

             $msg = $e_body . $e_content . $e_reply;

              mail($address, $e_subject, $msg, "From: $email\r\nReply-To: $email\r\nReturn-Path: $email\r\n","-f $address");
    
             echo "Thanks for your message! We'll be in touch very soon.";
        }
        else
        {
            echo "Message Sending Failed!";
        }