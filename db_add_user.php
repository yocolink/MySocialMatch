<?php
	include "connexion.php";
	
	$id = $_POST['id'];
	$birthdate = $_POST['birthdate'];
	
	// Vérifier si l'id de l'user apparaît dans la table user
	$query = "SELECT COUNT(*) FROM users WHERE id_user=$id";
	$exec = mysqli_query($connect,$query) or die("Erreur SQL : " . mysqli_error($connect));
	
	$resultat = mysqli_fetch_row($exec);
	echo "$resultat[0] lignes trouvées";
	
	// Si aucune ligne de trouvée alors
	if($resultat[0] == 0){
	
		// Ajout de l'utilisateur dans la table users
		$query = "INSERT INTO users(id_user, user_bday) VALUES ($id, $birthdate,CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)";
		$exec = mysqli_query($connect,$query) or die("Erreur SQL : " . mysqli_error($connect));
		echo "Utilisateur ajouté avec succès !";
	}
	// Sinon
	else{
		// On update la date de dernière connexion
		$query = "UPDATE users SET last_connection=CURRENT_TIMESTAMP WHERE id_user=$id";
		$exec = mysqli_query($connect,$query)  or die("Erreur SQL : " . mysqli_error($connect));
		echo "Dernière connexion mise à jour !";
	}
	
?>