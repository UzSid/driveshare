<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', '');
        $sql = "UPDATE driveshare.cars SET ".$_GET['column']." = '".str_replace("'", "''", $_GET['value'])."' WHERE CID = '".$_GET['CID']."';";
        $conn->exec($sql);
        echo "<script> location.href='http://localhost:3000/MyListings'; </script>";
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>