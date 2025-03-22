<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', '');  //connect to database
        $sql = "DELETE FROM driveshare.cars WHERE CID='".$_GET['CID']."';"; //delete car record
        $conn->exec($sql);
        echo "<script> location.href='http://localhost:3000/MyListings'; </script>"; //return to page
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>