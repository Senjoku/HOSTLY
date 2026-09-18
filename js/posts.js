/*
  ===========================================================
  AJOUTER UN ARTICLE DE BLOG
  ===========================================================
*/

const POSTS = [
  {
    slug: "objets-oublies-fenetre-48h",
    title: "Objets oubliés : pourquoi une fenêtre de 48h post-checkout évite 80% des litiges",
    date: "2026-07-10",
    excerpt: "Le séjour est terminé mais la relation ne l'est pas : comment gérer les signalements tardifs sans réveiller l'équipe de ménage.",
    iconSvg: `<svg class="icon-svg icon-lg" viewBox="0 0 24 24" style="color: var(--coral);"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/></svg>`,
    body: [
      "Dans 1 réservation sur 8, le voyageur réalise qu'il a oublié quelque chose (chargeur, doudou, lunettes) entre 2h et 24h après avoir fermé la porte.",
      "## Le piège du groupe WhatsApp fermé trop tôt",
      "Si la ligne est coupée dès le checkout, le voyageur panique, tente d'appeler tous les numéros d'urgence ou laisse un message incendiaire sur Airbnb. À l'inverse, si le fil reste ouvert sans filtre, le nettoyeur reçoit des sollicitations directes alors qu'il est déjà sur un autre chantier.",
      "## Le routage asymétrique post-départ",
      "La solution d'Hostly consiste à maintenir la fenêtre active 48h, mais en détournant automatiquement tous les messages post-départ vers le responsable logistique, sans jamais solliciter l'agent d'entretien."
    ]
  },
  {
    slug: "regle-trois-minutes-fatigue-equipe",
    title: "La règle des 3 minutes : pourquoi répondre manuellement trop vite épuise vos équipes",
    date: "2026-06-22",
    excerpt: "L'instantanéité est une attente forte des voyageurs, mais elle ne doit pas reposer sur les épaules d'un gestionnaire scotché à son écran.",
    iconSvg: `<svg class="icon-svg icon-lg" viewBox="0 0 24 24" style="color: var(--coral);"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`,
    body: [
      "Un voyageur qui attend 25 minutes pour obtenir le code de la porte d'entrée commence son séjour avec un niveau d'agacement élevé.",
      "## L'illusion de la disponibilité totale",
      "Pour maintenir un taux de réponse de 100%, de nombreux gérants de conciergerie gardent leur téléphone allumé pendant les repas, les weekends et les nuits. C'est le chemin le plus court vers le burn-out opérationnel.",
      "## L'IA comme premier rempart bienveillant",
      "En déléguant les 78% de questions récurrentes à une IA qui connaît chaque recoin du logement, vous offrez au voyageur une réponse en 15 secondes, tout en préservant la paix d'esprit de vos équipes pour les vrais imprévus."
    ]
  },
  {
    slug: "coordination-manuelle-limites",
    title: "Pourquoi la coordination manuelle craque à partir de 15 logements",
    date: "2026-06-02",
    excerpt: "Un groupe WhatsApp par immeuble fonctionne très bien... jusqu'au jour où il n'en gère plus que la moitié.",
    iconSvg: `<svg class="icon-svg icon-lg" viewBox="0 0 24 24" style="color: var(--coral);"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>`,
    body: [
      "Toutes les conciergeries commencent pareil : un groupe WhatsApp, un tableau partagé, un peu de bonne volonté. Ça tient très bien jusqu'à 10, 12, parfois 15 logements.",
      "## Le vrai point de rupture",
      "Ce n'est pas le nombre de logements qui casse le système, c'est le nombre de conversations simultanées et non liées entre elles. Un message sur un chauffage en panne se retrouve mélangé à une question sur le parking et un signalement de fuite — trois sujets, trois urgences différentes, un seul fil.",
      "## Ce qui change avec un filtre",
      "Le rôle d'un outil comme Hostly n'est pas de remplacer la conversation humaine, mais de la trier avant qu'elle n'atteigne votre équipe : ce qui est routine reste routine, ce qui mérite une action part directement à la bonne personne."
    ]
  },
  {
    slug: "pms-vs-couche-coordination",
    title: "PMS et couche de coordination : deux métiers différents",
    date: "2026-05-14",
    excerpt: "Un PMS gère les réservations. Il ne gère pas ce qui se passe une fois que le voyageur a la clé en main.",
    iconSvg: `<svg class="icon-svg icon-lg" viewBox="0 0 24 24" style="color: var(--coral);"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`,
    body: [
      "Hostaway, Hospitable et consorts font un travail remarquable sur le calendrier, la tarification, le channel manager. Ce n'est pas leur rôle de gérer une conversation en temps réel avec un voyageur qui a un problème de chauffage à 22h.",
      "## Complémentaire, pas concurrent",
      "C'est exactement l'espace que Hostly occupe : à côté du PMS, jamais à sa place. Le PMS reste la source de vérité sur les réservations, Hostly devient la source de vérité sur ce qui se passe pendant le séjour."
    ]
  }
];
