<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', ''); //connect to database
        $sql = "DELETE FROM driveshare.notifications WHERE UID='".$_GET['UID']."' AND notification='".$_GET['notification']."';"; //delete record
        $conn->exec($sql);
        echo json_encode("SUCCESS");
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>