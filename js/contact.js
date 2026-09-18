// =========================================================
// HOSTLY — CONTACT & RESERVATION DE DEMO
// Sélection de créneau et validation interactive
// =========================================================

function initContactForm() {
  const form = document.getElementById("demoBookingForm");
  const slotButtons = document.querySelectorAll(".slot-btn");
  const selectedSlotInput = document.getElementById("selectedSlot");
  const successBanner = document.getElementById("bookingSuccess");

  if (slotButtons.length > 0 && selectedSlotInput) {
    slotButtons.forEach(btn => {
      btn.addEventListener("click", (e) => {
        e.preventDefault();
        slotButtons.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        selectedSlotInput.value = btn.getAttribute("data-slot") || btn.textContent.trim();
      });
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      const submitBtn = form.querySelector("button[type='submit']");
      const originalText = submitBtn.innerHTML;

      // Bouton en chargement
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>⏳</span> Validation de votre réservation...`;

      setTimeout(() => {
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalText;
        form.reset();

        if (successBanner) {
          successBanner.style.display = "block";
          successBanner.scrollIntoView({ behavior: "smooth", block: "nearest" });
        }

        if (window.showToast) {
          window.showToast("Votre créneau de démo a bien été réservé ! Vous recevrez le lien par email.");
        }
      }, 900);
    });
  }
}

document.addEventListener("DOMContentLoaded", initContactForm);
