// Set initial variable
let url = "http://localhost:3000/api/teddies";

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
      	
      	data.forEach(getTeddiesInfos);

        console.log(data);
      });
    }
  )
  .catch(function(err) {
    console.log('Fetch Error :-S', err);
  });

	function getTeddiesInfos(element) {
	  let main=document.getElementById('main');
    let row=document.createElement('DIV');
    row.className="col-4";

    main.appendChild(row);

    // Create card
    let card=document.createElement('card');
    card.className="card";

    row.appendChild(card);

    // Create card-body
    let cardBody=document.createElement('card-body');
    cardBody.className="card-body";

    card.appendChild(cardBody);

    // Get image
    let img=document.createElement('IMG');
    img.src=element.imageUrl;
    img.className='card-img-top';

    // Get name
    let a=document.createElement('a');
    a.href='produits.html?id='+element._id;
    a.innerHTML=element.name;
    a.className="card-title stretched-link";
  
    // Get description
    let p=document.createElement('p');
    p.innerHTML=element.description;
    p.className="card-text";

    cardBody.appendChild(img);
    cardBody.appendChild(a);
    cardBody.appendChild(p);
	}