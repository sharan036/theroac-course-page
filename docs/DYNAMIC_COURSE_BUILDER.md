# ROAC Dynamic Course Builder

This branch adds a reusable, mobile-friendly course landing page and a browser-based content/branding editor without touching the original home page.

## URLs

- Public course: `/courses/no-code-simulation`
- Course dashboard: `/admin`
- New courses created in the dashboard: `/courses/<slug>`

The first course uses the supplied ROAC **30 Days No Code Simulation** program copy. Selection is assessment-based and selected candidates pay no program fee. **Do not connect this page to the existing paid registration modal.**

## Architecture

```
Browser /admin --HttpOnly admin session--> Next.js API routes
Next.js API routes -- GitHub Contents API --> cms-course-content branch
Browser /courses/[slug] <-- server-rendered latest data -- GitHub Contents API
```

- `data/course-default.json` is the read-only fallback for the seed course.
- `content/courses.json` on branch `cms-course-content` stores all published course documents.
- `lib/course-store.ts` fetches this JSON with `cache: "no-store"`. Published edits are visible without rebuilding the Next.js app.
- The editor uses the same `CourseLanding` React component for live previews.
- Code remains in `main` (after review); CMS data changes stay on a dedicated branch so normal code deployment isn't triggered.

## Vercel configuration

Create these **server-side** variables in Vercel Project Settings → Environment Variables:

```dotenv
ROAC_ADMIN_PASSWORD=<a unique strong admin password>
ROAC_ADMIN_SESSION_SECRET=<a random secret at least 32 characters>
ROAC_GITHUB_TOKEN=<a fine-grained GitHub PAT>
ROAC_CMS_REPO=sharan036/theroac-course-page
ROAC_CMS_BRANCH=cms-course-content
```

GitHub token: fine-grained token restricted to the ROAC repository, with **Contents: Read and Write**. Configure branch protection and store secrets only in Vercel environment settings; **never** commit them to GitHub, `NEXT_PUBLIC_*`, client components, or screenshots. For stronger production security, replace the single-password login with organization SSO, audit logging and per-IP login throttling (e.g., Vercel WAF).

Read access to this public GitHub repository works without a token, but **dashboard publishing requires a token**. Without the password/secret, the dashboard displays setup instructions. Without the GitHub token, the public landing page still shows the seed course, but the Publish action fails safely.

## What can be edited

- Brand name, logo URL, logo alt, accent/foreground/background/surface/muted colors.
- Font (Inter, DM Sans, system), hero/body font sizes, page width, section spacing, corner rounding, button shape and hero alignment.
- Hero copy, footnote and hero statistics.
- Challenge bullets; overview/features; curriculum weeks; project examples; assessment process; program details; FAQs; closing CTA.
- Section visibility and order; SEO title/description.
- Application URL (HTTPS or an internal relative path). Apply controls stay disabled until configured.
- Multiple courses by duplicating the current course and giving it a unique slug.

The template controls the *available* layout elements. It is not yet a free-form drag-and-drop builder with arbitrary HTML or custom CSS.

## Review and deployment

1. Open a pull request from `feat/dynamic-course-builder` into `main`. Do not merge until checked.
2. Connect the GitHub project to Vercel if it is not already connected. **Do not use GitHub Pages** for this dynamic branch; the dashboard requires server-side API routes and a runtime.
3. Add the environment variables above to the relevant Vercel environment(s).
4. Preview `/courses/no-code-simulation` and log in to `/admin`. Update a word/color and Publish.
5. Refresh the course URL to verify the change persists across clients.
6. Set the real application URL once the assessment/application destination is ready.
7. Keep the old homepage on `/` until you decide whether to replace it or redirect visitors.

## Local

```sh
npm ci
npm run dev
npx tsc --noEmit
npm run build
```

The Next.js page is dynamically rendered on the server; it must not be compiled with `output: "export"`.

## Operational notes

- GitHub stores each published course update as a commit with version history.
- Saves carry the previous GitHub blob SHA. If another editor published first, a conflict prompts reload instead of silently overwriting data.
- The cookie is HTTP-only, SameSite=Strict, secure in production, signed via HMAC and expires after 12 hours.
- Origin validation protects authenticated editing endpoints from cross-site requests.
- No applicant information is collected or stored by this new page. Add a separate, consent-aware application form and backend workflow later.
