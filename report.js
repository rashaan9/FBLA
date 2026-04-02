document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector(".lost-form");
  if (!form) return;

    
  form.addEventListener("submit", async (e) => {
    e.preventDefault(); // Prevent page reload

    // Get form values
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

      // Convert image to Base64 if uploaded
      if (itemPhoto) {
        const reader = new FileReader();
        photoBase64 = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(itemPhoto);
        });
      }

      // Save data to Firestore
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
    } catch (err) {
      console.error("Submit error:", err);
      alert("Submission failed. Check console.");
    }
  });
});
document.addEventListener("DOMContentLoaded", () => {
    const menuToggle = document.querySelector(".menu-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!menuToggle || !navLinks) return;

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("active");
        menuToggle.classList.toggle("active");
    });

    // Close menu when a link is clicked (optional but nice UX)
    navLinks.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("active");
            menuToggle.classList.remove("active");
        });
    });
});
