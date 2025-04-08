document
  .getElementById("add-product-form")
  .addEventListener("submit", async (e) => {
    e.preventDefault();

    let isValid = true;

    const name = document.getElementById("name").value.trim();
    const price = document.getElementById("price").value.trim();
    const category = document.getElementById("category").value;
    const image = document.getElementById("image").files[0];

    // Validation Checks
    if (name === "") {
      document.getElementById("name-error").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("name-error").style.display = "none";
    }

    if (price === "" || isNaN(price) || price <= 0) {
      document.getElementById("price-error").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("price-error").style.display = "none";
    }

    if (!category) {
      document.getElementById("category-error").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("category-error").style.display = "none";
    }

    if (!image) {
      document.getElementById("image-error").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("image-error").style.display = "none";
    }

    if (!isValid) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price);
    formData.append("category", category);
    formData.append("image", image);

    try {
      const res = await fetch(
        "http://localhost/food_api/backend/add_product.php",
        {
          method: "POST",
          body: formData, // Do NOT set "Content-Type", browser handles it automatically
        }
      );

      const text = await res.text(); // Read response as text
      // console.log("Raw response from server:", text);

      // Try to parse JSON safely
      let data;
      try {
        data = JSON.parse(text);
      } catch (jsonError) {
        console.error("JSON parsing error:", jsonError);
        window.location.href = "../../pages/failed_to_addproduct_page.html";
        return;
      }

      if (!data.success) {
        window.location.href = "../../pages/failed_to_addproduct_page.html";
        return;
      }

      document.getElementById("add-product-form").reset();
      document.getElementById("preview-img").style.display = "none";
      window.location.href = "../../pages/product_add_success_page.html";
    } catch (error) {
      console.error("Error:", error);
      alert(error.message);
    }
  });

// Image Preview Feature
document.getElementById("image").addEventListener("change", function () {
  const file = this.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const previewImg = document.getElementById("preview-img");
      previewImg.src = e.target.result;
      previewImg.style.display = "block";
    };
    reader.readAsDataURL(file);
  }
});
