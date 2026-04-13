// This script handles the admin login functionality
// Get references to the login form and error message paragraph
const form = document.getElementById("adminLoginForm");
const errorMsg = document.getElementById("errorMsg");

// Listen for form submission
form.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent default form submission (page reload)

    // Get values from input fields
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Check credentials
    if (username === "admin" && password === "cvadmin") {
        // Correct credentials: redirect to admin dashboard
        alert("Login successful!");
        window.location.href = "/html/admin_dashboard.html";
    } else {
        // Wrong credentials: show error message
        errorMsg.textContent = "Invalid username or password!";
        errorMsg.style.color = "red";
    }
});

// Function to toggle the mobile menu visibility
function toggleMenu() {
    const nav = document.querySelector(".nav-links");
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}
