// Container where recently found items will be displayed
const container = document.querySelector(".item-grid");

// Fetch items from Firestore that are verified and claimed
const fetchItems = async () => {
    try {
        const snapshot = await db.collection("items")
            .where("verified", "==", true)   // Only verified items
            .where("claimed", "==", true)    // Only claimed/found items
            .orderBy("timestamp", "desc")    // Newest first
            .orderBy("__name__", "desc")     // Secondary order to avoid Firestore errors
            .get();

        // Loop through each document and create an item card
        snapshot.forEach(doc => {
            const data = doc.data();

            const card = document.createElement("div");
            card.classList.add("item-card");

            // Add image, name, and location/description
            card.innerHTML = `
                ${data.photoData ? `<img src="${data.photoData}" alt="Item Photo">` : ""}
                <h3>${data.itemName}</h3>
                <p>Found in ${data.lastSeen || data.itemDescription}</p>
            `;

            container.appendChild(card); // Add to the page AFTER existing cards
        });

    } catch (err) {
        console.error("Error loading items:", err);
    }
};

// Run the function when page loads
fetchItems();
const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
    menuToggle.classList.toggle("active");
});
