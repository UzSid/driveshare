<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', ''); //connect to database
        $sql = "INSERT INTO driveshare.availability (CID, date) VALUES ('".$_GET['CID']."', '".$_GET['date']."');"; //add date
        $conn->exec($sql);
        echo json_encode("SUCCESS");
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>