<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', ''); //connect to database
	} catch(PDOException $e) {
		echo "Connection failed: " . $e->getMessage();
	}
	$stmt = $conn->query("SELECT * FROM driveshare.users"); //select all account information
	while ($row = $stmt->fetch())
	{
		$rows[] = $row;
	}
	$encodedData = json_encode($rows);
	$conn = null;
	echo $encodedData; //send it back to the site
?>