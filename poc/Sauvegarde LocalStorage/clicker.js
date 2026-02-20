/* =====================================================
   CLICKER.JS
   = Tout ce qui touche à PIXI et au rendu graphique
===================================================== */

/* ========================
   INITIALISATION PIXI
======================== */

const conteneurClicker = document.getElementById('containerClicker');

const app = new PIXI.Application({
    width: conteneurClicker.clientWidth,
    height: conteneurClicker.clientHeight,
    backgroundColor: 0x0a0e27,
    antialias: true
});

conteneurClicker.appendChild(app.view);

const centreX = app.screen.width / 2;
const centreY = app.screen.height / 2;


/* ========================
   BACKGROUND
======================== */

const conteneurRayon = new PIXI.Container();
conteneurRayon.x = centreX;
conteneurRayon.y = centreY;
app.stage.addChild(conteneurRayon);

const conteneurBandes = new PIXI.Container();
conteneurBandes.x = centreX;
conteneurBandes.y = centreY;
app.stage.addChild(conteneurBandes);


/* ========================
   FONCTIONS BACKGROUND
======================== */

function genererRayons() {
    for (let i = 0; i < 20; i++) {
        const rayon = new PIXI.Graphics();
        rayon.beginFill(0xffd700, 0.08);
        rayon.drawRect(-5, -600, 10, 600);
        rayon.endFill();
        rayon.rotation = (Math.PI * 2 * i) / 20;
        conteneurRayon.addChild(rayon);
    }
}

function genererBandes() {
    for (let i = 0; i < 10; i++) {
        const bande = new PIXI.Graphics();
        bande.beginFill(0xffffff, 0.02);
        bande.drawRect(-600, -2, 1200, 4);
        bande.endFill();
        bande.rotation = (Math.PI * 2 * i) / 10;
        conteneurBandes.addChild(bande);
    }
}

genererRayons();
genererBandes();

app.ticker.add((delta) => {
    conteneurRayon.rotation += 0.003 * delta;
});


/* ========================
   DISQUE
======================== */

let conteneurDisque = new PIXI.Container();
conteneurDisque.x = centreX;
conteneurDisque.y = centreY + 40;
app.stage.addChild(conteneurDisque);

let spriteDisque = null;

function creerDisqueImage(chemin) {
    if (!spriteDisque) {
        const texture = PIXI.Texture.from(chemin);
        spriteDisque = new PIXI.Sprite(texture);
        spriteDisque.anchor.set(0.5);
        spriteDisque.scale.set(0.3);
        spriteDisque.interactive = true;
        spriteDisque.buttonMode = true;
        spriteDisque.on("pointerdown", onDisqueClique);
        conteneurDisque.addChild(spriteDisque);
    } else {
        spriteDisque.texture = PIXI.Texture.from(chemin);
    }
}

function changerDisque(chemin) {
    if (spriteDisque) {
        spriteDisque.texture = PIXI.Texture.from(chemin);
    }
}

function onDisqueClique() {
    if (typeof points !== "undefined") {
        points += ptsParClic;
        updateDesStats();
    }

    creerParticule(conteneurDisque.x, conteneurDisque.y - 20);
}

function creerParticule(x, y) {
    const p = new PIXI.Graphics();
    p.beginFill(0xffd700);
    p.drawCircle(0, 0, 4);
    p.endFill();
    p.x = x;
    p.y = y;
    app.stage.addChild(p);

    const vitesse = 4;
    const angle = Math.random() * Math.PI * 2;

    const vx = Math.cos(angle) * vitesse;
    const vy = Math.sin(angle) * vitesse;

    const anim = (delta) => {
        p.x += vx * delta;
        p.y += vy * delta;
        p.alpha -= 0.05 * delta;

        if (p.alpha <= 0) {
            app.stage.removeChild(p);
            app.ticker.remove(anim);
        }
    };

    app.ticker.add(anim);
}


let boosterConteneur = null;

function showBoosterAnimation() {
    boosterConteneur = new PIXI.Container();
    app.stage.addChild(boosterConteneur);
}

function displayCarte() {
   
}

function fermerBooster() {
    if (boosterConteneur) {
        app.stage.removeChild(boosterConteneur);
        boosterConteneur = null;
    }
}


creerDisqueImage("assets/disc1.png");
