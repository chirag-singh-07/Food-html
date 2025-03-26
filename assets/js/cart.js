document.addEventListener("DOMContentLoaded", function () {
  const cartItemsContainer = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");

  // Fetch cart items from localStorage (replace with backend API if needed)
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function updateCart() {
    cartItemsContainer.innerHTML = ""; // Clear table before updating
    let totalAmount = 0;

    if (cart.length === 0) {
      cartItemsContainer.innerHTML =
        '<tr><td colspan="6" class="text-center">Your cart is empty.</td></tr>';
    }

    cart.forEach((item, index) => {
      const itemTotal = item.price * item.quantity;
      totalAmount += itemTotal;

      const row = document.createElement("tr");
      row.innerHTML = `
          <td><img src="${item.image}" alt="${item.name}" width="50"></td>
          <td>${item.name}</td>
          <td>₹${item.price}</td>
          <td>
            <button class="btn btn-sm btn-primary" onclick="updateQuantity(${index}, -1)">-</button>
            ${item.quantity}
            <button class="btn btn-sm btn-primary" onclick="updateQuantity(${index}, 1)">+</button>
          </td>
          <td>₹${itemTotal}</td>
          <td><button class="btn btn-sm btn-danger" onclick="removeItem(${index})">Remove</button></td>
        `;
      cartItemsContainer.appendChild(row);
    });

    cartTotal.innerText = totalAmount.toFixed(2);
    localStorage.setItem("cart", JSON.stringify(cart)); // Save updated cart
  }

  window.updateQuantity = function (index, change) {
    if (cart[index].quantity + change > 0) {
      cart[index].quantity += change;
    } else {
      cart.splice(index, 1);
    }
    updateCart();
  };

  window.removeItem = function (index) {
    cart.splice(index, 1);
    updateCart();
  };

  document
    .getElementById("checkout-btn")
    .addEventListener("click", function () {
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }
      alert("Proceeding to checkout...");
      // Replace with backend API call to process checkout (e.g., send order details to server)
      window.location.href = "../../pages/checkout.html";
    });

  updateCart(); // Initial render
});
