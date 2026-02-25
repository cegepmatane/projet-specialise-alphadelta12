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