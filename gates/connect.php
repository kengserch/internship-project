<?php
//  include 'database.php'; 
//  $host = "localhost";
//  $username = "ducklabc_tpchannel";
//  $password = "tp1234";
//  $database_name = "ducklabc_tpchannel";
//  $db = new Database($database_name, $username, $password, $host);   

// MySql Database : localhost
// DB Name : tpchannel
// user : tpchannel62
// pass : ducktp1701944

	//  $host =  "ducklab.co.th";
	//  $user = "ducklabc_tpchannel";
	//  $passwd= "tp1234";
	//  $dbname = "ducklabc_tpchannel";
	//  $charset =  "utf8";


	
	$host =  "ducklab.co.th";
	$user = "ducklabc_mbu";
	$passwd= "mbu1701944";
	$dbname = "ducklabc_mbu";
	$charset =  "utf8";



	 


	 $conn = mysqli_connect($host, $user, $passwd ,$dbname);

	 if (!$conn) {
	 	die("Connection failed: " . mysqli_connect_error());
	 }
 	mysqli_set_charset($conn,"utf8");

 
?>
