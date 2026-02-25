 
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
     { id: 5, name: "Amélioration du matériel", prix: 7000, points: 12, bonus: "+15% coins pendant 2min" },
     { id: 6, name: "Pollisage du style", prix: 15000, points: 25, bonus: null },
     { id: 7, name: "Enregistrement d'un nouveau titre",  prix: 30000, points: 40, bonus: "+20% coins pendant 5min" },
     { id: 8, name: "Tournage d'un Clip", prix: 75000, points: 60, bonus: null },
     { id: 9, name: "Tournée régional", prix: 125000, points: 90, bonus: "x2 pts/clic pendant 30s" },
     { id: 10, name: "Sortir un nouvelle Album", prix: 200000, points: 175, bonus: "Carte exclusive" },
     { id: 11, name: "Bonus tracks", prix: 400000, points: 300, bonus: "Carte exclusive" },
     { id: 12, name: "Remaster d'ancien titre", prix: 750000, points: 500, bonus: "Carte exclusive" },
     { id: 13, name: "Collaboration pour un titre", prix: 1200000, points: 750, bonus: "Carte exclusive" },
     { id: 14, name: "Tournée internationale", prix: 2000000, points: 1000, bonus: "Carte exclusive" }
 ];
 
 const donneePalier = [
     { id: 1, name: "Garage Band", prix: 500, ptsAutoParSec: 10, description: "Débute ton aventure musicale + Les cartes rapportent des pts/sec"},
     { id: 2, name: "Premier concert", prix: 1500, ptsAutoParSec: 30, description: "Joue devant un petit public"},
     { id: 3, name: "Radio Locale", prix: 10000, ptsAutoParSec: 150, description: "Diffuse ta musique localement + Les cartes rapportent x10 fois plus de pts/sec " },
     { id: 4, name: "Ma Premiere Tournée", prix: 50000, ptsAutoParSec: 300, description: "Voyage et performe" },
     { id: 5, name: "Propulsion au sommet", prix: 150000, ptsAutoParSec: 500, description: "Voyage et performe + Les cartes rapportent x10 fois plus de pts/sec" },
     { id: 6, name: "Concert en Stade", prix: 400000, ptsAutoParSec: 750, description: "Des milliers de fans" },
     { id: 7, name: "Hall Of Fame", prix: 1000000, ptsAutoParSec: 1000, description: "Légende de la musique + Les cartes rapportent x10 fois plus de pts/sec"}
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
   6: { cercle: 0xb9f2ff, rayon: 0xe0fbff, bandes: 7 }, 
   7: { cercle: 0x10b981, rayon: 0x6ee7b7, bandes: 9 } 
 };