export const site = {
  name: 'Ruang Studio',
  description:
    'Ruang Studio designs luxury residential homes in Singapore. Four to six projects a year. Both founders on every one.',
  url: 'https://ruangstudio.co',
  email: 'hello@ruangstudio.co',
  nav: [
    { label: 'Projects', href: '#projects' },
    { label: 'About',    href: '#about'    },
    { label: 'Contact',  href: '#contact'  },
  ],

  footer: {
    heading: 'A studio for the long-term.',
    description: [
      'Ruang Studio designs luxury residential homes',
      'in Singapore. Four to six projects a year.',
      'Both founders on every one.',
    ],
    sitemapLabel: 'Sitemap',
    sitemap: [
      { label: 'Home',     href: '/'         },
      { label: 'About',    href: '#about'    },
      { label: 'Projects', href: '#projects' },
      { label: 'Contact',  href: '#contact'  },
    ],
    workLabel: 'Work with us',
    copyright: '© 2026. Ruang Studio. All rights reserved',
    legal: [
      { label: 'Privacy policy',       href: '/privacy' },
      { label: 'Terms and conditions', href: '/terms'   },
    ],
    social: { label: 'Instagram', href: 'https://instagram.com/ruangstudio' },
  },
} as const;
