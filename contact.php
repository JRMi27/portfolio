<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Récupération des données du formulaire
    $name = htmlspecialchars(trim($_POST['name']));
    $email = htmlspecialchars(trim($_POST['email']));
    $message = htmlspecialchars(trim($_POST['message']));

    // Validation des champs
    if (!empty($name) && !empty($email) && !empty($message) && filter_var($email, FILTER_VALIDATE_EMAIL)) {
        // Paramètres de l'email
        $to = "jeremy.rouillard27@gmail.com";  // Remplace avec ton adresse email
        $subject = "Nouveau message de contact de $name";
        $emailContent = "Nom: $name\nEmail: $email\n\nMessage:\n$message";
        $headers = "From: $email\r\n";

        // Envoi de l'email
        if (mail($to, $subject, $emailContent, $headers)) {
            echo "Votre message a été envoyé avec succès.";
        } else {
            echo "Erreur lors de l'envoi du message. Veuillez réessayer.";
        }
    } else {
        echo "Veuillez remplir tous les champs correctement.";
    }
}
?>
