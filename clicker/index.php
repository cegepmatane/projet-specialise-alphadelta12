<?php
session_start();
if(!isset($_SESSION['user_id'])) $_SESSION['user_id']=1;
$user_id = $_SESSION['user_id'];
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Music Clicker</title>
    <link rel="stylesheet" href="style.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.5.7/browser/pixi.min.js"></script>

</head>

<body>
    <div id="containerClicker">
        <div id="statJoueur">
            <div class="stat-item">
                <span class="stat-label">Fans</span>
                <span id="coinsText" class="stat-valeur">0</span>
            </div>
             <div class="stat-item">
                <span class="stat-label">Par Clic</span>
                <span id="parClicText" class="stat-valeur">1</span>
            </div>
             <div class="stat-item">
                <span class="stat-label">Auto/sec</span>
                <span id="autoParClicText" class="stat-valeur">0</span>
            </div>
             <div class="stat-item">
                <span class="stat-label">Niveau</span>
                <span id="niveauText" class="stat-valeur">Débutant</span>
            </div>
        </div>
    </div>


    <div id="panneauOption">
        <div class="tabs-conteneur">
            <button class="tab-btn active" data-tab="upgrades">Ameliorations</button>
            <button class="tab-btn" data-tab="paliers">Paliers</button>
            <button class="tab-btn" data-tab="booster">Booster</button>
        </div>


        <div class="tab-contenu active" id="upgrades-tab">
            <div class="upgrades-grid">

            </div>
        </div>

        <div class="tab-contenu" id="paliers-tab">
             <div class="paliers-liste">
                </div>
        </div>


        <div class="tab-contenu" id="booster-tab">
            <div class="booster-section">
                <h2 class="section-titre">Pack d'artistes</h2>
                <p class="booster-description">Obtient 5 cartes d'artistes aléatoires!</p>
                <button id="ouvrirBooster" class="booster-btn">
                    <!-- <span class="btn-icon"></span> -->
                     <span class="btn-texte">Ouvrir un Booster</span>
                     <span class="btn-prix">20 Fans</span>
                </button>

                <div class="section-collection">
                    <h3 class="collection-titre">Ma Collection</h3>
                    <div id="collectionDisplay" class="collection-grid">

                        <!-- Fait En JS -->
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div id="notifications"></div>

    <script>
        const userId = <?php echo $user_id; ?>;
    </script>
    
    <script src="app.js?v=<?= time() ?>"></script>

   
    
</body>
</html>

