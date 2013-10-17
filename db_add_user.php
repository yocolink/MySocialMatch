<?php
	include "connexion.php";
?>
<!DOCTYPE HTML>
<html>
<head>
	<title></title>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
</head>
<body>
	<?php
		//$id = $_POST['id'];
		//$birthdate = $_POST['birthdate'];
		
		$id = 123456789550;
		$birthdate = "1991-01-21";
		
		// Vérifier si l'id de l'user apparaît dans la table user
		$query = "SELECT COUNT(*) FROM users WHERE id_user=$id";
		$exec = mysqli_query($connect,$query) or die("<p>Erreur SQL : " . mysqli_error($connect) ."</p>");
		
		$resultat = mysqli_fetch_row($exec);
		$nblignes = $resultat[0];
		echo "<p>$nblignes lignes trouvées </p>";
		
		// Si aucune ligne de trouvée alors
		if($nblignes == 0){
		
			// Ajout de l'utilisateur dans la table users
			$query = "INSERT INTO users(id_user, user_bday, date_creation, last_connection) VALUES ($id, CAST('".$birthdate."' AS DATE),CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)";
			$exec = mysqli_query($connect,$query) or die("<p>Erreur SQL : " . mysqli_error($connect) ."</p>");
			echo "<p>Utilisateur ajouté avec succès !</p>";
		}
		// Sinon
		else{
			// On update la date de dernière connexion
			$query = "UPDATE users SET last_connection=CURRENT_TIMESTAMP WHERE id_user=$id";
			$exec = mysqli_query($connect,$query)  or die("<p>Erreur SQL : " . mysqli_error($connect) ."</p>");
			echo "<p>Dernière connexion mise à jour !</p>";
		}
	?>
</body>
</html>