// Everything a club organiser needs to edit lives here.
export const SITE = {
  collegeName: 'Nehru College of Engineering and Research Centre',
  collegeShort: 'NCERC',
  groupName: 'Nehru Group of Institutions',
  magazineName: 'Margins', // working title - rename freely
  year: 2026,
  // The Google Apps Script "Web app" URL that saves entries to the Sheet.
  // See apps-script/README.md. Until it's set, the form explains it isn't open yet.
  enrollEndpoint: 'https://script.google.com/macros/s/AKfycbz5V0e6Z4JkbRCoyNyM_VmF8MvzcfSmGzeMRDpXrf61sM9sY6BRdQGt5POSJysUhbDuDQ/exec',
  instagramUrl: 'https://instagram.com/',
  contactEmail: 'magazine@ncerc.ac.in',
}

// Enrolment form options. Every course is B.Tech.
export const ENROLL = {
  branches: ['CSE-A', 'CSE-B', 'CSE (AI/ML)', 'ECE', 'EEE', 'Mechanical', 'Mechatronics'],
  semesters: ['S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7', 'S8'],
  contributions: ['Write', 'Draw', 'Capture', 'Create'],
  courseYears: 4,
  admissionMonth: 7, // August (0 = January): when the new first-years join
}

/**
 * Batches currently in college, newest first, e.g. "2026–2030" ... "2023–2027".
 * Derived from today's date so the list never goes stale: from August the
 * new first-year batch appears and the graduated one drops off.
 */
export function currentBatches(today = new Date()) {
  const year = today.getFullYear()
  const latestAdmission = today.getMonth() >= ENROLL.admissionMonth ? year : year - 1
  return Array.from({ length: ENROLL.courseYears }, (_, i) => {
    const start = latestAdmission - i
    return `${start}–${start + ENROLL.courseYears}`
  })
}

// Logos have their white background removed by `npm run logos`
// (scripts/remove-bg.mjs), which writes to /public/logos.
export const LOGOS = {
  college: { src: '/logos/ncerc', width: 400, height: 296, alt: 'NCERC crest' },
  group: { src: '/logos/nehrugrpofinst', width: 254, height: 383, alt: 'Nehru Group of Institutions logo' },
}
