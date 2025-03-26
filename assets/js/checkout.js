document.addEventListener("DOMContentLoaded", function () {
  const orderItemsContainer = document.getElementById("order-items");
  const orderTotal = document.getElementById("order-total");
  const checkoutForm = document.getElementById("checkout-form");

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function displayOrderSummary() {
    orderItemsContainer.innerHTML = "";
    let totalAmount = 0;

    cart.forEach((item) => {
      const itemTotal = item.price * item.quantity;
      totalAmount += itemTotal;

      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${item.name}</td>
                <td>₹${item.price}</td>
                <td>${item.quantity}</td>
                <td>₹${itemTotal}</td>
            `;
      orderItemsContainer.appendChild(row);
    });

    orderTotal.innerText = totalAmount.toFixed(2);
  }

  checkoutForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value;
    const address = document.getElementById("address").value;
    const phone = document.getElementById("phone").value;
    const payment = document.getElementById("payment").value;

    if (!cart.length) {
      alert("Your cart is empty!");
      return;
    }

    const orderData = {
      name,
      address,
      phone,
      payment,
      cart,
      total: orderTotal.innerText,
      orderDate: new Date().toISOString(),
    };

    console.log("Order Placed:", orderData);

    alert("Order placed successfully!");
    localStorage.removeItem("cart");
    window.location.href = "../../pages/order-success.html"; // Redirect to success page
  });

  displayOrderSummary();
});
