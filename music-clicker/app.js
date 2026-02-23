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

const centreX = app.screen.width / 2;
const centreY = app.screen.height / 2;

// Cercle cliquable
const disque = new PIXI.Graphics();
disque.beginFill(0x5555cc);
disque.drawCircle(centreX, centreY, 100);
disque.endFill();
disque.interactive = true;
disque.buttonMode = true;
app.stage.addChild(disque);

// Texte du score
const texteScore = new PIXI.Text("0 Fans", {
    fontFamily: "Arial",
    fontSize: 32,
    fontWeight: "bold",
    fill: 0xffffff,
    align: "center"
});
texteScore.anchor.set(0.5);
texteScore.x = centreX;
texteScore.y = centreY - 160;
app.stage.addChild(texteScore);

disque.on("pointerdown", () => {
    points += 1;
    document.getElementById('coinsText').textContent = points;
    texteScore.text = points + " Fans";

   
    const texteFlottant = new PIXI.Text("+1", {
        fontFamily: "Arial",
        fontSize: 28,
        fill: 0xffd700,
        stroke: 0x000000,
        strokeThickness: 4
    });
    texteFlottant.anchor.set(0.5);
    texteFlottant.x = centreX + (Math.random() - 0.5) * 100;
    texteFlottant.y = centreY - 60;
    app.stage.addChild(texteFlottant);

    let vitesse = 2.5;
    const anim = (delta) => {
        texteFlottant.y -= vitesse * delta;
        texteFlottant.alpha -= 0.03 * delta;
        vitesse *= 0.96;
        if (texteFlottant.alpha <= 0) {
            app.stage.removeChild(texteFlottant);
            texteFlottant.destroy();
            app.ticker.remove(anim);
        }
    };
    app.ticker.add(anim);

    // Petit effet de clic
    disque.scale.set(0.93);
    setTimeout(() => disque.scale.set(1), 90);
});