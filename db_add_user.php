<?php
	require_once "connexion.php";
        $id = $_POST['id'];
        $birthdate = date('Y-m-d', strtotime($_POST['birthdate']));

        // Vérifier si l'id de l'user apparaît dans la table user
        $query = "SELECT COUNT(*) FROM users WHERE id_user=$id";
        $exec = mysqli_query($connect,$query) or die("<p>Erreur SQL : " . mysqli_error($connect) ."</p>");

        $resultat = mysqli_fetch_row($exec);
        $nblignes = $resultat[0];

        // Si aucune ligne de trouvée alors
        if($nblignes == 0){

                // Ajout de l'utilisateur dans la table users
                $query = "INSERT INTO users(id_user, user_bday, date_creation, last_connection) VALUES ($id, CAST('".$birthdate."' AS DATE),CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)";
                $exec = mysqli_query($connect,$query) or die("Erreur SQL : " . mysqli_error($connect));
                echo "Utilisateur ajouté avec succès !";
        }
        // Sinon
        else{
            // Vérifier si l'user a changé sa date de naissance
            $query = "SELECT user_bday FROM users WHERE id_user=$id";
            $exec = mysqli_query($connect,$query) or die("<p>Erreur SQL : " . mysqli_error($connect) ."</p>");

            $resultat = mysqli_fetch_row($exec);
            $current_user_bday = $resultat[0];

            if ($current_user_bday != $birthdate)
                    $current_user_bday = $birthdate;

            // On update la date de naissance et de dernière connexion dans la table user
            $query = "UPDATE users SET last_connection=CURRENT_TIMESTAMP, user_bday=$current_user_bday WHERE id_user=$id";
            $exec = mysqli_query($connect,$query)  or die("Erreur SQL : " . mysqli_error($connect) );
            echo "Dernière connexion mise à jour !";
        }

		
        
        mysqli_close($connect);
?>