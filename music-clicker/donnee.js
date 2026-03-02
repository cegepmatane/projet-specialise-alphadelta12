 
 const lesCartes = [
    { id: 1, name: "test", rarity: "common", icon: "assets/GinBlossoms.jpg"},
    { id: 2, name: "testrare", rarity: "rare", icon: "assets/GinBlossoms.jpg"},

    { id: 3, name: "testepic", rarity: "epic", icon: "assets/GinBlossoms.jpg"},
    { id: 4, name: "testleg", rarity: "legendaire", icon: "assets/GinBlossoms.jpg"},
 ]



 const donneeAmeliorations =[
     { id: 1, name: "Nouveau Riff", prix: 10, points: 1, bonus: "+20% coins pendant 2min" },
     { id: 2, name: "Seance de répétition", prix: 200, points: 3, bonus: "+5% cartes rares x3" },
     { id: 3, name: "Nouvelle Composition", prix: 800, points: 5, bonus: null },
     { id: 4, name: "Soiree Découverte", prix: 3000, points: 8, bonus: "10% doubler pts/clic" },
   
 ];
 
 const donneePalier = [
     { id: 1, name: "Garage Band", prix: 500, ptsAutoParSec: 10, description: "Débute ton aventure musicale + Les cartes rapportent des pts/sec"},
     { id: 2, name: "Premier concert", prix: 1500, ptsAutoParSec: 30, description: "Joue devant un petit public"},
     { id: 3, name: "Radio Locale", prix: 10000, ptsAutoParSec: 150, description: "Diffuse ta musique localement + Les cartes rapportent x10 fois plus de pts/sec " },
    
 ];
 
 
 
 const DISQUES_PAR_PALIER = {
   0: "assets/disc1.png",
   1: "assets/disc2.png", 
   2: "assets/disc3.png",
 
 };
 
 
 const STYLE_DISQUE_PAR_PALIER = {
   0: { cercle: 0x1a2045, rayon: 0x4a90ff, bandes: 0 },
   1: { cercle: 0x2b4fa3, rayon: 0x6aa8ff, bandes: 2 },
   2: { cercle: 0x4f7ddf, rayon: 0x9ec5ff, bandes: 3 }, 

 };