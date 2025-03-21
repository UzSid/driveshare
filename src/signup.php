<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', '');
        $sql = "INSERT INTO driveshare.users (name, email, password, secq1, secq2, secq3, balance) 
            VALUES ('".str_replace("'", "''", $_GET['name'])."', '".str_replace("'", "''", $_GET['email'])."', '".str_replace("'", "''", $_GET['password1'])."', '".str_replace("'", "''", $_GET['secq1'])."', '".str_replace("'", "''", $_GET['secq2'])."', '".str_replace("'", "''", $_GET['secq3'])."', '".$_GET['balance']."');";
        $conn->exec($sql);
        //echo "<script> location.href='http://localhost:3000/'; </script>";
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>