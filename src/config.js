// Everything a club organiser needs to edit lives here.
export const SITE = {
  collegeName: 'Nehru College of Engineering and Research Centre',
  collegeShort: 'NCERC',
  groupName: 'Nehru Group of Institutions',
  magazineName: 'Margins', // working title - rename freely
  year: 2026,
  formUrl: 'https://forms.gle/your-google-form-id', // TODO: paste the real Google Form link
  instagramUrl: 'https://instagram.com/',
  contactEmail: 'magazine@ncerc.ac.in',
}

// Logos have their white background removed by `npm run logos`
// (scripts/remove-bg.mjs), which writes to /public/logos.
export const LOGOS = {
  college: { src: '/logos/ncerc', width: 400, height: 296, alt: 'NCERC crest' },
  group: { src: '/logos/nehrugrpofinst', width: 254, height: 383, alt: 'Nehru Group of Institutions logo' },
}
