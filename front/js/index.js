//Récupération de données sur API Fetch

const url = fetch('http://localhost:3000/api/products');

//création de constantes pour créer les éléments 


url.then((response) => {
   //

   const productsData = response.json();

   console.log(productsData);

   productsData.then((response) =>{
      const sectionProducts = document.getElementById("#items");

      const imageElement = document.createElement("img");
      imageElement.src = sectionProducts.image;
      sectionProducts.appendChild(imageElement);
      
      const nameElement = document.name(h3);
      nameElement.innerText = item.nom;
      sectionProducts.appendChild(nameElement);

      const descriptionElement = document.createElement(p);
      descriptionElement.innerText = item.description;
      sectionProducts.appendChild(descriptionElement);
      console.log(response);
   })

})
.catch((erreur) => console.log(erreur));

/*Boucle for pour insérer chaque produit  jusqu'à fin de liste pdts
*/
//const imageProduit = document.querySelector('a','article', 'img');
//const nomProduit = document.getElementsByClassName(productName);
//const descriptionProduit = document.getElementsByClassName(productDescription);


let imageProduit = produits.imageUrl;

let imageDisplay = document.querySelector(a, article, img);
//for getProduit ("i=DataTransferItemList('imageUrl','name','description')","i>produits.length",'i++'

const produitsDisplay = new

function productDisplay(imageUrl, name, description) {
   fetch(produitsUrl).then(function(response)
   {
      response.json().then(function(el, element){
      productsDisplay.element = element;
   });
   });
}
console.log(productDisplay)