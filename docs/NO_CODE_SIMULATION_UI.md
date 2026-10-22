# /courses/no-code-simulation — original ROAC homepage style

## Purpose

The course route should **look like the existing theroac-course-page home page** while containing accurate 30-Day No-Code Simulation information. The homepage at `/` stays intact.

## Matched visual patterns from the reference repository

- Floating white navigation with the original black diagonal logo panel, orange CTA, and responsive mobile menu.
- Black textured hero with the same background assets, spotlights, large centered heading, AI prompt typing box, orange CTA, and 16:9 preview image.
- Original illustrated circular *Builder's Loop* component, with the simulation's editable challenge text.
- Original dark overview / light cream benefit cards.
- Original dashed-border curriculum header and expandable accordion rows.
- Original white project cards, diagram illustrations, and Swiper carousel.
- Original statistics card treatment adapted to program details.
- Original dark two-column pricing/selection visual, but with assessment steps and **no payment flow**.
- Original white closing CTA layout, black FAQ accordion, and cream footer.

Existing components were reused and given optional Course props. Without those props, the original homepage continues to render its own existing content.

## Content integrity

This page is about an **application/assessment-based program** selecting 30 candidates for a 30-day, no-code product-building simulation, with no program fee for selected candidates.

It intentionally **does not reuse** the homepage's fake cookie-driven seat countdown, old batch dates, paid registration modal, price routing, unsourced salary chart, stock applicant faces or unverified testimonial claims.

The application button is rendered as an inactive call to action until a valid official URL is published in the existing course dashboard.

## Editable fields

The same /admin course studio controls text, the section order/visibility, logos, accent color, page sizing, hero heading size, selected card rounding, shape of primary buttons and font family.

The public route remains /courses/no-code-simulation. Its presentation data maps to the expected backendSlug 30-days-no-code-simulation; this remains adjustable in the editor and should be confirmed after backend Course creation.

## Verification

The GitHub workflow `.github/workflows/no-code-ui-check.yml` checks TypeScript, Next.js production build, and HTTP 200 for both `/` and `/courses/no-code-simulation`, with a basic content smoke test.

The existing backend integration remains an opt-in via ROAC_COURSE_BACKEND_ENABLED; enabling it before the record is published returns 404 by design.

Visually QA both routes at desktop and mobile widths before merging. CSS/component reuse supports close matching but is not a claim of verified pixel-perfect screenshot equivalence.
