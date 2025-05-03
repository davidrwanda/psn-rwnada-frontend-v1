// English translations
const en = {
  // Common navigation items
  nav: {
    home: "Home",
    about: "About Us",
    services: "Services",
    bookings: "Book a Service",
    track: "Track Booking",
    contact: "Contact Us",
    language: "Language",
  },

  // Home page
  home: {
    hero: {
      title: "Professional Legal & Property Services in Rwanda",
      subtitle: "PSN Rwanda Ltd offers comprehensive notary, property management, leasing, and tax services tailored to your needs.",
      cta: "Book a Service",
    },
    whyChooseUs: {
      title: "Why Choose PSN Rwanda",
      subtitle: "We are committed to providing exceptional professional services with integrity and excellence.",
      experience: {
        title: "Licensed Professionals",
        description: "Our team consists of licensed professionals with extensive experience in legal and property matters.",
      },
      expertise: {
        title: "Personalized Service",
        description: "We provide tailored solutions to meet the specific needs of each of our clients.",
      },
      clientFocus: {
        title: "Timely Delivery",
        description: "We are committed to delivering our services promptly without compromising on quality.",
      },
    },
    featuredServices: {
      title: "Our Services",
      subtitle: "Explore our wide range of professional services designed to meet your needs.",
      viewAll: "View All Services",
      learnMore: "Learn More",
    },
    quickBooking: {
      title: "Need our services?",
      subtitle: "Book a service in just one click or give us a call to discuss your needs.",
      cta: "Book Now",
    },
  },

  // About page
  about: {
    title: "About PSN Rwanda",
    subtitle: "Professional legal and property services with a focus on excellence and integrity.",
    images: {
      office: "PSN Rwanda Office"
    },
    story: {
      title: "Who We Are",
      paragraph1: "PSN Rwanda Ltd is a professional services company specializing in legal activities (notary services), consultancy, leasing, real estate, and research & development.",
      paragraph2: "Founded in 2023, we have rapidly established ourselves as a trusted provider of professional services in Rwanda, serving individual clients and businesses with integrity and excellence."
    },
    companyDetails: {
      title: "Company Details",
      registrationNo: "Registration No",
      incorporatedOn: "Incorporated On",
      incorporationDate: "January 23, 2023",
      location: "Location",
      address: "Nyamabuye, Muhanga, Southern Province",
      country: "Country",
      countryName: "Rwanda"
    },
    mission: {
      title: "Our Mission",
      description: "To provide exceptional professional services that help our clients achieve their goals through innovative solutions, technical expertise, and unwavering commitment to excellence."
    },
    vision: {
      title: "Our Vision",
      description: "To be the most trusted provider of professional services in Rwanda, recognized for our integrity, excellence, and dedication to client success."
    },
    journey: {
      title: "Our Journey",
      milestones: {
        incorporation: {
          title: "Company Incorporation",
          description: "PSN Rwanda Ltd was officially incorporated on January 23, 2023."
        },
        office: {
          title: "Office Establishment",
          description: "Established our first office in Nyamabuye, Muhanga, Southern Province."
        },
        launch: {
          title: "Service Launch",
          description: "Launched our core services including notary services, property management, and tax services."
        }
      }
    },
    cta: {
      title: "Ready to Work With Us?",
      description: "Contact us today to discuss how we can help you with our professional services.",
      contactButton: "Contact Us",
      servicesButton: "Explore Our Services"
    },
    values: {
      title: "Our Values",
      integrity: {
        title: "Integrity",
        description: "We uphold the highest ethical standards in all our dealings",
      },
      excellence: {
        title: "Excellence",
        description: "We strive for excellence in every service we provide",
      },
      accessibility: {
        title: "Accessibility",
        description: "We make our services accessible to all who need them",
      },
    },
    team: {
      title: "Our Team",
      subtitle: "Meet the professionals behind PSN Rwanda",
    },
  },

  // Services page
  services: {
    title: "Our Services",
    subtitle: "PSN Rwanda Ltd offers a comprehensive range of professional services to meet your legal, property, and financial needs.",
    allServices: "All Services",
    searchPlaceholder: "Search for a service...",
    bookNow: "Book This Service",
    learnMore: "Learn More",
    loading: "Loading services...",
    turnaroundTime: "Turnaround time",
    error: {
      fetch: "Failed to fetch services. Please try again later.",
      fallback: "No services found. Using fallback data."
    },
    cta: {
      title: "Not sure which service you need?",
      description: "Contact us for a consultation and we'll help you identify the best solution for your needs.",
      contactButton: "Contact Us",
      bookConsultation: "Book a Consultation"
    }
  },

  // Booking page
  booking: {
    title: "Book a Service",
    subtitle: "Schedule a service with our team quickly and easily",
    form: {
      serviceSelectLabel: "Select Service *",
      serviceSelectPlaceholder: "-- Select a service --",
      phoneNumberLabel: "Phone Number *",
      phoneNumberPlaceholder: "e.g. +250788123456",
      phoneNumberHelp: "Required for booking confirmation and updates",
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "Enter your full name",
      emailLabel: "Email Address",
      emailPlaceholder: "Enter your email address",
      notesLabel: "Additional Notes",
      notesPlaceholder: "Please provide any additional details about your request",
      documentsLabel: "Upload Documents",
      documentsHelp: "Accepted formats: PDF, DOC, DOCX, JPG, JPEG, PNG (Max 10MB per file)",
      selectDocument: "Select Document",
      maxDocumentsReached: "Max documents reached",
      uploadDocuments: "Upload Selected Files",
      uploading: "Uploading...",
      uploadSuccess: "Documents uploaded successfully!",
      selectedFiles: "Selected Files (Pending Upload):",
      uploadedDocuments: "Uploaded Documents:",
      submitButton: "Book Service",
      processing: "Processing...",
    },
    validation: {
      requiredPhone: "Phone number is required to process your booking.",
      invalidPhone: "Please enter a valid phone number (e.g., +250788123456 or 0788123456).",
      invalidEmail: "Please enter a valid email address.",
      invalidName: "Please enter a valid name without numbers or special characters.",
      selectService: "Please select a service.",
      maxFileSize: "File size exceeds 10MB. Please upload a smaller file.",
      maxDocuments: "You can only upload up to 3 documents. Please remove a document before adding another.",
      selectFile: "Please select at least one document to upload.",
    },
    success: {
      title: "Booking Received!",
      message: "Thank you for booking with PSN Rwanda. We have received your request and will contact you shortly.",
      trackingLabel: "Your Tracking Number:",
      trackingNote: "Write this down or take a screenshot - you'll need it to check your booking status",
      contactInfo: "We will contact you via your provided phone number within 24 hours to discuss your request.",
      trackButton: "Track Your Booking",
      homeButton: "Return to Home",
    },
    serviceDetails: {
      loading: "Loading service details...",
      noService: "No Service Selected",
      noServiceMessage: "Please select a service from the dropdown to see details",
      details: "Service Details:",
      pricing: "Pricing:",
      estimatedTime: "Estimated Time:",
    },
    infoBox: {
      title: "What happens next?",
      steps: [
        "You'll receive a booking reference number.",
        "Our team will contact you via phone within 24 hours.",
        "We'll discuss your specific needs and schedule an appointment if needed.",
        "You can track your booking status using your booking reference."
      ],
    },
  },

  // Track Booking page
  track: {
    title: "Track Your Booking",
    subtitle: "Check the status of your service request.",
    findBooking: "Find your booking",
    byTrackingNumber: "By Tracking Number",
    byPhoneNumber: "By Phone Number",
    enterTrackingNumber: "Enter Tracking Number",
    enterPhoneNumber: "Enter Phone Number",
    trackingPlaceholder: "e.g. PSN-12345",
    phonePlaceholder: "e.g. +250788123456",
    trackButton: "Track",
    searching: "Searching...",
    noBookingFoundTracking: "No booking found with this tracking number.",
    noBookingFoundPhone: "No bookings found with this phone number.",
    bookingsFound: "{count} Booking|{count} Bookings Found",
    bookingDetails: {
      trackingNumber: "Tracking #:",
      status: "Status:",
      clientName: "Client Name",
      phoneNumber: "Phone Number",
      email: "Email",
      service: "Service",
      createdOn: "Created On",
      lastUpdated: "Last Updated",
      referenceNumber: "Reference #",
      documentsAttached: "{count} Document Attached|{count} Documents Attached",
      notes: "Notes"
    },
    statuses: {
      pending: "Pending",
      inProgress: "In Progress",
      completed: "Completed",
      cancelled: "Cancelled"
    },
    needHelp: {
      title: "Need Help?",
      description: "If you cannot find your booking or need assistance, please contact us:",
      call: "Call: +250 788 859 612",
      email: "Email: info@psnrwanda.com",
      visit: "Visit: Nyamabuye, Muhanga, Southern Province, Rwanda"
    }
  },

  // Contact page
  contact: {
    title: "Contact Us",
    subtitle: "Get in touch with our team for any inquiries or to schedule a consultation.",
    info: {
      title: "Contact Information",
      address: {
        label: "Address",
        value: ["Nyamabuye, Muhanga", "Southern Province, Rwanda"],
      },
      phone: {
        label: "Phone",
        value: "+250 788 859 612",
      },
      email: {
        label: "Email",
        value: "info@psnrwanda.com",
      },
      hours: {
        label: "Business Hours",
        value: ["Monday - Friday: 8:00 AM - 5:00 PM", "Saturday: 9:00 AM - 1:00 PM", "Sunday: Closed"],
      },
    },
    form: {
      title: "Send us a Message",
      success: "Thank you for your message! We'll get back to you shortly.",
      fields: {
        name: {
          label: "Full Name *",
          placeholder: "Enter your full name",
        },
        email: {
          label: "Email Address *",
          placeholder: "Enter your email address",
        },
        phone: {
          label: "Phone Number",
          placeholder: "Enter your phone number",
        },
        subject: {
          label: "Subject *",
          placeholder: "Select a subject",
          options: {
            select: "Select a subject",
            notaryServices: "Notary Services",
            propertyManagement: "Property Management",
            leasingRenting: "Leasing & Renting",
            taxServices: "Tax Services",
            generalInquiry: "General Inquiry",
          },
        },
        message: {
          label: "Message *",
          placeholder: "Enter your message here",
        },
      },
      submitButton: "Send Message",
      sending: "Sending...",
    },
    location: {
      title: "Our Location",
      description: "Our office is conveniently located in Nyamabuye, Muhanga in the Southern Province of Rwanda. We're easily accessible from the main highway and welcome clients to visit us during our regular business hours.",
      directions: "If you need directions or have trouble finding us, please don't hesitate to call us at +250 788 859 612.",
    },
  },

  // Common footer elements
  footer: {
    company: "PSN Rwanda",
    description: "Professional legal and notary services, property management, leasing, and tax consultancy in Rwanda.",
    rightsReserved: "All rights reserved",
    quickLinks: "Quick Links",
    servicesTitle: "Our Services",
    contactUs: "Contact Us",
    registrationNo: "Registration No",
    incorporated: "Incorporated",
    subscribe: {
      title: "Subscribe to our Newsletter",
      placeholder: "Your email address",
      button: "Subscribe",
      success: "Thank you for subscribing!",
    },
    copyright: "© 2023 PSN Rwanda. All rights reserved.",
  },

  // Not Found page
  notFound: {
    title: "Page Not Found",
    message: "The page you are looking for doesn't exist or has been moved.",
    backButton: "Back to Home"
  },
};

export default en; 