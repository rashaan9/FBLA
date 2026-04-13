// This script handles the claim item functionality, allowing users to claim items by matching name and description
document.addEventListener("DOMContentLoaded", () => {
  // Select the claim form
  const claim = document.querySelector(".claim-form");
  if (!claim) return;

  // Add submit event listener to the claim form
  claim.addEventListener("submit", async function (e) {
    e.preventDefault();

    // Get trimmed values from the form inputs
    const itemName = claim.itemName.value.trim();
    const itemDescription = claim.itemDescription.value.trim();

    try {
      // Query Firestore for items matching the name and description
      const querySnapshot = await db
        .collection("items")
        .where("itemName", "==", itemName)
        .where("itemDescription", "==", itemDescription)
        .get();

      if (querySnapshot.empty) {
        alert("No match found.");
        return;
      }

      // Update all matching documents to mark as claimed
      for (const doc of querySnapshot.docs) {
        await db.collection("items").doc(doc.id).update({
          claimed: true
        });
      }

      alert("Match found! Item has been marked as claimed.");
      claim.reset();
    } catch (error) {
      console.error("Error checking item:", error);
      alert("Error checking item.");
    }
  });
});