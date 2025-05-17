// Load cart 
let cart = JSON.parse(localStorage.getItem('cart')) || [];
updateCartCount();

// Add to cart on Buy Now
document.querySelectorAll('.buy-btn').forEach(button => {
  button.addEventListener('click', function (e) {
    e.preventDefault();
    const name = this.dataset.name;
    const price = parseFloat(this.dataset.price);

    const existingItem = cart.find(item => item.name === name);
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    alert(`${name} added to your cart!`);
  });
});

// Show cart contents
document.getElementById('cart-link').addEventListener('click', function (e) {
  e.preventDefault();
  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  let cartDetails = "Items in your cart:\n\n";
  cart.forEach(item => {
    cartDetails += `${item.name} - $${item.price} x ${item.quantity}\n`;
  });

  alert(cartDetails);
});

// Update cart icon count
function updateCartCount() {
  document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

