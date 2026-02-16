 
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clicker</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>

<div class="clickerConteneur">

    <div id="stat-joueur">
        <div class="stat-item">
            <span class="stat-label">Points</span>
            <span id="coinsText" class="stat-valeur">0</span>
        </div>
        <div class="stat-item">
            <span class="stat-label">Points Auto</span>
            <span id="parClicText" class="stat-valeur">0</span>
        </div>
         <div class="stat-item">
            <span class="stat-label">Niveau</span>
            <span id="autoParClicText" class="stat-valeur">0</span>
        </div>
    </div>


   
</div>



 <div id="panneauOption">
    <div class="tabs-conteneur">
        <button class="tab-btn active" data-tab="upgrades">Améliorations</button>
        <button class="tab-btn" data-tab="paliers">Paliers</button>
        <button class="tab-btn" data-tab="boosters">Boosters</button>
    </div>

    <div class="tab-contenu active" id="upgrades-tab">
        <div class="upgrades-grid">

        </div>
    </div>

    
 </div>
    
</body>
</html>
<script defer src="app.js"></script>