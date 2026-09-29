# Margins — handwritten magazine landing page

Single-page site for NCERC's handwritten magazine. Vite + React + GSAP (ScrollTrigger) + Lenis.

```bash
npm install
npm run dev      # local dev
npm run build    # production build -> dist/
npm run logos    # re-strip white backgrounds from /logo into /public/logos
```

## Edit before launch
- **Connect the enrolment form to a Google Sheet:** follow `apps-script/README.md`, then paste the Web app URL into `enrollEndpoint` in `src/config.js`.
- `src/config.js`: Instagram, contact email, magazine name, and the branch/semester lists (`ENROLL`).
- `src/components/MagazinePage.jsx`: the page is drawn in SVG. Swap in scans of real student pages (WebP, lazy-loaded) when you have them.

## Structure
- `src/lib/lenis.js`: one scroll system (Lenis driven by the GSAP ticker; touch stays native; off for reduced motion)
- `src/lib/useGsap.js`: `gsap.context` + `gsap.matchMedia` per component, reverted on unmount
- `src/animations/*`: hero intro, batched reveals, hook scene, magazine parallax, collective gather
- `src/components/*`: one component per section
