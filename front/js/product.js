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
  .then(function(products) 
  {
    console.log("API loaded");
    console.log(products[id]);//récupération des informations produits
  
    function ficheProduit(products, id) 
      {
        //Récupération de l'élément du DOM qui accueillera les fiches
        sectionFiche = document.querySelector(".item");
      
        //création élément image et insertion de l'image et de son text alt
        imageProduit = document.createElement("img");
        sectionFiche.appendChild(imageProduit);
        document.querySelector(".item__img").appendChild(imageProduit);
        imageProduit.setAttribute("src", products[id].imageUrl);
        imageProduit.setAttribute("alt", products[id].altTxt);
        
      
      
        //création balises et insertion données pour titre, prix et description
        h1 = document.createElement("h1");
        document.querySelector("#title").appendChild(h1);
        h1.innerText = products[id].name;
        h1.setAttribute("id", "product name");
        price = document.querySelector("#price");
        price.innerText = products[id].price;
        description = document.querySelector("#description");
        description.innerText = products[id].description;
      
        //fonction pour choix des couleurs             
                            
        function colorSelect()
        { 
          for (i in products[id].colors)
          {     
            color = document.createElement("option"); 
             document.querySelector("#colors").appendChild(color);
            color.setAttribute("value", products[id].colors[i]);
            color.innerText = products[id].colors[i];            
          }          
        } 
        colorSelect();
      }       
   ficheProduit(products, id);

//*******localSotrage********/

function saveProduct(id) 
{
   // récupération des valeurs requises dans le panier: id, couleur et quantité
   const reference = products[id]._id;
   //récupérer le choix de la couleur
   const choixCouleur = document.getElementById("colors");
   const couleur = choixCouleur.value;
   //pour récupérer le choix de la quantité
   const choixQte = document.querySelector("input");
   const quantite = choixQte.value;
   //*ajout des valeurs du produit choisi pour le local storage*/
  
   const optionsProduitJson = 
   {
    ref: reference,
    couleur: couleur,
    quantite: quantite,
    };


    const nouveauProduitDansLocalStorage = JSON.stringify(optionsProduitJson);
    localStorage.setItem("produit", nouveauProduitDansLocalStorage);

        function ajouterProduit(nouveauProduitDansLocalStorage){
//constante pour convertir les objets du local storage en objet javascript
          const produitsDuLocalStorage = JSON.parse(localStorage.getItem("produit"));
   
          console.log(produitsDuLocalStorage);
// S'il y a le même produit (même id et même couleur) enregistrés dans le panier
          if(produitsDuLocalStorage == null)
          {
           produitsDuLocalStorage = [];
           nouveauProduitDansLocalStorage.push();       
           console.log(produitsDuLocalStorage);
          }
          else
          {
                 if(nouveauProduitDansLocalStorage.couleur == Object.couleur && nouveauProduitDansLocalStorage.ref == Object.ref ){
                  
                  }
                else{

           produitsDuLocalStorage.push();
                  }
 
          }

        }
        ajouterProduit(nouveauProduitDansLocalStorage);
   
    
  }
//appel de la fonction au click de l'utilisateur pour valider son choix

document.getElementById("addToCart").addEventListener("click", function () 
{
saveProduct(id);
})


})
   .catch(function(error) {
    alert(error);
    console.log("Api loading : failed!");
  });

