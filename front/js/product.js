let newProduct = '';
  let completeUrl = location;
  let url = new URL(completeUrl);
  console.log(url);
  let searchParams = new URLSearchParams(url.search);
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
    /* Fonction pour créer la fiche du produit cliqué par l'utilisateur*/
  
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
   const nom = products[id].name;
   const reference = products[id]._id;
   //récupérer le choix de la couleur
   const choixCouleur = document.getElementById("colors");
   const couleur = choixCouleur.value;
   //pour récupérer le choix de la quantité
   const choixQte = document.querySelector("input");
   const quantite = choixQte.value;
   const prix = products[id].price;
   const imageProduit = products[id].imageUrl;
   const altTxt = products[id].altTxt;

   //contrôle des choix de l'utilisateur
if (couleur == '') {
  alert("Attention! Choisissez une couleur!");
}
else if(quantite<=0 || quantite > 100) {
  alert("Attention! Entrez une quantité entre 1 et 100")
} else{

   //*ajout des valeurs du produit choisi pour le local storage*/
  
   let optionsProduit = 
   {
    ref: reference,
    nom: nom,
    coul: couleur,
    qute: Number(quantite),
    prix: prix,
    imageProduit: imageProduit,
    altTxt: altTxt
    };

//constante pour convertir les objets du local storage en objet javascript
let panierLocalStorage = JSON.parse(localStorage.getItem("panier"));
//s'il y a des produits dans le panier: on vérifie qu'il n'y ait pas le même que celui selectionné
 if(panierLocalStorage)
{
  let verifPanier = panierLocalStorage.find(
    (p) => 
    p.ref == optionsProduit.ref && p.coul == optionsProduit.coul
  );
  //si le même produit(ref et coul) est dans le panier, on ajoute que la quantité
    if (verifPanier) 
    {
      verifPanier.qute = verifPanier.qute + optionsProduit.qute;
      localStorage.setItem("panier", JSON.stringify(panierLocalStorage));
      alert('La quantité est à jour');
      return;
    }
    //sinon on ajoute le produit
    panierLocalStorage.push(optionsProduit);
    localStorage.setItem("panier", JSON.stringify(panierLocalStorage));
    alert('Nouvel article ajouté au panier');

      
} else{
  //si panier vide: on ajoute le produit dans tableau
      panierLocalStorage = [];
      panierLocalStorage.push(optionsProduit);
      localStorage.setItem("panier", JSON.stringify(panierLocalStorage));
      console.log("ok!");
      alert('Article ajouté au panier');
      window.location.reload();
      return;
}
      console.log(panierLocalStorage);
 
  }
  
}
//appel de la fonction au click de l'utilisateur pour valider son choix

document.getElementById("addToCart").addEventListener("click", function () 
{
saveProduct(id);
})

})
   
