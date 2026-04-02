const form = document.getElementById("studentLoginForm");
const errorMsg = document.getElementById("errorMsg");

// Creates and adds the profile image link to the nav
function addProfileToNav() {
    const nav = document.querySelector(".nav-links");

    const li = document.createElement("li");
    const a = document.createElement("a");
    const img = document.createElement("img");

    // Placeholder image (replace src with real profile pic later)
    img.src = "https://placehold.co/40x40";
    img.alt = "Student Profile";
    img.style.borderRadius = "50%";
    img.style.width = "40px";
    img.style.height = "20px";
    img.style.cursor = "pointer";

    a.href = "student-profile.html"; // change to whatever your profile page is
    a.appendChild(img);
    li.appendChild(a);

    nav.appendChild(li);
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();

    if (username.includes("cvsdstudents.org")) {
        alert("Login successful!");

        // Store login state so index.html knows the user is logged in
        localStorage.setItem("loggedIn", "true");

        window.location.href = "index.html";
    } else {
        errorMsg.textContent = "Invalid username or password!";
        errorMsg.style.color = "red";
    }
});

function toggleMenu() {
    const nav = document.querySelector(".nav-links");
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}