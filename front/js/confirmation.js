/* A chaque validation de commande d'un utilisateur, récupère le numéro de commande dans le local storage, l'affiche et l'efface du localstorage*/
function numeroDeCommande(){
let orderId = document.getElementById("orderId");
orderId.innerText = localStorage.getItem("orderId");
localStorage.removeItem("orderId");
localStorage.clear();
}

numeroDeCommande();
