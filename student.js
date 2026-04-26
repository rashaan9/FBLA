// This script handles student login, profile picture insertion, and keyboard navigation for the login form
const form = document.getElementById("studentLoginForm");
const errorMsg = document.getElementById("errorMsg");

// Function to add the profile picture to the navbar after login
function addProfileToNav() {
    const navbar = document.querySelector(".navbar");

    const wrapper = document.createElement("div");
    wrapper.classList.add("profile-wrapper");

    const img = document.createElement("img");
    img.src = "pfp.jpg";
    img.alt = "Student Profile";
    img.classList.add("studentProfile");

    wrapper.appendChild(img);

    // Inserts before the hamburger so order is: [nav-links] [profile] [hamburger]
    const menuToggle = document.querySelector(".menu-toggle");
    navbar.insertBefore(wrapper, menuToggle);
}

// Add submit event listener to the student login form
form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    // Check if username contains the school domain
    if (username.includes("cvsdstudents.org")) {
        alert("Login successful!");

        // Store login state and username in localStorage
        localStorage.setItem("loggedIn", "true");
        localStorage.setItem("username", username);

        window.location.href = "index.html";
    } else {
        errorMsg.textContent = "Invalid username or password!";
        errorMsg.style.color = "red";
    }
});

// Function to toggle the mobile menu visibility
function toggleMenu() {
    const nav = document.querySelector(".nav-links");
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}

// Add DOMContentLoaded event for keyboard navigation in the login form
document.addEventListener("DOMContentLoaded", () => {
    const username = document.getElementById("username");
    const password = document.getElementById("password");
    const form = document.getElementById("studentLoginForm");

    // Enter on username → focus password
    username.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            password.focus();
        }
    });

    // Enter on password → submit form
    password.addEventListener("keydown", e => {
        if (e.key === "Enter") {
            e.preventDefault();
            form.requestSubmit();
        }
    });

    // Escape → clear fields and focus username
    document.addEventListener("keydown", e => {
        if (e.key === "Escape") {
            username.value = "";
            password.value = "";
            username.focus();
        }
    });
});

