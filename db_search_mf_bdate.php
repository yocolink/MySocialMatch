<?php
	include "connexion.php";
?>
	<?php
		// Exemple de tableau avec IDs
		$missingFriendsId = array('1234567890','7894561230','1472583690','3692581470');
		
		$nbElements = count($missingFriendsId);
		$requete = "SELECT id_user, user_bday FROM users WHERE ";
		
		for ($i = 0 ; $i < $nbElements ; $i++){
			// Concaténation requête SQL
			if($i == $nbElements-1){
				$requete = $requete ."id_user=$missingFriendsId[$i]";
			}
			else{
				$requete = $requete ."id_user=$missingFriendsId[$i] OR ";
			}
		}
		
		// Exécution requête SQL
		$exec = mysqli_query($connect,$requete) or die("<p>Erreur SQL : " . mysqli_error($connect) ."</p>");
		
		// Pour chaque ligne
		while($row = mysqli_fetch_assoc($exec)){
			$tab[$row['id_user']] = $row['user_bday'];
		}
		
		// Récupérer id et bday à partir du tableau associatif
		foreach ($tab as $idUser => $bday) {
			echo "id_user = $idUser ; user_bday = $bday.<br/>";
		}
		
		mysqli_close($connect);
	?>
