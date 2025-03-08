<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', '');
	} catch(PDOException $e) {
		echo "Connection failed: " . $e->getMessage();
	}
	$stmt = $conn->query("SELECT * FROM driveshare.users");
	while ($row = $stmt->fetch())
	{
		$rows[] = $row;
	}
	$encodedData = json_encode($rows);
	$conn = null;
	echo $encodedData;
?>