     //Recupération des produits éventuellment stockés dans le local storage
    /* let products = window.localStorage.getItem('products');

     if (products === null) {
     //Récupération des produits via l'API HTTP
     const reponse = fetch("http://localhost:3000/api/products");
     const products = reponse.json();
     //Transformation des produits en JSON
     const valeurProduits = JSON.stringify(products);
     //Stockage des informations dans le localStorage
     window.localStorage.setItem("products", valeurProducts);
     }else{
      products = JSON.parse(products);
     }
     */
    let a = '';
    let article = ''
    let img = '';
    let h3 = '';
    let p = '';


    fetch("http://localhost:3000/api/products")
    
        .then(function openArray(productsArray) {
          if (productsArray.ok) {
           return productsArray.json();
        }
     })
      .then(function(products) {     
          console.log("API loaded");
          for (i in products){
     
            //fonction qui récupère mes information produit pour les fiches de la page d'accueil
            function genererFiches(i) {
             //Création des fiches produits      
         //Récupération de l'élément du DOM qui accueillera les fiches
          a = document.getElementById("items").appendChild(document.createElement("a"));
          a.setAttribute("href", "./product.html?id="+ i +"");
          a.setAttribute("id", "a_link");
         //récupération de la balise dédiée à un produit Kanap
         article = document.createElement("article");
         a.appendChild(article);

         //récupération de l'élément image
         img = document.createElement("img");
          //on rattache l'image à produitsElement(la balise article)
         article.appendChild(img);
         //accès à l'indice i de la liste produits pour configurer la source de l'image.
         img.setAttribute("src", products[i].imageUrl);
         img.setAttribute("alt", products[i].altTxt);
    
         //idem pour nom et description du produit

         h3 = document.createElement("h3");
         article.appendChild(h3);
         h3.setAttribute("class", "productName");
         h3.innerText = products[i].name;

         p = document.createElement("p");
         article.appendChild(p);
         p.setAttribute("class", "productDescription");
         p.innerText = products[i].description;  
      }
      genererFiches(i);
    }
  })

  .catch(function(error) {
    console.log("Api loading : failed!");
  });