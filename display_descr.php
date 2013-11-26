<?php
	include "connexion.php";
?>
	<?php
		$id_descr = $_POST["id_descr"];
		
		$requete = "SELECT description FROM description WHERE id_description = $id_descr";
		$exec = mysqli_query($connect,$requete) or die("<p>Erreur SQL : " . mysqli_error($connect) ."</p>");
		$resultat = mysqli_fetch_row($exec);
	?>
        <?php echo utf8_encode($resultat[0]) ?>
	<?php mysqli_close($connect); ?>