console.log("test");
const conteneurClicker = document.getElementById('containerClicker');
const app = new PIXI.Application({
    width: conteneurClicker.clientWidth,
    height: conteneurClicker.clientHeight,
    backgroundColor: 0x0a0e27,
    antialias: true
});

conteneurClicker.appendChild(app.view);

let points = 0;
let ptsParClic = 1;
let ptsAutoParSec = 0;
let upgradeNiveaux = {};
let boosterTickers = [];
let paliersDebloquer = {};
let collection = {};
let estOuvertBooster = false;
let boosterPrix = 20;
let boosterAcheter = 0;


const CLE_SAUVEGARDE = 'musicClicker_sauvegarde';

function sauvegarderJeu() {
    const sauvegarde = {
        points:          points,
        ptsParClic:      ptsParClic,
        ptsAutoParSec:   ptsAutoParSec,
        upgradeNiveaux:  upgradeNiveaux,
        paliersDebloquer:paliersDebloquer,
        collection:      collection,
        boosterPrix:     boosterPrix,
        boosterAcheter:  boosterAcheter,
        dateSauvegarde:  Date.now()
    };
    try {
        localStorage.setItem(CLE_SAUVEGARDE, JSON.stringify(sauvegarde));
    } catch (erreur) {
        console.warn('Impossible de sauvegarder :', erreur);
    }
}

function chargerJeu() {
    try {
        const donneesBrutes = localStorage.getItem(CLE_SAUVEGARDE);
        if (!donneesBrutes) return false;

        const sauvegarde = JSON.parse(donneesBrutes);

        points           = sauvegarde.points           ?? 0;
        ptsParClic       = sauvegarde.ptsParClic       ?? 1;
        ptsAutoParSec    = sauvegarde.ptsAutoParSec    ?? 0;
        upgradeNiveaux   = sauvegarde.upgradeNiveaux   ?? {};
        paliersDebloquer = sauvegarde.paliersDebloquer ?? {};
        collection       = sauvegarde.collection       ?? {};
        boosterPrix      = sauvegarde.boosterPrix      ?? 20;
        boosterAcheter   = sauvegarde.boosterAcheter   ?? 0;

      
        return true;
    } catch (erreur) {
     
        return false;
    }
}



setInterval(sauvegarderJeu, 30000);

function initialiserCollection() {
    collection = {};
    lesCartes.forEach(carte => {
        collection[carte.id] = collection[carte.id] || 0;
    });
}

const centreX = app.screen.width / 2;
const centreY = app.screen.height / 2;

const graphique = new PIXI.Graphics();
graphique.beginFill(0x0a0e27);
graphique.drawRect(0, 0, app.screen.width, app.screen.height);
graphique.endFill();
app.stage.addChild(graphique);

const cercleMilieu = new PIXI.Graphics();
app.stage.addChild(cercleMilieu);

function dessinerCercleMilieu(couleur) {
  cercleMilieu.clear();
  cercleMilieu.beginFill(couleur, 0.6);
  cercleMilieu.drawCircle(centreX, centreY, 220);
  cercleMilieu.endFill();
}

dessinerCercleMilieu(0x1a2045);

const conteneurRayon = new PIXI.Container();
conteneurRayon.x = centreX;
conteneurRayon.y = centreY;
app.stage.addChild(conteneurRayon);



app.ticker.add((delta) => {
    conteneurRayon.rotation += 0.003 * delta;
});

let conteneurDisque = new PIXI.Container();
conteneurDisque.x = centreX;
conteneurDisque.y = centreY + 40;
app.stage.addChild(conteneurDisque);

let spriteDisque = null;

const IMAGE_DISQUE_DEFAUT = "assets/disc1.png";

function creerDisqueImage(cheminImage) {
  if (!spriteDisque) {
    const texture = PIXI.Texture.from(cheminImage);
    spriteDisque = new PIXI.Sprite(texture);

    spriteDisque.anchor.set(0.5);
    spriteDisque.scale.set(0.3);
    spriteDisque.x = 0;
    spriteDisque.y = -25;

    spriteDisque.interactive = true;
    spriteDisque.buttonMode = true;
    spriteDisque.on("pointerdown", onDisqueClique);

    conteneurDisque.addChild(spriteDisque);
  } else {
    spriteDisque.texture = PIXI.Texture.from(cheminImage);
  }
}

function onDisqueClique() {
    const gain = ptsParClic || 1;
    points += gain;

    updateDesStats();

    const texteFlottant = new PIXI.Text("+" + gain, {
        fontFamily: "Arial",
        fontSize: 28,
        fill: 0xffd700,
        stroke: 0x000000,
        strokeThickness: 4
    });

    texteFlottant.anchor.set(0.5);
    texteFlottant.x = conteneurDisque.x + (Math.random() - 0.5) * 100;
    texteFlottant.y = conteneurDisque.y - 60;
    app.stage.addChild(texteFlottant);

    let vitesse = 2.5;

    const animationTexte = (delta) => {
        texteFlottant.y -= vitesse * delta;
        texteFlottant.alpha -= 0.03 * delta;
        vitesse *= 0.96;

        if (texteFlottant.alpha <= 0) {
            app.stage.removeChild(texteFlottant);
            texteFlottant.destroy();
            app.ticker.remove(animationTexte);
        }
    };

    app.ticker.add(animationTexte);

    spriteDisque.scale.set(0.27);
    setTimeout(() => {
        spriteDisque.scale.set(0.3);
    }, 90);
}

creerDisqueImage(IMAGE_DISQUE_DEFAUT);

function updateDesStats() {
    document.getElementById('coinsText').textContent = Math.floor(points);
    document.getElementById('parClicText').textContent = ptsParClic;
    document.getElementById('autoParClicText').textContent = ptsAutoParSec;
}

function formatNumber(nombre) {
    if (nombre >= 1000000000) return (nombre / 1000000000).toFixed(1) + 'Billions';
    if (nombre >= 1000000) return (nombre / 1000000).toFixed(1) + 'Millions';
    if (nombre >= 1000) return (nombre / 1000).toFixed(1) + 'Milles';
    return nombre;
}

setInterval(() => {
    if (ptsAutoParSec > 0) {
        points += ptsAutoParSec / 10;
        updateDesStats();
    }
}, 100);

function GenererLesUpgrades() {
    const conteneur = document.querySelector('.upgrades-grid');
    conteneur.innerHTML = '';

    donneeAmeliorations.forEach((upgrade, index) => {

        const niveau = upgradeNiveaux[upgrade.id] || 0;

        let debloque = false;
        if (index === 0) {
            debloque = true;
        } else {
            const prevUpgrade = donneeAmeliorations[index - 1];
            const prevNiveau = upgradeNiveaux[prevUpgrade.id] || 0;
            debloque = prevNiveau > 0;
        }

        const prixActuel = Math.floor(upgrade.prix * Math.pow(1.4, niveau));

        const carte = document.createElement('div');
        carte.className = 'upgrade-card';

        if (!debloque) {
            carte.classList.add('locked');
            carte.innerHTML = `
                <div class="upgrade-header">
                    <div class="upgrade-title">???</div>
                    <div class="upgrade-level">Niv. ?</div>
                </div>
                <div class="upgrade-stats">
                    <div class="upgrade-stat">
                        <span class="stat-name">Points par clic</span>
                        <span class="stat-value-up">+?</span>
                    </div>
                </div>
                <div class="upgrade-cost">
                    <span class="cost-label">Coût d'achat</span>
                    <span class="cost-value">???</span>
                </div>
            `;
        } else {
            carte.innerHTML = `
                <div class="upgrade-header">
                    <div class="upgrade-title">${upgrade.name}</div>
                    <div class="upgrade-level">Niv. ${niveau}</div>
                </div>
                <div class="upgrade-stats">
                    <div class="upgrade-stat">
                        <span class="stat-name">Points par clic</span>
                        <span class="stat-value-up">+${upgrade.points}</span>
                    </div>
                </div>
                <div class="upgrade-cost">
                    <span class="cost-label">Coût d'achat</span>
                    <span class="cost-value">${prixActuel} Fans </span>
                </div>
            `;

            carte.addEventListener('click', () => acheterAmelioration(upgrade.id));
        }

        conteneur.appendChild(carte);
    });
}

function acheterAmelioration(id){

    const amelioration = donneeAmeliorations.find(donnee => donnee.id === id);
    const niveau = upgradeNiveaux[id] || 0;
    const prix = Math.floor(amelioration.prix * Math.pow(1.4, niveau));

    if(points >= prix) {
        points -= prix;
        ptsParClic += Number(amelioration.points) || 0;
        upgradeNiveaux[id] = niveau + 1;

        updateDesStats();
        GenererLesUpgrades();
    } else {
        alert('Pas assez de Fans !');
    }
}

function genererPaliers() {
    const conteneur = document.querySelector('.paliers-liste');
    conteneur.innerHTML = '';

    donneePalier.forEach(palier => {
        const debloquer = paliersDebloquer[palier.id] || false;
        
        const carte = document.createElement('div');
        carte.className = `palier-card ${debloquer ? 'debloqué' : ''}`;

        carte.innerHTML = `
            <div class="palier-header">
                <div class="palier-info">
                    <div class="palier-name">${palier.name}</div>
                    <div class="palier-description">${palier.description}</div>
                </div>
            </div>
            <div class="palier-footer">
                <div class="palier-cost">${palier.prix} Fans</div>
                ${debloquer ? '<div class="palier-status unlocked">Débloqué</div>' : ''}
            </div>
        `;

        if(!debloquer) {
            carte.addEventListener('click', () => acheterPalier(palier.id));
        }

        conteneur.appendChild(carte);
    });
}

function acheterPalier(id) {
  const palier = donneePalier.find(donnee => donnee.id === id);

  if (points >= palier.prix) {
    points -= palier.prix;
    ptsAutoParSec += palier.ptsAutoParSec;
    paliersDebloquer[id] = true;

    updateDesStats();
    genererPaliers();
    marquerPalierCommeObtenu(id);
    GenererLesUpgrades();
  } else {
    alert('Pas assez de Fans !');
  }
}

function PtsAutoSelonPalier(rarity) {
    let plusHautPalier = 0;
    Object.keys(paliersDebloquer).forEach(id => {
        if (paliersDebloquer[id]) {
            const palierId = Number(id);
            if (palierId > plusHautPalier) {
                plusHautPalier = palierId;
            }
        }   
    });

    if(plusHautPalier === 0) {
        return 0;
    }
    
    const valeurPalier = {
        1: { common: 1, rare: 5, epic: 50, legendaire: 1000, secret: 1000000},
        2: { common: 1, rare: 5, epic: 50, legendaire: 1000, secret: 1000000},
        3: { common: 10, rare: 100, epic: 500, legendaire: 10000, secret: 1000000},
    };

    if (valeurPalier[plusHautPalier] && valeurPalier[plusHautPalier][rarity]) {
        return valeurPalier[plusHautPalier][rarity];
    }

    return 0;
}

function marquerPalierCommeObtenu(idPalier) {
  const cartes = document.querySelectorAll('.palier-card');

  cartes.forEach(carte => {
    const nom = carte.querySelector('.palier-name');
    if (!nom) return;

    if (donneePalier.find(p => p.id === idPalier)?.name === nom.textContent) {
      carte.classList.add('palier-obtenu');

      const footer = carte.querySelector('.palier-footer');
      if (footer) {
        footer.innerHTML = `<div class="palier-status unlocked">OBTENU</div>`;
      }

      carte.style.pointerEvents = 'none';

      carte.animate(
        [
          { transform: 'scale(1)', boxShadow: '0 0 0px #1faa59' },
          { transform: 'scale(1.05)', boxShadow: '0 0 20px #1faa59' },
          { transform: 'scale(1)', boxShadow: '0 0 0px #1faa59' }
        ],
        { duration: 500, easing: 'ease-out' }
      );
    }
  });
}

document.querySelectorAll('.tab-btn').forEach(bouton => {
    bouton.addEventListener('click', () => {
        const tab = bouton.dataset.tab;

        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-contenu').forEach(c => c.classList.remove('active'));
        
        bouton.classList.add('active');
        document.getElementById(tab + '-tab').classList.add('active');
    });
});

let boosterConteneur = null;
let boosterActuelCarte = [];
let carteActuelIndex = 0;

function updateBoosterBouton() {
    const bouton = document.getElementById('ouvrirBooster');
    const prixSpan = bouton.querySelector('.btn-prix');
    prixSpan.textContent = `${boosterPrix} fans`;
}

document.getElementById('ouvrirBooster').addEventListener('click', () => {

    if(points < boosterPrix) {
        alert(`Besoin de ${boosterPrix} fans !`);
        return;
    }

    if (estOuvertBooster) return;

    points -= boosterPrix;
    boosterAcheter++;
    boosterPrix = Math.floor(20 * Math.pow(1.3, boosterAcheter));
    updateBoosterBouton();
    updateDesStats();
    estOuvertBooster = true;

    boosterActuelCarte = [];
    const rareter = [
        {name: 'common', weight: 65},
        {name: 'rare', weight: 29},
        {name: 'epic', weight: 5},
        {name: 'legendaire', weight: 1}
    ];

    for (let i = 0; i < 6; i++) {
        const rarity = getRandomRareter(rareter);
        const carteDeRareter = lesCartes.filter(c => c.rarity === rarity);

        const randomCarte = carteDeRareter[Math.floor(Math.random() * carteDeRareter.length)];
        const estNouvelle = !collection[randomCarte.id] || collection[randomCarte.id] === 0;
        boosterActuelCarte.push({ ...randomCarte, estNouvelle });

        if (!collection[randomCarte.id]) {
            collection[randomCarte.id] = 0;
        }
        collection[randomCarte.id]++;
    }

    carteActuelIndex = 0;
    showBoosterAnimation();
})

function showBoosterAnimation() {

    boosterConteneur = new PIXI.Container();
    app.stage.addChild(boosterConteneur);

    const overlay = new PIXI.Graphics();
    overlay.beginFill(0x000000, 0.9);
    overlay.drawRect(-1000, 0, app.screen.width + 2000, app.screen.height);
    overlay.endFill();
    overlay.interactive = true;
    overlay.buttonMode = true;
    boosterConteneur.addChild(overlay);

    displayCarte(0);
}

function displayCarte(index) {
    if(index >= boosterActuelCarte.length) {
        fermerBooster();
        genererCollection();
        return;
    }

    const carte = boosterActuelCarte[index];

    const couleur = {
        common: 0x4a5568,
        rare: 0x4a90ff,
        epic: 0xa78bfa,
        legendaire: 0xfbbf24,
        secret: 0xff0000 
    };

    const carteConteneur = new PIXI.Container();
    carteConteneur.x = app.screen.width / 2;
    carteConteneur.y = app.screen.height / 2;
    carteConteneur.scale.set(0.1);
    carteConteneur.alpha = 0;
    boosterConteneur.addChild(carteConteneur);

    const glow = new PIXI.Graphics();
    glow.beginFill(couleur[carte.rarity], 0.5);
    glow.drawCircle(0, 0, 200);
    glow.endFill();
    carteConteneur.addChild(glow);

    const carteContour = new PIXI.Graphics();
    carteContour.beginFill(couleur[carte.rarity]);
    carteContour.lineStyle(5, 0xffffff);
    carteContour.drawRoundedRect(-100, -150, 200, 300, 15);
    carteContour.endFill();
    carteConteneur.addChild(carteContour);

    if(carte.estNouvelle) {
        const newBadge = new PIXI.Graphics();
        newBadge.beginFill(0xff4500);
        newBadge.drawRoundedRect(0, 0, 50, 25, 5);
        newBadge.endFill();
        newBadge.x = 50;
        newBadge.y = -145;
        carteConteneur.addChild(newBadge);
        
        const texteNouveau = new PIXI.Text('NEW', {
            fontSize: 14,
            fill: 0xffffff,
            fontWeight: 'bold'
        });
        texteNouveau.anchor.set(0.5);
        texteNouveau.x = 75;
        texteNouveau.y = -132;
        carteConteneur.addChild(texteNouveau);
    }

    const texture = PIXI.Texture.from(carte.icon);
    const icon = new PIXI.Sprite(texture);

    icon.anchor.set(0.5);
    icon.y = -30;
    icon.alpha = 0;
    carteConteneur.addChild(icon);

    const maxSize = 120;

    if(texture.baseTexture.valid) {
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

    const name = new PIXI.Text(carte.name, {
        fontSize: 16,
        fill: 0xffffff,
        fontWeight: 'bold',
        align: 'center',
        wordWrap: true,
        wordWrapWidth: 180
    });
    name.anchor.set(0.5);
    name.y = 50;
    carteConteneur.addChild(name);

    const texteDeRareter = new PIXI.Text(carte.rarity.toUpperCase(), { 
        fontSize: 14,
        fill: 0xffffff,
        fontWeight: 'bold'
    });
    texteDeRareter.anchor.set(0.5);
    texteDeRareter.y = 100;
    carteConteneur.addChild(texteDeRareter);

    const pointsGagné = PtsAutoSelonPalier(carte.rarity);
   /* const textePoints = new PIXI.Text(`+${pointsGagné} pts/sec`, {
        fontSize: 12,
        fill: 0xffffff,
        fontWeight: 'bold'
    });
    textePoints.anchor.set(0.5);
    textePoints.y = 120;
    carteConteneur.addChild(textePoints);*/

    const compteur = new PIXI.Text(`${index + 1} / ${boosterActuelCarte.length}`, {
        fontSize: 20,
        fill: 0xffd700,
        fontWeight: 'bold'    
    });
    compteur.anchor.set(0.5);
    compteur.x = app.screen.width / 2;
    compteur.y = 50;
    boosterConteneur.addChild(compteur);

    const instruction = new PIXI.Text(index < boosterActuelCarte.length - 1 ? 'Cliquez pour continuer' : 'Cliquez pour terminer', {
        fontSize: 18,
        fill: 0xffd700,
        fontWeight: 'bold'
    });
    instruction.anchor.set(0.5);
    instruction.x = app.screen.width / 2;
    instruction.y = app.screen.height - 50;
    boosterConteneur.addChild(instruction);

    let progression = 0;

    const animation = (delta) => {
        progression += 0.05 * delta;
        carteConteneur.scale.set(Math.min(progression, 1));
        carteConteneur.alpha = Math.min(progression, 1);

        if (progression >= 1) {
            app.ticker.remove(animation);

            let cliquer = false;
            const prochainClic = () => {
                if (cliquer) return;
                cliquer = true;

                boosterConteneur.children[0].off('pointerdown', prochainClic);

                let continuer = 0;
                const animationFin = (delta) => {
                    continuer += 0.08 * delta;
                    carteConteneur.scale.set(1 + continuer);
                    carteConteneur.alpha = 1 - continuer;
                    compteur.alpha = 1 - continuer;
                    instruction.alpha = 1 - continuer;

                    if(continuer >= 1) {
                        app.ticker.remove(animationFin);
                        const ptsAjoutes = PtsAutoSelonPalier(carte.rarity);
                        ptsAutoParSec += ptsAjoutes;
                        updateDesStats();
                        boosterConteneur.removeChild(carteConteneur);
                        boosterConteneur.removeChild(compteur);
                        boosterConteneur.removeChild(instruction);
                        displayCarte(index + 1);
                    }
                };
                app.ticker.add(animationFin);
            };

            boosterConteneur.children[0].on('pointerdown', prochainClic);
        }
    };
    app.ticker.add(animation);
}

function fermerBooster() {
    const tickerAEnlever = boosterTickers.slice();
    boosterTickers = [];

    tickerAEnlever.forEach(fin => {
        try {
            app.ticker.remove(fin);
        } catch (error) {}
    });

    if (boosterConteneur) {
        const overlay = boosterConteneur.children[0];
        if (overlay) overlay.removeAllListeners();

        app.stage.removeChild(boosterConteneur);
        boosterConteneur.destroy({ children: true });
        boosterConteneur = null;
    }

    estOuvertBooster = false;
    boosterActuelCarte = [];
    carteActuelIndex = 0;
}

function genererCollection() {
    const conteneur = document.getElementById('collectionDisplay');
    conteneur.innerHTML = '';

    lesCartes.forEach(carte => {
        const obtenu = collection[carte.id] || 0;

        const item = document.createElement('div');
        item.className = `collection-item ${carte.rarity} ${obtenu > 0 ? 'obtenu' : ''}`;

        if (obtenu > 0) {
            item.innerHTML = `
                <div class="collection-icon-wrapper">
                    <img src="${carte.icon}" class="collection-icon">
                </div>
                <div class="collection-name">${carte.name}</div>
                <div class="collection-count">x${obtenu}</div>
            `;
        } else {
            item.innerHTML = `
                <div class="collection-icon-wrapper locked">?</div>
                <div class="collection-name">???</div>
            `;
        }

        conteneur.appendChild(item);
    });
}

function getRandomRareter(rarities) {
    const total = rarities.reduce((somme, r) => somme + r.weight, 0);
    let random = Math.random() * total;

    for (let rarity of rarities) {
        if (random < rarity.weight) return rarity.name;
        random -= rarity.weight;
    }
    return rarities[0].name;
}

initialiserCollection();
GenererLesUpgrades();
genererPaliers();

Object.keys(paliersDebloquer).forEach(id => {
  if (paliersDebloquer[id]) {
    marquerPalierCommeObtenu(Number(id));
  }
});
genererCollection();
updateBoosterBouton();
updateDesStats();