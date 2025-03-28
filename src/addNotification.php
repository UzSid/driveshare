<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', ''); //connect to database
        if ($_GET['column'] == "email") {
            $stmt = $conn->query("SELECT UID FROM driveshare.users WHERE email='".$_GET['UID']."';");
            $row = $stmt->fetch();
            $UID = $row[0];
        }
        else {
            $UID = $_GET['UID'];
        }
        $sql = "INSERT INTO driveshare.notifications (UID, notification) /*Insert notification with the user it's for*/
            VALUES ('".$UID."', '".str_replace("'", "''", $_GET['notification'])."');"; //str_replace adds an extra apostrophe so they can be used
        $conn->exec($sql);
        //echo json_encode("SUCCESS");
        //echo "<script> location.href='http://localhost:3000/Messages'; </script>";
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>