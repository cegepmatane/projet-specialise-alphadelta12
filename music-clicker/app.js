// ===== Configuration PixiJS =====
const gameContainer = document.getElementById('gameContainer');
const app = new PIXI.Application({ 
    width: gameContainer.clientWidth, 
    height: gameContainer.clientHeight,
    backgroundColor: 0x0a0e27,
    antialias: true
});
gameContainer.appendChild(app.view);

// ===== Variables de jeu =====
let coins = 0;
let ptsParClick = 1;
let autoPerSec = 0;
let currentLevel = "Débutant";
let upgradeLevels = {};
let boosterTickers = [];
let paliersUnlocked = {};
let activeBonus = null;
let collection = {};
let isOpeningBooster = false;
let boosterPrice = 20;
let boostersPurchased = 0;

// Toutes les cartes possibles du jeu
const allCards = [
    { id: 1, name: "Gin Blossoms", rarity: "common", icon: "assets/GinBlossoms.jpg" },
    { id: 2, name: "ZZ Top", rarity: "common", icon: "assets/ZZTOP.jpg" },
    { id: 3, name: "The Cranberries", rarity: "common", icon: "assets/Cranberries.jpg" },
    { id: 4, name: "Billy Idol", rarity: "common", icon: "assets/BillyIdol.jpg" },
    { id: 5, name: "Alice Cooper", rarity: "common", icon: "assets/AliceCooper.jpg" },
    { id: 6, name: "Boston", rarity: "common", icon: "assets/Boston.jpg" },
    
   { id: 7, name: "Nirvana", rarity: "rare", icon: "assets/nirvana.jpg" },
   { id: 8, name: "U2", rarity: "rare", icon: "assets/U2.jpg" },
   { id: 9, name: "Bryan Adams", rarity: "rare", icon: "assets/BryanAdams.jpg" },
    { id: 10, name: "Roxette", rarity: "rare", icon: "assets/Roxette.jpg" },
    { id: 11, name: "Def Leppard", rarity: "rare", icon: "assets/DefLeppard.jpg" },
    { id: 12, name: "KISS", rarity: "rare", icon: "assets/kiss.jpg" },
    
    { id: 13, name: "Bon Jovi", rarity: "epic", icon: "assets/Bonjovi.jpg" },
    { id: 14, name: "Aerosmith", rarity: "epic", icon: "assets/aerosmith.jpg" },
    { id: 15, name: "Green Day", rarity: "epic", icon: "assets/greenday.jpg" },
    { id: 16, name: "The Offspring", rarity: "epic", icon: "assets/offspring.jpg" },
    
    { id: 17, name: "The Beatles", rarity: "legendary", icon: "assets/Beatles.jpg" },
    { id: 18, name: "Metallica", rarity: "legendary", icon: "assets/metallica.jpg" },
    { id: 19, name: "Elvis Presley", rarity: "legendary", icon: "assets/Elvis.jpg" }
];

// Données des améliorations
const upgradesData = [
    { id: 1, name: "Cordes neuves", icon: "🎸", cost: 10, pts: 1, bonus: "+20% coins pendant 2min" },
    { id: 2, name: "Médiator pro", icon: "🎵", cost: 50, pts: 2, bonus: "+5% cartes rares x3" },
    { id: 3, name: "Ampli puissant", icon: "🔊", cost: 150, pts: 3, bonus: null },
    { id: 4, name: "Pédales d'effet", icon: "⚡", cost: 400, pts: 5, bonus: "10% doubler pts/clic" },
    { id: 5, name: "Micro studio", icon: "🎤", cost: 800, pts: 8, bonus: "+15% coins pendant 2min" },
    { id: 6, name: "Table mixage", icon: "🎛️", cost: 1500, pts: 12, bonus: null },
    { id: 7, name: "Synthétiseur", icon: "🎹", cost: 3000, pts: 18, bonus: "+20% coins pendant 5min" },
    { id: 8, name: "Batterie pro", icon: "🥁", cost: 5000, pts: 25, bonus: null },
    { id: 9, name: "Studio mobile", icon: "🚐", cost: 8000, pts: 40, bonus: "x2 pts/clic pendant 30s" },
    { id: 10, name: "Platine DJ", icon: "💿", cost: 12000, pts: 60, bonus: "Carte exclusive" }
];

// Données des paliers
const paliersData = [
    { id: 1, name: "Garage Band", cost: 500, autopts: 1, icon: "🎸", description: "Débute ton aventure musicale", exclusive: true },
    { id: 2, name: "Premier concert", cost: 1500, autopts: 3, icon: "🎤", description: "Joue devant un petit public" },
    { id: 3, name: "Radio Locale", cost: 3000, autopts: 5, icon: "📻", description: "Diffuse ta musique localement" },
    { id: 4, name: "Tournée régionale", cost: 6000, autopts: 10, icon: "🚌", description: "Voyage et performe", exclusive: true },
    { id: 5, name: "Concert en Stade", cost: 10000, autopts: 15, icon: "🏟️", description: "Des milliers de fans" },
    { id: 6, name: "Hall Of Fame", cost: 15000, autopts: 20, icon: "👑", description: "Légende de la musique", exclusive: true }
];

// ===== Création du fond avec rayons =====
const centerX = app.screen.width / 2;
const centerY = app.screen.height / 2;

const graphics = new PIXI.Graphics();
graphics.beginFill(0x0a0e27);
graphics.drawRect(0, 0, app.screen.width, app.screen.height);
graphics.endFill();
app.stage.addChild(graphics);

// Cercle central
const centerCircle = new PIXI.Graphics();
centerCircle.beginFill(0x1a2045, 0.6);
centerCircle.drawCircle(centerX, centerY, 220);
centerCircle.endFill();
app.stage.addChild(centerCircle);

// Rayons animés
const raysContainer = new PIXI.Container();
raysContainer.x = centerX;
raysContainer.y = centerY;
app.stage.addChild(raysContainer);

for (let i = 0; i < 30; i++) {
    const ray = new PIXI.Graphics();
    const opacity = 0.2 + Math.random() * 0.2;
    ray.beginFill(0x4a90ff, opacity);
    ray.moveTo(0, 0);
    ray.lineTo(0, -350);
    ray.lineTo(10, -300);
    ray.lineTo(0, 0);
    ray.endFill();
    ray.rotation = (i * Math.PI * 2) / 30;
    raysContainer.addChild(ray);
}

app.ticker.add((delta) => {
    raysContainer.rotation += 0.003 * delta;
});

// ===== Guitare cliquable =====
const guitar = new PIXI.Container();
guitar.x = centerX;
guitar.y = centerY;
guitar.interactive = true;
guitar.buttonMode = true;

const body = new PIXI.Graphics();
body.beginFill(0xff4500);
body.drawRoundedRect(-70, -100, 140, 200, 25);
body.endFill();
body.beginFill(0xff6347, 0.5);
body.drawEllipse(-35, -50, 45, 70);
body.endFill();
guitar.addChild(body);

const neck = new PIXI.Graphics();
neck.beginFill(0x8b4513);
neck.drawRect(-20, -250, 40, 150);
neck.endFill();
neck.lineStyle(2, 0x000000, 0.3);
for(let i = 0; i < 6; i++) {
    neck.moveTo(-20, -250 + i * 30);
    neck.lineTo(20, -250 + i * 30);
}
guitar.addChild(neck);

const strings = new PIXI.Graphics();
strings.lineStyle(1.5, 0xcccccc, 0.9);
for(let i = 0; i < 6; i++) {
    const x = -15 + i * 6;
    strings.moveTo(x, -250);
    strings.lineTo(x, 100);
}
guitar.addChild(strings);

const pickguard = new PIXI.Graphics();
pickguard.beginFill(0xffffff, 0.4);
pickguard.drawEllipse(25, 0, 35, 60);
pickguard.endFill();
guitar.addChild(pickguard);

guitar.scale.set(0.7);
app.stage.addChild(guitar);

// ===== Animation de clic =====
guitar.on('pointerdown', () => {
    const actualPts = ptsParClick;
    coins += actualPts;
    updateStats();

    // Texte flottant +X à position aléatoire
    const floatingText = new PIXI.Text('+' + actualPts, {
        fontSize: 36,
        fill: 0xffd700,
        fontWeight: 'bold',
        stroke: 0x0a0e27,
        strokeThickness: 5
    });
    floatingText.anchor.set(0.5);
    // Position aléatoire autour de la guitare
    floatingText.x = guitar.x + (Math.random() - 0.5) * 150;
    floatingText.y = guitar.y - 80 + (Math.random() - 0.5) * 60;
    app.stage.addChild(floatingText);

    let floatSpeed = 4;
    const floatAnim = (delta) => {
        floatingText.y -= floatSpeed * delta;
        floatingText.alpha -= 0.025 * delta;
        floatSpeed *= 0.97;
        
        if (floatingText.alpha <= 0) {
            app.stage.removeChild(floatingText);
            floatingText.destroy();
            app.ticker.remove(floatAnim);
        }
    };
    app.ticker.add(floatAnim);

    guitar.scale.set(0.75);
    setTimeout(() => guitar.scale.set(0.7), 100);

    createParticles(guitar.x, guitar.y);
});

// ===== Particules =====
function createParticles(x, y) {
    for (let i = 0; i < 10; i++) {
        const particle = new PIXI.Graphics();
        particle.beginFill(0xffd700);
        particle.drawCircle(0, 0, 4);
        particle.endFill();
        particle.x = x;
        particle.y = y;
        
        const angle = (Math.PI * 2 * i) / 10;
        const speed = 3 + Math.random() * 3;
        const vx = Math.cos(angle) * speed;
        const vy = Math.sin(angle) * speed;
        
        app.stage.addChild(particle);
        
        const particleAnim = (delta) => {
            particle.x += vx * delta;
            particle.y += vy * delta;
            particle.alpha -= 0.04 * delta;
            
            if (particle.alpha <= 0) {
                app.stage.removeChild(particle);
                app.ticker.remove(particleAnim);
            }
        };
        app.ticker.add(particleAnim);
    }
}

// ===== Mise à jour des stats =====
function updateStats() {
    document.getElementById('coinsText').textContent = Math.floor(coins);
    document.getElementById('perClickText').textContent = ptsParClick;
    document.getElementById('autoPerSecText').textContent = autoPerSec;
    document.getElementById('levelText').textContent = currentLevel;
}

// ===== Auto-clicker =====
setInterval(() => {
    if (autoPerSec > 0) {
        coins += autoPerSec / 10;
        updateStats();
    }
}, 100);

// ===== Génération des upgrades =====
function generateUpgrades() {
    const container = document.querySelector('.upgrades-grid');
    container.innerHTML = '';
    
    upgradesData.forEach(upgrade => {
        const level = upgradeLevels[upgrade.id] || 0;
        const currentCost = Math.floor(upgrade.cost * Math.pow(1.5, level));
        
        const card = document.createElement('div');
        card.className = 'upgrade-card';
        
        card.innerHTML = `
            <div class="upgrade-header">
                <div class="upgrade-icon">${upgrade.icon}</div>
                <div class="upgrade-title">${upgrade.name}</div>
                <div class="upgrade-level">Niv. ${level}</div>
            </div>
            <div class="upgrade-stats">
                <div class="upgrade-stat">
                    <span class="stat-name">Points par clic</span>
                    <span class="stat-value-up">+${upgrade.pts}</span>
                </div>
            </div>
            ${upgrade.bonus ? `<div class="upgrade-bonus">🎁 ${upgrade.bonus}</div>` : ''}
            <div class="upgrade-cost">
                <span class="cost-label">Coût d'achat</span>
                <span class="cost-value">${currentCost} 🎵</span>
            </div>
        `;
        
        card.addEventListener('click', () => buyUpgrade(upgrade.id));
        container.appendChild(card);
    });
}

function buyUpgrade(id) {
    const upgrade = upgradesData.find(u => u.id === id);
    const level = upgradeLevels[id] || 0;
    const cost = Math.floor(upgrade.cost * Math.pow(1.5, level));
    
    if (coins >= cost) {
        coins -= cost;
        ptsParClick += upgrade.pts;
        upgradeLevels[id] = level + 1;
        updateStats();
        generateUpgrades();
        showNotification(`✅ ${upgrade.name} amélioré !`);
    } else {
        showNotification('❌ Pas assez de Fans !');
    }
}

// ===== Génération des paliers =====
function generatePaliers() {
    const container = document.querySelector('.paliers-list');
    container.innerHTML = '';
    
    paliersData.forEach(palier => {
        const unlocked = paliersUnlocked[palier.id] || false;
        
        const card = document.createElement('div');
        card.className = `palier-card ${unlocked ? 'unlocked' : ''}`;
        
        card.innerHTML = `
            <div class="palier-header">
                <div class="palier-number">${palier.icon}</div>
                <div class="palier-info">
                    <div class="palier-name">${palier.name}</div>
                    <div class="palier-description">${palier.description}</div>
                </div>
            </div>
            <div class="palier-benefits">
                <div class="benefit-tag">⚡ +${palier.autopts} pts/sec</div>
                <div class="benefit-tag">🎨 Nouveau style</div>
                ${palier.exclusive ? '<div class="benefit-tag exclusive">⭐ Carte exclusive</div>' : ''}
            </div>
            <div class="palier-footer">
                <div class="palier-cost">${palier.cost} 🎵</div>
                ${unlocked ? '<div class="palier-status unlocked">✅ Débloqué</div>' : ''}
            </div>
        `;
        
        if (!unlocked) {
            card.addEventListener('click', () => buyPalier(palier.id));
        }
        
        container.appendChild(card);
    });
}

function buyPalier(id) {
    const palier = paliersData.find(p => p.id === id);
    
    if (coins >= palier.cost) {
        coins -= palier.cost;
        autoPerSec += palier.autopts;
        paliersUnlocked[id] = true;
        currentLevel = palier.name;
        updateStats();
        generatePaliers();
        showNotification(`🎉 Palier "${palier.name}" débloqué !`);
    } else {
        showNotification('❌ Pas assez de musicoins !');
    }
}

// ===== Système de tabs =====
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const tab = btn.dataset.tab;
        
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        
        btn.classList.add('active');
        document.getElementById(tab + '-tab').classList.add('active');
    });
});

// ===== Booster Animation avec PixiJS (Simplifié) =====
let boosterContainer = null;
let currentBoosterCards = [];
let currentCardIndex = 0;

function updateBoosterButton() {
    const btn = document.getElementById('openBooster');
    const costSpan = btn.querySelector('.btn-cost');
    costSpan.textContent = `${boosterPrice} musicoins`;
}

document.getElementById('openBooster').addEventListener('click', () => {
    if (coins < boosterPrice) {
        showNotification(`❌ Besoin de ${boosterPrice} musicoins !`);
        return;
    }
    
    if (isOpeningBooster) return;
    
    coins -= boosterPrice;
    boostersPurchased++;
    boosterPrice = Math.floor(20 * Math.pow(1.3, boostersPurchased));
    updateBoosterButton();
    updateStats();
    isOpeningBooster = true;
    
    // Générer 6 cartes aléatoires
    currentBoosterCards = [];
    const rarities = [
        { name: 'common', weight: 59 },
        { name: 'rare', weight: 30 },
        { name: 'epic', weight: 10 },
        { name: 'legendary', weight: 1 }
    ];
    
    for (let i = 0; i < 6; i++) {
        const rarity = getRandomRarity(rarities);
        const cardsOfRarity = allCards.filter(c => c.rarity === rarity);
        const randomCard = cardsOfRarity[Math.floor(Math.random() * cardsOfRarity.length)];
        
        // Vérifier si c'est une nouvelle carte
        const isNew = !collection[randomCard.id] || collection[randomCard.id] === 0;
        currentBoosterCards.push({ ...randomCard, isNew });
        
        // Ajouter à la collection
        if (!collection[randomCard.id]) {
            collection[randomCard.id] = 0;
        }
        collection[randomCard.id]++;
    }
    
    currentCardIndex = 0;
    showBoosterAnimation();
});

function showBoosterAnimation() {
    // Créer container pour l'animation sur toute la scène
    boosterContainer = new PIXI.Container();
    app.stage.addChild(boosterContainer);
    
    // Fond noir semi-transparent sur toute la largeur
    const overlay = new PIXI.Graphics();
    overlay.beginFill(0x000000, 0.9);
    overlay.drawRect(-1000, 0, app.screen.width + 2000, app.screen.height);
    overlay.endFill();
    overlay.interactive = true;
    overlay.buttonMode = true;
    boosterContainer.addChild(overlay);
    
    // Afficher la première carte
    displayCard(0);
}

function displayCard(index) {
    if (index >= currentBoosterCards.length) {
        // Terminé
        closeBooster();
        generateCollection();
        showNotification('🎁 Booster ouvert ! Vérifie ta collection !');
        return;
    }
    
    const card = currentBoosterCards[index];
    
    const colors = {
        common: 0x4a5568,
        rare: 0x4a90ff,
        epic: 0xa78bfa,
        legendary: 0xfbbf24
    };
    
    // Créer la carte
    const cardContainer = new PIXI.Container();
    cardContainer.x = app.screen.width / 2;
    cardContainer.y = app.screen.height / 2;
    cardContainer.scale.set(0.1);
    cardContainer.alpha = 0;
    boosterContainer.addChild(cardContainer);
    
    // Glow
    const glow = new PIXI.Graphics();
    glow.beginFill(colors[card.rarity], 0.5);
    glow.drawCircle(0, 0, 200);
    glow.endFill();
    cardContainer.addChild(glow);
    
    // Corps de la carte
    const cardBg = new PIXI.Graphics();
    cardBg.beginFill(colors[card.rarity]);
    cardBg.lineStyle(5, 0xffffff);
    cardBg.drawRoundedRect(-100, -150, 200, 300, 15);
    cardBg.endFill();
    cardContainer.addChild(cardBg);
    
    // Badge "NEW" si nouvelle carte
    if (card.isNew) {
        const newBadge = new PIXI.Graphics();
        newBadge.beginFill(0xff4500);
        newBadge.drawRoundedRect(0, 0, 50, 25, 5);
        newBadge.endFill();
        newBadge.x = 50;
        newBadge.y = -145;
        cardContainer.addChild(newBadge);
        
        const newText = new PIXI.Text('NEW', {
            fontSize: 14,
            fill: 0xffffff,
            fontWeight: 'bold'
        });
        newText.anchor.set(0.5);
        newText.x = 75;
        newText.y = -132;
        cardContainer.addChild(newText);
    }
    
    const texture = PIXI.Texture.from(card.icon);
    const icon = new PIXI.Sprite(texture);

    icon.anchor.set(0.5);
    icon.y = -30;
    icon.alpha = 0; // caché tant que pas prêt

    cardContainer.addChild(icon);

    const maxSize = 120;

    // attendre que la texture soit chargée
    if (texture.baseTexture.valid) {
        const scale = Math.min(maxSize / icon.width, maxSize / icon.height);
        icon.scale.set(scale);
        icon.alpha = 1;
    } else {
        texture.baseTexture.on('loaded', () => {
            const scale = Math.min(maxSize / icon.width, maxSize / icon.height);
            icon.scale.set(scale);
            icon.alpha = 1;
        });
    }


    // Nom
    const name = new PIXI.Text(card.name, {
        fontSize: 16,
        fill: 0xffffff,
        fontWeight: 'bold',
        align: 'center',
        wordWrap: true,
        wordWrapWidth: 180
    });
    name.anchor.set(0.5);
    name.y = 50;
    cardContainer.addChild(name);
    
    // Rareté
    const rarityText = new PIXI.Text(card.rarity.toUpperCase(), {
        fontSize: 14,
        fill: 0xffffff,
        fontWeight: 'bold'
    });
    rarityText.anchor.set(0.5);
    rarityText.y = 100;
    cardContainer.addChild(rarityText);
    
    // Compteur
    const counter = new PIXI.Text(`${index + 1} / 6`, {
        fontSize: 20,
        fill: 0xffd700,
        fontWeight: 'bold'
    });
    counter.anchor.set(0.5);
    counter.x = app.screen.width / 2;
    counter.y = 50;
    boosterContainer.addChild(counter);
    
    // Texte instruction
    const instruction = new PIXI.Text(index < 5 ? 'Cliquez pour continuer' : 'Cliquez pour terminer', {
        fontSize: 18,
        fill: 0xffd700,
        fontWeight: 'bold'
    });
    instruction.anchor.set(0.5);
    instruction.x = app.screen.width / 2;
    instruction.y = app.screen.height - 50;
    boosterContainer.addChild(instruction);
    
    // Animation d'entrée
    let progress = 0;
    const animIn = (delta) => {
        progress += 0.05 * delta;
        cardContainer.scale.set(Math.min(progress, 1));
        cardContainer.alpha = Math.min(progress, 1);
        
        if (progress >= 1) {
            app.ticker.remove(animIn);
            
            // Particules
            for (let i = 0; i < 15; i++) {
                const particle = new PIXI.Graphics();
                particle.beginFill(colors[card.rarity]);
                particle.drawCircle(0, 0, 5);
                particle.endFill();
                particle.x = cardContainer.x;
                particle.y = cardContainer.y;
                
                const angle = (Math.PI * 2 * i) / 15;
                const speed = 3 + Math.random() * 3;
                const vx = Math.cos(angle) * speed;
                const vy = Math.sin(angle) * speed;
                
                boosterContainer.addChild(particle);
                
                let life = 1;
             const pAnim = (delta) => {
                if (!particle || !boosterContainer) {
                    app.ticker.remove(pAnim);
                    const i = boosterTickers.indexOf(pAnim);
                    if (i !== -1) boosterTickers.splice(i, 1);
                    return;
                }

                particle.x += vx * delta;
                particle.y += vy * delta;
                life -= 0.02 * delta;
                particle.alpha = life;
                
                if (life <= 0) {
                    boosterContainer.removeChild(particle);
                    app.ticker.remove(pAnim);
                    const i = boosterTickers.indexOf(pAnim);
                    if (i !== -1) boosterTickers.splice(i, 1);
                }
            };
            boosterTickers.push(pAnim);
            app.ticker.add(pAnim);

            }
            
            // Click pour continuer
            let clicked = false;
            const clickNext = () => {
                if (clicked) return;
                clicked = true;
                
                // Retirer le listener
                boosterContainer.children[0].off('pointerdown', clickNext);
                
                // Animation de sortie
                let progressOut = 0;
                const animOut = (delta) => {
                    progressOut += 0.08 * delta;
                    cardContainer.scale.set(1 + progressOut);
                    cardContainer.alpha = 1 - progressOut;
                    counter.alpha = 1 - progressOut;
                    instruction.alpha = 1 - progressOut;
                    
                    if (progressOut >= 1) {
                        app.ticker.remove(animOut);
                        boosterContainer.removeChild(cardContainer);
                        boosterContainer.removeChild(counter);
                        boosterContainer.removeChild(instruction);
                        displayCard(index + 1);
                    }
                };
                app.ticker.add(animOut);
            };
            
            boosterContainer.children[0].on('pointerdown', clickNext);
        }
    };
    app.ticker.add(animIn);
}

function closeBooster() {
    // ⚠️ Ne rien retirer pendant un tick actif
    const tickersToRemove = boosterTickers.slice();
    boosterTickers = [];

    tickersToRemove.forEach(fn => {
        try {
            app.ticker.remove(fn);
        } catch (e) {
            // ignore silencieusement
        }
    });

    if (boosterContainer) {
        const overlay = boosterContainer.children[0];
        if (overlay) overlay.removeAllListeners();

        app.stage.removeChild(boosterContainer);
        boosterContainer.destroy({ children: true });
        boosterContainer = null;
    }

    isOpeningBooster = false;
    currentBoosterCards = [];
    currentCardIndex = 0;
}


function createCardIcon(rarity) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 64 64');
    svg.setAttribute('width', '48');
    svg.setAttribute('height', '48');
    
    const colors = {
        common: '#4a5568',
        rare: '#4a90ff',
        epic: '#a78bfa',
        legendary: '#fbbf24'
    };
    
    const note = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    note.setAttribute('d', 'M 32 10 L 35 10 L 35 40 C 35 45 30 48 25 48 C 20 48 17 45 17 42 C 17 39 20 36 25 36 C 27 36 29 37 30 38 L 30 20 L 45 17 L 45 35 C 45 40 40 43 35 43 C 30 43 27 40 27 37 C 27 34 30 31 35 31 C 37 31 39 32 40 33 L 40 15 L 32 17 Z');
    note.setAttribute('fill', colors[rarity]);
    note.setAttribute('stroke', 'rgba(255,255,255,0.4)');
    note.setAttribute('stroke-width', '2');
    
    svg.appendChild(note);
    return svg;
}

// ===== Génération de la collection =====
function generateCollection() {
    const container = document.getElementById('collectionDisplay');
    container.innerHTML = '';
    
    allCards.forEach(card => {
        const item = document.createElement('div');
        const owned = collection[card.id] || 0;
        
        item.className = `collection-item ${owned > 0 ? 'owned' : ''}`;
        item.classList.add(card.rarity);
        
        if (owned > 0) {
            item.innerHTML = `
                <img src="${card.icon}" style="width:48px;height:48px;">
                <div style="font-size: 10px; margin-top: 5px; font-weight: bold;">${card.name}</div>
                <div style="font-size: 9px; color: #ffd700;">x${owned}</div>
            `;
        } else {
            item.innerHTML = `
                <div style="font-size: 32px; filter: grayscale(1) brightness(0.5);">❓</div>
                <div style="font-size: 10px; margin-top: 5px;">???</div>
            `;
        }
        
        container.appendChild(item);
    });
}

function getRandomRarity(rarities) {
    const total = rarities.reduce((sum, r) => sum + r.weight, 0);
    let random = Math.random() * total;
    
    for (let rarity of rarities) {
        if (random < rarity.weight) return rarity.name;
        random -= rarity.weight;
    }
    return rarities[0].name;
}

// ===== Notifications =====
function showNotification(message) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    
    document.getElementById('notifications').appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

// ===== Initialisation =====
generateUpgrades();
generatePaliers();
generateCollection();
updateBoosterButton();
updateStats();