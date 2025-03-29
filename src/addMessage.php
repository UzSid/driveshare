<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', ''); //connect to database
        $sql = "INSERT INTO driveshare.messages (senderEmail, receiverEmail, message) /*Insert message with sender and receiver*/
            VALUES ('".$_GET['senderEmail']."', '".$_GET['receiverEmail']."', '".str_replace("'", "''", $_GET['message'])."');"; //str_replace adds an extra apostrophe so they can be used
        $conn->exec($sql);
        echo json_encode("SUCCESS");
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>