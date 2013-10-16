<?php
	$host = "localhost";
	$user = "root";
	$pwd = "";
	$db = "MySocialMatch";

	// CONNEXION SQL
	$connect = mysqli_connect($host, $user, $pwd, $db) or die ("Connect failed: " . mysqli_error($connect));
?>