// =========================================================
// HOSTLY — FAQ INTERACTIVE
// Moteur de recherche en direct et accordéons
// =========================================================

function initFAQ() {
  const faqItems = document.querySelectorAll(".faq-item");
  const searchInput = document.getElementById("faqSearch");
  const filterBtns = document.querySelectorAll(".faq-cat-btn");
  const emptyNotice = document.getElementById("faqEmptyState");

  if (faqItems.length === 0) return;

  // 1. Accordion Toggle
  faqItems.forEach(item => {
    const btn = item.querySelector(".faq-question-btn");
    if (!btn) return;

    btn.addEventListener("click", () => {
      const isOpen = item.classList.contains("open");
      
      // Fermer les autres (optionnel, pour garder une vue claire)
      faqItems.forEach(other => {
        if (other !== item) other.classList.remove("open");
      });

      item.classList.toggle("open", !isOpen);
    });
  });

  // 2. Filtrage par Catégorie & Recherche
  let currentCategory = "all";
  let searchQuery = "";

  function applyFilters() {
    let visibleCount = 0;

    faqItems.forEach(item => {
      const cat = item.getAttribute("data-category") || "";
      const text = (item.textContent || "").toLowerCase();

      const matchesCat = (currentCategory === "all" || cat === currentCategory);
      const matchesSearch = (!searchQuery || text.includes(searchQuery.toLowerCase()));

      if (matchesCat && matchesSearch) {
        item.style.display = "block";
        visibleCount++;
      } else {
        item.style.display = "none";
      }
    });

    if (emptyNotice) {
      emptyNotice.style.display = visibleCount === 0 ? "block" : "none";
    }
  }

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        filterBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        currentCategory = btn.getAttribute("data-category") || "all";
        applyFilters();
      });
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchQuery = e.target.value.trim();
      applyFilters();
    });
  }
}

document.addEventListener("DOMContentLoaded", initFAQ);
