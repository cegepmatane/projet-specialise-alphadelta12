const CONFIGURATION = {

    STORAGE_KEY: 'collectibleDonneeCarte',
    COLLECTION_KEY: 'CardObtenu',
    TOTAL_CARDS: 20,
    CARDS_TO_DISPLAY: 5,
    CARD_IMAGE_PATH: 'assets/screenshot.png'
};


const CarteInitial = [
    { id: 1, name: "carte1", rarity: "Légendaire", color: 0xFF4444 },
    { id: 2, name: "carte2", rarity: "Légendaire", color: 0xFF8844 },
    { id: 3, name: "carte3", rarity: "Épique", color: 0x4444FF },
    { id: 4, name: "carte4", rarity: "Épique", color: 0x2266CC },
    { id: 5, name: "carte5", rarity: "Rare", color: 0x8B4513 },
    { id: 6, name: "carte6", rarity: "Rare", color: 0xA0522D },
    { id: 7, name: "carte7", rarity: "Rare", color: 0x87CEEB },
    { id: 8, name: "carte8", rarity: "Rare", color: 0xFFD700 },
    { id: 9, name: "carte9", rarity: "Épique", color: 0x4B0082 },
    { id: 10, name: "carte10", rarity: "Légendaire", color: 0xFFFFE0 },
    { id: 11, name: "carte11", rarity: "Rare", color: 0x228B22 },
    { id: 12, name: "carte12", rarity: "Rare", color: 0x32CD32 },
    { id: 13, name: "carte13", rarity: "Épique", color: 0x00CED1 },
    { id: 14, name: "carte14", rarity: "Rare", color: 0xAFEEEE },
    { id: 15, name: "carte15", rarity: "Légendaire", color: 0x8B0000 },
    { id: 16, name: "carte16", rarity: "Épique", color: 0xFF69B4 },
    { id: 17, name: "carte17", rarity: "Épique", color: 0xFF6347 },
    { id: 18, name: "carte18", rarity: "Rare", color: 0x006400 },
    { id: 19, name: "carte19", rarity: "Épique", color: 0x556B2F },
    { id: 20, name: "carte20", rarity: "Légendaire", color: 0xFFD700 }
];


const StockageManager = {

    collectionActuelle: [],

    initialiser() {
        const collectionSauvegarder = localStorage.getItem(CONFIGURATION.COLLECTION_KEY);

        if(collectionSauvegarder) {
            try {
                this.collectionActuelle = JSON.parse(collectionSauvegarder);
            }catch (error) {
                this.collectionActuelle = [];
            }
        }else {
            this.collectionActuelle = [];
        }
    },

    recupererCarteObtenu() {
        return this.collectionActuelle;
    },

    ajouterCarteObtenu(carteIds) {

        this.collectionActuelle = [...new Set([...this.collectionActuelle, ...carteIds])];
        return this.collectionActuelle;
    },



    sauvegarderEnLocalStorage(carteIds) {

        try {
            localStorage.setItem(CONFIGURATION.COLLECTION_KEY, JSON.stringify(this.collectionActuelle));
            console.log("donnee sauvegarder avec success" + this.collectionActuelle.length);
        }catch (error) {
            console.log("Erreur lors de la sauvegarde");
        }
    },



    reinistialiserCollection() {
        if(confirm("etes vous sur")) {
        this.collectionActuelle = [];
        localStorage.removeItem(CONFIGURATION.COLLECTION_KEY);
        console.log("collection reinistialiser");
        return true;
        }
        return false;
    },


    obtenirCarteRandom(compteur) {
        const melange = [...CarteInitial].sort(() => Math.random() - 0.5);
        return melange.slice(0, compteur);
    }  
};

const CollectionManager = {

    updateEcranCollection() {

        const collectionGrille = document.getElementById('collection-grid');
        const carteObtenu = StorageManager.recupererCarteObtenu();


        collectionGrille.innerHTML = '';

        CarteInitial.forEach(carte => {
            
            const estObtenu = carteObtenu.includes(carte.id);
            const carteElement = this.creeCollectionCarte(carte, estObtenu);
            collectionGrille.appendChild(carteElement);
        });

        this.updateStats();
    },


    creeCollectionCarte(donneeCarte, estObtenu) {

        const carteDiv = document.createElement('div');
        carteDiv.className = `collection-card ${estObtenu ? 'obtenu' : 'bloqué'}`;


        if (estObtenu) {
            carteDiv.innerHTML = `
             <div class="obtenu-badge">✓</div>
                <div class="carte-id">#${donneeCarte.id}</div>
                <div class="carte-name">${donneeCarte.name}</div>
                <div class="carte-rarity ${this.getRarityClass(donneeCarte.rarity)}">
                    ${donneeCarte.rarity}
                </div>
            `;
        }else {
            carteDiv.innerHTML = ` 
            
            <div class="text-bloquer">?</div>
                <div class="carte-id">#${donneeCarte.id}</div>
                <div class="carte-name">???</div>
            `;
        }

        return carteDiv;
    },



    obtenirClassRarete(rarity) {

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

        const carteObtenu = StockageManager.recupererCarteObtenu();
        const statElement = document.getElementById('collection-stats');
        statElement.textContent = `${carteObtenu.length}/${CONFIGURATION.TOTAL_CARDS}`;

        const pourcentage = (carteObtenu.length / CONFIG.TOTAL_CARDS) * 100;

        if(pourcentage === 100) {
            statElement.style.background = 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 100%)';
        }else if (pourcentage >= 50) {
            statsElement.style.background = 'linear-gradient(135deg, #FFC107 0%, #FF9800 100%)';
        } else {
            statElement.style.background = 'rgba(0, 0, 0, 0.3)';
        }
    }
};





