<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', '');
        $dates = $_GET['dates'];
        foreach ($dates as $date) {
            $sql = "INSERT INTO driveshare.rents (CID, UID, date) VALUES (".$_GET['CID'].",".$_GET['UID'].",'".$date."');";
            $conn->exec($sql);
        }
        $sql = "UPDATE driveshare.users SET balance = balance - ".sizeof($dates) * $_GET['price']." WHERE UID=".$_GET['UID'].";";
        $conn->exec($sql);
        echo "<script> location.href='http://localhost:3000/CarList'; </script>";
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>