<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', '');
        $sql = "INSERT INTO driveshare.users (name, email, password, secq1, secq2, secq3, balance) 
            VALUES ('".$_GET['name']."', '".$_GET['email']."', '".$_GET['password1']."', '".$_GET['secq1']."', '".$_GET['secq2']."', '".$_GET['secq3']."', '".$_GET['balance']."');";
        $conn->exec($sql);
        //echo "<script> location.href='http://localhost:3000/'; </script>";
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>