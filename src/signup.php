<?php
    header("Access-Control-Allow-Origin: *");
	try {
		$conn = new PDO('mysql:host=localhost;dbname=driveshare;', 'root', '');  //connect to database
        $sql = "INSERT INTO driveshare.users (name, email, password, secq1, secq2, secq3, balance) /*Add new account info along with security question answers and starting balance*/
            VALUES ('".str_replace("'", "''", $_GET['name'])."', '".str_replace("'", "''", $_GET['email'])."', '".str_replace("'", "''", $_GET['password'])."', '".str_replace("'", "''", $_GET['secq1'])."', '".str_replace("'", "''", $_GET['secq2'])."', '".str_replace("'", "''", $_GET['secq3'])."', '".$_GET['balance']."');"; //str_replace adds an extra apostrophe so they can be used
        $conn->exec($sql);
        echo "<script> location.href='http://localhost:3000/'; </script>";
    } catch(PDOException $e) {
        echo $sql . "<br>" . $e->getMessage();
    }  
    $conn = null;
?>