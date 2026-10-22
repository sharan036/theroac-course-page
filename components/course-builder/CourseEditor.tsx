"use client";

import { useCallback, useEffect, useState } from "react";
import CourseLanding from "@/components/course-builder/CourseLanding";
import BackendCoursePanel from "@/components/course-builder/BackendCoursePanel";
import type { Course, CourseItem, SectionId, TextSection } from "@/lib/course-types";
import { SECTION_LABELS, validateCourse } from "@/lib/course-types";

type Tab = "content" | "design" | "sections" | "settings" | "backend";
type SectionKey = "overview" | "weeks" | "projects" | "selection" | "details" | "faqs";

function Field({ label, value, onChange, multiline = false, placeholder = "" }: {
  label: string; value: string; onChange: (value: string) => void; multiline?: boolean; placeholder?: string;
}) {
  return <label className="roac-editor-field">
    <span>{label}</span>
    {multiline
      ? <textarea rows={3} value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} />
      : <input value={value} placeholder={placeholder} onChange={e => onChange(e.target.value)} />}
  </label>;
}
function NumberControl({ label, value, onChange, min, max, step = 1, unit = "px" }: {
  label: string; value: number; onChange: (value: number) => void; min: number; max: number; step?: number; unit?: string;
}) {
  return <label className="roac-editor-field roac-editor-number">
    <span>{label} <strong>{value}{unit}</strong></span>
    <input type="range" min={min} max={max} step={step} value={value} onChange={e => onChange(Number(e.target.value))}/>
  </label>;
}
function ItemEditor({ item, index, onChange, onDelete }: {
  item: CourseItem; index: number; onChange: (field: "title" | "description", value: string) => void; onDelete: () => void;
}) {
  return <div className="roac-editor-item">
    <div className="roac-editor-item-head"><strong>Item {index + 1}</strong><button type="button" onClick={onDelete} aria-label={`Remove item ${index+1}`}>Remove</button></div>
    <Field label="Title" value={item.title} onChange={value => onChange("title",value)} />
    <Field label="Description" value={item.description} multiline onChange={value => onChange("description",value)} />
  </div>;
}

export default function CourseEditor() {
  const [authenticated, setAuthenticated] = useState(false);
  const [configured, setConfigured] = useState(true);
  const [backendMode,setBackendMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [password, setPassword] = useState("");
  const [authError, setAuthError] = useState("");
  const [course, setCourse] = useState<Course | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [sha, setSha] = useState<string | null>(null);
  const [source, setSource] = useState<"github" | "fallback">("fallback");
  const [tab, setTab] = useState<Tab>("content");
  const [activeSection, setActiveSection] = useState<SectionId | "hero">("hero");
  const [previewMobile, setPreviewMobile] = useState(false);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");
  const [dirty, setDirty] = useState(false);

  const loadData = useCallback(async () => {
    const response = await fetch("/api/admin/course", { cache: "no-store" });
    if (!response.ok) { setMessage("Unable to load course configuration."); return; }
    const data = await response.json() as { courses: Course[]; sha: string | null; source: "github" | "fallback"; backendConfigured?: boolean };
    setCourses(data.courses);
    setCourse(data.courses[0] || null);
    setSha(data.sha);
    setSource(data.source);
    setBackendMode(Boolean(data.backendConfigured));
    setDirty(false);
  }, []);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const response = await fetch("/api/admin/session", { cache: "no-store" });
        const state = await response.json() as { authenticated: boolean; configured: boolean };
        if (!mounted) return;
        setAuthenticated(state.authenticated);
        setConfigured(state.configured);
        if (state.authenticated) await loadData();
      } catch {
        if (mounted) setAuthError("Unable to connect to the dashboard.");
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [loadData]);

  const edit = useCallback((path: string, value: unknown) => {
    setCourse(prev => {
      if (!prev) return prev;
      const copy = JSON.parse(JSON.stringify(prev)) as Course;
      const keys = path.split(".");
      let node: Record<string, unknown> = copy as unknown as Record<string, unknown>;
      for (const key of keys.slice(0,-1)) node = node[key] as Record<string, unknown>;
      node[keys[keys.length-1]] = value;
      return copy;
    });
    setDirty(true); setMessage("");
  }, []);
  const editRow = (key: SectionKey, index: number, field: "title" | "description", value: string) => {
    if (!course) return;
    const rows = course[key].items.map((item,i) => i === index ? {...item,[field]:value} : item);
    edit(`${key}.items`,rows);
  };
  const removeRow = (key: SectionKey, index: number) => {
    if (!course) return;
    edit(`${key}.items`,course[key].items.filter((_,i)=>i!==index));
  };
  const addRow = (key: SectionKey) => {
    if (!course) return;
    edit(`${key}.items`,[...course[key].items,{title:"New item",description:"Describe this item."}]);
  };
  const selectCourse = (slug: string) => {
    if (dirty && !window.confirm("Discard your unpublished edits?")) return;
    setCourse(courses.find(item => item.slug === slug) || null);
    setDirty(false); setMessage("");
  };
  const duplicateCourse = async () => {
    if (!course) return;
    const slug = window.prompt("Slug for the new course (e.g. ai-product-bootcamp):");
    if (!slug) return;
    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug) || slug.length > 65 || courses.some(c=>c.slug === slug)) {
      setMessage("Use a unique lowercase slug with letters, numbers, and hyphens."); return;
    }
    let backendTitle: string | undefined;
    let backendSubtitle: string | undefined;
    let backendDescription: string | undefined;
    if (backendMode) {
      // Do not allow a landing page for a course that does not exist in the canonical backend.
      const result = await fetch(`/api/admin/backend-course?slug=${encodeURIComponent(slug)}`,{cache:"no-store"});
      if (!result.ok) {setMessage("Create the course in your backend first; the slug must match an existing Course record.");return;}
      const backend = await result.json();
      if (!backend?.course?.id) {setMessage("Course record not found in the backend.");return;}
      backendTitle=backend.course.title;
      backendSubtitle=backend.course.subtitle;
      backendDescription=backend.course.description;
    }
    const next = JSON.parse(JSON.stringify(course)) as Course;
    next.slug = slug;
    next.seo.title = `${next.brand.name} | New Course`;
    next.hero.title = backendSubtitle || backendTitle || "New Course Title";
    if (backendDescription) next.hero.description = backendDescription;
    next.hero.ctaUrl = "";
    setCourses(existing=>[...existing,next]);
    setCourse(next);setDirty(true);setMessage(backendMode ? "Landing-page draft created for existing Course. Publish the page branding to activate it." : "New course draft created. Edit the content and click Publish.");
    setTab("content");setActiveSection("hero");
  };

  const login = async (event: React.FormEvent) => {
    event.preventDefault();setAuthError("");
    try {
      const response = await fetch("/api/admin/session", {
        method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({password}),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Authentication failed");
      setPassword(""); setAuthenticated(true); setLoading(true);
      await loadData();
    } catch (error) { setAuthError(error instanceof Error ? error.message : "Authentication failed"); }
    finally { setLoading(false); }
  };
  const logout = async () => {
    await fetch("/api/admin/session", { method:"DELETE" });
    setAuthenticated(false);setCourse(null);setCourses([]);setDirty(false);
  };
  const publish = async () => {
    if (!course || saving) return;
    if (!validateCourse(course)) { setMessage("Some fields are invalid. Check colors, URLs, lengths and numeric values."); return; }
    setSaving(true);setMessage("");
    try {
      const response = await fetch("/api/admin/course", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({course,expectedSha:sha}),
      });
      const data = await response.json() as { error?: string; sha?: string };
      if (!response.ok) throw new Error(data.error || "Publish failed");
      setSha(data.sha || null);setSource("github");
      setCourses(prev => [...prev.filter(p=>p.slug!==course.slug),course]);
      setDirty(false);setMessage("Published. The public course page now reads this configuration.");
    } catch (error) { setMessage(error instanceof Error ? error.message : "Publish failed"); }
    finally { setSaving(false); }
  };
  const move = (index: number, direction: -1 | 1) => {
    if (!course) return;
    const next = [...course.sections];
    const other = index + direction;
    if (other < 0 || other >= next.length) return;
    [next[index],next[other]]=[next[other],next[index]];
    edit("sections",next);
  };

  if (loading) return <div className="roac-editor-loading">Loading course builder…</div>;
  if (!authenticated) return <main className="roac-login">
    <form onSubmit={login} className="roac-login-card">
      <div className="roac-login-mark">R.</div>
      <h1>ROAC Course Builder</h1>
      <p>Manage course content, branding, sections, and styles from one dashboard.</p>
      {!configured && <div className="roac-editor-alert">Set ROAC_ADMIN_PASSWORD and ROAC_ADMIN_SESSION_SECRET in your server environment to enable sign in.</div>}
      <label>Admin password<input type="password" autoComplete="current-password" value={password} onChange={e => setPassword(e.target.value)} required/></label>
      {authError && <div className="roac-editor-alert">{authError}</div>}
      <button type="submit" disabled={!configured}>Sign in</button>
    </form>
  </main>;
  if (!course) return <main className="roac-editor-loading">No courses found. <button onClick={loadData}>Reload</button></main>;

  const editTextSection = (key: SectionKey) => {
    const group = course[key];
    return <div className="roac-editor-fields" key={key}>
      <h2>{SECTION_LABELS[key]}</h2>
      <Field label="Eyebrow" value={group.eyebrow} onChange={v => edit(`${key}.eyebrow`,v)}/>
      <Field label="Heading" value={group.title} onChange={v => edit(`${key}.title`,v)}/>
      <Field label="Description" value={group.description} multiline onChange={v => edit(`${key}.description`,v)}/>
      <div className="roac-editor-subhead"><strong>Cards / rows</strong><button onClick={()=>addRow(key)}>+ Add</button></div>
      {group.items.map((item,i)=><ItemEditor key={i} item={item} index={i} onChange={(field,value)=>editRow(key,i,field,value)} onDelete={()=>removeRow(key,i)}/>)}
    </div>;
  };

  return <div className="roac-editor">
    <aside className="roac-editor-panel">
      <header className="roac-editor-header">
        <div><div className="roac-editor-brand">R. <span>Course Studio</span></div><p>Powered by ROAC</p></div>
        <button className="roac-editor-textbtn" onClick={logout}>Sign out</button>
      </header>
      <div className="roac-editor-coursebar">
        <label>Editing course</label>
        <div className="roac-editor-courseselect">
          <select value={course.slug} onChange={e=>selectCourse(e.target.value)}>{courses.map(c=><option value={c.slug} key={c.slug}>{c.slug}</option>)}</select>
          <button onClick={duplicateCourse} title="Duplicate as new course">+</button>
        </div>
        <a href={`/courses/${course.slug}`} target="_blank" rel="noreferrer">Open public course ↗</a>
      </div>
      <div className="roac-editor-tabs">
        {(["content","design","sections","settings","backend"] as Tab[]).map(key=><button key={key} className={tab===key?"active":""} onClick={()=>setTab(key)}>{({content:"Content",design:"Design",sections:"Sections",settings:"SEO & CTA",backend:"Course"})[key]}</button>)}
      </div>
      <div className="roac-editor-scroll">
        {tab==="content" && <>
          <div className="roac-editor-mininav">
            {(["hero","challenge","overview","weeks","projects","selection","details","ctaSection","faqs"] as const).map(key=><button key={key} className={activeSection===key?"active":""} onClick={()=>setActiveSection(key as typeof activeSection)}>{key==="hero"?"Hero":key==="ctaSection"?"Call to Action":key==="challenge"?"Challenge":SECTION_LABELS[key]}</button>)}
          </div>
          {activeSection==="hero" && <div className="roac-editor-fields">
            <h2>Hero section</h2>
            <Field label="Eyebrow" value={course.hero.eyebrow} onChange={v=>edit("hero.eyebrow",v)}/>
            <Field label="Main heading" value={course.hero.title} multiline onChange={v=>edit("hero.title",v)}/>
            <Field label="Description" value={course.hero.description} multiline onChange={v=>edit("hero.description",v)}/>
            <Field label="Supporting text" value={course.hero.tagline} onChange={v=>edit("hero.tagline",v)}/>
            <Field label="Button label" value={course.hero.cta} onChange={v=>edit("hero.cta",v)}/>
            <Field label="Footnote" value={course.hero.finePrint} onChange={v=>edit("hero.finePrint",v)}/>
            <div className="roac-editor-subhead"><strong>Hero metrics</strong><button onClick={()=>edit("hero.metrics",[...course.hero.metrics,{title:"Metric",description:"Description"}])}>+ Add</button></div>
            {course.hero.metrics.map((item,i)=><ItemEditor key={i} item={item} index={i} onChange={(field,value)=>edit("hero.metrics",course.hero.metrics.map((m,j)=>i===j?{...m,[field]:value}:m))} onDelete={()=>edit("hero.metrics",course.hero.metrics.filter((_,j)=>j!==i))}/>)}
          </div>}
          {activeSection==="challenge" && <div className="roac-editor-fields">
            <h2>The Builder's Challenge</h2>
            <Field label="Eyebrow" value={course.challenge.eyebrow} onChange={v=>edit("challenge.eyebrow",v)}/>
            <Field label="Heading" value={course.challenge.title} onChange={v=>edit("challenge.title",v)}/>
            <Field label="Description" value={course.challenge.description} multiline onChange={v=>edit("challenge.description",v)}/>
            <div className="roac-editor-subhead"><strong>Bullet points</strong><button onClick={()=>edit("challenge.items",[...course.challenge.items,"New point"])}>+ Add</button></div>
            {course.challenge.items.map((item,i)=><div className="roac-editor-inline" key={i}><textarea value={item} rows={2} onChange={e=>edit("challenge.items",course.challenge.items.map((s,j)=>i===j?e.target.value:s))}/><button onClick={()=>edit("challenge.items",course.challenge.items.filter((_,j)=>j!==i))}>×</button></div>)}
          </div>}
          {(["overview","weeks","projects","selection","details","faqs"] as SectionKey[]).includes(activeSection as SectionKey) && editTextSection(activeSection as SectionKey)}
          {activeSection==="ctaSection" && <div className="roac-editor-fields">
            <h2>Closing CTA</h2>
            <Field label="Eyebrow" value={course.ctaSection.eyebrow} onChange={v=>edit("ctaSection.eyebrow",v)}/>
            <Field label="Heading" value={course.ctaSection.title} multiline onChange={v=>edit("ctaSection.title",v)}/>
            <Field label="Description" value={course.ctaSection.description} multiline onChange={v=>edit("ctaSection.description",v)}/>
            <Field label="Button label" value={course.ctaSection.cta} onChange={v=>edit("ctaSection.cta",v)}/>
            <Field label="Footnote" value={course.ctaSection.finePrint} onChange={v=>edit("ctaSection.finePrint",v)}/>
          </div>}
        </>}
        {tab==="design" && <div className="roac-editor-fields">
          <h2>Brand Identity</h2>
          <Field label="Brand name" value={course.brand.name} onChange={v=>edit("brand.name",v)}/>
          <Field label="Logo URL (https:// or /public-file)" value={course.brand.logoUrl} onChange={v=>edit("brand.logoUrl",v)}/>
          <Field label="Logo alt text" value={course.brand.logoAlt} onChange={v=>edit("brand.logoAlt",v)}/>
          <h2>Color Palette</h2>
          {([["accent","Accent"],["ink","Headings / dark background"],["background","Page background"],["surface","Card background"],["muted","Muted text"]] as const).map(([key,label])=><label className="roac-editor-color" key={key}><span>{label}</span><input type="color" value={course.theme[key]} onChange={e=>edit(`theme.${key}`,e.target.value)}/><code>{course.theme[key]}</code></label>)}
          <h2>Typography and sizing</h2>
          <label className="roac-editor-field"><span>Font family</span><select value={course.theme.font} onChange={e=>edit("theme.font",e.target.value)}><option value="inter">Inter</option><option value="dm-sans">DM Sans</option><option value="system">System</option></select></label>
          <NumberControl label="Hero heading size" value={course.theme.heroSize} min={32} max={100} onChange={v=>edit("theme.heroSize",v)}/>
          <NumberControl label="Body text size" value={course.theme.bodySize} min={12} max={22} onChange={v=>edit("theme.bodySize",v)}/>
          <NumberControl label="Corners / border radius" value={course.theme.radius} min={0} max={48} onChange={v=>edit("theme.radius",v)}/>
          <NumberControl label="Page content width" value={course.theme.contentWidth} min={720} max={1440} step={10} onChange={v=>edit("theme.contentWidth",v)}/>
          <NumberControl label="Section spacing" value={course.theme.sectionSpacing} min={32} max={160} onChange={v=>edit("theme.sectionSpacing",v)}/>
          <label className="roac-editor-field"><span>Hero alignment</span><select value={course.theme.heroAlignment} onChange={e=>edit("theme.heroAlignment",e.target.value)}><option value="left">Left</option><option value="center">Centered</option></select></label>
          <label className="roac-editor-field"><span>Button shape</span><select value={course.theme.buttonShape} onChange={e=>edit("theme.buttonShape",e.target.value)}><option value="rounded">Rounded</option><option value="pill">Pill</option><option value="square">Square</option></select></label>
        </div>}
        {tab==="sections" && <div className="roac-editor-fields">
          <h2>Sections and Order</h2><p className="roac-editor-hint">Show/hide sections and move them up or down. Hero and navigation are always visible.</p>
          {course.sections.map((item,i)=><div className="roac-editor-sectionrow" key={item.id}>
            <label><input type="checkbox" checked={item.visible} onChange={e=>edit("sections",course.sections.map((s,j)=>j===i?{...s,visible:e.target.checked}:s))}/>{SECTION_LABELS[item.id as SectionId]}</label>
            <div><button disabled={i===0} onClick={()=>move(i,-1)} title="Move up">↑</button><button disabled={i===course.sections.length-1} onClick={()=>move(i,1)} title="Move down">↓</button></div>
          </div>)}
        </div>}
        {tab==="backend" && <BackendCoursePanel slug={course.slug} />}
        {tab==="settings" && <div className="roac-editor-fields">
          <h2>Search and Publishing</h2>
          <p className="roac-editor-hint">Course URL: /courses/{course.slug}</p>
          <Field label="SEO page title" value={course.seo.title} onChange={v=>edit("seo.title",v)}/>
          <Field label="SEO description" value={course.seo.description} multiline onChange={v=>edit("seo.description",v)}/>
          <Field label="Application URL" value={course.hero.ctaUrl} placeholder="https://your-application-form.example" onChange={v=>edit("hero.ctaUrl",v)}/>
          <p className="roac-editor-hint">Leave the URL blank until the official application form or assessment is ready. Both Apply buttons will remain disabled in the meantime. Use HTTPS or an internal path.</p>
          <p className="roac-editor-hint">Content storage: {source==="github"?"GitHub CMS branch":"Fallback seed — publish requires CMS access"}</p>
        </div>}
      </div>
      <footer className="roac-editor-actions">
        {message && <p className={message.startsWith("Published")?"roac-editor-success":"roac-editor-alert"} role="status">{message}</p>}
        <div className="roac-editor-actionrow">
          <span>{dirty?"● Unpublished edits":"All edits saved"}</span>
          <button onClick={publish} disabled={!dirty || saving}>{saving?"Publishing…":"Publish changes ↗"}</button>
        </div>
      </footer>
    </aside>
    <section className="roac-editor-previewside">
      <div className="roac-editor-previewbar">
        <div><strong>Live Preview</strong><span>Editing: {course.slug}</span></div>
        <div className="roac-editor-viewports"><button className={!previewMobile?"active":""} onClick={()=>setPreviewMobile(false)}>Desktop</button><button className={previewMobile?"active":""} onClick={()=>setPreviewMobile(true)}>Mobile</button></div>
      </div>
      <div className="roac-editor-previewwrap">
        <div className={`roac-editor-previewframe ${previewMobile?"roac-preview-mobile":""}`}><CourseLanding course={course} preview /></div>
      </div>
    </section>
  </div>;
}
