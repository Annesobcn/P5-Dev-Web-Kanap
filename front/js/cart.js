let panierLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(panierLocalStorage);

for (let item of panierLocalStorage)
         {
            let produitRef = item.ref;
            console.log(produitRef);
            let produitCouleur = item.coul;
            console.log(produitCouleur);
            let produitQuantite = item.qute;
            console.log(produitQuantite);

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
                  modifierQute();
                  
                });
              
      
  /* Modifier la quantité*/
  
    //fonction pour modifier la quantité si l'utilisateur clique sur le bouton input
      function modifierQute() 
      { 
        let articleModifie = document.querySelector(".cart__item");
  console.log(articleModifie.dataset.id);
  
 
        for (let i in articleModifie) {
          
          let idProduitChoisi = articleModifie.dataset.id;
          console.log(idProduitChoisi);
          let couleurProduitChoisi = articleModifie.dataset.color;
          console.log(couleurProduitChoisi);

          let quantiteModifiee = document.querySelector(".itemQuantity");
          console.log(quantiteModifiee.value);
          
        
  console.log(produitQuantite);
  /*if(idProduitChoisi == produitRef){
    produitQuantite = quantiteModifiee.value
    localStorage.setItem("produit", JSON.stringify(panierLocalStorage))
  }else{
    return;
  };*/
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
         
         
              })
              .catch(function(error) {
                alert(error);
                console.log("Api loading : failed!");
              });
  
    }
    


 