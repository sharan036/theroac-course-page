# ROAC Course Builder — existing Sequelize Course backend integration

This branch adds a dynamic page renderer and dashboard without changing the existing home page.
The source files provided by the project owner are `Course.js`, `CourseCategory.js`, `CourseSection.js`, `CourseEnrollment.js`, and `models/index.js`. They define database field names and associations, **not API endpoint URLs or controller permissions**.

## Pages

- Public: `/courses/no-code-simulation`
- Dashboard: `/admin`
- Existing home page `/` remains unchanged.

## Canonical data model

**Course** (`courses`) is the source of truth for:
`id`, `title`, `slug`, `benefits`, `subtitle`, `description`, `thumbnail`,
`previewVideo`, `instructorId`, `organizationId`, `categoryId`, `level`, `language`,
`price`, `discountPrice`, `currency`, `isFree`, `status`, `isPublished`,
`publishedAt`, `totalDurationMins`, `totalLessons`, `totalSections`,
`totalEnrollments`, `totalRatings`, `averageRating`, `requirements`,
`whatYouLearn`, `tags`, `targetAudience`, `hasCertificate`, `hasQuizzes`,
`hasAssignments`, `accessDurationDays`, `isUnlisted`.

**CourseSection** (`course_sections`) supplies: `id`, `courseId`, `title`,
`description`, `order`, `totalLessons`, `totalDurationMins`, `isPublished`.
Published sections sorted by `order` can replace the page's curriculum cards.

**CourseCategory** (`course_categories`) supplies course classification through `categoryId`.
Display its `name` via the existing `category` association.

**CourseEnrollment** (`course_enrollments`) is separate from marketing pages. Its
`userId`, `courseId`, `enrollmentType`, `amountPaid`, `progressPercent`,
`lessonsCompleted`, `enrolledAt`, `expiresAt`, and `status` belong behind
authenticated student/admin interfaces. **This public page never exposes enrollment rows.**
`amountPaid` is in paise according to the supplied model; the `Course.price`
unit must be confirmed with the backend controller before display.

## How this branch integrates with backend data

The opt-in adapter is `lib/backend-course-api.ts`. It uses the real backend's field
names and supports a direct Course response, `{course,sections,category}`, or
`{data:{course,sections,category}}`.

Server-side GET of a configured course overlays:
- `Course.subtitle` → landing hero heading (if supplied).
- `Course.description` → landing hero description and SEO description.
- `Course.title` → SEO title.
- Published, ordered `CourseSection` rows → curriculum cards.
- Course and category metadata → authenticated dashboard's **Course** tab.

**Public safety:** With backend mode enabled, the page is displayed only if
`Course.status === "published"` AND `Course.isPublished === true`. If the
backend cannot verify those flags, the public URL does not render the page.
`isUnlisted` does not necessarily block a direct-link landing page; it controls
catalog visibility at the backend level.

There is a separate **Course** tab at `/admin` which reads exact backend model
fields. The editor may update a restricted text/metadata whitelist: `title`,
`subtitle`, `description`, `thumbnail`, `previewVideo`, `benefits`,
`requirements`, `whatYouLearn`, `tags`, `targetAudience`, `level`, `language`.
Publication, user IDs, payments, prices, aggregates, and enrollments remain
under existing backend admin workflows.


## Verified frontend API base (22 Oct 2026)

The existing frontend at `src/lib/api/client.ts` defines the API base as
`process.env.NEXT_PUBLIC_API_URL || "https://api.theroac.com/api"`.
The course server adapter now reuses that value, with the same production
default. **You do not need a new backend or a second database.**

```dotenv
NEXT_PUBLIC_API_URL=https://api.theroac.com/api
# Optional server-only override, leave unset for the same base:
# ROAC_COURSE_BACKEND_BASE_URL=https://api.theroac.com/api

# Still needed: use the exact HTTP routes from the course controller.
# ROAC_COURSE_DETAIL_PATH=/ACTUAL_ROUTE/{slug}
# ROAC_COURSE_UPDATE_PATH=/ACTUAL_ROUTE/{id}
```

The user provided `https://api.theroac.com/`, which is the host root.
The `/api` prefix comes from the checked-in frontend configuration, not from
verified live course route documentation. As of this edit, access to the
public API host from the assistant's web/container environment is unavailable;
the GitHub Actions read-only probe can independently report response status.
Do not treat example course route templates as confirmed.

The `cms-course-content` branch was restored after the earlier PR had been
merged and branch cleanup removed it. The restored data was seeded from
`data/course-default.json` on `main`. This is the editable page-design
store, not a replacement for your Sequelize Course table.

## Runtime configuration — Vercel

The existing frontend uses `NEXT_PUBLIC_API_URL` (previously
`https://api.theroac.com/api` was its fallback); the server-side adapter can
reuse it. Prefer a **server-only** `ROAC_COURSE_BACKEND_BASE_URL` if the internal
host differs.

```dotenv
# Auth for THIS builder until integrated with the existing ROAC admin identity system.
ROAC_ADMIN_PASSWORD=<long unique admin password>
ROAC_ADMIN_SESSION_SECRET=<random secret of at least 32 characters>

# Presentation JSON publishing (legacy interim storage)
ROAC_GITHUB_TOKEN=<fine-grained GitHub Contents read/write token>
ROAC_CMS_REPO=sharan036/theroac-course-page
ROAC_CMS_BRANCH=cms-course-content

# Course API integration (replace these example paths with your real controller routes)
ROAC_COURSE_BACKEND_BASE_URL=https://api.theroac.com/api
ROAC_COURSE_DETAIL_PATH=/courses/{slug}
ROAC_COURSE_UPDATE_PATH=/courses/{id}
ROAC_COURSE_UPDATE_METHOD=PATCH
ROAC_BACKEND_ADMIN_TOKEN=<backend-authorized server-to-server credential>
```

The two endpoint paths above are **examples, not verified routes**. No
controller, router, or API response sample was supplied. If they differ, set
the templates to the route names actually used in your backend. The actual
backend must authorize updates and validate all fields. If its authentication
uses the ROAC login JWT/cookies instead of a service credential, wire that
authorization into the Next.js server route; do not expose a privileged
credential to the browser.

Without `ROAC_COURSE_DETAIL_PATH`, the page uses the existing JSON presentation
seed and the backend tab shows setup instructions. Without a verified update
path/token, backend fields are displayed read-only.

## Presentation settings

The uploaded Sequelize models have **no fields for landing-page design**.
This branch therefore keeps theme, page blocks, logo, colors, shapes, font sizes,
hero text, layout and FAQs in `content/courses.json` on the
`cms-course-content` branch. This is temporary presentation storage, not a
second canonical courses table. Editing Page/Design/Sections publishes only
presentation fields — backend Course records are **excluded** from that JSON.

A future backend-only implementation should introduce a separate one-to-one
`CoursePageSettings` model with `courseId` (UUID, FK to `courses.id`, unique),
`pageConfig` (JSON), `revision` (integer), `updatedBy`, `createdAt`, and
`updatedAt`. It should reuse the existing Course and CourseSection records,
not clone them. Access control, optimistic locking, validation, and audit logs
are required for production. Such a model and its endpoints are **not present
in the five uploaded files**, and no database migration has been applied.

When backend mode is enabled, a landing page can be created in the dashboard
only after the same slug exists in the backend. The backend must also publish
the course for the page to become publicly visible.

## Course-specific admissions

The supplied 30-Day No-Code Simulation brief says the cohort selects 30
candidates via an assessment and **there is no program fee for selected
candidates**. Do not turn this into open, instant enrollment or send applicants
to the old paid registration modal. The correct assessment/application form URL
must be configured separately; leaving it blank disables the CTA.

## Verification

```sh
npm ci
npx tsc --noEmit
npm run build
```

GitHub Actions runs these commands for the draft PR. The frontend requires
Vercel/Next.js server routes, not GitHub Pages static export. For live backend
integration, test the real Course endpoints, published and draft gating,
backend save authorization, changes to curriculum ordering, and response
envelopes before merging.

Keep the admin password, JWT secret, backend token and GitHub token in
server-only Vercel environment variables. The password-login is an interim
dashboard gate; integrate existing admin SSO/role permissions and login rate
limits before production.
