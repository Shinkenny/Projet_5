// Set initial variables
let queryString=window.location.search;
let id=new URLSearchParams(queryString).get("id");
let url="http://localhost:3000/api/teddies/"+id;

fetch(url)
  .then(
    function(response) {
      if (response.status !== 200) {
        console.log('Il semble y avoir un problème. Status Code: ' +
          response.status);
        return;
      }

      // Examine the text in the response
      response.json().then(function(data) {

		    let mainLeft=document.getElementById('main-left');
		    let rowLeft=document.createElement('DIV');
		    rowLeft.className="col";

		    mainLeft.appendChild(rowLeft);

		    let mainRight=document.getElementById('main-right');
		    let rowRight=document.createElement('DIV');
		    rowRight.className="col productInfo";

		    mainRight.appendChild(rowRight);

		    // Get image
		    let img=document.createElement('IMG');
		    img.src=data.imageUrl;
		    img.className='card-img-left';

		    // Get name
		    let a=document.createElement('h1');
		    a.innerHTML=data.name;
		    a.className="card-title";

		    // Get price
		    let pr=document.createElement('p');
		    pr.innerHTML='Prix : ' + data.price + ' €';
		    pr.className="card-text";
		  
		    // Get description
		    let p=document.createElement('p');
		    p.innerHTML=data.description;
		    p.className="card-text";

		    // Get color choice
		    let colorSelect=document.getElementById('color');
		   	data.colors.forEach(element=>{
		   	let option=document.createElement('option');
			   	option.innerHTML=element;
			   	option.value=element
			   	colorSelect.appendChild(option);
		   	})

		    // Append section
		    rowLeft.appendChild(img);
		    rowRight.appendChild(a);
		    rowRight.appendChild(pr);
		    rowRight.appendChild(p);
		  

		     // Create cart button
		    let b=document.getElementById('btnSubmit');

		// On button click
		b.addEventListener('click', (event)=>{
			event.preventDefault();
		
			let produit = {
				Id: id, 
				Image: data.imageUrl,
				Name: data.name,
				Price: data.price,
				Qty: 1,
				Color:colorSelect.value
			};
			let panier = localStorage.getItem('monPanier');

			let isPanier=false;
			if (panier){
				panier=JSON.parse(panier);
				panier.forEach(element=>{
					if(element.Id==id && element.Color==colorSelect.value){
						element.Qty++;
						isPanier=true;
					}
				})
			}else{
				panier=[];
			}
			if (!isPanier){
				panier.push(produit);
			}
			
			localStorage.setItem('monPanier', JSON.stringify(panier));
		})
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });