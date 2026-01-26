const container = document.getElementById("itemsContainer");

// Fetch all items from Firestore
const fetchItems = async () => {
    const snapshot = await db.collection("items").get();
    container.innerHTML = ""; // Clear container before rendering

    // Check if there are any items
    if (snapshot.empty) {
        const noItems = document.createElement("p");
        noItems.textContent = "No items found.";
        container.appendChild(noItems);
        return; // Exit the function
    }

    // Loop through each document and create an item card
    snapshot.forEach(doc => {
        const data = doc.data();
        const id = doc.id;

        // Create card container
        const card = document.createElement("div");
        card.classList.add("item-card");

        // Populate card with item details
        card.innerHTML = `
            <h3>${data.itemName}</h3>
            <p><strong>Reported by:</strong> ${data.name} (${data.email})</p>
            <p><strong>Phone:</strong> ${data.phone}</p>
            <p><strong>Last Seen:</strong> ${data.lastSeen}</p>
            <p><strong>Description:</strong> ${data.itemDescription}</p>
            <p><strong>Date Lost:</strong> ${data.dateLost}</p>
            ${data.photoData ? `<img src="${data.photoData}" alt="Photo of ${data.itemName}">` : ""}
            <button class="btn-verify">Verify</button>
            <button class="btn-delete">Delete</button>
            <button class="btn-verify btn-claimed">Mark Claimed</button>
        `;

        // Verify button functionality
        card.querySelector(".btn-verify").addEventListener("click", async () => {
            await db.collection("items").doc(id).update({ verified: true });
            alert("Item verified!");
            fetchItems(); // Refresh list after update
        });

        // Claimed button functionality
        card.querySelector(".btn-claimed").addEventListener("click", async () => {
            await db.collection("items").doc(id).update({ claimed: true });
            alert("Item marked as claimed!");
            fetchItems(); // Refresh list after update
        });

        // Delete button functionality
        card.querySelector(".btn-delete").addEventListener("click", async () => {
            const confirmDelete = confirm("Are you sure you want to permanently delete this item?");
            if (!confirmDelete) return;

            try {
                await db.collection("items").doc(id).delete();
                alert("Item deleted successfully.");
                fetchItems(); // Refresh list after deletion
            } catch (err) {
                console.error("Delete failed:", err);
                alert("Failed to delete item.");
            }
        });

        // Add card to container
        container.appendChild(card);
    });
};

// Initial fetch on page load
fetchItems();
function toggleMenu() {
    const nav = document.querySelector(".nav-links");
    nav.style.display = nav.style.display === "flex" ? "none" : "flex";
}
