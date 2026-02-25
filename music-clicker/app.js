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
let activerBonus = null;
let collection = {};
let estOuvertBooster = false;
let boosterPrix = 20;
let superBoosterPrix = 1;
let boosterAcheter = 0;
let superBoosterAcheter = 0;
let managers = 0;
let palierActuelDisque = 0;
let renaissanceCompteur = 0;
let renaissancePrix = 1000000;

const COULEUR_PALIER_NORMAL = 0x333333;
const COULEUR_PALIER_OBTENU = 0x1faa59;

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

dessinerCercleMilieu(STYLE_DISQUE_PAR_PALIER[0].cercle);

const conteneurRayon = new PIXI.Container();
conteneurRayon.x = centreX;
conteneurRayon.y = centreY;
app.stage.addChild(conteneurRayon);

let rayonsActuels = [];





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

    creerParticule(conteneurDisque.x, conteneurDisque.y - 30);
}

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
          spriteDisque.interactive = true;
          app.ticker.remove(tickerUp);
        }
      };

      app.ticker.add(tickerUp);
    }
  };

  app.ticker.add(tickerDown);
}

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

    
}