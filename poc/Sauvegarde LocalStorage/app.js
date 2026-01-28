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





const CarteManager = {

    creerCarte(donneeCarte, x, y) {

        const carteConteneur = new PIXI.Container();
        carteConteneur.x = x;
        carteConteneur.y = y;

        const cartebg = new PIXI.Graphics();
        cartebg.beginFill(donneeCarte.color);
        cartebg.endFill();

        cartebg.lineStyle(4, 0xFFFFFF, 0.8);
        cartebg.drawRoundedRect(0, 0, 200, 300, 15);
        carteConteneur.addChild(cartebg);


        const headerbg = new PIXI.Graphics();
        headerbg.beginFill(0x000000, 0.4);
        headerbg.drawRoundedRect(10, 10, 180, 45, 8);
        headerbg.addChild(headerbg);


        const texteNom = new PIXI.Text(donneeCarte.name, {
            fontFamily: 'Arial',
            fontSize: 18,
            fontWeight: 'bold',
            fill: 0xFFFFFF,
            align: 'center',
            wordWrap: true,
            wordWrapWidth: 170
        });

        texteNom.x = 100;
        texteNom.y = 25;
        texteNom.anchor.set(0.5);
        carteConteneur.addChild(texteNom);

        const imageBg = new PIXI.Graphics();

        imageBg.beginFill(0x000000, 0.2);
        imageBg.drawRoundedRect(15, 65, 170, 170, 10);
        imageBg.endFill();
        carteConteneur.addChild(imageBg);

        const sprite = PIXI.Sprite.from(CONFIG.CARD_IMAGE_PATH);
        sprite.x = 100;
        sprite.y - 150;
        sprite.anchor.set(0.5);

        const maxLongueur = 160;
        const maxHauteur = 160;
        const scale = Math.min(maxLongueur / sprite.longueur, maxHauteur / sprite.hauteur);
        sprite.scale.set(scale);


        carteConteneur.addChild(sprite);

        const footerBg = new PIXI.Graphics();
        footerBg.beginFill(0x000000, 0.5);
        footerBg.drawRoundedRect(10, 245, 180, 45, 8);
        footerBg.endFill();
        carteConteneur.addChild(footerBg);


        const couleurRarete = this.obtenirCouleurRarete(donneeCarte.rarity);
        const badgeRarete = new PIXI.Graphics();
        badgeRarete.beginFill(couleurRarete);
        badgeRarete.drawRoundedRect(40, 255, 120, 28, 5);
        badgeRarete.endFill();
        carteConteneur.addChild(badgeRarete);


        const texteRarete = new PIXI.Text(donneeCarte.rarity, {
            fontFamily: 'Arial',
            fontSize: 16,
            fontWeight: 'bold',
            fill: 0xFFFFFF
        });

        texteRarete.x = 100;
        texteRarete.y = 269;
        texteRarete.anchor.set(0.5);
        carteConteneur.addChild(texteRarete);


        const texteId = new PIXI.Text(`#${donneeCarte.id}`, {
            fontFamily: 'Arial',
            fontSize: 12,
            fill: 0xFFFFFF,
            alpha: 0.7
        });
        texteId.x = 15;
        texteId.y = 12;
        carteConteneur.addChild(texteId);


        const carteDejaObtenu = StorageManager.recupererCarteObtenu();
        if(!carteDejaObtenu.includes(donneeCarte.id)) {
            const nouveauBadge = new PIXI.Graphics();
            nouveauBadge.beginFill(0xFF0000);
            nouveauBadge.drawRoundedRect(140, 10, 50, 20, 5);
            nouveauBadge.endFill();
            carteConteneur.addChild(nouveauBadge);


            const texteNouveau = new PIXI.Text('NEW', {
                fontFamily: 'Arial',
                fontSize: 12,
                fontWeight: 'bold',
                fill: 0xFFFFFF
            });
            texteNouveau.x = 165;
            texteNouveau.y = 20;
            texteNouveau.anchor.set(0.5);
            cardContainer.addChild(texteNouveau);
        }


        carteConteneur.eventMode = 'static';
        carteConteneur.cursor = 'pointer';

        carteConteneur.on('pointerover', () => {
            carteConteneur.scale.set(0.95);
        });
        carteConteneur.on('pointerout', () => {
            carteConteneur.scale.set(0.9);
        });

        carteConteneur.alpha = 0;
        carteConteneur.scale.set(0.7);

        return carteConteneur;
    },


    obtenirCouleurRarete(rarity) {
        switch (rarity) {
            case 'Légendaire':
                return 0xFFD700;
            case 'Epic':
                return 0xA020F0;
            case 'Rare':
                return ox4169E1;
            default:
                return 0xC0C0C0;
        }
    },


    animationCarte(carte, index) {

        const delai = index * 100;

        setTimeout(() => {
            
        })
    }
}