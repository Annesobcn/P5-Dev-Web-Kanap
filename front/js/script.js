//Déclaration des variables nécessaires à la création des éléments de la fiche type
    let a = '';
    let article = ''
    let img = '';
    let h3 = '';
    let p = '';

     //Recupération des produits via requete fetch
    fetch("http://localhost:3000/api/products")
    /**Récupération des produits sous forme de tableau
     * @params { String } productArray
     * @return { Promise }
*/
        .then(function openArray(productsArray) {
          if (productsArray.ok) {
           return productsArray.json();
        }
     })
      .then(function(products) {     
          console.log("API loaded");
          //boucle pour générer les fiches produit pour chaque produit
          for (i in products){
     
            //fonction qui relie mes information produit pour les fiches
            function genererFiches(i) {//Création des fiches produits  
                 
         //Création de l'élément du DOM qui accueillera les fiches
          a = document.getElementById("items").appendChild(document.createElement("a"));
        //modification de son attribut et récupération de l'id du produit pour qu'il s'affiche sur la page produit au clik
          a.setAttribute("href", "./product.html?id="+ i +"");
          a.setAttribute("id", "a_link");         
         article = document.createElement("article");//création de la balise dédiée à un produit Kanap         
         a.appendChild(article);//rattachement de l'élément article à la balise a

         //Création de l'élément qui recevra l'image
         img = document.createElement("img");         
         article.appendChild(img); //on rattache l'image à la balise article
         //accès à l'indice i de la liste produits pour configurer la source et le texte alternatif de l'image.
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