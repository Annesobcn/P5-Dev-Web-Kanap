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
        
      //Création balise qui contiendra les informations du produit
      
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
          for (i in products[id].colors)
          {     
            color = document.createElement("option"); 
             document.querySelector("#colors").appendChild(color);
            //paramétrage de l'élément et insertion des couleurs présentes dans le array colors
            color.setAttribute("value", products[id].colors[i]);
            color.innerText = products[id].colors[i];
            
            } 
          // color.appendChild(option);//ajout de l'élément dans color

        } 
        colorSelect();
  }       
   ficheProduit(products, id); 

/*****************************validation produit et envoi au panier ******* */
function saveProduct(id) {
  

//récupérer la couleur choisie
var selectedList = [],
    selectColors = document.getElementById("colors"),
  i;

for (i = 0; i < selectColors.length; i++)
{
    if (selectColors[i].selected)
    {
      selectedList.push(selectColors[i]);
    }
}

var choixCouleur = document.getElementById("colors");
var selectedCouleur = choixCouleur.options[choixCouleur.selectedIndex].value;
var texteCouleur = choixCouleur.options[choixCouleur.selectedIndex].text;

   // récupération des valeurs requises dans le panier: id, couleur et quantité
   const reference = products[id]._id;
   console.log(reference);
   const couleur = document.getElementById("colors").value;
  console.log(couleur);
   const quantite = document.getElementById("quantity").value;

//constante pour faciliter la récupération des données du panier
  // const panier = JSON.parse(localStorage.getItem("choixProduit"));
   //condition 1: si pdt absent du panier: on l'ajoute
   /*if(panier == null) {
    panier = [] ;
   }*/

   //ajout des valeurs du produit choisi dans le local storage
  document.getElementById("addToCart").onclick = () =>{
            const choixProduitJson = {
                  ref: reference,
                  couleur: couleur,
                  quantite: quantite,
            }

            const choixProduit = JSON.stringify(choixProduitJson);
      localStorage.setItem("addToCart", choixProduit);
      
   }
//condition 2: si le produit selectionné existe déjà dans le panier: on incrémente la quantité uniquement

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

