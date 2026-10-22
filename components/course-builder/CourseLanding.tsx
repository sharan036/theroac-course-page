"use client";

import { useEffect, useState, type CSSProperties } from "react";
import Image from "next/image";
import type { Course, CourseItem, SectionId } from "@/lib/course-types";
import { validLink } from "@/lib/course-types";
import Reveal from "@/components/Reveal";
import Problems from "@/components/Problems";
import Curriculum from "@/components/Curriculum";
import BuildProjects from "@/components/IsThisForYou";
import FAQ from "@/components/FAQ";
import WhyChooseUs from "@/components/WhyChooseUs";

/**
 * Same visual system as the original theroac-course-page homepage:
 * floating white navbar, angled black logo, textured black hero, prompt
 * demo, cream cards, original illustrated loop, accordion curriculum,
 * four-card Swiper, dark selection/pricing panel, and FAQs.
 *
 * This separate component NEVER mounts the homepage's payment registration
 * modal or its artificial cookie-controlled seat countdown.
 */
const visible = (course: Course, id: SectionId) =>
  course.sections.some(s => s.id === id && s.visible);

function Action({ course, label, compact = false, light = false }: {
  course: Course; label: string; compact?: boolean; light?: boolean;
}) {
  const href = course.hero.ctaUrl;
  const good = validLink(href);
  const classes = "inline-flex items-center justify-center gap-3 rounded-lg py-1 pr-2 pl-4 font-medium text-white transition hover:brightness-105 " +
    (compact ? "text-sm" : "text-base sm:text-lg") +
    (good ? "" : " cursor-not-allowed opacity-60");
  return good ? (
    <a href={href} className={classes} style={{ background: "var(--course-accent)" }}
      target={href.startsWith("https://") ? "_blank" : undefined}
      rel={href.startsWith("https://") ? "noopener noreferrer" : undefined}>
      {label}
      <span className="grid h-10 w-10 place-items-center rounded-md bg-white text-lg"
        style={{ color: "var(--course-accent)" }}>→</span>
    </a>
  ) : (
    <span className={classes} title="Application details will be announced" aria-disabled="true"
      style={{ background: "var(--course-accent)" }}>
      {label}
      <span className="grid h-10 w-10 place-items-center rounded-md bg-white text-lg"
        style={{ color: "var(--course-accent)" }}>→</span>
    </span>
  );
}

function CourseNavbar({ course }: { course: Course }) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const options: Array<[SectionId, string]> = [
    ["weeks","Curriculum"], ["projects","What You'll Build"],
    ["selection","Selection"], ["faqs","FAQs"],
  ];
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive:true });
    return () => window.removeEventListener("scroll",onScroll);
  }, []);
  useEffect(() => {
    if (!mobileOpen) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [mobileOpen]);
  const links = options.filter(([id]) => visible(course,id));
  const ctaVisible = validLink(course.hero.ctaUrl);

  return <>
    {mobileOpen && <button aria-label="Close navigation" onClick={()=>setMobileOpen(false)}
      className="fixed inset-0 z-[45] bg-black/40 backdrop-blur-sm md:hidden" />}
    <div className={"fixed left-1/2 z-50 w-full -translate-x-1/2 px-4 transition-all duration-500 " +
      (scrolled ? "top-3" : "top-6")}>
      <div className={"mx-auto rounded bg-white p-1 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] transition-all duration-500 " +
        (scrolled ? "max-w-[920px]" : "max-w-[900px]")}>
        <nav aria-label="Course navigation" className="relative flex items-center justify-between overflow-hidden rounded">
          <a href="#top" className="relative z-10 flex shrink-0 items-center bg-black py-3 pl-5"
            style={{paddingRight:"2.5rem",clipPath:"polygon(0 0,100% 0,calc(100% - 28px) 100%,0 100%)"}}>
            {course.brand.logoUrl ? (
              <img src={course.brand.logoUrl} alt={course.brand.logoAlt || course.brand.name}
                className="max-w-[110px] object-contain" style={{height:scrolled ? 24:30,width:"auto"}} />
            ) : <span className="text-xl font-bold text-white">{course.brand.name}</span>}
          </a>
          <div className="relative hidden flex-1 items-center justify-center md:flex">
            {links.map(([id,label],index) => <div key={id} className="flex items-center">
              <a href={"#"+id} className="px-4 py-3 text-[15px] font-semibold text-[#111] transition-colors hover:text-[#ff6f00]">
                {label}
              </a>
              {index < links.length-1 && <span className="h-4 w-px bg-black/10" />}
            </div>)}
          </div>
          {ctaVisible ? (
            <a href={course.hero.ctaUrl}
              className="mr-2 hidden shrink-0 items-center gap-3 rounded-lg py-1 pr-2 pl-4 text-sm font-semibold text-white md:flex"
              style={{background:"var(--course-accent)"}}>
              {course.hero.cta}
              <span className="grid h-9 w-9 place-items-center rounded-md bg-white"
                style={{color:"var(--course-accent)"}}>→</span>
            </a>
          ) : <span className="mr-2 hidden rounded-lg border border-orange-200 px-3 py-2 text-xs font-semibold text-neutral-600 md:block">
            Applications opening soon
          </span>}
          <button type="button" className="mr-2 shrink-0 rounded-lg p-2 text-black md:hidden"
            onClick={()=>setMobileOpen(!mobileOpen)} aria-label={mobileOpen?"Close menu":"Open menu"}
            aria-expanded={mobileOpen}>
            {mobileOpen ? <span className="text-xl">×</span> : <span className="text-xl">☰</span>}
          </button>
        </nav>
      </div>
      {mobileOpen && <div className="mx-auto mt-2 max-w-[900px] overflow-hidden rounded-xl border border-black/10 bg-white shadow-lg md:hidden">
        <div className="flex flex-col p-2">
          {links.map(([id,label])=><a key={id} href={"#"+id} onClick={()=>setMobileOpen(false)}
            className="rounded-lg px-4 py-3 text-sm font-semibold text-black hover:bg-neutral-100">{label}</a>)}
          {ctaVisible && <a href={course.hero.ctaUrl} onClick={()=>setMobileOpen(false)}
            className="mt-1 rounded-lg px-4 py-3 text-sm font-semibold text-white"
            style={{background:"var(--course-accent)"}}>{course.hero.cta} →</a>}
        </div>
      </div>}
    </div>
  </>;
}

function CourseHero({ course }: { course: Course }) {
  const messages = course.projects.items.map(x=>x.description).filter(Boolean);
  const [messageIndex,setMessageIndex] = useState(0);
  const [displayText,setDisplayText] = useState("");
  const [deleting,setDeleting] = useState(false);
  const current = messages[messageIndex % Math.max(messages.length,1)] || course.hero.tagline;
  useEffect(()=>{
    const delay = deleting ? 30 : displayText.length === current.length ? 1600 : 55;
    const timeout = setTimeout(()=>{
      if(deleting) {
        if(displayText.length) setDisplayText(current.slice(0,displayText.length-1));
        else {setDeleting(false);setMessageIndex(i=>i+1);}
      } else if(displayText.length < current.length) {
        setDisplayText(current.slice(0,displayText.length+1));
      } else setDeleting(true);
    },delay);
    return ()=>clearTimeout(timeout);
  },[displayText,deleting,messageIndex,current]);

  return <header id="top" className="relative isolate overflow-hidden bg-black px-4 pb-10 pt-[150px] text-white">
    <Image src="https://framerusercontent.com/images/GGNg8KoV9Iwu1Z89UqqLzdQWx0.png"
      alt="" fill priority className="-z-30 object-cover opacity-90" />
    <Image src="https://framerusercontent.com/images/I5BmrodulLElK3MtIcR7Z5YD8bI.svg"
      alt="" fill className="-z-20 object-cover opacity-40" />
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      <div className="absolute -left-52 top-0 h-[700px] w-[450px] rotate-[35deg] bg-white/5 blur-[120px]" />
      <div className="absolute left-1/3 top-0 h-[700px] w-[350px] rotate-[45deg] bg-white/5 blur-[120px]" />
      <div className="absolute -right-52 top-0 h-[700px] w-[450px] -rotate-[35deg] bg-white/5 blur-[120px]" />
    </div>
    <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-16">
      <div className="flex w-full max-w-[840px] flex-col items-center gap-8">
        <Reveal className="flex flex-wrap items-center justify-center gap-3 rounded-lg border border-white/15 bg-black px-5 py-3">
          <span className="text-sm text-neutral-200"><span style={{color:"var(--course-accent)"}}>✦ </span>
            {course.hero.eyebrow}</span>
        </Reveal>
        <Reveal delay={100} duration={800}>
          <h1 className="max-w-[840px] text-center text-[clamp(38px,7vw,64px)] font-semibold leading-[0.98] tracking-[-0.04em] text-white">
            {course.hero.title}
          </h1>
        </Reveal>
        <Reveal delay={140} duration={800}>
          <p className="max-w-[640px] text-center text-base text-neutral-200 sm:text-lg">
            {course.hero.description}
          </p>
        </Reveal>
        <Reveal delay={180} duration={800} className="w-full">
          <div className="rounded-[15px] border border-white/30 bg-black/20 px-5 py-6 backdrop-blur-sm sm:px-7">
            <p className="mb-12 min-h-[70px] break-words text-[24px] font-medium text-white sm:text-[32px]">
              {displayText}<span className="animate-pulse text-white">|</span>
            </p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-6 text-white">
                <span className="text-3xl">+</span>
                <span className="flex items-center gap-2"><span>⚙</span> Tools</span>
              </div>
              <div className="flex items-center gap-4 text-white">
                <span>🎤</span>
                <span className="grid h-11 w-11 place-items-center rounded-full bg-white/20">
                  <span className="flex items-end gap-[2px]">
                    <i className="h-2 w-1 rounded bg-white" />
                    <i className="h-4 w-1 rounded bg-white" />
                    <i className="h-3 w-1 rounded bg-white" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </Reveal>
        <Reveal delay={280} duration={800} className="flex flex-col items-center gap-4 lg:flex-row">
          <Action course={course} label={course.hero.cta}/>
          <span className="max-w-[260px] text-center text-xs uppercase leading-tight text-neutral-200">
            {course.hero.finePrint}
          </span>
        </Reveal>
      </div>
      <Reveal direction="none" duration={900}
        className="relative aspect-video w-full max-w-[1200px] overflow-hidden rounded-2xl border border-white/30 bg-black">
        <Image src="https://storage.googleapis.com/heartfelt-6a946.firebasestorage.app/theROAC/Building%20AI%20Products.png"
          alt="AI product building preview" fill className="object-cover" sizes="(max-width: 1200px) 100vw, 1200px"/>
      </Reveal>
    </div>
  </header>;
}

function SectionHeading({ eyebrow,title,description,dark=false }: {
  eyebrow:string; title:string; description?:string; dark?:boolean;
}) {
  return <div className="mb-10 flex flex-col items-center gap-4 text-center">
    <p className={"text-sm font-medium "+(dark?"text-neutral-400":"text-neutral-500")}>{eyebrow}</p>
    <h2 className={"max-w-[830px] text-3xl font-semibold leading-tight tracking-tight sm:text-4xl md:text-[38px] "+
      (dark?"text-white":"text-black")}>{title}</h2>
    {description && <p className={"max-w-[680px] text-sm leading-7 sm:text-base "+(dark?"text-neutral-400":"text-neutral-500")}>
      {description}</p>}
  </div>;
}

function CourseOverview({course}:{course:Course}) {
  const x=course.overview;
  return <section className="bg-black px-4 py-16 md:py-24">
    <div className="mx-auto max-w-[1200px]">
      <SectionHeading {...x} dark />
      <div className="flex flex-col gap-0.5 overflow-hidden rounded-xl border border-[#333]">
        <div className="flex flex-col gap-12 bg-neutral-900 p-6 md:flex-row md:p-10">
          <div className="flex flex-1 flex-col gap-6">
            <span className="inline-block w-fit rounded-lg bg-neutral-800 px-3 py-1.5 text-sm text-white">
              {course.hero.tagline}
            </span>
            <h3 className="text-2xl font-medium leading-tight text-white sm:text-[23px]">{x.description}</h3>
            <div><Action course={course} label={course.hero.cta} compact/></div>
          </div>
          <div className="flex flex-1 flex-col gap-6">
            <p className="text-sm text-neutral-400">What makes this experience different:</p>
            <div className="flex flex-wrap gap-3">
              {x.items.map(item=><span key={item.title}
                className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm text-neutral-200">
                {item.title}</span>)}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 divide-y divide-black/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {x.items.map(item=><div key={item.title} className="flex flex-col gap-4 bg-[#f2f1ee] p-8">
            <p className="text-sm font-medium text-neutral-500">{item.title}</p>
            <p className="text-sm text-black">{item.description}</p>
          </div>)}
        </div>
      </div>
      <div className="mx-auto mt-12 flex max-w-[1040px] flex-col items-center gap-3 rounded-xl border border-white/10 bg-neutral-950/40 p-8 text-center">
        <p className="max-w-[700px] text-lg text-white sm:text-xl">{course.hero.tagline}</p>
        <p className="text-sm text-neutral-400">{course.hero.finePrint}</p>
      </div>
    </div>
  </section>;
}

function CourseSelection({course}:{course:Course}) {
  return <section className="bg-neutral-900 px-4 py-16 md:py-24">
    <div className="mx-auto max-w-[1200px]">
      <div className="mb-12 flex flex-col items-center gap-4 text-center">
        <span className="rounded-full px-4 py-1.5 text-xs font-medium"
          style={{color:"var(--course-accent)",background:"color-mix(in srgb,var(--course-accent) 14%,transparent)"}}>
          {course.selection.eyebrow}
        </span>
        <h2 className="max-w-[900px] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-[38px]">
          {course.selection.title}
        </h2>
        <p className="max-w-[760px] text-neutral-400">{course.selection.description}</p>
      </div>
      <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-6 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/40 backdrop-blur sm:grid-cols-2">
        <div className="flex flex-col gap-6 p-8">
          <p className="text-xs font-medium tracking-wide text-neutral-400">HOW SELECTION WORKS</p>
          <ul className="flex flex-col gap-5">
            {course.selection.items.map((item,index)=><li key={index} className="flex gap-3 text-sm leading-6 text-white">
              <span style={{color:"var(--course-accent)"}}>✓</span>
              <span><strong className="block font-semibold">{item.title}</strong>{item.description}</span>
            </li>)}
          </ul>
        </div>
        <div className="flex flex-col justify-between gap-6 border-t border-white/10 p-8 sm:border-l sm:border-t-0 sm:p-10">
          <div className="space-y-5">
            <p className="text-xs font-medium tracking-wide text-neutral-400">PROGRAM HIGHLIGHTS</p>
            {course.details.items.map(item=><div key={item.title} className="flex items-start gap-3 text-sm text-white">
              <span style={{color:"var(--course-accent)"}}>✓</span>
              <div><strong className="block font-medium">{item.title}</strong><span className="text-neutral-400">{item.description}</span></div>
            </div>)}
          </div>
          <div><Action course={course} label={course.ctaSection.cta} compact/></div>
        </div>
      </div>
      <p className="mx-auto mt-7 max-w-[850px] text-center text-sm text-neutral-400">
        {course.ctaSection.finePrint}
      </p>
    </div>
  </section>;
}

function CourseCTA({course}:{course:Course}) {
  const x=course.ctaSection;
  return <section className="bg-white px-4 py-16 md:py-24">
    <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 text-center">
      <p className="text-sm font-medium text-neutral-500">{x.eyebrow}</p>
      <h2 className="max-w-[730px] text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl md:text-[38px]">
        {x.title}
      </h2>
      <p className="max-w-[580px] text-sm text-neutral-500">{x.description}</p>
      <Action course={course} label={x.cta} compact />
      <p className="text-xs text-neutral-500">{x.finePrint}</p>
      <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
        {course.hero.metrics.slice(0,3).map((item,index)=><div key={index}
          className="flex flex-col items-center gap-3 rounded-xl bg-white p-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.06)]">
          <span className="text-lg font-semibold" style={{color:"var(--course-accent)"}}>
            {item.title}</span>
          <p className="text-sm text-black">{item.description}</p>
        </div>)}
      </div>
    </div>
  </section>;
}

function CourseFooter({course}:{course:Course}) {
  return <footer className="bg-[#e9e7e2] px-4 py-16">
    <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
      <div className="flex flex-col justify-between gap-10 md:flex-row">
        <div className="flex max-w-[350px] flex-col gap-4">
          <p className="text-xl font-semibold text-black">{course.brand.name}</p>
          <p className="text-sm text-neutral-500">{course.seo.description}</p>
        </div>
        <div className="flex flex-wrap gap-12">
          <div className="flex flex-col gap-4">
            <p className="text-sm font-medium text-black">Explore</p>
            {course.sections.filter(s=>s.visible).slice(0,5).map(s=><a key={s.id} href={"#"+s.id}
              className="text-sm text-neutral-500 hover:text-black">{s.id === "weeks" ? "Curriculum":s.id === "faqs"?"FAQs":s.id === "selection"?"How Selection Works":s.id}</a>)}
          </div>
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium text-black">ROAC</p>
            <a href="https://theroac.com" className="text-sm text-neutral-500 hover:text-black">Main website ↗</a>
            <p className="text-sm text-neutral-500">{course.hero.finePrint}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-dashed border-black/20 pt-6" />
      <div className="flex flex-col justify-between gap-2 text-sm text-neutral-500 sm:flex-row">
        <p>© 2026 {course.brand.name}</p><p>All rights reserved.</p>
      </div>
    </div>
  </footer>;
}

export default function CourseLanding({course,preview=false}:{course:Course;preview?:boolean}) {
  const t=course.theme;
  const style = {
    "--course-accent":t.accent,
    "--course-content-width":String(t.contentWidth)+"px",
    "--course-radius":String(t.radius)+"px",
    "--course-font":t.font === "dm-sans" ? '"DM Sans",sans-serif' :
      t.font === "system" ? "system-ui,sans-serif" : '"Inter",sans-serif',
    color:t.ink, background:t.background,
    fontFamily:"var(--course-font)",
  } as CSSProperties;

  function section(id:SectionId) {
    switch(id) {
      case "challenge": return <Problems content={{...course.challenge,items:[...course.challenge.items,course.hero.tagline].slice(0,6)}} />;
      case "overview": return <CourseOverview course={course}/>;
      case "weeks": return <Curriculum course={course}/>;
      case "projects": return <BuildProjects course={course}/>;
      case "details": return <WhyChooseUs course={course}/>;
      case "selection": return <CourseSelection course={course}/>;
      case "ctaSection": return <CourseCTA course={course}/>;
      case "faqs": return <FAQ course={course}/>;
    }
  }
  return <div className="roac-original-page min-h-screen overflow-hidden" style={style} data-preview={preview?"true":undefined}>
    <CourseNavbar course={course}/>
    <main>
      <CourseHero course={course}/>
      {course.sections.filter(s=>s.visible).map(s=><div key={s.id} id={s.id} className="scroll-mt-[110px]">{section(s.id)}</div>)}
    </main>
    <CourseFooter course={course}/>
  </div>;
}
