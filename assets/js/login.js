document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("login-form");

  if (!loginForm) {
    console.error("Login form not found!");
    return;
  }

  loginForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = document.getElementById("login-email").value.trim();
    const password = document.getElementById("login-password").value.trim();
    const emailError = document.getElementById("login-email-error");
    const passwordError = document.getElementById("login-password-error");

    let isValid = true;

    if (email === "") {
      emailError.innerText = "Please enter a valid email.";
      emailError.style.display = "block";
      isValid = false;
    } else {
      emailError.style.display = "none";
    }

    if (password === "") {
      passwordError.innerText = "Password cannot be empty.";
      passwordError.style.display = "block";
      isValid = false;
    } else if (password.length < 6) {
      passwordError.innerText = "Password must be at least 6 characters.";
      passwordError.style.display = "block";
      isValid = false;
    } else {
      passwordError.style.display = "none";
    }

    if (isValid) {
      try {
        const res = await fetch("http://localhost/food_api/backend/login.php", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
          credentials: "include", // 🔹 Important for session handling
        });

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Login failed");
        }

        // ✅ Store user details in localStorage
        localStorage.setItem("user", JSON.stringify(data.user));

        alert("Login successful!");
        window.location.href = "doneLogin.html"; // Redirect
      } catch (error) {
        console.error("Login Error:", error);
        alert(error.message);
      }
    }
  });
});
