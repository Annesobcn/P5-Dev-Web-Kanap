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
    console.log(products[id]);
    for (i in products[id]){
    /*création d'une fiche produit et incorporation des informations 
    *produit sur l'api
     */
    function ficheProduit(i) 
        {
        img = document.createElement("img");
        document.getElementsByClassName("item__img").appendChild(img);
        img.setAttribute("src", products[id].imageUrl);
        img.setAttribute("alt", products[id].altTxt);
        console.log(products[id].altTxt);
        productName = document.createElement("productName");
        productName.innerText = products[id].name;
        document.getElementById('title').appendChild(productName);
        productName.setAttribute('title'), products[id].name;
        price = document.getElementById('price');
        price.innerText = products[id].price;
        description = document.getElementById('description');
        description.innerText = products[id].description;
      
        //boucle pour choix des couleurs
        for (i in products[id].colors) {
            console.log(products[id].colors[i]);
            couleur = document.createElement("option");
            getElementById('colors').add(couleur);
            couleur.innerText = products[id].colors[i];

        }
      ficheProduit(id);  
    }
}
})
  .catch(function(error) {
    console.log("Api loading : failed!");
  });

