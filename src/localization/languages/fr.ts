// French translations
const fr = {
  // Common navigation items
  nav: {
    home: "Accueil",
    about: "À Propos",
    services: "Services",
    bookings: "Réserver un Service",
    track: "Suivre ma Réservation",
    contact: "Contact",
    language: "Langue",
  },

  // Home page
  home: {
    hero: {
      title: "Services Juridiques et Immobiliers Professionnels au Rwanda",
      subtitle: "PSN Rwanda Ltd offre des services complets de notariat, gestion immobilière, location et fiscalité adaptés à vos besoins.",
      cta: "Réserver un Service",
    },
    whyChooseUs: {
      title: "Pourquoi Choisir PSN Rwanda",
      subtitle: "Nous nous engageons à fournir des services professionnels exceptionnels avec intégrité et excellence.",
      experience: {
        title: "Professionnels Agréés",
        description: "Notre équipe est composée de professionnels agréés ayant une vaste expérience dans les domaines juridiques et immobiliers.",
      },
      expertise: {
        title: "Service Personnalisé",
        description: "Nous fournissons des solutions adaptées pour répondre aux besoins spécifiques de chacun de nos clients.",
      },
      clientFocus: {
        title: "Livraison Rapide",
        description: "Nous nous engageons à fournir nos services rapidement sans compromettre la qualité.",
      },
    },
    featuredServices: {
      title: "Nos Services",
      subtitle: "Découvrez notre large gamme de services professionnels conçus pour répondre à vos besoins.",
      viewAll: "Voir Tous les Services",
      learnMore: "En Savoir Plus",
    },
    quickBooking: {
      title: "Besoin de nos services?",
      subtitle: "Réservez un service en un clic ou appelez-nous pour discuter de vos besoins.",
      cta: "Réserver Maintenant",
    },
  },

  // About page
  about: {
    title: "À Propos de PSN Rwanda",
    subtitle: "Services juridiques et immobiliers professionnels axés sur l'excellence et l'intégrité.",
    images: {
      office: "Bureau de PSN Rwanda"
    },
    story: {
      title: "Qui Sommes-Nous",
      paragraph1: "PSN Rwanda Ltd est une société de services professionnels spécialisée dans les activités juridiques (services notariaux), le conseil, la location, l'immobilier et la recherche et développement.",
      paragraph2: "Fondée en 2023, nous nous sommes rapidement imposés comme un fournisseur de confiance de services professionnels au Rwanda, servant des clients individuels et des entreprises avec intégrité et excellence."
    },
    companyDetails: {
      title: "Détails de l'Entreprise",
      registrationNo: "N° d'Enregistrement",
      incorporatedOn: "Constituée le",
      incorporationDate: "23 janvier 2023",
      location: "Emplacement",
      address: "Nyamabuye, Muhanga, Province du Sud",
      country: "Pays",
      countryName: "Rwanda"
    },
    mission: {
      title: "Notre Mission",
      description: "Fournir des services professionnels exceptionnels qui aident nos clients à atteindre leurs objectifs grâce à des solutions innovantes, une expertise technique et un engagement sans faille envers l'excellence."
    },
    vision: {
      title: "Notre Vision",
      description: "Être le fournisseur de services professionnels le plus fiable au Rwanda, reconnu pour notre intégrité, notre excellence et notre dévouement à la réussite des clients."
    },
    journey: {
      title: "Notre Parcours",
      milestones: {
        incorporation: {
          title: "Constitution de l'Entreprise",
          description: "PSN Rwanda Ltd a été officiellement constituée le 23 janvier 2023."
        },
        office: {
          title: "Établissement du Bureau",
          description: "Établissement de notre premier bureau à Nyamabuye, Muhanga, Province du Sud."
        },
        launch: {
          title: "Lancement des Services",
          description: "Lancement de nos services principaux, notamment les services notariaux, la gestion immobilière et les services fiscaux."
        }
      }
    },
    cta: {
      title: "Prêt à Travailler Avec Nous?",
      description: "Contactez-nous dès aujourd'hui pour discuter de la façon dont nous pouvons vous aider avec nos services professionnels.",
      contactButton: "Contactez-Nous",
      servicesButton: "Explorez Nos Services"
    },
    values: {
      title: "Nos Valeurs",
      integrity: {
        title: "Intégrité",
        description: "Nous respectons les normes éthiques les plus élevées dans toutes nos transactions",
      },
      excellence: {
        title: "Excellence",
        description: "Nous visons l'excellence dans chaque service que nous fournissons",
      },
      accessibility: {
        title: "Accessibilité",
        description: "Nous rendons nos services accessibles à tous ceux qui en ont besoin",
      },
    },
    team: {
      title: "Notre Équipe",
      subtitle: "Rencontrez les professionnels derrière PSN Rwanda",
    },
  },

  // Services page
  services: {
    title: "Nos Services",
    subtitle: "PSN Rwanda Ltd offre une gamme complète de services professionnels pour répondre à vos besoins juridiques, immobiliers et financiers.",
    allServices: "Tous les Services",
    searchPlaceholder: "Rechercher un service...",
    bookNow: "Réserver Ce Service",
    learnMore: "En Savoir Plus",
    loading: "Chargement des services...",
    turnaroundTime: "Délai d'exécution",
    error: {
      fetch: "Échec du chargement des services. Veuillez réessayer plus tard.",
      fallback: "Aucun service trouvé. Utilisation des données de secours."
    },
    cta: {
      title: "Vous ne savez pas quel service vous avez besoin?",
      description: "Contactez-nous pour une consultation et nous vous aiderons à identifier la meilleure solution pour vos besoins.",
      contactButton: "Contactez-Nous",
      bookConsultation: "Réserver une Consultation"
    }
  },

  // Booking page
  booking: {
    title: "Réserver un Service",
    subtitle: "Planifiez un service avec notre équipe rapidement et facilement",
    form: {
      serviceSelectLabel: "Sélectionner un Service *",
      serviceSelectPlaceholder: "-- Sélectionnez un service --",
      phoneNumberLabel: "Numéro de Téléphone *",
      phoneNumberPlaceholder: "ex. +250788123456",
      phoneNumberHelp: "Requis pour la confirmation de réservation et les mises à jour",
      fullNameLabel: "Nom Complet",
      fullNamePlaceholder: "Entrez votre nom complet",
      emailLabel: "Adresse Email",
      emailPlaceholder: "Entrez votre adresse email",
      notesLabel: "Notes Supplémentaires",
      notesPlaceholder: "Veuillez fournir toute information supplémentaire concernant votre demande",
      documentsLabel: "Télécharger des Documents",
      documentsHelp: "Formats acceptés: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10Mo par fichier)",
      selectDocument: "Sélectionner un Document",
      maxDocumentsReached: "Nombre maximum de documents atteint",
      uploadDocuments: "Télécharger les Fichiers Sélectionnés",
      uploading: "Téléchargement...",
      uploadSuccess: "Documents téléchargés avec succès!",
      selectedFiles: "Fichiers Sélectionnés (En Attente de Téléchargement):",
      uploadedDocuments: "Documents Téléchargés:",
      submitButton: "Réserver le Service",
      processing: "Traitement...",
    },
    validation: {
      requiredPhone: "Le numéro de téléphone est requis pour traiter votre réservation.",
      invalidPhone: "Veuillez entrer un numéro de téléphone valide (ex. +250788123456 ou 0788123456).",
      invalidEmail: "Veuillez entrer une adresse email valide.",
      invalidName: "Veuillez entrer un nom valide sans chiffres ni caractères spéciaux.",
      selectService: "Veuillez sélectionner un service.",
      maxFileSize: "La taille du fichier dépasse 10Mo. Veuillez télécharger un fichier plus petit.",
      maxDocuments: "Vous ne pouvez télécharger que 3 documents maximum. Veuillez supprimer un document avant d'en ajouter un autre.",
      selectFile: "Veuillez sélectionner au moins un document à télécharger.",
    },
    success: {
      title: "Réservation Reçue!",
      message: "Merci d'avoir réservé avec PSN Rwanda. Nous avons reçu votre demande et vous contacterons prochainement.",
      trackingLabel: "Votre Numéro de Suivi:",
      trackingNote: "Notez-le ou prenez une capture d'écran - vous en aurez besoin pour vérifier l'état de votre réservation",
      contactInfo: "Nous vous contacterons via le numéro de téléphone fourni dans les 24 heures pour discuter de votre demande.",
      trackButton: "Suivre ma Réservation",
      homeButton: "Retour à l'Accueil",
    },
    serviceDetails: {
      loading: "Chargement des détails du service...",
      noService: "Aucun Service Sélectionné",
      noServiceMessage: "Veuillez sélectionner un service dans le menu déroulant pour voir les détails",
      details: "Détails du Service:",
      pricing: "Tarification:",
      estimatedTime: "Délai Estimé:",
    },
    infoBox: {
      title: "Que se passe-t-il ensuite?",
      steps: [
        "Vous recevrez un numéro de référence de réservation.",
        "Notre équipe vous contactera par téléphone dans les 24 heures.",
        "Nous discuterons de vos besoins spécifiques et planifierons un rendez-vous si nécessaire.",
        "Vous pouvez suivre l'état de votre réservation à l'aide de votre référence de réservation."
      ],
    },
  },

  // Track Booking page
  track: {
    title: "Suivre Votre Réservation",
    subtitle: "Vérifiez l'état de votre demande de service.",
    findBooking: "Trouvez votre réservation",
    byTrackingNumber: "Par Numéro de Suivi",
    byPhoneNumber: "Par Numéro de Téléphone",
    enterTrackingNumber: "Entrez le Numéro de Suivi",
    enterPhoneNumber: "Entrez le Numéro de Téléphone",
    trackingPlaceholder: "ex: PSN-12345",
    phonePlaceholder: "ex: +250788123456",
    trackButton: "Suivre",
    searching: "Recherche en cours...",
    noBookingFoundTracking: "Aucune réservation trouvée avec ce numéro de suivi.",
    noBookingFoundPhone: "Aucune réservation trouvée avec ce numéro de téléphone.",
    bookingsFound: "{count} Réservation Trouvée|{count} Réservations Trouvées",
    bookingDetails: {
      trackingNumber: "Numéro de suivi :",
      status: "Statut :",
      clientName: "Nom du Client",
      phoneNumber: "Numéro de Téléphone",
      email: "Email",
      service: "Service",
      createdOn: "Créé le",
      lastUpdated: "Dernière Mise à Jour",
      referenceNumber: "Numéro de Référence :",
      documentsAttached: "{count} Document Joint|{count} Documents Joints",
      notes: "Notes"
    },
    statuses: {
      pending: "En Attente",
      inProgress: "En Cours",
      completed: "Terminé",
      cancelled: "Annulé"
    },
    needHelp: {
      title: "Besoin d'Aide ?",
      description: "Si vous ne trouvez pas votre réservation ou avez besoin d'assistance, veuillez nous contacter :",
      call: "Appelez : +250 788 859 612",
      email: "Email : info@psnrwanda.com",
      visit: "Visitez : Nyamabuye, Muhanga, Province du Sud, Rwanda"
    }
  },

  // Contact page
  contact: {
    title: "Contactez-Nous",
    subtitle: "Contactez notre équipe pour toute demande ou pour planifier une consultation.",
    info: {
      title: "Informations de Contact",
      address: {
        label: "Adresse",
        value: ["Nyamabuye, Muhanga", "Province du Sud, Rwanda"],
      },
      phone: {
        label: "Téléphone",
        value: "+250 788 859 612",
      },
      email: {
        label: "Email",
        value: "info@psnrwanda.com",
      },
      hours: {
        label: "Heures d'Ouverture",
        value: ["Lundi - Vendredi: 8h00 - 17h00", "Samedi: 9h00 - 13h00", "Dimanche: Fermé"],
      },
    },
    form: {
      title: "Envoyez-nous un Message",
      success: "Merci pour votre message! Nous vous répondrons bientôt.",
      fields: {
        name: {
          label: "Nom Complet *",
          placeholder: "Entrez votre nom complet",
        },
        email: {
          label: "Adresse Email *",
          placeholder: "Entrez votre adresse email",
        },
        phone: {
          label: "Numéro de Téléphone",
          placeholder: "Entrez votre numéro de téléphone",
        },
        subject: {
          label: "Sujet *",
          placeholder: "Sélectionnez un sujet",
          options: {
            select: "Sélectionnez un sujet",
            notaryServices: "Services Notariaux",
            propertyManagement: "Gestion Immobilière",
            leasingRenting: "Location & Bail",
            taxServices: "Services Fiscaux",
            generalInquiry: "Demande Générale",
          },
        },
        message: {
          label: "Message *",
          placeholder: "Entrez votre message ici",
        },
      },
      submitButton: "Envoyer le Message",
      sending: "Envoi...",
    },
    location: {
      title: "Notre Emplacement",
      description: "Nos bureaux sont idéalement situés à Nyamabuye, Muhanga dans la Province du Sud du Rwanda. Nous sommes facilement accessibles depuis la route principale et accueillons les clients pendant nos heures d'ouverture régulières.",
      directions: "Si vous avez besoin d'indications ou avez des difficultés à nous trouver, n'hésitez pas à nous appeler au +250 788 859 612.",
    },
  },

  // Common footer elements
  footer: {
    company: "PSN Rwanda",
    description: "Services juridiques et notariaux professionnels, gestion immobilière, location et conseil fiscal au Rwanda.",
    rightsReserved: "Tous droits réservés",
    quickLinks: "Liens Rapides",
    servicesTitle: "Nos Services",
    contactUs: "Contactez-Nous",
    registrationNo: "N° d'Enregistrement",
    incorporated: "Constituée le",
    subscribe: {
      title: "Abonnez-vous à notre Newsletter",
      placeholder: "Votre adresse email",
      button: "S'abonner",
      success: "Merci de votre abonnement!",
    },
    copyright: "© 2023 PSN Rwanda. Tous droits réservés.",
  },

  // Not Found page
  notFound: {
    title: "Page Non Trouvée",
    message: "La page que vous recherchez n'existe pas ou a été déplacée.",
    backButton: "Retour à l'Accueil"
  },
};

export default fr; 