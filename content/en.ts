// English content layer — the international accessibility layer and the canonical
// dictionary shape. Ukrainian (ua.ts) is the source-of-truth language and is
// type-checked against this shape.

export const en = {
  meta: {
    title: "Faculty of Chemistry — Taras Shevchenko National University of Kyiv",
    description:
      "The Faculty of Chemistry at Taras Shevchenko National University of Kyiv — five departments, research-led teaching, and active scientific work across the core areas of chemistry.",
  },

  ui: {
    menu: "Menu",
    skip: "Skip to content",
    primaryNav: "Primary",
    languageNav: "Language",
    headOfDepartment: "Head of department",
    dean: "Dean of the Faculty",
    deanNamePending: "Name to be confirmed",
  },

  brand: { short: "KNU Chemistry" },

  nav: [
    { label: "Research", href: "/research" },
    { label: "Departments", href: "/departments" },
    { label: "Faculty", href: "/faculty" },
    { label: "Admissions", href: "/admissions" },
    { label: "About", href: "/about" },
    { label: "Contacts", href: "/contacts" },
  ],

  hero: {
    eyebrow: "KNU · Faculty of Chemistry",
    title: "A research-driven faculty of chemistry.",
    lead: "Laboratories, publications, and active scientific work are part of everyday education here — across five departments of chemistry.",
    ctaResearch: "Explore research",
    ctaPrograms: "Admissions",
    metaAreasLabel: "Departments",
    metaAreas: "Inorganic · Organic · Analytical · Physical · Macromolecular",
    metaProgramsLabel: "Programs",
    metaPrograms: "Bachelor’s · Master’s · PhD",
    metaLocationLabel: "Location",
    metaLocation: "Kyiv, Ukraine",
    figureCaption: "Research laboratory",
  },

  research: {
    eyebrow: "Research",
    title: "Research runs through every level of the faculty.",
    lead: "Scientific work is part of teaching, not separate from it. Students join active laboratories early and work alongside the researchers who teach them.",
    threads: [
      {
        title: "Catalysis and green chemistry",
        desc: "Selective catalytic systems for cleaner synthetic routes.",
      },
      {
        title: "Functional and coordination materials",
        desc: "Structure–property studies of coordination compounds and functional solids.",
      },
      {
        title: "Analytical and electrochemical methods",
        desc: "Methods for measuring and understanding complex chemical systems.",
      },
    ],
  },

  areas: {
    eyebrow: "Scientific areas",
    title: "Five departments of chemistry",
    all: "All research areas",
  },

  programs: {
    eyebrow: "Programs",
    title: "Study chemistry at every level",
    items: [
      {
        level: "Undergraduate",
        title: "Bachelor’s Programme",
        desc: "A foundation in core chemistry with laboratory work from the first year.",
        cta: "Programme details",
      },
      {
        level: "Graduate",
        title: "Master’s Programme",
        desc: "Specialised study built around a substantial independent research project.",
        cta: "Programme details",
      },
      {
        level: "Doctoral",
        title: "PhD & Doctoral Studies",
        desc: "Original research within an active department, leading to a dissertation.",
        cta: "Research degrees",
      },
    ],
  },

  labs: {
    eyebrow: "Laboratories",
    title: "Facilities built for active research",
    lead: "The faculty’s laboratories support synthetic, analytical, and physical chemistry — and are where students do their first real scientific work.",
    cta: "Explore laboratories",
    figureCaption: "Spectroscopy laboratory",
    items: [
      {
        name: "Synthesis Laboratory",
        focus: "Organic and inorganic preparative chemistry.",
      },
      {
        name: "Analytical & Spectroscopy Laboratory",
        focus: "Chromatography, spectroscopy, and structural analysis.",
      },
      {
        name: "Physical Chemistry Laboratory",
        focus: "Kinetics, electrochemistry, and thermal analysis.",
      },
    ],
  },

  faculty: {
    eyebrow: "Faculty & departments",
    title: "Five departments, led by working scientists",
    all: "All faculty",
    deanNote:
      "The Dean’s Office leads the faculty’s academic and scientific work and represents it within the University and internationally.",
  },

  news: {
    eyebrow: "News & activity",
    title: "From the faculty",
    all: "All news",
    featured: {
      date: "May 2026",
      kind: "Seminar",
      title: "Spring seminar series in physical chemistry",
      excerpt:
        "A series of talks on thermodynamics, kinetics, and spectroscopy, open to students across all years.",
    },
    items: [
      {
        date: "Apr 2026",
        kind: "Admissions",
        title: "Information session for prospective undergraduate students",
      },
      {
        date: "Mar 2026",
        kind: "Research",
        title: "Recent publications from the analytical chemistry group",
      },
      {
        date: "Feb 2026",
        kind: "Lectures",
        title: "Open lectures on contemporary organic synthesis",
      },
    ],
  },

  admissions: {
    eyebrow: "Admissions",
    title: "Considering chemistry at KNU?",
    lead: "Information on requirements, deadlines, and the application process for undergraduate, graduate, and doctoral study.",
    ctaReq: "Admission requirements",
    ctaContact: "Contact the faculty",
  },

  footer: {
    facultyName: "Faculty of Chemistry",
    university: "Taras Shevchenko National University of Kyiv",
    addressLines: ["12 Hetmana Skoropadskoho St", "Kyiv 01033, Ukraine"],
    email: "chem@knu.ua",
    phone: "+38 (044) 239-33-58",
    columns: [
      {
        title: "Research",
        links: [
          { label: "Research areas", href: "/research" },
          { label: "Departments", href: "/departments" },
          { label: "Faculty", href: "/faculty" },
        ],
      },
      {
        title: "Study",
        links: [
          { label: "Admissions", href: "/admissions" },
          { label: "About the faculty", href: "/about" },
          { label: "Contacts", href: "/contacts" },
        ],
      },
    ],
    rights:
      "© 2026 Faculty of Chemistry · Taras Shevchenko National University of Kyiv",
    location: "Kyiv, Ukraine",
  },

  pages: {
    about: {
      eyebrow: "About the faculty",
      title: "A chemistry faculty organised around research",
      lead: "The Faculty of Chemistry of Taras Shevchenko National University of Kyiv educates chemists across five departments, with teaching grounded in active scientific work.",
      body: [
        "The faculty brings together inorganic, organic, analytical, physical, and macromolecular chemistry. Students move from foundational coursework into laboratory research early, and graduate study is built around original scientific projects.",
        "Research is treated as the centre of the faculty’s work — visible in its departments, laboratories, and publications, and integrated into education at every level.",
      ],
    },
    departments: {
      eyebrow: "Departments",
      title: "Five departments of chemistry",
      lead: "The faculty is organised into five departments, each led by a head and responsible for teaching and research in its area.",
    },
    research: {
      eyebrow: "Research",
      title: "Scientific work across the faculty",
      lead: "Research at the faculty spans the core areas of chemistry, carried out in its departments and laboratories and integrated into teaching.",
    },
    faculty: {
      eyebrow: "Faculty",
      title: "Academic staff",
      lead: "The faculty’s academic staff work across its five departments. This page presents departmental leadership; the full roster is organised by department.",
      rosterNote:
        "Full academic staff listings are organised by department and will expand as profiles are added.",
    },
    admissions: {
      eyebrow: "Admissions",
      title: "Applying to the Faculty of Chemistry",
      lead: "Admission to undergraduate, graduate, and doctoral study. This page outlines the structure of study and how to apply.",
      sections: [
        {
          title: "Undergraduate study",
          body: "A four-year Bachelor’s programme in chemistry, with laboratory work from the first year.",
        },
        {
          title: "Graduate and doctoral study",
          body: "Master’s study built around an independent research project, followed by PhD and doctoral research within a department.",
        },
      ],
    },
    contacts: {
      eyebrow: "Contacts",
      title: "Contact the faculty",
      lead: "The Faculty of Chemistry is located in central Kyiv. General enquiries are handled by the Dean’s Office.",
      deanOfficeLabel: "Dean’s Office",
    },
  },
};
