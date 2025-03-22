<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', '');  //connect to database
        $sql = "INSERT INTO driveshare.cars (UID, owner, model, year, mileage, location, price) /*Insert new car; str_replace adds an extra apostrophe so they can be used*/
            VALUES ('".$_GET['UID']."', '".str_replace("'", "''", $_GET['name'])."', '".str_replace("'", "''", $_GET['model'])."', '".$_GET['year']."', '".$_GET['mileage']."', '".str_replace("'", "''", $_GET['location'])."', '".$_GET['price']."');";
        $conn->exec($sql);
        //Get the new car's ID
        $stmt = $conn->query("SELECT MAX(CID) AS maxID FROM driveshare.cars");
        $row = $stmt->fetch();
        //Get availability dates from form and add them all into database
        $dates = json_decode($_GET['dates']);
        foreach ($dates as $date) {
            $sql = "INSERT INTO driveshare.availability (CID, date) VALUES (".$row[0].",'".$date."');";
            $conn->exec($sql);
        }
        echo "<script> location.href='http://localhost:3000/carList'; </script>";
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>