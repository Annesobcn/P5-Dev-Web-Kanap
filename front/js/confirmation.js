function numeroDeCommande(){
let orderId = document.getElementById("orderId");
orderId.innerText = localStorage.getItem("orderId");
localStorage.removeItem("orderId");
}

numeroDeCommande();
