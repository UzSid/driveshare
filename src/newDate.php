<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', '');
        $sql = "INSERT INTO driveshare.availability (CID, date) VALUES ('".$_GET['CID']."', '".$_GET['date']."');";
        $conn->exec($sql);
        echo "<script> location.href='http://localhost:3000/MyListings'; </script>";
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>