<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', ''); //connect to database
	} catch(PDOException $e) {
		echo "Connection failed: " . $e->getMessage();
	}
	$stmt = $conn->query("SELECT * FROM driveshare.messages;"); //get all messages
	while ($row = $stmt->fetch())
	{
		$rows[] = $row;
	}
	$encodedData = json_encode($rows);
	$conn = null;
	echo $encodedData;
?>