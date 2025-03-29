<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', ''); //connect to database
        $sql = "DELETE FROM driveshare.availability WHERE CID='".$_GET['CID']."' AND date= '".$_GET['date']."';"; //delete record
        $conn->exec($sql);
        echo json_encode("SUCCESS");
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>