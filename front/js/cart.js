let panierLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(panierLocalStorage);

   //si le panier est vide
   let positionEmptyCart = document.querySelector("#cart__items");
if (panierLocalStorage === null || panierLocalStorage == 0) {
  let emptyCart = `Le panier est vide.`;
  positionEmptyCart.innerText = emptyCart;
} else {
for (let item of panierLocalStorage)
         {
            let produitRef = item.ref;
            console.log(produitRef);
            let produitCouleur = item.coul;
            console.log(produitCouleur);
            let produitQuantite = item.qute;
            console.log(produitQuantite);
            let produitPrix = item.prix;

//appel de l'API
fetch(`http://localhost:3000/api/products/${produitRef}`)
//récupération des produits sous forme de tableau
    .then(function (productsArray) {
      if (productsArray.ok) {
       return productsArray.json();
    }
 })
  .then(function(products) 
  {
  // const product = products;
    console.log("API loaded");
   console.log(panierLocalStorage);
   console.log(products);

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
                productImg.src = products.imageUrl;
                productImg.alt = products.altTxt;

                divProduit = document.createElement("div");
                article.appendChild(divProduit);
                divProduit.setAttribute("class","cart__item__content");
                
                divProduitDescription = document.createElement("div");
                divProduit.appendChild(divProduitDescription);
                divProduitDescription.setAttribute("class", "car__item__content_description ");

                h2 = document.createElement("h2");
                divProduitDescription.appendChild(h2);
                h2.innerText = products.name;

                p_couleur =  document.createElement("p");
                divProduitDescription.appendChild(p_couleur);
                p_couleur.innerText = "Couleur: " + produitCouleur;

                p_prix = document.createElement("p");
                divProduitDescription.appendChild(p_prix);
                p_prix.innerText = "Prix: " + products.price + " €";

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
                input_quantite.setAttribute("type", "number");
                input_quantite.setAttribute("class", "itemQuantity");
                input_quantite.setAttribute("name", "itemQuantity");
                input_quantite.setAttribute("min", "1");
                input_quantite.setAttribute("max", "100");
                input_quantite.setAttribute("value", produitQuantite);
                input_quantite.addEventListener("change", function() {
                  modifierQute(produitRef, produitQuantite);
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
      let articleModifie = document.querySelector(".cart__item");
console.log(articleModifie.dataset.id);


      for (let i in articleModifie) {
        
        let quantiteModifiee = document.querySelector(".itemQuantity");
        console.log(quantiteModifiee.value);
        
       let verifPanierLocal = panierLocalStorage.find(
          (p) => 
           p.qute !== quantiteModifiee.value
        );
        verifPanierLocal.qute = quantiteModifiee.value;
        panierLocalStorage.qute = verifPanierLocal.qute;
        localStorage.setItem("produit", JSON.stringify(panierLocalStorage))
        location.reload();
   
    alert('Quantité modifiée dans le panier!');
    return;
  }
       
    };
    /*Fonction pour supprimer un article*/

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
localStorage.setItem("produit", JSON.stringify(panierLocalStorage));

alert('Article supprimé du panier!');
location.reload();
};

  

/* Total quantités et total prix*/

function totaux()
{
let quantiteProduit = document.querySelectorAll(".itemQuantity");
console.log(quantiteProduit);
let quantiteLength = quantiteProduit.length;
console.log(quantiteLength);
totalQuantite = 0;

let prixTotal = 0;

for (let i = 0; i < quantiteLength; i++)
{
  totalQuantite += quantiteProduit[i].valueAsNumber;
  prixTotal += (quantiteProduit[i].valueAsNumber * panierLocalStorage[i].prix);
  console.log(produitPrix);
}

let elementTotalQuantite = document.getElementById("totalQuantity");
elementTotalQuantite.innerText = totalQuantite;
console.log(totalQuantite);
//calcul du prix total
let elementTotalPrix = document.getElementById("totalPrice");
elementTotalPrix.innerText = prixTotal;
console.log(prixTotal);
}    
totaux(); 
              })
              .catch(function(error) {
                alert(error);
                console.log("Api loading : failed!");
              });
  
    }
    
  }

 