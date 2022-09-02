     //Déclaration des variables pour chaque partie de notre section produits 
     let a = '';
     let article = '';
     let h3 = '';
     let p = '';
     let img = '';

     //Récupération de données depuis les donnees json via l'API
   fetch('http://localhost:3000/api/products')

   .then(function(productsArray) {
   if(productsArray.ok) {
      return productsArray.json();
   }
   })
   .then(function(value) {
      console.log("Connection réussie!");
      for (i in value){
      
  
   //fonction pour générer l'affichage
         function genererProduit(i) 
      {
      //récupération de l'élément du DOM qui accueillera les fiches 
      a = document.getElementById("items").appendChild(document.createElement("a"));
      a.setAttribute("href",  "./product.html?id=" + i + "");
      a.setAttribute("id", "a_link");

      //création de la fiche produit:éléments qui accueilleront les informations de chaque produit
            .then function(create) {
      article = document.createElement("article");
     a.appendChild(article);
     img = document.createElement("img");
     article.appendChild(img);
     h3 = document.createElement(h3);
     article.appendChild(h3);
     p = document.createElement("p");
     article.appendChild(p);
           
   
     //insertion des informations dans leurs emplacements respectifs
            .then function(insert) {
     img.setAttribute("src", value[i], imageUrl);
     img.setAttribute("alt", value[i], altTxt);
     h3.setAttribute("id", "productName");
     h3.innerText = value[i].name;
     p.setAttribute("id","productDescription");
     p.innerText = value[i].description;
   
            }
         }
      }
   genererProduit(i);
});
.catch((erreur) => console.log("erreur"));

  

