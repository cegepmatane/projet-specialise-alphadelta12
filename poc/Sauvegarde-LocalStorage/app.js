// ========================
// CONFIGURATION ET DONNÉES
// ========================

const CONFIG = {
    STORAGE_KEY: 'collectibleCardsData',
    COLLECTION_KEY: 'obtainedCardsCollection',
    TOTAL_CARDS: 20,
    CARDS_TO_DISPLAY: 5,
    CARD_IMAGE_PATH: 'assets/screenshot.png'
};

// Jeu de données initial - 20 cartes
const initialCardsData = [
    { id: 1, name: "Dragon de Feu", rarity: "Légendaire", color: 0xFF4444 },
    { id: 2, name: "Phénix Sacré", rarity: "Légendaire", color: 0xFF8844 },
    { id: 3, name: "Léviathan", rarity: "Épique", color: 0x4444FF },
    { id: 4, name: "Kraken", rarity: "Épique", color: 0x2266CC },
    { id: 5, name: "Géant de Pierre", rarity: "Rare", color: 0x8B4513 },
    { id: 6, name: "Golem Ancien", rarity: "Rare", color: 0xA0522D },
    { id: 7, name: "Sylphe Céleste", rarity: "Rare", color: 0x87CEEB },
    { id: 8, name: "Griffon Royal", rarity: "Rare", color: 0xFFD700 },
    { id: 9, name: "Vampire Nocturne", rarity: "Épique", color: 0x4B0082 },
    { id: 10, name: "Ange Gardien", rarity: "Légendaire", color: 0xFFFFE0 },
    { id: 11, name: "Loup-Garou", rarity: "Rare", color: 0x228B22 },
    { id: 12, name: "Esprit Forestier", rarity: "Rare", color: 0x32CD32 },
    { id: 13, name: "Serpent de Glace", rarity: "Épique", color: 0x00CED1 },
    { id: 14, name: "Yéti Polaire", rarity: "Rare", color: 0xAFEEEE },
    { id: 15, name: "Démon Infernal", rarity: "Légendaire", color: 0x8B0000 },
    { id: 16, name: "Licorne Enchantée", rarity: "Épique", color: 0xFF69B4 },
    { id: 17, name: "Chimère Sauvage", rarity: "Épique", color: 0xFF6347 },
    { id: 18, name: "Hydre Venimeuse", rarity: "Rare", color: 0x006400 },
    { id: 19, name: "Basilic", rarity: "Épique", color: 0x556B2F },
    { id: 20, name: "Thunderbird", rarity: "Légendaire", color: 0xFFD700 }
];

// ========================
// GESTION DU LOCALSTORAGE
// ========================

const StorageManager = {
    initialize() {
        // Initialiser les données des cartes
        const existingData = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (!existingData) {
            this.saveAll();
            console.log('✅ Données initiales sauvegardées');
        }
        
        // Initialiser la collection (cartes obtenues)
        const existingCollection = localStorage.getItem(CONFIG.COLLECTION_KEY);
        if (!existingCollection) {
            localStorage.setItem(CONFIG.COLLECTION_KEY, JSON.stringify([]));
            console.log('✅ Collection initialisée');
        }
    },

    loadAll() {
        const data = localStorage.getItem(CONFIG.STORAGE_KEY);
        if (data) {
            try {
                return JSON.parse(data);
            } catch (error) {
                console.error('❌ Erreur lors du parsing des données:', error);
                return null;
            }
        }
        return null;
    },

    saveAll() {
        const dataToSave = {
            cards: initialCardsData,
            lastSaved: new Date().toISOString(),
            totalCards: CONFIG.TOTAL_CARDS
        };
        
        try {
            localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(dataToSave));
            console.log('💾 Données sauvegardées!');
            
            alert(
                '✅ Données sauvegardées avec succès!\n\n' + 
                `📅 Date: ${new Date().toLocaleString('fr-FR')}\n` +
                `📊 Total: ${CONFIG.TOTAL_CARDS} cartes\n` +
                `🎴 Obtenues: ${this.getObtainedCards().length} cartes`
            );
        } catch (error) {
            console.error('❌ Erreur lors de la sauvegarde:', error);
            alert('❌ Erreur lors de la sauvegarde!');
        }
    },

    getObtainedCards() {
        const collection = localStorage.getItem(CONFIG.COLLECTION_KEY);
        if (collection) {
            try {
                return JSON.parse(collection);
            } catch (error) {
                console.error('❌ Erreur lors du parsing de la collection:', error);
                return [];
            }
        }
        return [];
    },

    addObtainedCards(cardIds) {
        const obtainedCards = this.getObtainedCards();
        const updatedCards = [...new Set([...obtainedCards, ...cardIds])]; // Éviter les doublons
        
        try {
            localStorage.setItem(CONFIG.COLLECTION_KEY, JSON.stringify(updatedCards));
            console.log(`✅ ${cardIds.length} cartes ajoutées à la collection`);
            return updatedCards;
        } catch (error) {
            console.error('❌ Erreur lors de l\'ajout à la collection:', error);
            return obtainedCards;
        }
    },

    resetCollection() {
        if (confirm('⚠️ Êtes-vous sûr de vouloir réinitialiser votre collection ?')) {
            localStorage.setItem(CONFIG.COLLECTION_KEY, JSON.stringify([]));
            console.log('🔄 Collection réinitialisée');
            alert('✅ Collection réinitialisée!');
            return true;
        }
        return false;
    },

    getRandomCards(count) {
        const savedData = this.loadAll();
        const cardsPool = savedData ? savedData.cards : initialCardsData;
        
        const shuffled = [...cardsPool].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }
};

// ========================
// GESTION DE LA COLLECTION UI
// ========================

const CollectionManager = {
    updateCollectionDisplay() {
        const collectionGrid = document.getElementById('collectionGrid');
        const obtainedCards = StorageManager.getObtainedCards();
        
        // Vider la grille
        collectionGrid.innerHTML = '';
        
        // Créer une carte pour chaque carte du jeu
        initialCardsData.forEach(card => {
            const isObtained = obtainedCards.includes(card.id);
            const cardElement = this.createCollectionCard(card, isObtained);
            collectionGrid.appendChild(cardElement);
        });
        
        // Mettre à jour les stats
        this.updateStats();
    },

    createCollectionCard(cardData, isObtained) {
        const cardDiv = document.createElement('div');
        cardDiv.className = `collection-card ${isObtained ? 'obtained' : 'locked'}`;
        
        if (isObtained) {
            cardDiv.innerHTML = `
                <div class="obtained-badge">✓</div>
                <div class="card-id">#${cardData.id}</div>
                <div class="card-name">${cardData.name}</div>
                <div class="card-rarity ${this.getRarityClass(cardData.rarity)}">
                    ${cardData.rarity}
                </div>
            `;
        } else {
            cardDiv.innerHTML = `
                <div class="locked-icon">🔒</div>
                <div class="card-id">#${cardData.id}</div>
                <div class="card-name">???</div>
            `;
        }
        
        return cardDiv;
    },

    getRarityClass(rarity) {
        switch (rarity) {
            case 'Légendaire':
                return 'rarity-legendary';
            case 'Épique':
                return 'rarity-epic';
            case 'Rare':
                return 'rarity-rare';
            default:
                return '';
        }
    },

    updateStats() {
        const obtainedCards = StorageManager.getObtainedCards();
        const statsElement = document.getElementById('collectionStats');
        statsElement.textContent = `${obtainedCards.length}/${CONFIG.TOTAL_CARDS}`;
        
        // Changer la couleur selon la progression
        const percentage = (obtainedCards.length / CONFIG.TOTAL_CARDS) * 100;
        if (percentage === 100) {
            statsElement.style.background = 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)';
        } else if (percentage >= 50) {
            statsElement.style.background = 'linear-gradient(135deg, #FFC107 0%, #FF9800 100%)';
        } else {
            statsElement.style.background = 'rgba(0, 0, 0, 0.3)';
        }
    }
};

// ========================
// CRÉATION DES CARTES PIXI
// ========================

const CardManager = {
    createCard(cardData, x, y) {
        const cardContainer = new PIXI.Container();
        cardContainer.x = x;
        cardContainer.y = y;

        // Fond de la carte
        const cardBg = new PIXI.Graphics();
        cardBg.beginFill(cardData.color);
        cardBg.drawRoundedRect(0, 0, 200, 300, 15);
        cardBg.endFill();

        // Bordure blanche
        cardBg.lineStyle(4, 0xFFFFFF, 0.8);
        cardBg.drawRoundedRect(0, 0, 200, 300, 15);
        cardContainer.addChild(cardBg);

        // En-tête avec nom
        const headerBg = new PIXI.Graphics();
        headerBg.beginFill(0x000000, 0.4);
        headerBg.drawRoundedRect(10, 10, 180, 45, 8);
        headerBg.endFill();
        cardContainer.addChild(headerBg);

        const nameText = new PIXI.Text(cardData.name, {
            fontFamily: 'Arial',
            fontSize: 18,
            fontWeight: 'bold',
            fill: 0xFFFFFF,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 170
        });
        nameText.x = 100;
        nameText.y = 25;
        nameText.anchor.set(0.5);
        cardContainer.addChild(nameText);

        // Zone image
        const imageBg = new PIXI.Graphics();
        imageBg.beginFill(0x000000, 0.2);
        imageBg.drawRoundedRect(15, 65, 170, 170, 10);
        imageBg.endFill();
        cardContainer.addChild(imageBg);

        // Charger l'image
        const sprite = PIXI.Sprite.from(CONFIG.CARD_IMAGE_PATH);
        sprite.x = 100;
        sprite.y = 150;
        sprite.anchor.set(0.5);
        
        // Ajuster la taille
        const maxWidth = 160;
        const maxHeight = 160;
        const scale = Math.min(maxWidth / sprite.width, maxHeight / sprite.height);
        sprite.scale.set(scale);
        
        cardContainer.addChild(sprite);

        // Pied de carte avec rareté
        const footerBg = new PIXI.Graphics();
        footerBg.beginFill(0x000000, 0.5);
        footerBg.drawRoundedRect(10, 245, 180, 45, 8);
        footerBg.endFill();
        cardContainer.addChild(footerBg);

        // Badge de rareté
        const rarityColor = this.getRarityColor(cardData.rarity);
        const rarityBadge = new PIXI.Graphics();
        rarityBadge.beginFill(rarityColor);
        rarityBadge.drawRoundedRect(40, 255, 120, 28, 5);
        rarityBadge.endFill();
        cardContainer.addChild(rarityBadge);

        const rarityText = new PIXI.Text(cardData.rarity, {
            fontFamily: 'Arial',
            fontSize: 16,
            fontWeight: 'bold',
            fill: 0xFFFFFF
        });
        rarityText.x = 100;
        rarityText.y = 269;
        rarityText.anchor.set(0.5);
        cardContainer.addChild(rarityText);

        // ID de la carte
        const idText = new PIXI.Text(`#${cardData.id}`, {
            fontFamily: 'Arial',
            fontSize: 12,
            fill: 0xFFFFFF,
            alpha: 0.7
        });
        idText.x = 15;
        idText.y = 12;
        cardContainer.addChild(idText);

        // Badge "NOUVEAU" si c'est une nouvelle carte
        const obtainedCards = StorageManager.getObtainedCards();
        if (!obtainedCards.includes(cardData.id)) {
            const newBadge = new PIXI.Graphics();
            newBadge.beginFill(0xFF0000);
            newBadge.drawRoundedRect(140, 10, 50, 20, 5);
            newBadge.endFill();
            cardContainer.addChild(newBadge);

            const newText = new PIXI.Text('NEW', {
                fontFamily: 'Arial',
                fontSize: 12,
                fontWeight: 'bold',
                fill: 0xFFFFFF
            });
            newText.x = 165;
            newText.y = 20;
            newText.anchor.set(0.5);
            cardContainer.addChild(newText);
        }

        // Rendre interactive
        cardContainer.eventMode = 'static';
        cardContainer.cursor = 'pointer';

        cardContainer.on('pointerover', () => {
            cardContainer.scale.set(0.95);
        });

        cardContainer.on('pointerout', () => {
            cardContainer.scale.set(0.9);
        });

        // État initial pour animation
        cardContainer.alpha = 0;
        cardContainer.scale.set(0.7);

        return cardContainer;
    },

    getRarityColor(rarity) {
        switch (rarity) {
            case 'Légendaire':
                return 0xFFD700;
            case 'Épique':
                return 0xA020F0;
            case 'Rare':
                return 0x4169E1;
            default:
                return 0xC0C0C0;
        }
    },

    animateCardIn(card, index) {
        const delay = index * 100;
        
        setTimeout(() => {
            let alpha = 0;
            let scale = 0.5;

            const animate = () => {
                if (alpha < 1) {
                    alpha += 0.05;
                    scale += 0.02;
                    card.alpha = alpha;
                    card.scale.set(Math.min(scale, 0.9));
                    requestAnimationFrame(animate);
                }
            };
            
            animate();
        }, delay);
    }
};

// ========================
// APPLICATION PRINCIPALE
// ========================

class CollectibleCardsApp {
    constructor() {
        this.app = null;
        this.cardsContainer = null;
        this.init();
    }

    init() {
        // Créer l'application PixiJS
        this.app = new PIXI.Application({
            width: 1200,
            height: 420,
            backgroundColor: 0x1a1a2e,
            antialias: true
        });

        // Ajouter le canvas
        document.getElementById('gameCanvas').appendChild(this.app.view);

        // Créer le container des cartes
        this.cardsContainer = new PIXI.Container();
        this.app.stage.addChild(this.cardsContainer);

        // Initialiser localStorage
        StorageManager.initialize();

        // Afficher la collection initiale
        CollectionManager.updateCollectionDisplay();

        // Configurer les boutons
        this.setupEventListeners();

        console.log('╔═══════════════════════════════════════╗');
        console.log('║   🎴 CARTES À COLLECTIONNER 🎴      ║');
        console.log('║                                       ║');
        console.log('║   📊 20 cartes à collectionner       ║');
        console.log('║   🎲 Tirez 5 cartes aléatoires       ║');
        console.log('║   📚 Complétez votre collection!     ║');
        console.log('╚═══════════════════════════════════════╝');
    }

    setupEventListeners() {
        document.getElementById('loadButton').addEventListener('click', () => {
            this.drawCards();
        });

        document.getElementById('saveButton').addEventListener('click', () => {
            StorageManager.saveAll();
        });

        document.getElementById('resetButton').addEventListener('click', () => {
            if (StorageManager.resetCollection()) {
                CollectionManager.updateCollectionDisplay();
            }
        });
    }

    drawCards() {
        // Obtenir 5 cartes aléatoires
        const cardsToShow = StorageManager.getRandomCards(CONFIG.CARDS_TO_DISPLAY);
        
        // Ajouter ces cartes à la collection
        const cardIds = cardsToShow.map(card => card.id);
        StorageManager.addObtainedCards(cardIds);
        
        // Afficher les cartes
        this.displayCards(cardsToShow);
        
        // Mettre à jour la collection
        CollectionManager.updateCollectionDisplay();
        
        console.log('🎴 5 nouvelles cartes tirées!');
    }

    displayCards(cardsToShow) {
        // Effacer les cartes existantes
        this.cardsContainer.removeChildren();

        const spacing = 220;
        const startX = 70;
        const startY = 60;

        cardsToShow.forEach((cardData, index) => {
            const card = CardManager.createCard(
                cardData,
                startX + (index * spacing),
                startY
            );
            
            this.cardsContainer.addChild(card);
            CardManager.animateCardIn(card, index);
        });

        console.log(`🎴 ${cardsToShow.length} cartes affichées`);
    }
}

// Démarrer l'application
window.addEventListener('DOMContentLoaded', () => {
    new CollectibleCardsApp();
});