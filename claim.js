// Select the claim form
const claim = document.querySelector(".claim-form");

if (claim) {
    claim.addEventListener("submit", async function (e) {
        e.preventDefault(); // Prevent page reload on submit

        // Get form values
        const itemName = claim.itemName.value.trim();
        const itemDescription = claim.itemDescription.value.trim();

        try {
            // Search Firestore for a matching item
            const querySnapshot = await db
                .collection("items")
                .where("itemName", "==", itemName)
                .where("itemDescription", "==", itemDescription)
                .get();

            if (querySnapshot.empty) {
                // No match found
                alert("No match found.");
                return;
            }

            //  Match found, mark found items as claimed
            for (const doc of querySnapshot.docs) {
                await db.collection("items").doc(doc.id).update({
                    claimed: true
                });
            }

            alert("Match found! Item has been marked as claimed.");
            claim.reset(); // Reset the form
        } catch (error) {
            console.error("Error checking item:", error);
            alert("Error checking item.");
        }
    });
}
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
