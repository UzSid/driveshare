<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', '');  //connect to database
        $sql = "UPDATE driveshare.cars SET ".$_GET['column']." = '".str_replace("'", "''", $_GET['value'])."' WHERE CID = '".$_GET['CID']."';"; //modify car record; str_replace adds an extra apostrophe so they can be used
        $conn->exec($sql);
        echo "<script> location.href='http://localhost:3000/MyListings'; </script>"; //return to page
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>