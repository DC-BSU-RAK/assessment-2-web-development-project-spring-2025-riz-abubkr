document.addEventListener("DOMContentLoaded", function () {
  const cartCount = document.getElementById("cart-count");
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCartCount() {
    const total = cart.reduce((sum, item) => sum + item.quantity, 0);
    if (cartCount) cartCount.textContent = total;
  }

  function addToCart(name, price) {
    price = parseFloat(price);
    const existing = cart.find(item => item.name === name);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({ name, price, quantity: 1 });
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
  }

  // Handle Buy Now buttons
  const buyNowButtons = document.querySelectorAll(".buy-btn");
  buyNowButtons.forEach(button => {
    button.addEventListener("click", function (e) {
      e.preventDefault();

      const productCard = this.closest(".product-item");
      const name = productCard.querySelector("h2").textContent.trim();
      const priceText = productCard.querySelector(".price").textContent;
      const price = priceText.replace(/[^0-9.]/g, "");

      addToCart(name, price);

      // Redirect to checkout after adding item
      setTimeout(() => {
        window.location.href = "checkout.html";
      }, 100);
    });
  });

  updateCartCount();
});
