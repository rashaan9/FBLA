// This script handles the report lost item form submission, collecting data and uploading to Firestore
document.addEventListener("DOMContentLoaded", () => {
  // Select the lost item form
  const form = document.querySelector(".lost-form");
  if (!form) return;

  // Add submit event listener to the form
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

      // If a photo is uploaded, convert it to base64
      if (itemPhoto) {
        const reader = new FileReader();
        photoBase64 = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(itemPhoto);
        });
      }

      // Add the item data to Firestore
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

