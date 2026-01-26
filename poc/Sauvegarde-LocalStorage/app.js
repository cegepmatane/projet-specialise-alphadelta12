const CONFIG = {
    STORAGE_KEY: 'collectibleCardsData',
    COLLECTION_KEY: 'obtainedCardsCollection',
    TOTAL_CARDS: 20,
    CARDS_TO_DISPLAY: 5,
    CARD_IMAGE_PATH: 'assets/screenshot.png'
};

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

const StorageManager = {
    currentCollection: [],

    initialize() {
        const savedCollection = localStorage.getItem(CONFIG.COLLECTION_KEY);
        if (savedCollection) {
            try {
                this.currentCollection = JSON.parse(savedCollection);
            } catch (error) {
                this.currentCollection = [];
            }
        } else {
            this.currentCollection = [];
        }
    },

    getObtainedCards() {
        return this.currentCollection;
    },

    addObtainedCards(cardIds) {
        this.currentCollection = [...new Set([...this.currentCollection, ...cardIds])];
        return this.currentCollection;
    },

    saveToLocalStorage() {
        try {
            localStorage.setItem(CONFIG.COLLECTION_KEY, JSON.stringify(this.currentCollection));
            alert('Données sauvegardées avec succès!\n\nCartes obtenues: ' + this.currentCollection.length + '/20');
        } catch (error) {
            alert('Erreur lors de la sauvegarde!');
        }
    },

    resetCollection() {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser votre collection ?')) {
            this.currentCollection = [];
            localStorage.removeItem(CONFIG.COLLECTION_KEY);
            alert('Collection réinitialisée!');
            return true;
        }
        return false;
    },

    getRandomCards(count) {
        const shuffled = [...initialCardsData].sort(() => Math.random() - 0.5);
        return shuffled.slice(0, count);
    }
};

const CollectionManager = {
    updateCollectionDisplay() {
        const collectionGrid = document.getElementById('collectionGrid');
        const obtainedCards = StorageManager.getObtainedCards();
        
        collectionGrid.innerHTML = '';
        
        initialCardsData.forEach(card => {
            const isObtained = obtainedCards.includes(card.id);
            const cardElement = this.createCollectionCard(card, isObtained);
            collectionGrid.appendChild(cardElement);
        });
        
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
                <div class="locked-text">?</div>
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

const CardManager = {
    createCard(cardData, x, y) {
        const cardContainer = new PIXI.Container();
        cardContainer.x = x;
        cardContainer.y = y;

        const cardBg = new PIXI.Graphics();
        cardBg.beginFill(cardData.color);
        cardBg.drawRoundedRect(0, 0, 200, 300, 15);
        cardBg.endFill();

        cardBg.lineStyle(4, 0xFFFFFF, 0.8);
        cardBg.drawRoundedRect(0, 0, 200, 300, 15);
        cardContainer.addChild(cardBg);

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

        const imageBg = new PIXI.Graphics();
        imageBg.beginFill(0x000000, 0.2);
        imageBg.drawRoundedRect(15, 65, 170, 170, 10);
        imageBg.endFill();
        cardContainer.addChild(imageBg);

        const sprite = PIXI.Sprite.from(CONFIG.CARD_IMAGE_PATH);
        sprite.x = 100;
        sprite.y = 150;
        sprite.anchor.set(0.5);
        
        const maxWidth = 160;
        const maxHeight = 160;
        const scale = Math.min(maxWidth / sprite.width, maxHeight / sprite.height);
        sprite.scale.set(scale);
        
        cardContainer.addChild(sprite);

        const footerBg = new PIXI.Graphics();
        footerBg.beginFill(0x000000, 0.5);
        footerBg.drawRoundedRect(10, 245, 180, 45, 8);
        footerBg.endFill();
        cardContainer.addChild(footerBg);

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

        const idText = new PIXI.Text(`#${cardData.id}`, {
            fontFamily: 'Arial',
            fontSize: 12,
            fill: 0xFFFFFF,
            alpha: 0.7
        });
        idText.x = 15;
        idText.y = 12;
        cardContainer.addChild(idText);

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

        cardContainer.eventMode = 'static';
        cardContainer.cursor = 'pointer';

        cardContainer.on('pointerover', () => {
            cardContainer.scale.set(0.95);
        });

        cardContainer.on('pointerout', () => {
            cardContainer.scale.set(0.9);
        });

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

class CollectibleCardsApp {
    constructor() {
        this.app = null;
        this.cardsContainer = null;
        this.init();
    }

    init() {
        this.app = new PIXI.Application({
            width: 1200,
            height: 420,
            backgroundColor: 0x1a1a2e,
            antialias: true
        });

        document.getElementById('gameCanvas').appendChild(this.app.view);

        this.cardsContainer = new PIXI.Container();
        this.app.stage.addChild(this.cardsContainer);

        StorageManager.initialize();
        CollectionManager.updateCollectionDisplay();

        this.setupEventListeners();
    }

    setupEventListeners() {
        document.getElementById('loadButton').addEventListener('click', () => {
            this.drawCards();
        });

        document.getElementById('saveButton').addEventListener('click', () => {
            StorageManager.saveToLocalStorage();
        });

        document.getElementById('resetButton').addEventListener('click', () => {
            if (StorageManager.resetCollection()) {
                CollectionManager.updateCollectionDisplay();
            }
        });
    }

    drawCards() {
        const cardsToShow = StorageManager.getRandomCards(CONFIG.CARDS_TO_DISPLAY);
        
        const cardIds = cardsToShow.map(card => card.id);
        StorageManager.addObtainedCards(cardIds);
        
        this.displayCards(cardsToShow);
        
        CollectionManager.updateCollectionDisplay();
    }

    displayCards(cardsToShow) {
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
    }
}

window.addEventListener('DOMContentLoaded', () => {
    new CollectibleCardsApp();
});