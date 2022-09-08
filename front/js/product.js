let newItem = '';
//Lien entre un produit de la page d'accueil et la page produit
  let completeUrl = location;
  var url = new URL(completeUrl);
  var searchParams = new URLSearchParams(url.search);
  if(searchParams.has('id')) {
    var id = searchParams.get("id");
    console.log("Item ID is " + id);
  }else{
      alert("id not found!");
  };

//Recupération des produits via requete fetch
fetch("http://localhost:3000/api/products")
//récupération des produits sous forme de tableau
    .then(function openArray(productsArray) {
      if (productsArray.ok) {
       return productsArray.json();
    }
 })
  .then(function(products) {
    console.log("API loaded");
    console.log(products[id]);//récupération des informations produits
  
 
      
      function ficheProduit(products, id) {
      //Récupération de l'élément du DOM qui accueillera les fiches
        sectionFiche = document.querySelector(".item");
      
        //création élément image et insertion de l'image et de son text alt
        imageProduit = document.createElement("img");
       sectionFiche.appendChild(imageProduit);
       document.querySelector(".item__img").appendChild(imageProduit);
        imageProduit.setAttribute("src", products[id].imageUrl);
        imageProduit.setAttribute("alt", products[id].altTxt);
        
      //Création balise qui contiendra les informations du produit
       // infosProduit = document.querySelector(".item__content").appendChild("infosProduit");
        //infosProduit.dataset.id = products[id].id;
  //création balise h1 pour titre et insertion du nom de l'article
        h1 = document.createElement("h1");
        document.querySelector("#title").appendChild(h1);
        h1.innerText = products[id].name;
        h1.setAttribute("id", "product name");

        price = document.querySelector("#price");
        price.innerText = products[id].price;
        description = document.querySelector("#description");
        description.innerText = products[id].description;
      
        //fonction pour choix des couleurs
                
              function colorSelect(){ 
                for (var i in products[id].colors)
                {     
                  color = document.createElement("option"); 
                   document.querySelector("#colors").add(color);
                  //paramétrage de l'élément et insertion des couleurs présentes dans le array colors
                  color.setAttribute("value", products[id].colors[i]);
                  color.innerText = products[id].colors[i];
                  } 
                 color.appendChild(colorSelect);//ajout de l'élément dans color

              } 
              colorSelect();
        }       
         ficheProduit(products, id); 

 
 })
   .catch(function(error) {
    console.log("Api loading : failed!");
  });

