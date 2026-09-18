// =========================================================
// HOSTLY — SIMULATEUR DE ROI & GAIN DE TEMPS
// Calcul interactif en temps réel
// =========================================================

function initSimulator() {
  const unitsSlider = document.getElementById("simUnits");
  const incidentsSlider = document.getElementById("simIncidents");
  const hourlyCostSlider = document.getElementById("simHourlyCost");

  if (!unitsSlider || !incidentsSlider || !hourlyCostSlider) return;

  // Affichages des valeurs des curseurs
  const unitsValEl = document.getElementById("simUnitsVal");
  const incidentsValEl = document.getElementById("simIncidentsVal");
  const hourlyCostValEl = document.getElementById("simHourlyCostVal");

  // Affichages des résultats
  const hoursSavedEl = document.getElementById("resHoursSaved");
  const laborValueEl = document.getElementById("resLaborValue");
  const costHostlyEl = document.getElementById("resCostHostly");
  const netGainEl = document.getElementById("resNetGain");
  const roiPctEl = document.getElementById("resRoiPct");
  const summaryTextEl = document.getElementById("resSummaryText");

  function calculate() {
    const units = parseInt(unitsSlider.value, 10);
    const incidentsPerUnit = parseInt(incidentsSlider.value, 10);
    const hourlyCost = parseInt(hourlyCostSlider.value, 10);

    // Mettre à jour les badges curseurs
    if (unitsValEl) unitsValEl.textContent = `${units} logements`;
    if (incidentsValEl) incidentsValEl.textContent = `${incidentsPerUnit} req / séjour`;
    if (hourlyCostValEl) hourlyCostValEl.textContent = `${hourlyCost} € / h`;

    // Calculs métier
    // Nombre total de requêtes par mois (en moyenne 2.5 séjours par mois par logement)
    const monthlyRequests = Math.round(units * incidentsPerUnit * 2.2);

    // Temps manuel passé sans filtre = environ 18 min (0.3h) par requête (lecture, relance, transfert, oubli, vérification)
    const hoursWithoutHostly = monthlyRequests * 0.3;

    // Hostly filtre et automatise 78% des interactions de routine
    const hoursSaved = Math.round(hoursWithoutHostly * 0.78);

    // Valeur monétaire du temps libéré
    const laborValueSaved = Math.round(hoursSaved * hourlyCost);

    // Coût abonnement Hostly (20€ / logement / mois)
    const hostlyCost = units * 20;

    // Gain net équivalent
    const netGain = laborValueSaved - hostlyCost;

    // Ratio ROI
    const roiPercentage = hostlyCost > 0 ? Math.round(((laborValueSaved - hostlyCost) / hostlyCost) * 100) : 0;

    // Affichage des KPIs
    if (hoursSavedEl) hoursSavedEl.textContent = `+${hoursSaved} h`;
    if (laborValueEl) laborValueEl.textContent = `${laborValueSaved.toLocaleString('fr-FR')} €`;
    if (costHostlyEl) costHostlyEl.textContent = `${hostlyCost.toLocaleString('fr-FR')} € / mois`;
    if (netGainEl) {
      netGainEl.textContent = netGain >= 0 ? `+${netGain.toLocaleString('fr-FR')} €` : `${netGain.toLocaleString('fr-FR')} €`;
    }
    if (roiPctEl) {
      roiPctEl.textContent = roiPercentage > 0 ? `+${roiPercentage}%` : "Rentable";
    }

    if (summaryTextEl) {
      summaryTextEl.innerHTML = `Pour <strong>${units} logements</strong>, votre équipe récupère environ <strong>${hoursSaved} heures par mois</strong> (soit <strong>${(hoursSaved / 7).toFixed(1)} journées de travail</strong>). Vos nettoyeurs reçoivent leurs tâches sans intermédiaires et vous éliminez les oublis.`;
    }
  }

  // Écouteurs sur les sliders
  [unitsSlider, incidentsSlider, hourlyCostSlider].forEach(slider => {
    slider.addEventListener("input", calculate);
  });

  // Calcul initial
  calculate();
}

document.addEventListener("DOMContentLoaded", initSimulator);
