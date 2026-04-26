// This script handles the mobile navigation menu toggle functionality
document.addEventListener("DOMContentLoaded", () => {
    // Select the hamburger menu button and the navigation links container
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    // Check if both elements exist before adding event listeners
    if (menuToggle && navLinks) {
        // Add click event listener to toggle the menu visibility
        menuToggle.addEventListener("click", () => {
            navLinks.classList.toggle("active");
            menuToggle.classList.toggle("active");
        });

        // For each navigation link, add click event to close the menu when a link is clicked
        navLinks.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("active");
                menuToggle.classList.remove("active");
            });
        });

        // Add keyboard accessibility for Enter and Space keys to toggle the menu
        menuToggle.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                navLinks.classList.toggle("active");
                menuToggle.classList.toggle("active");
            }
        });
    }
});

