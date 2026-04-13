// This script handles the multi-step form for reporting lost items, Firebase submission, and profile dropdown for logged-in users
document.addEventListener("DOMContentLoaded", () => {

  // =========================
  // MULTI-STEP FORM
  // =========================
  // Select the form and step elements
  const form = document.querySelector(".lost-form");
  const steps = document.querySelectorAll(".form-step");
  let currentStep = 0;

  // Function to show the current step and hide others
  function showStep(index) {
    steps.forEach((step, i) => {
      step.classList.remove("active", "left");
      if (i === index) {
        step.classList.add("active");
      } else if (i < index) {
        step.classList.add("left");
      }
    });

    // Focus the first input in the current step after animation
    setTimeout(() => {
      const input = steps[index].querySelector("input, textarea");
      if (input) input.focus();
    }, 200);
  }

  // Add click event listeners to next buttons to advance to the next step
  document.querySelectorAll(".next-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const inputs = steps[currentStep].querySelectorAll("input, textarea");
      for (let input of inputs) {
        if (!input.checkValidity()) {
          input.reportValidity();
          return;
        }
      }
      if (currentStep < steps.length - 1) {
        currentStep++;
        showStep(currentStep);
      }
    });
  });

  // Add click event listeners to previous buttons to go back to the previous step
  document.querySelectorAll(".prev-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      if (currentStep > 0) {
        currentStep--;
        showStep(currentStep);
      }
    });
  });

  // If form exists, add keydown listener for Enter key to advance steps
  if (form) {
    form.addEventListener("keydown", (e) => {
      if (e.key === "Enter") {
        const isLastStep = currentStep === steps.length - 1;
        if (!isLastStep) {
          e.preventDefault();
          document.querySelectorAll(".next-btn")[currentStep].click();
        }
      }
    });

    // =========================
    // FIREBASE SUBMIT
    // =========================
    // Add submit event listener to handle form submission
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Collect form data
      const name = form.elements["name"].value;
      const email = form.elements["email"].value;
      const phone = form.elements["phone"].value;
      const itemName = form.elements["itemName"].value;
      const itemDescription = form.elements["itemDescription"].value;
      const lastSeen = form.elements["lastSeen"].value;
      const dateLost = form.elements["dateLost"].value;
      const itemPhoto = form.elements["itemPhoto"].files[0];

      try {
        let photoBase64 = "";
        // If photo is provided, convert to base64
        if (itemPhoto) {
          const reader = new FileReader();
          photoBase64 = await new Promise((resolve) => {
            reader.onload = () => resolve(reader.result);
            reader.readAsDataURL(itemPhoto);
          });
        }

        // Add item to Firestore
        await db.collection("items").add({
          name, email, phone, itemName, itemDescription,
          lastSeen, dateLost, photoData: photoBase64,
          verified: false, claimed: false,
          timestamp: firebase.firestore.FieldValue.serverTimestamp()
        });

        alert("Report submitted successfully!");
        form.reset();
        currentStep = 0;
        showStep(0);

      } catch (err) {
        console.error("Submit error:", err);
        alert("Submission failed.");
      }
    });

    // Initialize the form to show the first step
    showStep(0);
  }

});

// =========================
// PROFILE DROPDOWN (runs after DOM ready)
// =========================
// Wait for DOM to load before adding profile dropdown
window.addEventListener("DOMContentLoaded", function () {
  // Check if user is logged in
  const loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn !== "true") return;

  // Select the navbar
  const navbar = document.querySelector(".navbar");
  // Create wrapper for profile elements
  const wrapper = document.createElement("div");
  wrapper.classList.add("profile-wrapper");
  wrapper.style.position = "relative";

  // Create profile image
  const img = document.createElement("img");
  img.src = "/images/pfp.jpg";
  img.alt = "Student Profile";
  img.classList.add("studentProfile");

  // Create dropdown menu
  const dropdown = document.createElement("div");
  dropdown.classList.add("profile-dropdown");
  const username = localStorage.getItem("username") || "Student";
  dropdown.innerHTML = `
    <p class="profile-name">${username}</p>
    <button id="logoutBtn">Logout</button>
  `;

  // Append image and dropdown to wrapper
  wrapper.appendChild(img);
  wrapper.appendChild(dropdown);

  // Inserts before the hamburger: [nav-links] [pfp] [☰]
  const menuToggle = document.querySelector(".menu-toggle");
  navbar.insertBefore(wrapper, menuToggle);

  // FIX: use `wrapper` instead of the undefined `li`
  let hideTimeout;
  // Show dropdown on mouse enter
  wrapper.addEventListener("mouseenter", () => {
    clearTimeout(hideTimeout);
    dropdown.style.display = "flex";
  });
  // Hide dropdown on mouse leave with delay
  wrapper.addEventListener("mouseleave", () => {
    hideTimeout = setTimeout(() => {
      dropdown.style.display = "none";
    }, 200);
  });

  // Add logout functionality
  dropdown.querySelector("#logoutBtn").addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("username");
    window.location.href = "/html/student.html";
  });
});