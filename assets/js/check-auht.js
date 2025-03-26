document.addEventListener("DOMContentLoaded", function () {
  fetch("http://localhost/food_api/backend/check_login.php") // Replace with your actual PHP file path
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        // User is logged in
        document.getElementById("user-info").innerHTML = `
                    <p>Welcome, ${data.user.name} (${data.user.email})</p>
                    <button onclick="logout()">Logout</button>
                `;
      } else {
        // User is not logged in
        document.getElementById("user-info").innerHTML = `
                    <p>You are not logged in.</p>
                    <a href="login.html">Login</a> | <a href="register.html">Register</a>
                `;
      }
    })
    .catch((error) => console.error("Error:", error));
});

// Logout function
// function logout() {
//   fetch("logout.php", { method: "POST" }) // Replace with your logout PHP script
//     .then((response) => response.json())
//     .then(() => {
//       window.location.reload(); // Refresh the page after logout
//     })
//     .catch((error) => console.error("Logout error:", error));
// }
