// =========================================================
// HOSTLY — GLOBAL SCRIPT
// Navigation, animations, count-up, fluid lerp spotlight & 3D tilt
// =========================================================

// ---- 1. Flux log animé (hero) : simule le routage en direct ----
const FLUX_MESSAGES = [
  { text: "Le chauffage ne s'allume plus", route: "escalade", to: "Manager" },
  { text: "Où sont les poubelles ?", route: "auto", to: "Réponse auto" },
  { text: "Serviette manquante ch.2", route: "ménage", to: "Nettoyeur" },
  { text: "Code wifi ne marche pas", route: "auto", to: "Réponse auto" },
  { text: "Tache sur le canapé au départ", route: "escalade", to: "Manager" },
  { text: "Check-in avancé possible ?", route: "auto", to: "Réponse auto" },
  { text: "Ampoule grillée salle de bain", route: "ménage", to: "Nettoyeur" },
  { text: "Fuite sous l'évier cuisine", route: "escalade", to: "Manager (Urgence)" },
  { text: "Où est le local à vélos ?", route: "auto", to: "Réponse auto" },
];

function initFluxLog() {
  const container = document.getElementById("fluxRows");
  if (!container) return;

  let i = 0;
  const MAX_ROWS = 4;

  function addRow() {
    const msg = FLUX_MESSAGES[i % FLUX_MESSAGES.length];
    i++;

    const row = document.createElement("div");
    row.className = "flux-row flux-row-enter";
    row.innerHTML = `
      <span class="flux-msg">${msg.text}</span>
      <span class="flux-arrow">→</span>
      <span class="flux-badge flux-badge-${msg.route.split(' ')[0]}">${msg.to}</span>
    `;
    container.prepend(row);

    requestAnimationFrame(() => row.classList.remove("flux-row-enter"));

    while (container.children.length > MAX_ROWS) {
      container.removeChild(container.lastChild);
    }
  }

  addRow();
  addRow();
  setInterval(addRow, 2600);
}

// ---- 2. Menu mobile drawer ----
function initMobileMenu() {
  const toggleBtn = document.getElementById("navToggle");
  const drawer = document.getElementById("mobileDrawer");
  if (!toggleBtn || !drawer) return;

  toggleBtn.addEventListener("click", () => {
    const isOpen = drawer.classList.contains("open");
    if (isOpen) {
      drawer.classList.remove("open");
      toggleBtn.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    } else {
      drawer.classList.add("open");
      toggleBtn.classList.add("open");
      toggleBtn.setAttribute("aria-expanded", "true");
    }
  });

  drawer.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => {
      drawer.classList.remove("open");
      toggleBtn.classList.remove("open");
      toggleBtn.setAttribute("aria-expanded", "false");
    });
  });
}

// ---- 3. Compteurs de chiffres animés (Count-up) ----
function initCountUp() {
  const counters = document.querySelectorAll("[data-counter]");
  if (counters.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const targetVal = parseFloat(el.getAttribute("data-counter"));
        const prefix = el.getAttribute("data-prefix") || "";
        const suffix = el.getAttribute("data-suffix") || "";
        const decimals = parseInt(el.getAttribute("data-decimals") || "0", 10);
        const duration = 1600;
        const startTime = performance.now();

        function update(currentTime) {
          const elapsed = currentTime - startTime;
          const progress = Math.min(elapsed / duration, 1);
          const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
          const currentVal = easeProgress * targetVal;

          el.textContent = `${prefix}${currentVal.toFixed(decimals)}${suffix}`;

          if (progress < 1) {
            requestAnimationFrame(update);
          } else {
            el.textContent = `${prefix}${targetVal.toFixed(decimals)}${suffix}`;
          }
        }

        requestAnimationFrame(update);
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  counters.forEach(c => observer.observe(c));
}

// ---- 4. Scroll Reveal pour tous les éléments annotés ----
function initScrollReveal() {
  const targets = document.querySelectorAll(".step, .not-item, .dashboard-visual, .price-card, .stat-card, .pillar-card, .case-card");
  if (!("IntersectionObserver" in window) || targets.length === 0) {
    targets.forEach(el => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
}

// ---- 5. Switcher Comparateur Avant / Après ----
function initCompareSwitcher() {
  const buttons = document.querySelectorAll(".compare-tab-btn");
  const cards = document.querySelectorAll(".compare-card");
  if (buttons.length === 0 || cards.length === 0) return;

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      const target = btn.getAttribute("data-view");

      if (target === "all") {
        cards.forEach(c => c.style.display = "block");
      } else {
        cards.forEach(c => {
          if (c.getAttribute("data-compare") === target) {
            c.style.display = "block";
          } else {
            c.style.display = "none";
          }
        });
      }
    });
  });
}

// ---- 6. Effet Spotlight Glow fluide avec inertie (Lerp 60fps) ----
function initSpotlightGlow() {
  const glowCards = document.querySelectorAll(".glow-card, .pillar-card, .stat-card, .hero-content");
  if (!window.matchMedia("(hover: hover)").matches || glowCards.length === 0) return;

  glowCards.forEach(card => {
    let currentX = 0;
    let currentY = 0;
    let targetX = 0;
    let targetY = 0;
    let isHovered = false;
    let rafId = null;

    const LERP_FACTOR = 0.07;

    function loop() {
      currentX += (targetX - currentX) * LERP_FACTOR;
      currentY += (targetY - currentY) * LERP_FACTOR;

      card.style.setProperty("--mouse-x", `${currentX.toFixed(2)}px`);
      card.style.setProperty("--mouse-y", `${currentY.toFixed(2)}px`);

      const dist = Math.hypot(targetX - currentX, targetY - currentY);
      if (isHovered || dist > 0.5) {
        rafId = requestAnimationFrame(loop);
      } else {
        rafId = null;
      }
    }

    card.addEventListener("mouseenter", (e) => {
      isHovered = true;
      const rect = card.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      currentX = targetX;
      currentY = targetY;
      card.style.setProperty("--mouse-x", `${currentX.toFixed(2)}px`);
      card.style.setProperty("--mouse-y", `${currentY.toFixed(2)}px`);
      if (!rafId) {
        rafId = requestAnimationFrame(loop);
      }
    });

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      targetX = e.clientX - rect.left;
      targetY = e.clientY - rect.top;
      if (!rafId) {
        rafId = requestAnimationFrame(loop);
      }
    });

    card.addEventListener("mouseleave", () => {
      isHovered = false;
    });
  });
}

// ---- 7. Effet 3D Tilt fluide avec amorti ----
function init3DTilt() {
  const tiltCards = document.querySelectorAll(".tilt-card, .price-card");
  if (!window.matchMedia("(hover: hover)").matches || tiltCards.length === 0) return;

  tiltCards.forEach(card => {
    let currentRotX = 0;
    let currentRotY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isHovered = false;
    let rafId = null;

    const LERP_FACTOR = 0.08;

    function loopTilt() {
      currentRotX += (targetRotX - currentRotX) * LERP_FACTOR;
      currentRotY += (targetRotY - currentRotY) * LERP_FACTOR;

      if (isHovered) {
        card.style.transform = `perspective(800px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translateY(-4px)`;
      } else {
        card.style.transform = `perspective(800px) rotateX(${currentRotX.toFixed(2)}deg) rotateY(${currentRotY.toFixed(2)}deg) translateY(0)`;
      }

      const dist = Math.hypot(targetRotX - currentRotX, targetRotY - currentRotY);
      if (isHovered || dist > 0.05) {
        rafId = requestAnimationFrame(loopTilt);
      } else {
        rafId = null;
        if (!isHovered) {
          card.style.transform = "none";
        }
      }
    }

    card.addEventListener("mouseenter", () => {
      isHovered = true;
      if (!rafId) rafId = requestAnimationFrame(loopTilt);
    });

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      targetRotX = (-y / rect.height) * 6;
      targetRotY = (x / rect.width) * 6;
      if (!rafId) rafId = requestAnimationFrame(loopTilt);
    });

    card.addEventListener("mouseleave", () => {
      isHovered = false;
      targetRotX = 0;
      targetRotY = 0;
      if (!rafId) rafId = requestAnimationFrame(loopTilt);
    });
  });
}

// ---- 8. Barre de progression de scroll & Bouton Retour en haut ----
function initScrollEnhancements() {
  // 1. Barre de progression
  let progressBar = document.getElementById("scrollProgressBar");
  if (!progressBar) {
    progressBar = document.createElement("div");
    progressBar.id = "scrollProgressBar";
    progressBar.className = "scroll-progress-bar";
    document.body.appendChild(progressBar);
  }

  // 2. Bouton retour en haut
  let backToTop = document.getElementById("backToTopBtn");
  if (!backToTop) {
    backToTop = document.createElement("button");
    backToTop.id = "backToTopBtn";
    backToTop.className = "back-to-top-btn";
    backToTop.setAttribute("aria-label", "Retour en haut");
    backToTop.innerHTML = `<svg class="icon-svg icon-sm" viewBox="0 0 24 24"><polyline points="18 15 12 9 6 15"/></svg>`;
    document.body.appendChild(backToTop);

    backToTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = `${progress}%`;

    if (scrollTop > 400) {
      backToTop.classList.add("show");
    } else {
      backToTop.classList.remove("show");
    }
  }, { passive: true });
}

// ---- 9. Top-bar d'annonce & Live Ticker interactif ----
function initAnnouncementBar() {
  const bar = document.querySelector(".announcement-bar, .announcement-ticker");
  if (!bar) return;

  if (sessionStorage.getItem("hostly_banner_closed") === "true") {
    bar.style.display = "none";
    return;
  }

  // Contrôle Pause / Reprise du défilement
  const pauseBtn = bar.querySelector(".ticker-pause-btn");
  const track = bar.querySelector(".ticker-track");
  const pauseIcon = bar.querySelector(".ticker-pause-icon");
  const playIcon = bar.querySelector(".ticker-play-icon");

  if (pauseBtn && track) {
    let isPaused = false;
    pauseBtn.addEventListener("click", () => {
      isPaused = !isPaused;
      if (isPaused) {
        track.classList.add("is-paused");
        if (pauseIcon) pauseIcon.style.display = "none";
        if (playIcon) playIcon.style.display = "inline-block";
        pauseBtn.setAttribute("aria-label", "Reprendre le défilement");
        pauseBtn.setAttribute("title", "Reprendre le défilement");
      } else {
        track.classList.remove("is-paused");
        if (pauseIcon) pauseIcon.style.display = "inline-block";
        if (playIcon) playIcon.style.display = "none";
        pauseBtn.setAttribute("aria-label", "Mettre en pause");
        pauseBtn.setAttribute("title", "Mettre en pause");
      }
    });
  }

  // Fermeture animée avec collapse fluide
  const closeBtn = bar.querySelector(".announcement-close");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      bar.style.transition = "all 0.35s cubic-bezier(0.4, 0, 0.2, 1)";
      bar.style.opacity = "0";
      bar.style.maxHeight = "0";
      bar.style.paddingTop = "0";
      bar.style.paddingBottom = "0";
      bar.style.border = "none";
      setTimeout(() => {
        bar.style.display = "none";
      }, 360);
      sessionStorage.setItem("hostly_banner_closed", "true");
    });
  }
}

// ---- 10. Générateur de QR Code Interactif ----
function initQRGenerator() {
  const input = document.getElementById("qrPropertyNameInput");
  const display = document.getElementById("qrPropertyNameDisplay");
  if (!input || !display) return;

  input.addEventListener("input", (e) => {
    const val = e.target.value.trim();
    display.textContent = val ? val : "Villa Dune • Logement #04";
  });
}

// ---- 11. Utilitaire Toast Notification avec Icône SVG ----
window.showToast = function(msg, duration = 3500) {
  let toast = document.getElementById("toastNotice");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toastNotice";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }

  toast.innerHTML = `
    <svg class="icon-svg icon-sm" viewBox="0 0 24 24" style="color: var(--coral);"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
    <span>${msg}</span>
  `;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, duration);
};

// ---- DOM Ready ----
document.addEventListener("DOMContentLoaded", () => {
  initFluxLog();
  initMobileMenu();
  initCountUp();
  initScrollReveal();
  initCompareSwitcher();
  initSpotlightGlow();
  init3DTilt();
  initScrollEnhancements();
  initAnnouncementBar();
  initQRGenerator();
});
