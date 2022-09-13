let panierLocalStorage = JSON.parse(localStorage.getItem("produit"));
console.table(panierLocalStorage);

for (let item of panierLocalStorage)
         {
        
              //let key = JSON.parse(Objects);
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
    const product = products;
    console.log("API loaded");
   console.log(panierLocalStorage);
   console.log(products);
   
  //affichage des produits présents dans local storage

  
                article = document.createElement("article");
                document.querySelector("#cart__items").appendChild(article);
                article.setAttribute("class", "cart__item");
                article.setAttribute("data-id", "produitRef");
                article.setAttribute("data-color", "produitCouleur");
  
                
                divImg = document.createElement("div");
                article.appendChild(divImg);
                divImg.setAttribute("class", "car__item__img");
  
                let productImg = document.createElement("img");
                divImg.appendChild(productImg);
                productImg.src = products.imageUrl;
                productImg.alt = products.altTxt;
              })
              .catch(function(error) {
                alert(error);
                console.log("Api loading : failed!");
              });
  
    }
    


 