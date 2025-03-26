async function loadProducts() {
  try {
    const res = await fetch("http://localhost/food_api/backend/get_food.php");
    const products = await res.json();

    console.log("Fetched products:", products); // Debugging

    const menuDish = document.getElementById("menu-dish");
    menuDish.innerHTML = ""; // Clear previous products

    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.classList.add("col-lg-4", "col-sm-6", "dish-box-wp");
      productDiv.dataset.cat = product.category || "uncategorized";

      productDiv.innerHTML = `
          <div class="dish-box text-center">
            <div class="dist-img">
              <img src="${product.image}" alt="${product.name}" />
            </div>
            <div class="dish-rating">
              ${product.rating || 5}
              <i class="uil uil-star"></i>
            </div>
            <div class="dish-title">
              <h3 class="h3-title">${product.name}</h3>
              <p>${product.calories || "120"} calories</p>
            </div>
            <div class="dish-info">
              <ul>
                <li>
                  <p>Type</p>
                  <b>${product.category || "N/A"}</b>
                </li>
                <li>
                  <p>Persons</p>
                  <b>${product.persons || "2"}</b>
                </li>
              </ul>
            </div>
            <div class="dist-bottom-row">
              <ul>
                <li><b>Rs. ${product.price}</b></li>
                <li>
                 <button class="dish-add-btn" onclick="addToCart(${
                   product.id
                 }, '${product.name}', ${product.price}, '${product.image}')">
                    <i class="uil uil-plus"></i>
                  </button>
                </li>
              </ul>
            </div>
          </div>
        `;

      menuDish.appendChild(productDiv);
    });
  } catch (error) {
    console.error("Error loading products:", error);
  }
}

function addToCart(id, name, price, image) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  // Check if product already exists in the cart
  let existingProduct = cart.find((item) => item.id === id);

  if (existingProduct) {
    existingProduct.quantity += 1; // Increase quantity if already exists
  } else {
    cart.push({ id, name, price, image, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`Added "${name}" to cart!`);
}

loadProducts();
