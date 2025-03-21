<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', '');
        $sql = "INSERT INTO driveshare.messages (senderEmail, receiverEmail, message)
            VALUES ('".$_GET['senderEmail']."', '".$_GET['receiverEmail']."', '".str_replace("'", "''", $_GET['message'])."');";
        $conn->exec($sql);
        echo "<script> location.href='http://localhost:3000/Messages'; </script>";
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>