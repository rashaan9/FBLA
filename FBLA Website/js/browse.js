// This script handles the browse page functionality, fetching verified unclaimed items, displaying them with search, and updating statistics
document.addEventListener("DOMContentLoaded", () => {
  // Select DOM elements for container, search input, and stats display
  const container = document.getElementById("itemsContainer");
  const searchInput = document.getElementById("searchInput");

  const totalItemsEl = document.getElementById("totalItems");
  const claimedItemsEl = document.getElementById("claimedItems");
  const newTodayEl = document.getElementById("newToday");

  let allItems = [];

  // Function to fetch verified and unclaimed items from Firestore, ordered by timestamp
  const fetchItems = async () => {
    try {
      const snapshot = await db.collection("items")
        .where("verified", "==", true)
        .where("claimed", "==", false)
        .get();

      console.log("browse snapshot size:", snapshot.size);
      snapshot.docs.forEach(doc => console.log(doc.id, doc.data()));

      if (snapshot.empty) {
        container.innerHTML = "<p>No items found.</p>";
        return;
      }

      allItems = snapshot.docs.map(doc => doc.data());
      renderItems(allItems);
    } catch (error) {
      console.error(error);
      container.innerHTML = "<p>Failed to load items.</p>";
    }
  };

  // Function to render the list of items in the container
  const renderItems = (items) => {
    container.innerHTML = "";

    if (items.length === 0) {
      container.innerHTML = "<p>No matching items.</p>";
      return;
    }

    items.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("item-card");

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

  // Function to update the statistics displayed on the page
  const updateStats = async () => {
    const foundSnap = await db.collection("items")
      .where("verified", "==", true)
      .where("claimed", "==", false)
      .get();

    const claimedSnap = await db.collection("items")
      .where("claimed", "==", true)
      .get();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const allSnap = await db.collection("items").get();

    let todayCount = 0;
    allSnap.forEach(doc => {
      const t = doc.data().timestamp?.toDate();
      if (t && t >= today) todayCount++;
    });

    totalItemsEl.textContent = foundSnap.size;
    claimedItemsEl.textContent = claimedSnap.size;
    newTodayEl.textContent = todayCount;
  };

  // Add event listener for search input to filter items
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

  // Profile dropdown
  const loggedIn = localStorage.getItem("loggedIn");
  if (loggedIn === "true") {
    const navbar = document.querySelector(".navbar");
    const wrapper = document.createElement("div");
    wrapper.classList.add("profile-wrapper");
    wrapper.style.position = "relative";

    const img = document.createElement("img");
    img.src = "/images/pfp.jpg";
    img.alt = "Student Profile";
    img.classList.add("studentProfile");

    const dropdown = document.createElement("div");
    dropdown.classList.add("profile-dropdown");
    const username = localStorage.getItem("username") || "Student";
    dropdown.innerHTML = `
      <p class="profile-name">${username}</p>
      <button id="logoutBtn">Logout</button>
    `;

    wrapper.appendChild(img);
    wrapper.appendChild(dropdown);

    const menuToggle = document.querySelector(".menu-toggle");
    navbar.insertBefore(wrapper, menuToggle);

    let hideTimeout;
    wrapper.addEventListener("mouseenter", () => {
      clearTimeout(hideTimeout);
      dropdown.style.display = "flex";
    });
    wrapper.addEventListener("mouseleave", () => {
      hideTimeout = setTimeout(() => {
        dropdown.style.display = "none";
      }, 200);
    });

    dropdown.querySelector("#logoutBtn").addEventListener("click", () => {
      localStorage.removeItem("loggedIn");
      localStorage.removeItem("username");
      window.location.href = "/html/student.html";
    });
  }
  // Initial fetch and stats update on page load
  fetchItems();
  updateStats();
});