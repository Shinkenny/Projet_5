// Set initial variables
let panier = JSON.parse(localStorage.getItem('monPanier'));
let b=document.getElementById('command');
let totalPriceCard=document.getElementById('commander');
let formCard=document.getElementById('remplir');
let totalPrice=document.getElementById('total');
let currentPrice=0;
let products=[];
let forname=document.getElementById('forname');
let lastname=document.getElementById('name');
let adress=document.getElementById('adress');
let city=document.getElementById('city');
let mail=document.getElementById('mail');
let numberInCart = document.getElementById('numberInCart');
let currentNumber=0;

// Start the function to initialize the cart
InitializeCart();

// Create an alert with a message to say that the cart is empty
// Hide all unnecessary card
function EmptyCart (){
	let div=document.createElement('DIV');
	div.className='alert alert-warning';
	div.innerHTML="Votre panier est vide";
	main.appendChild(div);
	b.style.display='none';
	totalPriceCard.style.display='none';
	formCard.style.display='none';
}

// Initialization of the cart
function InitializeCart(){
	if(panier===null){
 		EmptyCart();
	}
	else{
		panier.forEach(element =>{
			DisplayCart(element);
			DisplayNumberInCart();
		}) 
	}
}

// Get the number of items in the cart
function DisplayNumberInCart(){
  	let totalNumber=currentNumber;
    numberInCart.innerHTML = totalNumber;
}

// Create the appropriate element per row
function DisplayCart(element){
	let div=document.createElement('DIV');
	div.className='row item';

	// Get image
	let divImg=document.createElement('IMG');
	divImg.src=element.Image;
	divImg.className='col-md-3 cart-image';

	// Get name
	let div2=document.createElement('DIV');
	div2.className='col-md-2 cart-text';
	div2.innerHTML=element.Name;

	// Get price
	let div3=document.createElement('DIV');
	div3.className='col-md-2 cart-text';
	div3.innerHTML=element.Price + ' €';

	// Get quantity
	let div4=document.createElement('DIV');
	div4.className='col-md-2 cart-text';
	div4.innerHTML=element.Color;

	// Get quantity
	let div5=document.createElement('DIV');
	div5.className='col-md-2 cart-text';
	div5.innerHTML='Quantité : ' + element.Qty;
	currentNumber += element.Qty;

	// Get minus quantity button
	let div6=document.createElement('BUTTON');
	div6.className='btn btn-primary cart-btn';
	div6.innerHTML='-';
	
	// Substract 1 on click
	div6.addEventListener('click', (event)=>{
		event.preventDefault();
		element.Qty--;
		currentNumber--;
		DisplayNumberInCart();
		div5.innerHTML='Quantité : ' + element.Qty;
		currentPrice-=element.Price;
		totalPrice.innerHTML=currentPrice + ' €';
		
		for (let i=0; i<panier.length; i++){
			if(panier[i].Id==element.Id && panier[i].Color==element.Color){
				localStorage.removeItem('monPanier');
				if(element.Qty==0){
					div.style.display='none';
					panier.splice(i, 1);
				}
				localStorage.setItem('monPanier', JSON.stringify(panier));
				if(panier.length===0){
					localStorage.removeItem('monPanier');
					EmptyCart();
				}
			}
		}
	})

	// Append section
	div.appendChild(divImg);
	div.appendChild(div2);
	div.appendChild(div3);
	div.appendChild(div4);
	div.appendChild(div5);
	div.appendChild(div6);
	main.appendChild(div);

	// Get total price
	currentPrice+=element.Price*element.Qty;
	totalPrice.innerHTML=currentPrice + ' €';
	products.push(element.Id);
}

// Save order and price in local storage
function storage(order, price){
	localStorage.removeItem('monPanier');
	localStorage.setItem('orderID', order);
	localStorage.setItem('totalPrice', price);
}

// Send information
function postOrder(data){
	fetch("http://localhost:3000/api/teddies/order",
			{
				method:"POST",
				headers: {
			        'Content-Type': 'application/json;charset=UTF-8'
			    },
				body:JSON.stringify(data)
			})
	.then(data=>{
		data.json().then(element=>{
			storage(element.orderId, currentPrice)
			window.location.href = "confirmation.html";
		})	
	});
}

// Submit button to send the form and validate the order
b.addEventListener('submit', (event)=>{
	event.preventDefault();
	console.log(forname.value);
   	let contact= {
		firstName: forname.value,
		lastName: lastname.value,
		address: adress.value,
		city: city.value,
		email: mail.value
	};
	
	let data={contact, products};
	postOrder(data);	
})