const CONFIGURATION = {

    STORAGE_KEY: 'collectibleDonneeCarte',
    COLLECTION_KEY: 'CardObtenu',
    TOTAL_CARDS: 20,
    CARDS_TO_DISPLAY: 5,
    CARD_IMAGE_PATH: 'assets/screenshot.png'
};


const CarteInitial = [
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




