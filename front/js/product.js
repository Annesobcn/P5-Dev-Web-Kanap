let newProduct = '';
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
  
   let optionsProduit = 
   {
    ref: reference,
    coul: couleur,
    qute: quantite,
    };


//constante pour convertir les objets du local storage en objet javascript
let panierLocalStorage = JSON.parse(localStorage.getItem("produit"));

if(!panierLocalStorage)
    {
      panierLocalStorage = [];
      panierLocalStorage.push(optionsProduit);
      localStorage.setItem("produit", JSON.stringify(panierLocalStorage));
      console.log("ok!");
    }
else if(panierLocalStorage.ref == optionsProduit.ref && panierLocalStorage.coul == optionsProduit.coul)
{
      panierLocalStorage.push(optionsProduit.qute);
      localStorage.setItem("produit.qte", JSON.stringify(panierLocalStorage));
      alert(error);
}
 
      panierLocalStorage.push(optionsProduit);
      localStorage.setItem("produit", JSON.stringify(panierLocalStorage));
      alert("Vous venez d'ajouter un article à votre panier")
      console.log(panierLocalStorage);




    
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

