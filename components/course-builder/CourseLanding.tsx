import type { CSSProperties } from "react";
import type { Course, SectionId, TextSection, CourseItem } from "@/lib/course-types";
import { SECTION_LABELS, validLink } from "@/lib/course-types";

export default function CourseLanding({ course, preview = false }: { course: Course; preview?: boolean }) {
  const t = course.theme;
  const style = {
    "--roac-accent": t.accent,
    "--roac-ink": t.ink,
    "--roac-bg": t.background,
    "--roac-surface": t.surface,
    "--roac-muted": t.muted,
    "--roac-hero-size": `${t.heroSize}px`,
    "--roac-body-size": `${t.bodySize}px`,
    "--roac-radius": `${t.radius}px`,
    "--roac-page-width": `${t.contentWidth}px`,
    "--roac-section-y": `${t.sectionSpacing}px`,
    "--roac-button-radius": t.buttonShape === "pill" ? "999px" : t.buttonShape === "square" ? "0px" : `${Math.max(t.radius / 2, 6)}px`,
    "--roac-font": t.font === "dm-sans" ? '"DM Sans",sans-serif' : t.font === "system" ? 'system-ui,sans-serif' : '"Inter",sans-serif',
  } as CSSProperties;

  const isLinked = validLink(course.hero.ctaUrl);
  const apply = (label: string) => isLinked
    ? <a className="roac-button" href={course.hero.ctaUrl} target={course.hero.ctaUrl.startsWith("https://") ? "_blank" : undefined} rel={course.hero.ctaUrl.startsWith("https://") ? "noopener noreferrer" : undefined}>{label}<span aria-hidden="true">↗</span></a>
    : <span className="roac-button roac-button-disabled" title="Application destination not configured">{label}<span aria-hidden="true">↗</span></span>;

  const intro = (section: { eyebrow: string; title: string; description: string }) => <div className="roac-section-heading">
    <span className="roac-eyebrow">{section.eyebrow}</span>
    <h2>{section.title}</h2>
    {section.description && <p>{section.description}</p>}
  </div>;

  const cards = (items: CourseItem[], numbered = false) => <div className="roac-cards">
    {items.map((item, i) => <article className="roac-card" key={i}>
      {numbered && <span className="roac-card-number">{String(i+1).padStart(2,"0")}</span>}
      <h3>{item.title}</h3>
      <p>{item.description}</p>
    </article>)}
  </div>;

  const textSection = (id: SectionId, section: TextSection, numbered: boolean) => <section className="roac-section" id={id} key={id}>
    <div className="roac-shell">
      {intro(section)}
      {cards(section.items, numbered)}
    </div>
  </section>;

  const renderSection = (id: SectionId) => {
    switch (id) {
      case "challenge": return <section className="roac-section roac-alt" id={id} key={id}><div className="roac-shell">
        {intro(course.challenge)}
        <div className="roac-checklist">{course.challenge.items.map((item,i)=><div key={i} className="roac-checkitem"><span aria-hidden="true">✦</span><p>{item}</p></div>)}</div>
      </div></section>;
      case "overview": return textSection(id,course.overview,false);
      case "weeks": return textSection(id,course.weeks,true);
      case "projects": return textSection(id,course.projects,true);
      case "selection": return <section className="roac-section roac-alt" id={id} key={id}><div className="roac-shell">
        {intro(course.selection)}
        {cards(course.selection.items,true)}
      </div></section>;
      case "details": return <section className="roac-section" id={id} key={id}><div className="roac-shell">
        {intro(course.details)}
        <div className="roac-details">{course.details.items.map((item,i)=><div className="roac-detail" key={i}><span>{item.title}</span><strong>{item.description}</strong></div>)}</div>
      </div></section>;
      case "ctaSection": return <section className="roac-cta-section" id={id} key={id}><div className="roac-shell">
        <span className="roac-eyebrow">{course.ctaSection.eyebrow}</span>
        <h2>{course.ctaSection.title}</h2>
        <p>{course.ctaSection.description}</p>
        {apply(course.ctaSection.cta)}
        <small>{isLinked ? course.ctaSection.finePrint : "Application link is not configured yet."}</small>
      </div></section>;
      case "faqs": return <section className="roac-section" id={id} key={id}><div className="roac-shell">
        {intro(course.faqs)}
        <div className="roac-faqs">{course.faqs.items.map((item,i)=><details key={i}><summary>{item.title}<span aria-hidden="true">+</span></summary><p>{item.description}</p></details>)}</div>
      </div></section>;
    }
  };

  return <div className="roac-page" style={style} data-preview={preview ? "true" : undefined}>
    <header className="roac-nav">
      <div className="roac-shell roac-nav-inner">
        <a href="#top" className="roac-brand" aria-label={course.brand.logoAlt || course.brand.name}>
          {course.brand.logoUrl ? <img src={course.brand.logoUrl} alt={course.brand.logoAlt} /> : <span>{course.brand.name}</span>}
        </a>
        <nav aria-label="Course sections">
          {course.sections.filter(s=>s.visible && ["weeks","projects","selection","faqs"].includes(s.id)).map(s=><a key={s.id} href={`#${s.id}`}>{SECTION_LABELS[s.id]}</a>)}
        </nav>
        {isLinked ? <a className="roac-nav-cta" href={course.hero.ctaUrl}>Apply Now ↗</a> : <a className="roac-nav-cta" href="#ctaSection">Learn More ↗</a>}
      </div>
    </header>
    <main>
      <section className={`roac-hero roac-hero-${t.heroAlignment}`} id="top">
        <div className="roac-shell">
          <span className="roac-hero-pill"><span className="roac-dot"/> {course.hero.eyebrow}</span>
          <h1>{course.hero.title}</h1>
          <p className="roac-hero-description">{course.hero.description}</p>
          <p className="roac-hero-tagline">{course.hero.tagline}</p>
          <div className="roac-hero-actions">{apply(course.hero.cta)}</div>
          <p className="roac-fineprint">{isLinked ? course.hero.finePrint : "Application link is not configured yet. " + course.hero.finePrint}</p>
          <div className="roac-hero-stats">
            {course.hero.metrics.map((item,i)=><div key={i}><strong>{item.title}</strong><span>{item.description}</span></div>)}
          </div>
        </div>
      </section>
      {course.sections.filter(s=>s.visible).map(s=>renderSection(s.id))}
    </main>
    <footer className="roac-footer"><div className="roac-shell">
      <strong>{course.brand.name}</strong><span>{course.seo.title}</span>
      <a href="#top">Back to top ↑</a>
    </div></footer>
  </div>;
}
