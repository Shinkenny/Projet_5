// Set initial variables
let totalprice=localStorage.getItem('totalPrice');
let orderId=localStorage.getItem('orderID');

// Confirmation message
document.getElementById('content').innerHTML="Votre commande n° "+orderId+ " d'un montant de "+totalprice+"€ a bien été enregistrée."

// Remove data from local storage
localStorage.removeItem('totalPrice');
localStorage.removeItem('orderID');