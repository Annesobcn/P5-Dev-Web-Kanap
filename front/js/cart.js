const panierLocalStorage = localStorage.getItem("produit");
const panierLocalStorageJson = JSON.parse(panierLocalStorage);


//appel de l'API
fetch("http://localhost:3000/api/products")
//récupération des produits sous forme de tableau
    .then(function openArray(productsArray) {
      if (productsArray.ok) {
       return productsArray.json();
    }
 })
  .then(function(products) 
  {
    console.log("API loaded");
   console.log(panierLocalStorageJson);
   for (i in products){
    console.log(products);
  //affichage des produits présents dans local storage

//si produits dans panier: crée une carte produit pour chaque produit
    if (panierLocalStorageJson) {
     /* const detailProduit = panierLocalStorage.find(
        (p) => 
         p.ref ==  itemRef,
         p.coul == itemCouleur,   
         p.qute == itemQuantite  
      
      );
      const detailProduitJson = JSON.parse(detailProduit);
     
        console.log(detailProduitJson.ref);*/
 /* 
 const afficherProduit = panierLocalStorageJson.find
  (
    (p) => 
    let produit = JSON.parse(produits),
    let produitCode = p.ref,
    let produitCouleur = p.coul,
    let produitQuantite = p.qute
  )*/
     //console.log(panierLocalStorage);
      function createCardProduct(){
        for (i = 0 ; i >= panierLocalStorageJson.length; i++)
         {
         

            function afficherProduit(i) {

              article = document.createElement("article");
              document.getElementsByClassName("cart__item").appendChild(article);
              article.setAttribute("class", "cart__item");
              article.setAttribute("data-id", "productRef");
              article.setAttribute("data-color", "itemCouleur");

              
              divImg = document.createElement("div");
              article.appendChild(divImg);
              divImg.setAttribute("class", "car__item__img");

              img =document.createElement("img");
              divImg.appendChild(img);
              img.setAttribute("src", value[i].imageUrl);
              img.setAttribute("alt", value[i].altTxt);


    }
    




    afficherProduit(i); 
    }
    
  }
  createCardProduct();
}
}
  })
  .catch(function(error) {
    alert(error);
    console.log("Api loading : failed!");
  });
