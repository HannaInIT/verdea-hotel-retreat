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

  toggle.addEventListener("click", (e) => {
    e.stopPropagation();
    dropdown.classList.toggle("open");
  });

  document.addEventListener("click", (e) => {
    if (!dropdown.contains(e.target) && e.target !== toggle) {
      dropdown.classList.remove("open");
    }
  });

  document.querySelectorAll(".catalog-counter-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const target = btn.dataset.target;
      const isPlus = btn.classList.contains("plus");
      const min = target === "adults" ? 1 : 0;

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
