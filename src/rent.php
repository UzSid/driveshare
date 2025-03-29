<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', '');  //connect to database
        $dates = json_decode($_GET['dates']);
        foreach ($dates as $date) {
            $sql = "INSERT INTO driveshare.rents (CID, UID, date) VALUES (".$_GET['CID'].",".$_GET['UID'].",'".$date."');"; //add rental records
            $conn->exec($sql);
        }
        $sql = "UPDATE driveshare.users SET balance = balance - ".sizeof($dates) * $_GET['price']." WHERE UID=".$_GET['UID'].";"; //reduce balance by number of rented days * price
        $conn->exec($sql);
        echo json_encode("SUCCESS");
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>