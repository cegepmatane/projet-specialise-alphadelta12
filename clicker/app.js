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
let niveau = "Débutant";
let upgradeNiveaux = {};
let boosterTickers = [];
let paliersDebloquer = {};
let activerBonus = null;
let collection = {};
let estOuvertBooster = false;
let boosterPrix = 20;
let boosterAcheter = 0;
let palierActuelDisque = 0;

const COULEUR_PALIER_NORMAL = 0x333333;
const COULEUR_PALIER_OBTENU = 0x1faa59;


const lesCartes = [
    { id: 1, name: "Gin Blossoms", rarity: "common", icon: "assets/GinBlossoms.jpg" },
    { id: 2, name: "ZZ Top", rarity: "common", icon: "assets/ZZTOP.jpg" },
    { id: 3, name: "The Cranberries", rarity: "common", icon: "assets/Cranberries.jpg" },
    { id: 4, name: "Billy Idol", rarity: "common", icon: "assets/BillyIdol.jpg" },
    { id: 5, name: "Alice Cooper", rarity: "common", icon: "assets/AliceCooper.jpg" },
    { id: 6, name: "Boston", rarity: "common", icon: "assets/Boston.jpg" },
    { id: 7, name: "Blink-182", rarity: "common", icon: "assets/blink182.jpg" },
    { id: 8, name: "Ed Sheeran", rarity: "common", icon: "assets/EdSheeran.jpg" },
    { id: 9, name: "Evanescence", rarity: "common", icon: "assets/evanescence.jpg" },
    { id: 10, name: "Foo Fighters", rarity: "common", icon: "assets/FooFighers.jpg" },
    { id: 11, name: "Heart", rarity: "common", icon: "assets/Heart.jpg" },
    { id: 12, name: "R.E.M", rarity: "common", icon: "assets/REM.jpg" },
    { id: 13, name: "Simon & Garfunkel", rarity: "common", icon: "assets/SimonGarfunkel.jpg" },
    { id: 14, name: "Twisted Sister", rarity: "common", icon: "assets/TwistedSister.jpg" },
    { id: 15, name: "System Of A Down", rarity: "common", icon: "assets/SystemOfDown.jpg" },
    { id: 16, name: "ABBA", rarity: "common", icon: "assets/abba.jpg" },
    { id: 17, name: "Black Sabbath", rarity: "common", icon: "assets/blacksabbath.jpg" },
    { id: 18, name: "Britney Spears", rarity: "common", icon: "assets/britneyspears.jpg" },
    { id: 19, name: "Bruce Springsteen", rarity: "common", icon: "assets/brucspringsteen.jpg" },
    { id: 20, name: "BTS", rarity: "common", icon: "assets/bts.jpg" },
    { id: 21, name: "Chuck Berry", rarity: "common", icon: "assets/chuckberry.png" },
    { id: 22, name: "David Bowie", rarity: "common", icon: "assets/davidbowie.jpg" },
    { id: 23, name: "Dire Straits", rarity: "common", icon: "assets/direstrait.jpg" },
    { id: 24, name: "Iron Maiden", rarity: "common", icon: "assets/ironmaiden.jpg" },
    { id: 25, name: "The Kinks", rarity: "common", icon: "assets/kinks.jpg" },
    { id: 26, name: "Lady Gaga", rarity: "common", icon: "assets/ladygaga.jpg" },
    { id: 27, name: "My Chemical Romances", rarity: "common", icon: "assets/mychemicalromance.jpg" },
    { id: 28, name: "Megadeth", rarity: "common", icon: "assets/megadeth.jpg" },
    { id: 29, name: "Mariah Carey", rarity: "common", icon: "assets/mariahcarey.jpg" },
    { id: 30, name: "Mötley Crue", rarity: "common", icon: "assets/motleycrue.jpg" },
    { id: 31, name: "P!nk", rarity: "common", icon: "assets/p!nk.jpg" },
    { id: 32, name: "Pantera", rarity: "common", icon: "assets/pantera.jpg" },
    { id: 33, name: "Pearl Jam", rarity: "common", icon: "assets/pearljam.jpg" },
    { id: 34, name: "Phil Collins", rarity: "common", icon: "assets/philcollins.jpg" },
    { id: 35, name: "Shakira", rarity: "common", icon: "assets/shakira.jpg" },
    { id: 36, name: "Slipknot", rarity: "common", icon: "assets/slipknot.jpg" },
    { id: 37, name: "Sum41", rarity: "common", icon: "assets/sum41.jpg" },
    { id: 38, name: "Survivor", rarity: "common", icon: "assets/survivor.jpg" },
    { id: 39, name: "TALK", rarity: "common", icon: "assets/talk.jpg" },
    { id: 40, name: "The Killers", rarity: "common", icon: "assets/thekillers.jpg" },
    { id: 41, name: "The Who", rarity: "common", icon: "assets/thewho.jpg" },
    { id: 42, name: "Toto", rarity: "common", icon: "assets/toto.jpg" },
    { id: 43, name: "Van Halen", rarity: "common", icon: "assets/Boston.jpg" },
  //  { id: 44, name: "Boston", rarity: "common", icon: "assets/Boston.jpg" },
   // { id: 45, name: "Boston", rarity: "common", icon: "assets/Boston.jpg" },
   // { id: 46, name: "Boston", rarity: "common", icon: "assets/Boston.jpg" },
   // { id: 47, name: "Boston", rarity: "common", icon: "assets/Boston.jpg" },
   // { id: 48, name: "Boston", rarity: "common", icon: "assets/Boston.jpg" },
   // { id: 49, name: "Boston", rarity: "common", icon: "assets/Boston.jpg" },
   // { id: 50, name: "Boston", rarity: "common", icon: "assets/Boston.jpg" },

    //RARE
    { id: 51, name: "Nirvana", rarity: "rare", icon: "assets/nirvana.jpg" },
    { id: 52, name: "U2", rarity: "rare", icon: "assets/U2.jpg" },
    { id: 53, name: "Bryan Adams", rarity: "rare", icon: "assets/BryanAdams.jpg" },
    { id: 54, name: "Roxette", rarity: "rare", icon: "assets/Roxette.jpg" },
    { id: 55, name: "Def Leppard", rarity: "rare", icon: "assets/DefLeppard.jpg" },
    { id: 56, name: "Gun N' Roses", rarity: "rare", icon: "assets/gunNrose.jpg" },
    { id: 57, name: "Journey", rarity: "rare", icon: "assets/journey.jpg" },
    { id: 58, name: "KISS", rarity: "rare", icon: "assets/kiss.jpg" },
    { id: 59, name: "Poison", rarity: "rare", icon: "assets/poison.jpg" },
    { id: 60, name: "Scorpions", rarity: "rare", icon: "assets/scorpions.jpg" },
    { id: 61, name: "Shania Twain", rarity: "rare", icon: "assets/shaniatwain.jpg" },
    { id: 62, name: "The Beach Boys", rarity: "rare", icon: "assets/beachboy.jpg" },
    { id: 63, name: "Billy Joel", rarity: "rare", icon: "assets/billyjoel.jpg" },
    { id: 64, name: "Bruno Mars", rarity: "rare", icon: "assets/brunomars.jpg" },
    { id: 65, name: "Celine Dion", rarity: "rare", icon: "assets/celineDion.jpg" },
    { id: 66, name: "Coldplay", rarity: "rare", icon: "assets/coldplay.jpg" },
    { id: 67, name: "Elton John", rarity: "rare", icon: "assets/eltonjohn.jpg" },
    { id: 68, name: "Eminem", rarity: "rare", icon: "assets/eminem.jpg" },
    { id: 69, name: "Frank Sinatra", rarity: "rare", icon: "assets/franksinatra.jpg" },
    { id: 70, name: "Jimmi Hendrix", rarity: "rare", icon: "assets/jimmihendrix.jpg" },
    { id: 71, name: "Led Zeppelin", rarity: "rare", icon: "assets/ledzeppelin.jpg" },
    { id: 72, name: "Lynyrd Skynyrd", rarity: "rare", icon: "assets/lynyrd.jpg" },
    { id: 73, name: "Madonna", rarity: "rare", icon: "assets/madonna.jpg" },
    { id: 74, name: "Nickelback", rarity: "rare", icon: "assets/nickelback.jpg" },
    { id: 75, name: "Ozzy Osbourne", rarity: "rare", icon: "assets/ozzy.jpg" },
    { id: 76, name: "Rammstein", rarity: "rare", icon: "assets/rammstein.jpg" },
    { id: 77, name: "Red Hot Chili Peppers", rarity: "rare", icon: "assets/rhcp.jpg" },
    { id: 78, name: "Simple Plan", rarity: "rare", icon: "assets/simpleplan.jpg" },
    { id: 79, name: "Skillet", rarity: "rare", icon: "assets/skillet.jpg" },
    { id: 80, name: "The Weeknd", rarity: "rare", icon: "assets/weeknd.jpg" },

    //EPIC
    { id: 81, name: "Bon Jovi", rarity: "epic", icon: "assets/Bonjovi.jpg" },
    { id: 82, name: "Aerosmith", rarity: "epic", icon: "assets/aerosmith.jpg" },
    { id: 83, name: "Green Day", rarity: "epic", icon: "assets/greenday.jpg" },
    { id: 84, name: "Ac/Dc", rarity: "epic", icon: "assets/acdc.jpg" },
    { id: 85, name: "BackStreet Boys", rarity: "epic", icon: "assets/backstreetboys.jpg" },
    { id: 86, name: "Creedence Clearwater Revival", rarity: "epic", icon: "assets/ccr.jpg" },
    { id: 87, name: "Linkin Park", rarity: "epic", icon: "assets/linkinpark.jpg" },
    { id: 88, name: "The Offspring", rarity: "epic", icon: "assets/offspring.jpg" },
    { id: 89, name: "Pink Floyd", rarity: "epic", icon: "assets/pinkifloyd.jpg" },
    { id: 90, name: "The Rolling Stones", rarity: "epic", icon: "assets/rollingstones.jpg" },
    { id: 91, name: "Taylor Swift", rarity: "epic", icon: "assets/taylorswift.jpg" },

    
    { id: 92, name: "The Beatles", rarity: "legendaire", icon: "assets/Beatles.jpg" },
    { id: 93, name: "Metallica", rarity: "legendaire", icon: "assets/metallica.jpg" },
    { id: 94, name: "Elvis Presley", rarity: "legendaire", icon: "assets/Elvis.jpg" },
    { id: 95, name: "Michael Jackson", rarity: "legendaire", icon: "assets/michaelJackson.jpg" },
    { id: 96, name: "Queen", rarity: "legendaire", icon: "assets/queen.jpg" },
    
];




function initialiserCollection() {
    collection = {};
    lesCartes.forEach(carte => {
        collection[carte.id] = collection[carte.id] || 0;
    });
}


const RARETE_DES_CARTES = {
    common: {
        border: 0x3aa9ff,
        glow: 0x3aa9ff,
        bg: 0x0a1220
    },
    rare: {
        border: 0x3aff72,
        glow: 0x3aff72,
        bg: 0x0f1f12
    },
    epic: {
        border: 0xb43aff,
        glow: 0xb43aff,
        bg: 0x1a0f24
    },
    legendaire: {
        border: 0xffd93a,
        glow: 0xffd93a,
        bg: 0x2a230a
    }
};



const donneeAmeliorations =[
    { id: 1, name: "Nouveau Riff", prix: 10, points: 1, bonus: "+20% coins pendant 2min" },
    { id: 2, name: "Seance de répétition", prix: 75, points: 2, bonus: "+5% cartes rares x3" },
    { id: 3, name: "Nouvelle Composition", prix: 200, points: 3, bonus: null },
    { id: 4, name: "Soiree Découverte", prix: 500, points: 5, bonus: "10% doubler pts/clic" },
    { id: 5, name: "Amélioration du matériel", prix: 800, points: 8, bonus: "+15% coins pendant 2min" },
    { id: 6, name: "Pollisage du style", prix: 1500, points: 12, bonus: null },
    { id: 7, name: "Enregistrement d'un nouveau titre",  prix: 3000, points: 18, bonus: "+20% coins pendant 5min" },
    { id: 8, name: "Tournage d'un Clip", prix: 7500, points: 25, bonus: null },
    { id: 9, name: "Tournée régional", prix: 10000, points: 40, bonus: "x2 pts/clic pendant 30s" },
    { id: 10, name: "Sortir un nouvelle Album", prix: 15000, points: 60, bonus: "Carte exclusive" },
    { id: 11, name: "Bonus tracks", prix: 20000, points: 80, bonus: "Carte exclusive" },
    { id: 12, name: "Remaster d'ancien titre", prix: 25000, points: 100, bonus: "Carte exclusive" },
    { id: 13, name: "Collaboration pour un titre", prix: 32000, points: 120, bonus: "Carte exclusive" },
    { id: 14, name: "Tournée internationale", prix: 40000, points: 150, bonus: "Carte exclusive" }
];

const donneePalier = [
    { id: 1, name: "Garage Band", prix: 500, ptsAutoParSec: 10, description: "Débute ton aventure musicale", exclusive: true },
    { id: 2, name: "Premier concert", prix: 1500, ptsAutoParSec: 30, description: "Joue devant un petit public" },
    { id: 3, name: "Radio Locale", prix: 3000, ptsAutoParSec: 50, description: "Diffuse ta musique localement" },
    { id: 4, name: "Ma Premiere Tournée", prix: 6000, ptsAutoParSec: 100, description: "Voyage et performe", exclusive: true },
    { id: 5, name: "Propulsion au sommet", prix: 10000, ptsAutoParSec: 100, description: "Voyage et performe", exclusive: true },
    { id: 6, name: "Concert en Stade", prix: 15000, ptsAutoParSec: 150, description: "Des milliers de fans" },
    { id: 7, name: "Hall Of Fame", prix: 20000, ptsAutoParSec: 200, description: "Légende de la musique", exclusive: true }
];

const DISQUES_PAR_PALIER = {
  0: "assets/disc1.png",
  1: "assets/disc2.png", 
  2: "assets/disc3.png",
  3: "assets/disc4.png", 
  4: "assets/disc5.png",
  5: "assets/disc6.png",
  6: "assets/disc8.png",
  7: "assets/disc7.png"
};


const STYLE_DISQUE_PAR_PALIER = {
  0: { cercle: 0x1a2045, rayon: 0x4a90ff, bandes: 0 },
  1: { cercle: 0x2b4fa3, rayon: 0x6aa8ff, bandes: 2 },
  2: { cercle: 0x4f7ddf, rayon: 0x9ec5ff, bandes: 3 }, 
  3: { cercle: 0xcfd8dc, rayon: 0xffffff, bandes: 4 }, 
  4: { cercle: 0xfacc15, rayon: 0xffe066, bandes: 5 }, 
  5: { cercle: 0xe5e7eb, rayon: 0xd1d5db, bandes: 6 }, 
  6: { cercle: 0xb9f2ff, rayon: 0xe0fbff, bandes: 7 }, // diamant
  7: { cercle: 0x10b981, rayon: 0x6ee7b7, bandes: 9 }  // émeraude
};



// Creation Fond du clicker animé avec PiXiJS

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

// init
dessinerCercleMilieu(STYLE_DISQUE_PAR_PALIER[0].cercle);




const conteneurRayon = new PIXI.Container();
conteneurRayon.x = centreX;
conteneurRayon.y = centreY;
app.stage.addChild(conteneurRayon);

let rayonsActuels = [];

function genererRayons(couleur, nbRayons = 30) {
  conteneurRayon.removeChildren();
  rayonsActuels = [];

  for (let i = 0; i < nbRayons; i++) {
    const rayon = new PIXI.Graphics();
    const opacite = 0.15 + Math.random() * 0.25;

    rayon.beginFill(couleur, opacite);
    rayon.moveTo(0, 0);
    rayon.lineTo(0, -350);
    rayon.lineTo(10, -300);
    rayon.lineTo(0, 0);
    rayon.endFill();

    rayon.rotation = (i * Math.PI * 2) / nbRayons;
    conteneurRayon.addChild(rayon);
    rayonsActuels.push(rayon);
  }
}


genererRayons(STYLE_DISQUE_PAR_PALIER[0].rayon, 30);



app.ticker.add((delta) => {
    conteneurRayon.rotation += 0.003 * delta;
});

const conteneurBandes = new PIXI.Container();
conteneurBandes.x = centreX;
conteneurBandes.y = centreY;
app.stage.addChild(conteneurBandes);



let bandesActuelles = [];

function genererBandes(nbBandes, couleur) {
  conteneurBandes.removeChildren();
  bandesActuelles = [];

  for (let i = 0; i < nbBandes; i++) {
    const bande = new PIXI.Graphics();
    bande.beginFill(couleur, 0.35);
    bande.drawRoundedRect(-6, -260, 12, 80, 6);
    bande.endFill();

    bande.rotation = (i * Math.PI * 2) / nbBandes;
    conteneurBandes.addChild(bande);
    bandesActuelles.push(bande);
  }
}



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

    // 🔥 LE DISQUE EST LE SEUL CLICKER
    spriteDisque.interactive = true;
    spriteDisque.buttonMode = true;
    spriteDisque.on("pointerdown", onDisqueClique);

    conteneurDisque.addChild(spriteDisque);
  } else {
    // 🔁 on change juste l’image
    spriteDisque.texture = PIXI.Texture.from(cheminImage);
  }
}


function onDisqueClique() {
    const gain = ptsParClic || 1;
    points += gain;

    updateDesStats();

    // Texte flottant
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

    // Effet squash
    spriteDisque.scale.set(0.27);
    setTimeout(() => {
        spriteDisque.scale.set(0.3);
    }, 90);

    // Particules
    creerParticule(conteneurDisque.x, conteneurDisque.y - 30);
}



// Création initiale
creerDisqueImage(IMAGE_DISQUE_DEFAUT);




function mettreAJourDisqueSelonPalier() {
  let plusHautPalier = 0;

  Object.keys(paliersDebloquer).forEach(id => {
    if (paliersDebloquer[id]) {
      const palierId = Number(id);
      if (palierId > plusHautPalier) {
        plusHautPalier = palierId;
      }
    }
  });

  if (plusHautPalier !== palierActuelDisque) {
    palierActuelDisque = plusHautPalier;

    const nouvelleImage =
      DISQUES_PAR_PALIER[palierActuelDisque] || DISQUES_PAR_PALIER[0];

    changerDisque(nouvelleImage);
  }
}


function appliquerStyleDisqueSelonPalier() {
  let plusHautPalier = 0;

  Object.keys(paliersDebloquer).forEach(id => {
    if (paliersDebloquer[id]) {
      const palierId = Number(id);
      if (palierId > plusHautPalier) {
        plusHautPalier = palierId;
      }
    }
  });

  const style =
    STYLE_DISQUE_PAR_PALIER[plusHautPalier] ||
    STYLE_DISQUE_PAR_PALIER[0];

  dessinerCercleMilieu(style.cercle);
  genererRayons(style.rayon, 30 + style.bandes * 3);
  genererBandes(style.bandes, style.rayon);
}



function changerDisque(cheminImage) {
  if (!spriteDisque) return;

  spriteDisque.interactive = false;

  const tickerDown = (delta) => {
    spriteDisque.scale.x -= 0.02 * delta;
    spriteDisque.scale.y -= 0.02 * delta;

    if (spriteDisque.scale.x <= 0) {
      spriteDisque.texture = PIXI.Texture.from(cheminImage);
      app.ticker.remove(tickerDown);

      const tickerUp = (delta) => {
        spriteDisque.scale.x += 0.02 * delta;
        spriteDisque.scale.y += 0.02 * delta;

        if (spriteDisque.scale.x >= 0.3) {
          spriteDisque.scale.set(0.3);
          spriteDisque.interactive = true; // 🔥 clic réactivé
          app.ticker.remove(tickerUp);
        }
      };

      app.ticker.add(tickerUp);
    }
  };

  app.ticker.add(tickerDown);
}


// ===== Particules =====
function creerParticule(x, y) {
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



function updateDesStats() {
    document.getElementById('coinsText').textContent = Math.floor(points);
    document.getElementById('parClicText').textContent = ptsParClic;
    document.getElementById('autoParClicText').textContent = ptsAutoParSec;
    document.getElementById('niveauText').textContent = niveau;

}


// Auto Clicker


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

        // 🔓 Règle de déblocage
        let debloque = false;
        if (index === 0) {
            debloque = true; // la 1ère toujours visible
        } else {
            const prevUpgrade = donneeAmeliorations[index - 1];
            const prevNiveau = upgradeNiveaux[prevUpgrade.id] || 0;
            debloque = prevNiveau > 0;
        }

        const prixActuel = Math.floor(upgrade.prix * Math.pow(1.5, niveau));

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
                    <span class="cost-value">??? 🎵</span>
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
                ${upgrade.bonus ? `<div class="upgrade-bonus">🎁 ${upgrade.bonus}</div>` : ''}
                <div class="upgrade-cost">
                    <span class="cost-label">Coût d'achat</span>
                    <span class="cost-value">${prixActuel} 🎵</span>
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
    const prix = Math.floor(amelioration.prix * Math.pow(1.5, niveau));

    if(points >= prix) {
        points -= prix;
        ptsParClic += Number(amelioration.points) || 0;
        upgradeNiveaux[id] = niveau + 1;

        updateDesStats();
        GenererLesUpgrades();

        showNotifications(`${amelioration.name} amélioré !`);
    } else {
        showNotifications('Pas assez de Fans !');
    }
}




// LES PALIERS



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
            <div class="palier-benefits">
                <div class="benefit-tag">⚡ +${palier.ptsAutoParSec} pts/sec</div>
                <div class="benefit-tag">🎨 Nouveau style</div>
                ${palier.exclusive ? '<div class="benefit-tag exclusive">⭐ Carte exclusive</div>' : ''}
            </div>
            <div class="palier-footer">
                <div class="palier-cost">${palier.prix} 🎵</div>
                ${debloquer ? '<div class="palier-status unlocked">✅ Débloqué</div>' : ''}
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

    mettreAJourDisqueSelonPalier();
    appliquerStyleDisqueSelonPalier();

    niveau = palier.name;
    updateDesStats();

    genererPaliers();              
    marquerPalierCommeObtenu(id); 

    GenererLesUpgrades();
    showNotifications(`Palier ${palier.name} débloqué !`);
  } else {
    showNotifications('Pas assez de Fans !');
  }
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
        footer.innerHTML = `<div class="palier-status unlocked">✅ OBTENU</div>`;
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




//Systeme pour les tabs
document.querySelectorAll('.tab-btn').forEach(bouton => {
    bouton.addEventListener('click', () => {
        const tab = bouton.dataset.tab;

        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-contenu').forEach(c => c.classList.remove('active'));
        

        bouton.classList.add('active');
        document.getElementById(tab + '-tab').classList.add('active');
    });
});




//Animation Pour le Booster

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
        showNotifications(`Besoin de ${boosterPrix} fans !`);
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

        //Verifier si nouvelle

        const estNouvelle = !collection[randomCarte.id] || collection[randomCarte.id] === 0;
        boosterActuelCarte.push({ ...randomCarte, estNouvelle });


        //ajouter
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
        legendaire: 0xfbbf24 
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



    //Si nouvelle


    if( carte.estNouvelle) {
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
    }else {
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



    //Rareté

    const texteDeRareter = new PIXI.Text(carte.rarity.toUpperCase(), { 
        fontSize: 14,
        fill: 0xffffff,
        fontWeight: 'bold'
    });
    texteDeRareter.anchor.set(0.5);
    texteDeRareter.y = 100;
    carteConteneur.addChild(texteDeRareter);



    const compteur = new PIXI.Text(`${index + 1} / ${boosterActuelCarte.length}`, {
        fontSize: 20,
        fill: 0xffd700,
        fontWeight: 'bold'    
    });
    compteur.anchor.set(0.5);
    compteur.x = app.screen.width / 2;
    compteur.y = 50;
    boosterConteneur.addChild(compteur);
    

    const instruction = new PIXI.Text(index < 6 ? 'Cliquez pour continuer' : 'Cliquez pour terminer', {
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

            for(let i = 0; i < 15; i++) {

                const particule = new PIXI.Graphics();
                particule.beginFill(couleur[carte.rarity]);
                particule.drawCircle(0, 0, 5);
                particule.endFill();
                particule.x = carteConteneur.x;
                particule.y = carteConteneur.y;
                
                const angle = (Math.PI * 2 * i) / 15;
                const vitesse = 3 + Math.random() * 3;
                const vx = Math.cos(angle) * vitesse;
                const vy = Math.sin(angle) * vitesse;
                
                boosterConteneur.addChild(particule);


                let vie = 1;


                const pAnim = (delta) => {
                    if (!particule || !boosterConteneur) {
                        app.ticker.remove(pAnim);
                        const donnee = boosterTickers.indexOf(pAnim);
                        if (donnee !== -1) boosterTickers.splice(donnee, 1);
                        return;
                    }

                    particule.x += vx * delta;
                    particule.y += vy * delta;
                    vie -= 0.02 * delta;
                    particule.alpha = vie;


                    if(vie <= 0) {
                        boosterConteneur.removeChild(particule);
                        app.ticker.remove(pAnim);
                        const i = boosterTickers.indexOf(pAnim);
                        if ( i !== -1) boosterTickers.splice(i, 1);
                    }
                };
                boosterTickers.push(pAnim);
                app.ticker.add(pAnim);
                }


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

                        if( continuer >= 1) {

                            app.ticker.remove(animationFin);
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
        }catch (error){

        } 
    });

    if (boosterConteneur) {
        const overlay = boosterConteneur.children[0];
        if (overlay) overlay.removeAllListeners();


        app.stage.removeChild(boosterConteneur);
        boosterConteneur.destroy({ children: true});
        boosterConteneur = null;
    }

    estOuvertBooster = false;
    boosterActuelCarte = [];
    carteActuelIndex = 0;
}


function creerIconDeCarte(rarity) {
    const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    svg.setAttribute('viewBox', '0 0 64 64');
    svg.setAttribute('width', '48');
    svg.setAttribute('height', '48');
    
    const couleurs = {
        common: '#4a5568',
        rare: '#4a90ff',
        epic: '#a78bfa',
        legendaire: '#fbbf24'
    };


    const note = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    note.setAttribute('d', 'M 32 10 L 35 10 L 35 40 C 35 45 30 48 25 48 C 20 48 17 45 17 42 C 17 39 20 36 25 36 C 27 36 29 37 30 38 L 30 20 L 45 17 L 45 35 C 45 40 40 43 35 43 C 30 43 27 40 27 37 C 27 34 30 31 35 31 C 37 31 39 32 40 33 L 40 15 L 32 17 Z');
    note.setAttribute('fill', couleurs[rarity]);
    note.setAttribute('stroke', 'rgba(255,255,255,0.4)');
    note.setAttribute('stroke-width', '2');
    
    svg.appendChild(note);
    return svg;
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

function showNotifications(message) {
    const notif = document.createElement('div');
    notif.className = 'notification';
    notif.textContent = message;
    
    document.getElementById('notifications').appendChild(notif);
    
    setTimeout(() => {
        notif.style.animation = 'slideIn 0.3s ease reverse';
        setTimeout(() => notif.remove(), 300);
    }, 3000);
}

initialiserCollection();
GenererLesUpgrades();
genererPaliers();

Object.keys(paliersDebloquer).forEach(id => {
  if (paliersDebloquer[id]) {
    marquerPalierCommeObtenu(Number(id));
  }
});
appliquerStyleDisqueSelonPalier();

genererCollection();
updateBoosterBouton();
updateDesStats();


