let panierLocalStorage = JSON.parse(localStorage.getItem("panier"));
console.table(panierLocalStorage);


//Recupération des produits via requete fetch
fetch(`http://localhost:3000/api/products/?product-ID`)
//récupération des produits sous forme de tableau
    .then(function openArray(productsArray) {
      if (productsArray.ok) {
               
    console.log("API loaded");
       return productsArray.json();
        }
 })
 .then((data) => {
  console.log('data', data);
  return data
})
    .catch(function(error)  
    {
alert(error);
console.log("Api loading : failed!");
    })


   //si le panier est vide
   let positionEmptyCart = document.querySelector("#cart__items");

   if (localStorage.getItem('numeroDeCommande') !== null )
   {
    document.getElementById('numeroDeCommande').innerText = localStorage.getItem(`numeroDeCommande`)
   
  }
   function insertionPanier() 
   {

   if (panierLocalStorage === null || panierLocalStorage == 0) 
   {
    let emptyCart = `Aucun article dans le panier.`;
    positionEmptyCart.innerText = emptyCart;
    } 
    else  {
            for (let items in panierLocalStorage)
            {
              let item = JSON.parse(items);
              console.log(item);
              let produitRef = panierLocalStorage[item].ref;
              let produitCouleur = panierLocalStorage[item].coul;
              let produitQute = panierLocalStorage[item].qute;
  //affichage des produits présents dans local storage

                article = document.createElement("article");
                document.querySelector("#cart__items").appendChild(article);
                article.setAttribute("class", "cart__item");
                article.setAttribute("data-id", produitRef);
                article.setAttribute("data-color", produitCouleur);
  
                divImg = document.createElement("div");
                article.appendChild(divImg);
                divImg.setAttribute("class", "cart__item__img");
  
                productImg = document.createElement("img");
                divImg.appendChild(productImg);
                productImg.src = panierLocalStorage[item].imageProduit;
                productImg.alt = panierLocalStorage[item].altTxt;

                divProduit = document.createElement("div");
                article.appendChild(divProduit);
                divProduit.setAttribute("class","cart__item__content");
                
                divProduitDescription = document.createElement("div");
                divProduit.appendChild(divProduitDescription);
                divProduitDescription.setAttribute("class", "car__item__content_description ");

                h2 = document.createElement("h2");
                divProduitDescription.appendChild(h2);
                h2.innerText = panierLocalStorage[item].nom;

                p_couleur =  document.createElement("p");
                divProduitDescription.appendChild(p_couleur);
                p_couleur.innerText = "Couleur: " + panierLocalStorage[item].coul;

                p_prix = document.createElement("p");
                divProduitDescription.appendChild(p_prix);
                p_prix.innerText = "Prix: " + panierLocalStorage[item].prix + " €";

                divProduitSettings =  document.createElement("div");
                divProduit.appendChild(divProduitSettings);
                divProduitSettings.setAttribute("class", "cart__item__content__settings");

                divProduitSettingsQute =  document.createElement("div");
                divProduitSettings.appendChild(divProduitSettingsQute);
                divProduitSettingsQute.setAttribute("class", "cart__item__content__settings__quantity");

                p_quantite = document.createElement("p");
                divProduitSettingsQute.appendChild(p_quantite);
                p_quantite.innerText = "Quantité: ";

                input_quantite = document.createElement("input");
                divProduitSettingsQute.appendChild(input_quantite);
                input_quantite.value = produitQute;
                input_quantite.setAttribute("type", "number");
                input_quantite.setAttribute("class", "itemQuantity");
                input_quantite.setAttribute("name", "itemQuantity");
                input_quantite.setAttribute("min", "1");
                input_quantite.setAttribute("max", "100");
                input_quantite.addEventListener("change", function() {
                  modifierQute();
                });
               
                
                let boutonSupprimer = document.createElement("div");
                divProduitSettings.appendChild(boutonSupprimer);
                boutonSupprimer.className = "cart__item__content__settings__delete";
                boutonSupprimer.id = "cart__item__content__settings__delete";

                let texteSupprimer = document.createElement("p");
                boutonSupprimer.appendChild(texteSupprimer);
                texteSupprimer.className = "deleteItem";
                texteSupprimer.id = "deleteItem";
                texteSupprimer.innerText = "Supprimer";
                texteSupprimer.addEventListener("click", function(){
                  supprimerArticle(produitRef, produitCouleur);
                })
              
    /* Modifier la quantité*/
//fonction pour modifier la quantité si l'utilisateur clique sur le bouton input
function modifierQute() 
{ 
  let parentQuantite = document.querySelector("[data-id=" + CSS.escape(produitRef) + "][data-color=" + CSS.escape(produitCouleur) +"]");
  console.log(parentQuantite);
  let quantiteModifiee = parentQuantite.querySelector("input");
  let quantiteAMettreAJour = quantiteModifiee.value;

  produitQuantite = quantiteAMettreAJour;
  console.log(panierLocalStorage[item].qute);
  panierLocalStorage[item].qute = quantiteAMettreAJour;
  localStorage.setItem("panier", JSON.stringify(panierLocalStorage));
  alert('Quantité modifiée dans le panier!');
  return;
}
//};

    /*Fonction pour supprimer un article*/
/*
function supprimerArticle(produitRef, produitCouleur)
{
let articleASupprimer = document.querySelector(".deleteItem");
let idSupprime = article.dataset.id;
console.log(idSupprime);
let colorSupprime = article.dataset.color;
console.log(colorSupprime);

let checkPanierLocal = panierLocalStorage.find (
  (p) => p.ref == idSupprime.value && p.coul == colorSupprime.value && p.qute == 1
);
checkPanierLocal = articleASupprimer;
console.log(checkPanierLocal);

let index = panierLocalStorage.findIndex(item => item.ref === idSupprime);
panierLocalStorage.splice(index,1);
// checkPanierLocal.remove(index);
localStorage.setItem("panier", JSON.stringify(panierLocalStorage));

alert('Article supprimé du panier!');
location.reload();
};


  */

/* Total quantités et total prix*/
/*
function totaux()
{
let quantiteProduit = document.querySelectorAll(".itemQuantity");
let quantiteLength = quantiteProduit.length;
totalQuantite = 0;

let prixTotal = 0;

for (let i = 0; i < quantiteLength; i++)
{
  totalQuantite += quantiteProduit[i].valueAsNumber;
  prixTotal += (quantiteProduit[i].valueAsNumber * panierLocalStorage[i].prix);
}

let elementTotalQuantite = document.getElementById("totalQuantity");
elementTotalQuantite.innerText = totalQuantite;
//calcul du prix total
let elementTotalPrix = document.getElementById("totalPrice");
elementTotalPrix.innerText = prixTotal;
}    
totaux(); 
     */        
  
    
}      
}
}
insertionPanier();   
  

    
