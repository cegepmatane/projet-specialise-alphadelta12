 
<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Clicker</title>
    <link rel="stylesheet" href="style.css">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
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

 <!-- 
        <div class="tab-contenu" id="booster-tab">
            <div class="booster-section">
                <h2 class="section-titre">Pack d'artistes</h2>
                <p class="booster-description">Obtient 6 cartes d'artistes aléatoires!</p>
              
                <div class="booster-normal-section">
                    <div class="un">
                        <h1 class="booster-description">Booster</h1> 
                        <h3 class="booster-rarete-bs booster-common">Commun: 65%</h3>
                        <h3 class="booster-rarete-bs booster-rare">Rare: 35%</h3>
                        <h3 class="booster-rarete-bs booster-epic">Epique: 5%</h3>
                        <h3 class="booster-rarete-bs booster-legendary">Légendaire: 1%</h3>
                    </div>
                    <div class="deux">
                        <h1 class="booster-description">Super Booster</h1> 
                        <h3 class="booster-rarete-bs booster-rare">Rare: 20%</h3>
                        <h3 class="booster-rarete-bs booster-epic">Epique: 50%</h3>
                        <h3 class="booster-rarete-bs booster-legendary">Légendaire: 25%</h3>
                        <h3 class="booster-rarete-bs booster-secret">Secret: 5%</h3>
                    </div>
            
                </div>
              
                   
                 

                    
                <button id="ouvrirBooster" class="booster-btn">
                   
                     <span class="btn-texte">Ouvrir un Booster</span>
                     <span class="btn-prix">20 Fans</span>
                </button>

                <button id="ouvrirSuperBooster" class="booster-rare-btn">
               
                    <span class="btn-rare-texte">Ouvrir un Super Booster</span>
                    <span class="btn-rare-prix">1 Manager</span>
                 </button>

                <div class="section-collection">
                    <h3 class="booster-description">Ma Collection</h3>
                    <div id="collectionDisplay" class="collection-grid">

                      
                    </div>
                </div>

            </div>
             -->
        </div>
    </div>
</body>
</html>
<script defer src="app.js"></script>