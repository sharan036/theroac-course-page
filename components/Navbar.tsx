"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRegisterModal } from "./RegisterModalContext";

const links = [
  { label: "Curriculum", href: "#curriculum" },
  { label: "Why Us", href: "#why-choose-us" },
  { label: "Mentors", href: "#mentors" },
  // { label: "Reviews", href: "#pricing" },
  { label: "FAQs", href: "#faqs" },
];

export default function Navbar() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [underlineStyle, setUnderlineStyle] = useState({ width: 0, left: 0 });
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const { handleBookSeat } = useRegisterModal();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = links
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as Element[];
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (!visible.length) return;
        const best = visible.reduce((a, b) =>
          Math.abs(a.boundingClientRect.top) < Math.abs(b.boundingClientRect.top) ? a : b
        );
        const idx = links.findIndex((l) => l.href === `#${best.target.id}`);
        if (idx !== -1) setActiveIndex(idx);
      },
      { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const el = navRefs.current[activeIndex];
    const navEl = el?.closest("nav");
    if (!el) return;
    const update = () => setUnderlineStyle({ width: el.offsetWidth, left: el.offsetLeft });
    update();
    const onTransitionEnd = (e: TransitionEvent) => {
      if (e.propertyName === "padding" || e.propertyName === "max-width") update();
    };
    navEl?.addEventListener("transitionend", onTransitionEnd);
    const tm = setTimeout(update, 250);
    return () => {
      navEl?.removeEventListener("transitionend", onTransitionEnd);
      clearTimeout(tm);
    };
  }, [activeIndex, scrolled]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const handleLinkClick = (index: number) => {
    setActiveIndex(index);
    setMobileOpen(false);
  };

  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[45] bg-black/40 backdrop-blur-sm md:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div
        className={`fixed left-1/2 z-50 w-full -translate-x-1/2 px-4 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? "top-3" : "top-6"
        }`}
      >
        {/* Outer black frame */}
        <div
          className={`mx-auto rounded bg-white p-1 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            scrolled ? "max-w-[920px]" : "max-w-[900px]"
          }`}
        >
          <nav className="relative flex items-center justify-between overflow-hidden rounded">
            {/* Logo panel — black diagonal cut */}
            <a
              href="#"
              className="rounded relative z-10 flex shrink-0 items-center bg-black py-3 pl-5"
              style={{
                paddingRight: "2.5rem",
                clipPath: "polygon(0 0, 100% 0, calc(100% - 28px) 100%, 0 100%)",
              }}
            >
              <Image
                src="/roac-logo-dark.png"
                alt="TheROAC"
                width={110}
                height={36}
                className="object-contain"
                style={{
                  height: scrolled ? "24px" : "30px",
                  width: "auto",
                  transition: "height 0.3s ease",
                }}
                priority
              />
            </a>

            {/* Desktop links */}
            <div className="hidden md:flex flex-1 items-center justify-center gap-0 relative">
              <div
                className="absolute bottom-2 h-[2px] bg-[#ff6f00]"
                style={{
                  width: `${underlineStyle.width}px`,
                  left: `${underlineStyle.left}px`,
                  transition: "all 0.4s cubic-bezier(0.34,1.56,0.64,1)",
                }}
              />
              {links.map((l, index) => (
                <div key={l.label} className="flex items-center">
                  <a
                    href={l.href}
                    className="px-5 py-3 text-[15px] font-semibold transition-colors"
                    style={{ color: activeIndex === index ? "#ff6f00" : "#111" }}
                    onClick={() => handleLinkClick(index)}
                  >
                    <span
                      ref={(el) => {
                        navRefs.current[index] = el;
                      }}
                      style={{ display: "inline-block" }}
                    >
                      {l.label}
                    </span>
                  </a>
                  {index < links.length - 1 && (
                    <span className="h-4 w-px bg-black/10" />
                  )}
                </div>
              ))}
            </div>

            {/* CTA */}
            <button 
              onClick={handleBookSeat}
              className="hidden md:flex shrink-0 items-center gap-3 mr-2 rounded-lg bg-[#ff6f00] py-1 pr-2 pl-4 text-sm font-semibold text-white transition hover:brightness-105"
            >
              Secure My Seat
              <span className="grid h-9 w-9 place-items-center rounded-md bg-white text-[#ff6f00]">
                →
              </span>
            </button>

            {/* Mobile hamburger */}
            <button
              className="md:hidden p-2 mr-2 rounded-lg text-black shrink-0"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
                {mobileOpen ? (
                  <>
                    <line x1="17" y1="5" x2="5" y2="17" />
                    <line x1="5" y1="5" x2="17" y2="17" />
                  </>
                ) : (
                  <>
                    <line x1="3" y1="6" x2="19" y2="6" />
                    <line x1="3" y1="11" x2="19" y2="11" />
                    <line x1="3" y1="16" x2="19" y2="16" />
                  </>
                )}
              </svg>
            </button>
          </nav>
        </div>

        {/* Mobile menu panel */}
        {mobileOpen && (
          <div className="md:hidden mt-2 mx-auto max-w-[900px] rounded-xl border border-black/10 bg-white shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            <ul className="flex flex-col p-2">
              {links.map((l, index) => (
                <li key={l.label}>
                  <a
                    href={l.href}
                    className="block px-4 py-3 rounded-lg text-sm font-semibold transition-colors"
                    style={{
                      color: activeIndex === index ? "#ff6f00" : "#111",
                      background: activeIndex === index ? "rgba(255,111,0,0.08)" : "transparent",
                    }}
                    onClick={() => handleLinkClick(index)}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="p-2 pt-0">
              <button
                className="flex items-center justify-center gap-2 w-full rounded-lg bg-[#ff6f00] py-3 text-sm font-semibold text-white"
                onClick={() => {
                  setMobileOpen(false); 
                  handleBookSeat();
                }}
              >
                Secure My Seat →
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}