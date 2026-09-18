// =========================================================
// HOSTLY — SANDBOX & SIMULATEUR WHATSAPP INTERACTIF
// Simulation de conversations avec icônes SVG professionnelles
// =========================================================

const DEMO_SCENARIOS = {
  chauffage: {
    name: "Panne de Chauffage",
    category: "Escalade Manager",
    iconSvg: `<svg class="icon-svg icon-sm" viewBox="0 0 24 24"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>`,
    messages: [
      { from: "guest", text: "Bonjour, le radiateur du salon ne s'allume pas et il fait très froid ce soir...", time: "21:32" },
      { from: "bot", text: "Bonsoir ! Je prends en charge votre demande. Pourriez-vous me préciser si le radiateur affiche un voyant qui clignote ou un code d'erreur ?", time: "21:32" },
      { from: "guest", text: "Le voyant rouge clignote avec le code E02 sur l'écran.", time: "21:33" },
      { from: "bot", text: "C'est bien noté. J'ai alerté immédiatement le responsable technique de permanence avec la procédure de réarmement pour ce modèle, et le manager est prévenu. Une solution vous est apportée sous 15 minutes.", time: "21:33" }
    ],
    dispatch: {
      nettoyeur: {
        status: "Non concerné",
        statusClass: "flux-badge-auto",
        body: "Aucune notification envoyée. Les agents d'entretien ne sont pas dérangés inutilement le soir."
      },
      manager: {
        status: "Escalade immédiate",
        statusClass: "flux-badge-escalade",
        body: "<strong>Alerte SMS & Push :</strong> [Logement #04 - Villa Dune] Code Erreur E02 Chaudière. Guide de réarmement joint. Voyageur rassuré."
      },
      proprietaire: {
        status: "Consultation passive",
        statusClass: "flux-badge-ménage",
        body: "Inscrit au journal de bord du séjour sans notification intrusive. Historique disponible pour le bilan mensuel."
      }
    }
  },
  menage: {
    name: "Serviettes & Linge",
    category: "Routage Nettoyeur",
    iconSvg: `<svg class="icon-svg icon-sm" viewBox="0 0 24 24"><path d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"/></svg>`,
    messages: [
      { from: "guest", text: "Bonjour ! Où sont les serviettes de bain supplémentaires pour le canapé-lit ?", time: "16:15" },
      { from: "bot", text: "Bonjour ! Elles se trouvent dans le placard haut du couloir à gauche (étagère 2). Avez-vous également besoin de draps d'appoint ?", time: "16:15" },
      { from: "guest", text: "Ah super je viens de les voir, merci beaucoup !", time: "16:16" },
      { from: "bot", text: "Parfait ! Très bon séjour parmi nous. N'hésitez pas si vous avez la moindre question.", time: "16:16" }
    ],
    dispatch: {
      nettoyeur: {
        status: "Tâche automatique",
        statusClass: "flux-badge-ménage",
        body: "Note ajoutée pour le prochain ménage : vérifier que le pack de bienvenue textile est bien visible dans le dressing."
      },
      manager: {
        status: "Zéro bruit",
        statusClass: "flux-badge-auto",
        body: "Demande de routine résolue en 45 secondes sans intervention du manager."
      },
      proprietaire: {
        status: "Silencieux",
        statusClass: "flux-badge-auto",
        body: "Résumé de fin de séjour : 1 question équipement traitée sans incident."
      }
    }
  },
  wifi: {
    name: "Code Wifi & Accès",
    category: "100% Automatique",
    iconSvg: `<svg class="icon-svg icon-sm" viewBox="0 0 24 24"><path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0M12 20h.01"/></svg>`,
    messages: [
      { from: "guest", text: "Bonjour, quel est le mot de passe du wifi s'il vous plaît ?", time: "18:04" },
      { from: "bot", text: "Bonjour ! Le réseau est 'Hostly-Villa-Biarritz' et le code d'accès est 'Ocean2026!'. Attention à la majuscule sur le 'O' et au point d'exclamation.", time: "18:04" },
      { from: "guest", text: "Super, connecté ! Merci pour la rapidité !", time: "18:05" },
      { from: "bot", text: "Avec plaisir ! Bon séjour !", time: "18:05" }
    ],
    dispatch: {
      nettoyeur: {
        status: "Non concerné",
        statusClass: "flux-badge-auto",
        body: "Aucun message envoyé."
      },
      manager: {
        status: "Zéro bruit",
        statusClass: "flux-badge-auto",
        body: "100% automatisé par le livret d'accueil dynamique Hostly."
      },
      proprietaire: {
        status: "Archivé",
        statusClass: "flux-badge-auto",
        body: "Disponible dans l'historique complet."
      }
    }
  },
  depart_tardif: {
    name: "Late Check-out",
    category: "Coordination Planning",
    iconSvg: `<svg class="icon-svg icon-sm" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
    messages: [
      { from: "guest", text: "Bonjour, notre vol est à 17h, pouvons-nous rester jusqu'à 12h30 au lieu de 10h ?", time: "08:45" },
      { from: "bot", text: "Bonjour ! Je vérifie la faisabilité avec le planning d'entretien de ce matin. Un autre voyageur arrive à 15h, mais nous pouvons vous accorder un départ décalé jusqu'à 11h15. Cela vous convient-il ?", time: "08:46" },
      { from: "guest", text: "Oui parfait, ça nous aide beaucoup merci !", time: "08:47" },
      { from: "bot", text: "C'est validé ! Le créneau d'intervention du personnel d'entretien a été décalé à 11h20. Bon voyage !", time: "08:47" }
    ],
    dispatch: {
      nettoyeur: {
        status: "Planning ajusté",
        statusClass: "flux-badge-ménage",
        body: "<strong>Notification WhatsApp :</strong> 'Ménage Apt #12 décalé à 11h20. Commencez d'abord par le #08.'"
      },
      manager: {
        status: "Validé sans friction",
        statusClass: "flux-badge-auto",
        body: "Règle de buffer respectée. Pas d'erreur de timing entre les voyageurs."
      },
      proprietaire: {
        status: "Loggé",
        statusClass: "flux-badge-auto",
        body: "Séjour clôturé avec satisfaction voyageur maximale."
      }
    }
  },
  objet_oublie: {
    name: "Objet Oublié (+48h)",
    category: "Fenêtre +48h Active",
    iconSvg: `<svg class="icon-svg icon-sm" viewBox="0 0 24 24"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
    messages: [
      { from: "guest", text: "Bonjour, nous venons de partir mais je crois avoir oublié mes lunettes de vue sur le buffet...", time: "11:40" },
      { from: "bot", text: "Bonjour ! La ligne reste ouverte 48h après votre départ. J'ai immédiatement créé une fiche d'objet trouvé pour la gouvernante qui est sur place.", time: "11:40" },
      { from: "bot", text: "Les lunettes ont été récupérées et sécurisées dans le boîtier d'accueil. Nous vous proposons un renvoi par coursier ou retrait sur place.", time: "12:05" }
    ],
    dispatch: {
      nettoyeur: {
        status: "Fiche Objet Trouvé",
        statusClass: "flux-badge-ménage",
        body: "Fiche instantanée avec case à cocher : 'Sécuriser lunettes buffet salon'."
      },
      manager: {
        status: "Coordination simplifiée",
        statusClass: "flux-badge-escalade",
        body: "Dossier créé automatiquement pour le suivi logistique sans appel d'urgence."
      },
      proprietaire: {
        status: "Zéro litige",
        statusClass: "flux-badge-auto",
        body: "Évite les avis négatifs liés aux objets égarés."
      }
    }
  }
};

function initDemoSandbox() {
  const chatContainer = document.getElementById("sandboxChat");
  const chipsContainer = document.getElementById("sandboxChips");
  if (!chatContainer || !chipsContainer) return;

  const nettoyeurCard = document.getElementById("roleNettoyeur");
  const managerCard = document.getElementById("roleManager");
  const proprietaireCard = document.getElementById("roleProprietaire");

  let activeTimeout = null;

  function renderScenario(key) {
    if (activeTimeout) clearTimeout(activeTimeout);
    const data = DEMO_SCENARIOS[key];
    if (!data) return;

    chipsContainer.querySelectorAll(".scenario-chip").forEach(chip => {
      chip.classList.toggle("active", chip.getAttribute("data-scenario") === key);
    });

    chatContainer.innerHTML = "";

    if (nettoyeurCard) {
      nettoyeurCard.querySelector(".role-status").innerHTML = data.dispatch.nettoyeur.status;
      nettoyeurCard.querySelector(".role-status").className = `role-status ${data.dispatch.nettoyeur.statusClass}`;
      nettoyeurCard.querySelector(".role-body").innerHTML = data.dispatch.nettoyeur.body;
      nettoyeurCard.classList.toggle("role-card-active", data.dispatch.nettoyeur.statusClass.includes("ménage"));
    }

    if (managerCard) {
      managerCard.querySelector(".role-status").innerHTML = data.dispatch.manager.status;
      managerCard.querySelector(".role-status").className = `role-status ${data.dispatch.manager.statusClass}`;
      managerCard.querySelector(".role-body").innerHTML = data.dispatch.manager.body;
      managerCard.classList.toggle("role-card-active", data.dispatch.manager.statusClass.includes("escalade"));
    }

    if (proprietaireCard) {
      proprietaireCard.querySelector(".role-status").innerHTML = data.dispatch.proprietaire.status;
      proprietaireCard.querySelector(".role-status").className = `role-status ${data.dispatch.proprietaire.statusClass}`;
      proprietaireCard.querySelector(".role-body").innerHTML = data.dispatch.proprietaire.body;
    }

    let msgIdx = 0;

    function postNextMessage() {
      if (msgIdx >= data.messages.length) return;
      const msg = data.messages[msgIdx];
      msgIdx++;

      if (msg.from === "bot") {
        const typingEl = document.createElement("div");
        typingEl.className = "typing-bubble";
        typingEl.innerHTML = `<span class="typing-dot"></span><span class="typing-dot"></span><span class="typing-dot"></span>`;
        chatContainer.appendChild(typingEl);
        chatContainer.scrollTop = chatContainer.scrollHeight;

        activeTimeout = setTimeout(() => {
          typingEl.remove();
          appendBubble(msg);
          activeTimeout = setTimeout(postNextMessage, 1400);
        }, 900);
      } else {
        appendBubble(msg);
        activeTimeout = setTimeout(postNextMessage, 1100);
      }
    }

    function appendBubble(msg) {
      const bubble = document.createElement("div");
      bubble.className = `msg ${msg.from === 'guest' ? 'msg-traveler' : 'msg-hostly'}`;
      bubble.innerHTML = `
        <div>${msg.text}</div>
        <div class="msg-meta">${msg.time}</div>
      `;
      chatContainer.appendChild(bubble);
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }

    postNextMessage();
  }

  chipsContainer.innerHTML = Object.keys(DEMO_SCENARIOS).map((key, index) => {
    const s = DEMO_SCENARIOS[key];
    return `<button class="scenario-chip ${index === 0 ? 'active' : ''}" data-scenario="${key}">
      ${s.iconSvg}
      <span>${s.name}</span>
    </button>`;
  }).join("");

  chipsContainer.querySelectorAll(".scenario-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const key = chip.getAttribute("data-scenario");
      renderScenario(key);
    });
  });

  renderScenario("chauffage");
}

document.addEventListener("DOMContentLoaded", initDemoSandbox);
