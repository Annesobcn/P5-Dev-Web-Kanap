
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
      console.log(products[id]);
/*création d'une fiche produit et incorporation des informations 
*produit sur l'api
 */
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


    function ficheProduit(id) {
        img = document.createElement("img");
        document.getElementsByClassName("item__content").appendChild(img);
        img.setAttribute("src", value[id].imageUrl);
        img.setAttribute("alt", value[id].altTxt);

      
        
    }
  })
  .catch(function(error) {
    console.log("Api loading : failed!");
  });

