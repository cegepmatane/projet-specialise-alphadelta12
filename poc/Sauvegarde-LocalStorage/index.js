 
// créer les constantes nécessaires
const rememberDiv = document.querySelector(".remember");
const forgetDiv = document.querySelector(".forget");
const form = document.querySelector("form");
const nameInput = document.querySelector("#entername");
const submitBtn = document.querySelector("#submitname");
const forgetBtn = document.querySelector("#forgetname");

const h1 = document.querySelector("h1");
const personalGreeting = document.querySelector(".personal-greeting");


// Empêcher le form d'être soumis
form.addEventListener("submit", function (e) {
  e.preventDefault();
});


// exécuter la fonction quand le bouton 'Say hello' est cliqué
submitBtn.addEventListener("click", function () {
  // stocker le nom entré dans le web storage
  localStorage.setItem("name", nameInput.value);
  // exécuter nameDisplayCheck() pour afficher la
  // page personnalisée et changer le formulaire
  nameDisplayCheck();
});


// exécuter la fonction quand le bouton 'Forget' est cliqué
forgetBtn.addEventListener("click", function () {
  // supprimer l'item name du web storage
  localStorage.removeItem("name");
  // exécuter nameDisplayCheck() pour afficher la
  // page personnalisée et changer le formulaire
  nameDisplayCheck();
});


// définit la fonction nameDisplayCheck()
function nameDisplayCheck() {
  // vérifie si l'élément 'name' est stocké dans le web storage
  if (localStorage.getItem("name")) {
    // Si c'est le cas, affiche un accueil personnalisé
    let name = localStorage.getItem("name");
    h1.textContent = "Welcome, " + name;
    personalGreeting.textContent =
      "Welcome to our website, " +
      name +
      "! We hope you have fun while you are here.";
    // cache la partie 'remember' du formulaire et affiche la partie 'forget'
    forgetDiv.style.display = "block";
    rememberDiv.style.display = "none";
  } else {
    // Sinon, affiche un accueil générique
    h1.textContent = "Welcome to our website ";
    personalGreeting.textContent =
      "Welcome to our website. We hope you have fun while you are here.";
    // cache la partie 'forget' du formulaire et affiche la partie 'remember'
    forgetDiv.style.display = "none";
    rememberDiv.style.display = "block";
  }
}


document.body.onload = nameDisplayCheck;