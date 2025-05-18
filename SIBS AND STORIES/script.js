// ========== GLOBAL CART HANDLING ==========
let cart = JSON.parse(sessionStorage.getItem('cart')) || [];

// Update cart count in nav
function updateCartCount() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const countSpan = document.getElementById('cart-count');
  if (countSpan) countSpan.textContent = count;
}

// Add item to cart
function addToCart(name, price) {
  const existing = cart.find(item => item.name === name);
  if (existing) {
    existing.quantity += 1;
  } else {
    cart.push({ name, price, quantity: 1 });
  }
  sessionStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Show modal cart on index.html
function showCartModal() {
  const modal = document.getElementById('cart-modal');
  const itemsContainer = document.getElementById('cart-items');
  const totalContainer = document.getElementById('cart-total');

  if (!modal || !itemsContainer || !totalContainer) return;

  itemsContainer.innerHTML = '';
  let total = 0;

  cart.forEach(item => {
    const itemDiv = document.createElement('div');
    itemDiv.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
    itemsContainer.appendChild(itemDiv);
    total += item.price * item.quantity;
  });

  totalContainer.textContent = total.toFixed(2);
  modal.style.display = 'block';
}

// ========== PAGE-SPECIFIC LOGIC ==========
document.addEventListener('DOMContentLoaded', () => {
  updateCartCount();

  // Only on index.html: handle Buy buttons and cart modal
  const buyButtons = document.querySelectorAll('.buy-btn');
  buyButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.product-item');
      const name = item.dataset.name;
      const price = parseFloat(item.dataset.price);
      addToCart(name, price);
      alert(`${name} added to cart!`);
    });
  });

  const viewCartBtn = document.getElementById('view-cart-btn');
  if (viewCartBtn) {
    viewCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      showCartModal();
    });
  }

  const closeBtn = document.getElementById('close-cart');
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      document.getElementById('cart-modal').style.display = 'none';
    });
  }

  // Only on checkout.html: display cart items
  const checkoutContainer = document.getElementById('checkout-items');
  const checkoutTotal = document.getElementById('checkout-total');
  if (checkoutContainer && checkoutTotal) {
    checkoutContainer.innerHTML = '';
    let total = 0;
    cart.forEach(item => {
      const div = document.createElement('div');
      div.textContent = `${item.name} x${item.quantity} - $${(item.price * item.quantity).toFixed(2)}`;
      checkoutContainer.appendChild(div);
      total += item.price * item.quantity;
    });
    checkoutTotal.textContent = total.toFixed(2);
  }
});






