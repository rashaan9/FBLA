// This script enhances keyboard accessibility for interactive elements on the page
document.addEventListener("DOMContentLoaded", () => {
    // Make item cards keyboard accessible by simulating click on Enter or Space
    document.querySelectorAll(".item-card").forEach(card => {
        card.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Make elements with role="button" keyboard accessible, except menu-toggle which is handled separately
    document.querySelectorAll('[role="button"]').forEach(el => {
        if (el.classList.contains("menu-toggle")) return;
        el.addEventListener("keydown", e => {
            if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                el.click();
            }
        });
    });
});

