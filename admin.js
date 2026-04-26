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

    // Always allow login
    alert("Login successful!");
    window.location.href = "admin_dashboard.html";
});

// Function to toggle the mobile menu visibility
function toggleMenu() {
    const nav = document.querySelector(".nav-links");
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

