# ROAC Course Builder — existing backend integration

Source: private sharan036/TheROAC, Server/src/app.js, routes/course.js, routes/dashboard.js, controllers/courseController.js, middleware/auth.js. Landing-page code: sharan036/theroac-course-page.

## Exact Express routes (source code verified)

| Method | Path | Access |
| --- | --- | --- |
| GET | /api/learn/courses | Public: published and listed courses |
| GET | /api/learn/courses/:slug | Optional auth: published course detail |
| GET | /api/learn/dashboard/courses?search=slug | Instructor/admin JWT |
| GET | /api/learn/dashboard/courses/:courseId | Instructor/admin JWT |
| POST | /api/learn/courses | Authenticated instructor/admin |
| PUT | /api/learn/courses/:id | Course owner or admin |
| PATCH | /api/learn/courses/:id/publish | Course owner or admin |
| GET | /api/learn/courses/:id/curriculum | Authenticated |
| GET | /api/learn/courses/:courseId/sections | Authenticated |
| POST | /api/learn/courses/:courseId/sections | Course owner/admin |
| PUT | /api/learn/courses/:courseId/sections/:id | Course owner/admin |

Existing API base URL: https://api.theroac.com/api (already used by src/lib/api/client.ts).

Actual controller response shapes:
- GET /api/learn/courses/:slug returns { course, isEnrolled }.
- GET /api/learn/dashboard/courses returns { courses, pagination }.
- GET /api/learn/dashboard/courses/:courseId returns { course, analytics, recentEnrollments, recentReviews }.
- PUT /api/learn/courses/:id returns { message, course }.

This frontend sends only whitelisted Course model fields to its editor and never relays learner analytics or enrollment rows to public pages.

## Security

TheROAC uses Authorization: Bearer JWT authentication and enforces course instructor or administrator access via isInstructor. This frontend reads the existing auth_token cookie on the server and forwards it to the backend. The cookie is normally stored by the existing ROAC frontend on domain .theroac.com, so a Vercel preview or unrelated hostname will not receive it. If a separate deployment absolutely requires a server-side service credential, ROAC_BACKEND_ADMIN_TOKEN can be supplied as a secret. Prefer normal TheROAC administrator login; never expose a bearer token to browser JavaScript, commit files or logs.

The standalone course-builder password is retained as an additional interim gate; a normal TheROAC authorized identity is still required by the backend. For production, replace the separate password with TheROAC SSO and role checks, with login throttling and audit trails.

GET /api/learn/courses/:slug includes only published course details; it does not include curriculum sections. Authenticated GET /api/learn/courses/:courseId/sections includes nested lessons and can contain lesson content and resources. Consequently the public landing page uses marketing-only week cards from its presentation store, never privileged lesson endpoints. The private dashboard shows redacted section metadata from the authenticated instructor detail API.

The backend changes a course slug when title changes. The Course editor keeps title read-only until a coordinated course/page slug-rename flow exists. Subtitle and description can be edited normally.

## Deployment variables

    NEXT_PUBLIC_API_URL=https://api.theroac.com/api
    # Optional server-only override if using a different backend hostname:
    # ROAC_COURSE_BACKEND_BASE_URL=https://api.theroac.com/api

    # Do not enable until the Course row exists and is published:
    ROAC_COURSE_BACKEND_ENABLED=false

    ROAC_ADMIN_PASSWORD=<long unique admin password>
    ROAC_ADMIN_SESSION_SECRET=<at least 32 random characters>

    # Course page branding/content (separate from SQL Course data)
    ROAC_GITHUB_TOKEN=<fine-grained GitHub Contents read/write token>
    ROAC_CMS_REPO=sharan036/theroac-course-page
    ROAC_CMS_BRANCH=cms-course-content

    # Optional fallback only when the .theroac.com session cookie cannot be received:
    # ROAC_BACKEND_ADMIN_TOKEN=<existing authorized backend bearer token>

The old guessed ROAC_COURSE_DETAIL_PATH, ROAC_COURSE_UPDATE_PATH and ROAC_COURSE_UPDATE_METHOD flags are no longer used. Code uses verified route patterns and PUT directly.

Public course: /courses/no-code-simulation
Editor: /admin
Original homepage: /

To use backend mode: first create the ROAC 30-Day No Code Simulation course in the existing course administration system, add its sections and publish it. Confirm its slug is no-code-simulation. Then set ROAC_COURSE_BACKEND_ENABLED=true and redeploy the frontend. When enabled, absent/unpublished courses intentionally return 404.

The current separate cms-course-content GitHub branch is a temporary presentation store for colors, fonts, spacing, logos, FAQ, section layouts, CTA and campaign copy. It is not a second courses table. For fully database-backed design management, add a one-to-one CoursePageSettings model with courseId foreign key, JSON pageConfig, revisions and audit metadata. No backend migration has been applied.

The provided program brief specifies assessment-based selection for up to 30 candidates and no fee for those selected. Do not confuse Course.isFree with automatic selection/enrollment. The application CTA remains disabled until a verified assessment/application URL is supplied.

## Verification

Run npm ci, npx tsc --noEmit and npm run build. The course builder runs on Vercel/Next.js server, not static GitHub Pages.

A GitHub Actions read-only API probe received 401 for some /api URLs including a deliberately nonexistent route; that suggests a gateway/global middleware may reject anonymous requests before route handling. The exact Express paths above are confirmed against source code, but authenticated behavior on the deployed host has not been verified. Live integration must be checked with a genuine authorized instructor/admin account. Never paste credentials into PRs or chat.

## Backend issue to review separately

Server/src/controllers/courseSectionController.js listSections includes the Lesson content/resources attributes in its authenticated response even when the requestor is not an instructor or enrolled learner. Review and restrict those sensitive attributes in TheROAC before reusing that endpoint more broadly. Public landing pages MUST NOT call this endpoint.
