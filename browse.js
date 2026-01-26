// Wait for DOM to load before running scripts
document.addEventListener("DOMContentLoaded", () => {
  // DOM element references
  const container = document.getElementById("itemsContainer");
  const searchInput = document.getElementById("searchInput");

  const totalItemsEl = document.getElementById("totalItems");
  const claimedItemsEl = document.getElementById("claimedItems");
  const newTodayEl = document.getElementById("newToday");

  let allItems = []; // Will store all fetched items

  // Fetch verified and unclaimed items from Firestore
  const fetchItems = async () => {
    try {
      const snapshot = await db.collection("items")
            .where("verified", "==", true)   // Only verified items
            .where("claimed", "==", false)    // Only claimed/found items
            .orderBy("timestamp", "desc")    // Newest first
            .orderBy("__name__", "desc")     // Secondary order to avoid Firestore errors
            .get();
      if (snapshot.empty) {
        container.innerHTML = "<p>No items found.</p>";
        return;
      }

      // Store items in an array for searching/filtering
      allItems = snapshot.docs.map(doc => doc.data());
      renderItems(allItems);
    } catch (error) {
      console.error(error);
      container.innerHTML = "<p>Failed to load items.</p>";
    }
    

  };
  
  // Render items in the DOM
  const renderItems = (items) => {
    container.innerHTML = "";

    if (items.length === 0) {
      container.innerHTML = "<p>No matching items.</p>";
      return;
    }

    items.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("item-card");

      // Add item photo, name, last seen location, description, and date
      card.innerHTML = `
        ${item.photoData ? `<img src="${item.photoData}" alt="${item.itemName || 'Lost item'}">` : ""}
        <h3>${item.itemName || ""}</h3>
        <p><strong>Last Seen:</strong> ${item.lastSeen || ""}</p>
        <p><strong>Description:</strong> ${item.itemDescription || ""}</p>
        <p><strong>Date Lost:</strong> ${item.dateLost || ""}</p>
      `;

      container.appendChild(card);
    });
  };

  // Update stats: total items, claimed items, new today
  const updateStats = async () => {
    const foundSnap = await db.collection("items")
      .where("verified", "==", true)
      .where("claimed", "==", false)
      .get();
    const claimedSnap = await db
      .collection("items")
      .where("claimed", "==", true)
      .get();

    const today = new Date();

    const allSnap = await db.collection('items').get();

    today.setHours(0, 0, 0, 0);

    let todayCount = 0;

    allSnap.forEach(doc => {
      const t = doc.data().timestamp?.toDate();
      if (t && t >= today) todayCount++;
    });

    totalItemsEl.textContent = foundSnap.size;
    claimedItemsEl.textContent = claimedSnap.size;
    newTodayEl.textContent = todayCount;
  };

  // Search functionality: filter items by name, description, or last seen
  searchInput.addEventListener("input", () => {
    const q = searchInput.value.toLowerCase();
    renderItems(
      allItems.filter(i =>
        (i.itemName || "").toLowerCase().includes(q) ||
        (i.itemDescription || "").toLowerCase().includes(q) ||
        (i.lastSeen || "").toLowerCase().includes(q)
      )
    );
  });

  // Initial fetch and stats update
  
  fetchItems();
  updateStats();
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
