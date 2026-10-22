/**
 * Read-only ROAC API connectivity probe for CI.
 * Prints status, type and a small set of JSON key names (never response values).
 * Route responses do NOT establish controller semantics, auth or write permissions.
 */
const root = "https://api.theroac.com";
const paths = [
  "/",
  "/api",
  "/api/health",
  "/api/courses",
  "/api/courses/no-code-simulation",
  "/api/__roac_unknown_route_probe_20261022__",
  "/api-docs",
  "/swagger.json",
];
const safe = /^(?:[a-zA-Z0-9_]){1,48}$/;
for (const path of paths) {
  const url = root + path;
  try {
    const res = await fetch(url, {
      method:"GET",
      headers:{Accept:"application/json"},
      redirect:"manual",
      signal:AbortSignal.timeout(6500),
    });
    const type = (res.headers.get("content-type") || "").split(";")[0];
    let keys = "";
    if (type.includes("json") && Number(res.headers.get("content-length") || 0) < 100_000) {
      // We inspect *field names only*. Never print confidential or personal data values.
      try {
        const body = await res.json();
        if (body && typeof body === "object" && !Array.isArray(body)) {
          keys = Object.keys(body).filter(x=>safe.test(x)).slice(0,12).join(",");
        }
      } catch { /* invalid or oversized body */ }
    } else {
      try { await res.body?.cancel(); } catch { /* ignore */ }
    }
    console.log(JSON.stringify({path,status:res.status,contentType:type,keys,locationRedirect:res.status>=300&&res.status<400}));
  } catch (error) {
    const reason = error instanceof Error ? error.name : "request-failed";
    console.log(JSON.stringify({path,error:reason}));
  }
}
