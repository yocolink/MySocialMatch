<?php
	include "connexion.php";
?>
<!DOCTYPE HTML>
<html>
<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=ISO 8859-1" />
</head>
<body>
	<?php
		$id_descr = $_POST["id_descr"];
		
		$requete = "SELECT description FROM description WHERE id_description = $id_descr";
		$exec = mysqli_query($connect,$requete) or die("<p>Erreur SQL : " . mysqli_error($connect) ."</p>");
		$resultat = mysqli_fetch_row($exec);
	?>
	<p>
		<?php echo $resultat[0] ?>
	</p>_
	<?php mysqli_close($connect); ?>
</body>
</html>