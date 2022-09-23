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
//bouton pour valider la commande
let commandBtn = document.getElementById('order');
commandBtn.addEventListener('click', function(e)
{
  e.preventDefault();
  postFormulaire();
}
);
   //si le panier est vide
   let positionEmptyCart = document.querySelector("#cart__items");

   if (localStorage.getItem('orderId') !== null )
   {
    document.getElementById('orderId').innerText = localStorage.getItem('orderId')
   
  }
   function insertionPanier() 
   {

   if (panierLocalStorage === null || panierLocalStorage == 0) 
   {
    let emptyCart = "Aucun article dans le panier.";
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
  location.reload();
  return;
};


    /*Fonction pour supprimer un article*/
function supprimerArticle()
{
  console.log(produitRef);

  let articleASupprimer = document.querySelector("[data-id=" + CSS.escape(produitRef) + "][data-color=" + CSS.escape(produitCouleur) +"]");
  let referenceASupprimer = articleASupprimer.dataset.id;
  let couleurASupprimer = articleASupprimer.dataset.color;
  console.log(referenceASupprimer + couleurASupprimer);
  panierLocalStorage.splice(item, 1);
  document.getElementById("cart__items").removeChild(articleASupprimer);
  localStorage.setItem("panier", JSON.stringify(panierLocalStorage));
  
  alert('Article supprimé du panier!');
  location.reload();
};


/* Total quantités et total prix*/

function totaux()
{

 
  //let quantiteParProduit = produitQute;
  let quantiteProduit = document.querySelectorAll(".itemQuantity");//quantite par produit
  let totalProduitsPanier = quantiteProduit.length;//nombre d'articles differents
 let totalQuantite = 0;

  let prixTotal = 0;

  for (let i = 0; i < totalProduitsPanier; i++)
  {
  totalQuantite += quantiteProduit[i].valueAsNumber;//ajout de la quantite du produit pour chaque produit dans le panier
  prixTotal += (quantiteProduit[i].value * panierLocalStorage[i].prix);//on multiplie la quantite d'un produit par son prix pour chaque produit
  }
  
  let elementTotalQuantite = document.getElementById("totalQuantity");
elementTotalQuantite.innerText = totalQuantite;
//affichage du prix total
let elementTotalPrix = document.getElementById("totalPrice");
elementTotalPrix.innerText = prixTotal;
 
}    
totaux(); 
}      
}
}
insertionPanier(); 

  /*Formulaire*/
       //Récupération et analyse des données saisies dans le formulaire 
       function formulaire()
       {
       // let form = document.querySelector(".cart__order__form");
        let noms = new RegExp("^[a-zA-Z0-9.! ,.'-]+$");
        let adresse = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)");
        let mail = new RegExp(('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$'));

        //Ecoute des entrées de l'utilisateur sur chaque élément du formulaire
        document.getElementById('firstName').addEventListener('input', function()
        {
          validFirstName(this);
        });
        document.getElementById('lastName').addEventListener('input', function()
        {
          validLastName(this);
        });
        document.getElementById('address').addEventListener('input', function()
        {
          validAddress(this);
        });
        document.getElementById('city').addEventListener('input', function()
        {
          validCity(this);
        });
        document.getElementById('email').addEventListener('input', function()
        {
          validEmail(this);
        });

//messages erreur ou correct selon entrées de l'utilisateur
let validFirstName = function(inputFirstName){
    let firstNameAlertMessage = inputFirstName.nextElementSibling;
    if (noms.test(inputFirstName.value)) {
      firstNameAlertMessage.innerText = '';
    }else{
      firstNameAlertMessage.innerText = 'Champs invalide!';
    }
};
let validLastName = function(inputLastName){
  let lastNameAlertMessage = inputLastName.nextElementSibling;
  if (noms.test(inputLastName.value)) {
    lastNameAlertMessage.innerText = '';
  }else{
    lastNameAlertMessage.innerText = 'Champs invalide!';
  }
};
let validAddress = function(inputAddress){
  let addressAlertMessage = inputAddress.nextElementSibling;
  if (adresse.test(inputAddress.value)) {
    addressAlertMessage.innerText = '';
  }else{
    addressAlertMessage.innerText = 'Champs invalide!';
  }
};
let validCity = function(inputCity){
  let cityAlertMessage = inputCity.nextElementSibling;
  if (noms.test(inputCity.value)) {
    cityAlertMessage.innerText = '';
  }else{
    cityAlertMessage.innerText = 'Champs invalide!';
  }
};
let validEmail = function(inputEmail){
  let emailAlertMessage = inputEmail.nextElementSibling;
  if (mail.test(inputEmail.value)) {
    emailAlertMessage.innerText = '';
  }else{
    emailAlertMessage.innerText = 'Champs invalide!';
  }
};
}
formulaire();  
/*création d'un objet Contact contenant les éléments du formulaire 
et d'un tableau de produits contenant les produits du panier
Puis envoie des données avec la méthose POST et vers la page de confirmation de commande */
//La fonction postFormulaire se déclanche au click du bouton valider
 function postFormulaire(){
  let inputFirstName = document.getElementById('firstName');
  let inputLastName = document.getElementById('lastName');
  let inputAdress = document.getElementById('address');
  let inputCity = document.getElementById('city');
  let inputMail = document.getElementById('email');
  
//tableau de produits
  let productsId = [];
  for (let i in panierLocalStorage)
  {
    productsId.push(panierLocalStorage[i].ref);
  }
 
  let orderId = {
  contact:
   {
      'firstName': inputFirstName.value,
      'lastName': inputLastName.value,
      'address': inputAdress.value,
      'ville': inputCity.value,
      'email': inputMail.value,
   },
   products: productsId,
    }
    
 console.log("orderId");
 console.log(orderId);

 
  const optionsFetch = {
    method: 'POST',
    headers: 
    {
    Accept: "*/*",
    "Content-Type": "application/json"
    },
    body: JSON.stringify(orderId),
    
  }
  
  fetch("http://localhost:3000/api/products/order", optionsFetch)
  .then((Response)=> Response.json())
  .then((data)=>{
    console.log(data);
    localStorage.setItem("orderId", JSON.stringify(orderId));
  
   // document.location.href = "confirmation.html";
  })
  .catch((err)=>
  {
    alert("Problème avec le fetch: " + err.message);
  });
  //console.log(body.contact);
  
  const checkDataApi = fetch("http://localhost:3000/api/products/order")
  checkDataApi.then(async(Response)=>{
    try{
      console.log(checkDataApi);
      const donneesSurServer = await Response.json()
    }catch(e){
      console.log(e);
    }
  })
/*
  commande.then((response)=>{
    try{
        console.log("response");
        console.log(response);
      const contenu = response();
        console.log("contenu");
        console.log(contenu);
    }catch(e){
      console.log(e);
    }*/
  //});
    /*localStorage.setItem("orderId", data.orderId);
  
    document.location.href = "confirmation.html";*/
  
  /*
  .catch((err) =>{
    alert(err);
  });
}*/
};

    
  
  

    
