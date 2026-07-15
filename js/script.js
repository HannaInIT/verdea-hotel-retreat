const year = document.getElementById("year");
if (year) {
  year.textContent = new Date().getFullYear();
}

/* ============================================
   DATE PICKER
   ============================================ */

function formatDate(date) {
  const weekday = date.toLocaleDateString("en-GB", { weekday: "short" });
  const day = date.getDate();
  const month = date.toLocaleDateString("en-GB", { month: "short" });
  return `${weekday}, ${day} ${month}`;
}

function formatDateRange(startDate, endDate) {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

if (typeof flatpickr !== "undefined") {
  flatpickr("#dateRange", {
    mode: "range",
    dateFormat: "Y-m-d",
    minDate: "today",
    onChange: function (selectedDates, dateStr, instance) {
      if (selectedDates.length === 2) {
        instance.input.value = formatDateRange(
          selectedDates[0],
          selectedDates[1],
        );
      }
    },
  });
}

/* ============================================
   GUESTS
   ============================================ */

const toggle = document.getElementById("guestsToggle");
const dropdown = document.getElementById("guestsDropdown");
const summary = document.getElementById("guestsSummary");

if (toggle && dropdown && summary) {
  let counts = { rooms: 1, adults: 2, children: 0 };

  function closeDropdown() {
    dropdown.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  }

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    const isOpen = dropdown.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && e.target !== toggle) {
      closeDropdown();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeDropdown();
  });

  document.querySelectorAll(".catalog-counter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      const isPlus = btn.classList.contains("plus");
      const min = target === "children" ? 0 : 1;

      if (isPlus) counts[target]++;
      else if (counts[target] > min) counts[target]--;

      document.getElementById(`${target}Value`).textContent = counts[target];
      updateSummary();
    });
  });

  function updateSummary() {
    summary.textContent = `${counts.adults} adults, ${counts.children} children, ${counts.rooms} room${counts.rooms > 1 ? "s" : ""}`;
  }
}

/* ============================================
   RESPONSIVENESS
   ============================================ */

const mobileMenu = document.getElementById("nav-links");
const menuToggle = document.getElementById("menuToggle");

// toggle mobile menu
function toggleMenu() {
  const isOpen = mobileMenu.classList.toggle("open");
  menuToggle.classList.toggle("active", isOpen);
  document.body.classList.toggle("menu-open", isOpen);
  menuToggle.setAttribute("aria-expanded", String(isOpen));
}

// header mobile menu force close
function forceCloseMenu() {
  mobileMenu.classList.remove("open");
  menuToggle.classList.remove("active");
  document.body.classList.remove("menu-open");
  menuToggle.setAttribute("aria-expanded", "false");
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", toggleMenu);

  // close the menu after selecting a page
  mobileMenu.querySelectorAll("label").forEach((label) => {
    label.addEventListener("click", forceCloseMenu);
  });

  // close the menu with the Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") forceCloseMenu();
  });
}

// catalog filters & sort toggle
const filtersTrigger = document.getElementById("filtersTrigger");
const filtersContainer = document.querySelector(".filters-container");
const filtersClose = document.getElementById("filtersClose");

if (filtersTrigger && filtersContainer && filtersClose) {
  filtersTrigger.addEventListener("click", () => {
    filtersContainer.classList.add("open");
  });

  filtersClose.addEventListener("click", () => {
    filtersContainer.classList.remove("open");
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") filtersContainer.classList.remove("open");
  });
}

// footer accordion
document.querySelectorAll(".footer-links > h3").forEach((heading) => {
  heading.addEventListener("click", () => {
    heading.parentElement.classList.toggle("active");
  });
});
