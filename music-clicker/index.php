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
<title>Music Clicker - Rock Legend</title>
<link rel="stylesheet" href="style.css">
<script src="https://cdnjs.cloudflare.com/ajax/libs/pixi.js/6.5.7/browser/pixi.min.js"></script>
</head>
<body>
    <div id="gameContainer">
        <div id="statsOverlay">
            <div class="stat-item">
                <span class="stat-label"> Fans</span>
                <span id="coinsText" class="stat-value">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">⚡ Par clic</span>
                <span id="perClickText" class="stat-value">1</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">🎸 Auto/sec</span>
                <span id="autoPerSecText" class="stat-value">0</span>
            </div>
            <div class="stat-item">
                <span class="stat-label">🎤 Niveau</span>
                <span id="levelText" class="stat-value">Débutant</span>
            </div>
        </div>
    </div>
    
    <div id="sidePanel">
        <div class="tabs-container">
            <button class="tab-btn active" data-tab="upgrades">⚡ Améliorations</button>
            <button class="tab-btn" data-tab="paliers">Paliers</button>
            <button class="tab-btn" data-tab="booster"> Booster</button>
        </div>

      >
        <div class="tab-content active" id="upgrades-tab">
            <div class="upgrades-grid">
              
            </div>
        </div>

        
        <div class="tab-content" id="paliers-tab">
            <div class="paliers-list">
                
            </div>
        </div>

        <!-- TAB: BOOSTER -->
        <div class="tab-content" id="booster-tab">
            <div class="booster-section">
                <h2 class="section-title">🎁 Pack Mystère</h2>
                <p class="booster-description">Ouvre un pack pour obtenir 6 cartes aléatoires !</p>
                <button id="openBooster" class="booster-btn">
                    <span class="btn-icon">🎁</span>
                    <span class="btn-text">Ouvrir Booster</span>
                    <span class="btn-cost">20 musicoins</span>
                </button>
                
                <div class="collection-section">
                    <h3 class="subsection-title">📚 Ma Collection</h3>
                    <div id="collectionDisplay" class="collection-grid">
                        <!-- Collection sera générée par JS -->
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Notifications flottantes -->
    <div id="notifications"></div>
    
    <script>
        const userId = <?php echo $user_id; ?>;
    </script>
    <script src="app.js"></script>
</body>
</html>