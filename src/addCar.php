<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', '');
        $sql = "INSERT INTO driveshare.cars (UID, model, year, mileage, location, price) 
            VALUES ('".$_GET['UID']."', '".$_GET['model']."', '".$_GET['year']."', '".$_GET['mileage']."', '".$_GET['location']."', '".$_GET['price']."');";
        $conn->exec($sql);
        echo "<script> location.href='http://localhost:3000/'; </script>";
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>