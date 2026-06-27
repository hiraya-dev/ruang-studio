export const home = {
  hero: {
    headline: 'A home that feels completely like you.',
    tagline: 'Singapore — Luxury Residential',
  },

  contact: {
    eyebrow: 'Contact',
    heading: 'A home takes years to live in. It should take more than a day to commission.',
    intro: [
      'If you have recently acquired a property in Singapore and are thinking seriously about what comes next, we would like to hear from you.',
      'We respond to every inquiry personally. If your project is a good fit, we will suggest a time to speak.',
    ],
    fields: {
      name: { label: 'Your name', placeholder: 'Your name' },
      email: { label: 'Email address', placeholder: 'Your email address' },
      message: {
        label: 'About your project',
        placeholder: 'Tell us about your property and what you are hoping to create.',
      },
    },
    process: {
      label: 'Where are you in the process?',
      options: [
        'Just exploring',
        'Recently acquired a property',
        'Ready to begin',
        'Mid-renovation',
      ],
    },
    referral: {
      label: 'How did you hear about us?',
      options: ['Architectural Digest', 'Instagram', 'A referral', 'Other'],
    },
    submit: 'Begin a conversation',
    signoffPrefix: 'Ruang Studio Singapore',
  },

  values: {
    eyebrow: 'What we believe',
    imageAlt: 'Fluted wall in afternoon light beside a tan leather armchair',
    items: [
      {
        number: '01',
        title: 'Listening',
        body: "Before we suggest anything, we try to understand everything. How you move through a room. What you cannot stand about your current home. What a Sunday morning looks like for your family. Design that skips this step produces beautiful spaces that feel like someone else's life.",
      },
      {
        number: '02',
        title: 'Restraint',
        body: 'Every element in a room competes for attention. We add only what earns its place. This is not minimalism for its own sake. It is the discipline of knowing when a space is finished and stopping there.',
      },
      {
        number: '03',
        title: 'Permanence',
        body: 'Trends are easy to follow and expensive to undo. We design for the version of you that exists ten years from now, not the mood board you saved last week.',
      },
    ],
  },

  about: {
    eyebrow: 'About Ruang Studio',
    heading:
      'Most homes are designed to impress visitors. We design them for the people who actually live there.',
    body: 'Ruang Studio was founded in 2016 by Maya Tan and Priya Nair. We work exclusively on luxury residential projects in Singapore. Four to six projects a year. Both founders on every one. The first three months of any engagement involve no design decisions. Only conversations, observations, and questions. We take on a limited number of projects each year because good design requires time and attention that cannot be divided infinitely.',
    note: 'Featured in Architectural Digest Southeast Asia, 2023.',
    imageAlt: 'Ruang Studio founders Maya Tan and Priya Nair in the studio',
  },

  projects: {
    eyebrow: 'Selected works',
    columns: {
      number: 'Number',
      project: 'Project',
      typology: 'Typology',
      date: 'Date',
    },
    // `images` indexes into the imported set in Projects.astro (0–2).
    // NOTE: only project 001's images are designed in Figma; 002–005 reuse
    // them as placeholders until real per-project photography is supplied.
    items: [
      { number: '001', name: 'Bukit Timah Residence',   typology: 'Landed Property',  date: '2021 — 2023', images: [0, 1, 2] },
      { number: '002', name: 'Nassim Hill Penthouse',    typology: 'Penthouse',        date: '2022 — 2024', images: [0, 1, 2] },
      { number: '003', name: 'Coronation Road Bungalow', typology: 'Bungalow',         date: '2020 — 2022', images: [0, 1, 2] },
      { number: '004', name: 'Cluny Park Residence',     typology: 'Condominium',      date: '2023 — 2024', images: [0, 1, 2] },
      { number: '005', name: 'Dempsey Hill Studio',      typology: 'Studio Apartment', date: '2022 — 2023', images: [0, 1, 2] },
    ],
  },
} as const;
