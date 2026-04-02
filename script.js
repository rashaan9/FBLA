document.addEventListener("DOMContentLoaded", () => {

// =========================
// MULTI-STEP FORM
// =========================
const form = document.querySelector(".lost-form");
const steps = document.querySelectorAll(".form-step");

let currentStep = 0;

function showStep(index) {
steps.forEach((step, i) => {
step.classList.remove("active", "left");


  if (i === index) {
    step.classList.add("active");
  } else if (i < index) {
    step.classList.add("left");
  }
});

// Auto-focus input (Apple feel)
setTimeout(() => {
  const input = steps[index].querySelector("input, textarea");
  if (input) input.focus();
}, 200);


}

// NEXT BUTTON
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

// BACK BUTTON
document.querySelectorAll(".prev-btn").forEach(btn => {
btn.addEventListener("click", () => {
if (currentStep > 0) {
currentStep--;
showStep(currentStep);
}
});
});

// =========================
// ENTER KEY = NEXT (🔥 UX)
// =========================
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
form.addEventListener("submit", async (e) => {
e.preventDefault();


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

  if (itemPhoto) {
    const reader = new FileReader();
    photoBase64 = await new Promise((resolve) => {
      reader.onload = () => resolve(reader.result);
      reader.readAsDataURL(itemPhoto);
    });
  }

  await db.collection("items").add({
    name,
    email,
    phone,
    itemName,
    itemDescription,
    lastSeen,
    dateLost,
    photoData: photoBase64,
    verified: false,
    claimed: false,
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

// =========================
// MOBILE NAV
// =========================
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuToggle && navLinks) {
menuToggle.addEventListener("click", () => {
navLinks.classList.toggle("active");
menuToggle.classList.toggle("active");
});


navLinks.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("active");
    menuToggle.classList.remove("active");
  });
});


}

// =========================
// INIT
// =========================
showStep(0);

});

// At the bottom of index.html's <script> tag (or in index.js)
window.addEventListener("DOMContentLoaded", function () {
    const loggedIn = localStorage.getItem("loggedIn");

    if (loggedIn === "true") {
        const nav = document.querySelector(".nav-links");

        const li = document.createElement("li");
        const a = document.createElement("a");
        const img = document.createElement("img");

        img.src = "pfp.jpg";
        img.alt = "Student Profile";
        img.style.borderRadius = "50%";
        img.style.width = "40px";
        img.style.height = "40px";
        img.style.verticalAlign = "middle";
        img.style.marginBottom = "5px";
        img.style.cursor = "pointer";

        a.href = "student-profile.html";
        a.appendChild(img);
        li.appendChild(a);

        nav.appendChild(li);
    }
});