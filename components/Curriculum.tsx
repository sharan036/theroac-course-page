"use client";

import { useState } from "react";

const modules = [
  {
    title: "Modules 1 — Foundations",
    week: "Days 1–7",
    chapters: [
      "Day 1 — JavaScript: the basics you actually need (map, filter, reduce, destructuring)",
      "Day 2 — Async JavaScript: Promises, async/await, and the Fetch API",
      "Day 3 — Node.js + Express: your first real API",
      "Day 4 — PostgreSQL + Sequelize: storing real data",
      "Day 5 — Validation, environment variables, and a bit of security",
      "Day 6 — Git, GitHub, and making your work last",
      "Day 7 — Wrap up Modules 1: polish, document, and pressure-test your backend",
    ],
  },
  {
    title: "Modules 2 — React & Next.js",
    week: "Days 8–14",
    chapters: [
      "Day 8 — React: components, props, and state",
      "Day 9 — React Hooks: useEffect, custom hooks, and data fetching",
      "Day 10 — Next.js App Router and TypeScript basics",
      "Day 11 — Tailwind CSS and shadcn/ui: making things look good",
      "Day 12 — Next.js API routes and connecting everything together",
      "Day 13 — Clerk: authentication without the headache",
      "Day 14 — Modules 2 project: build a real Notes app from scratch",
    ],
  },
  {
    title: "Modules 3 — AI Integration",
    week: "Days 15–21",
    chapters: [
      "Day 15 — OpenAI API: first call, real understanding",
      "Day 16 — Streaming: making AI feel instant",
      "Day 17 — Prompt engineering: the skill that actually matters",
      "Day 18 — Claude API: why having two models is smarter than one",
      "Day 19 — Embeddings and semantic search: how AI finds meaning",
      "Day 20 — RAG: teach AI about your documents",
      "Day 21 — Gemini API and LangChain.js",
    ],
  },
  {
    title: "Modules 4 — SaaS & Monetization",
    week: "Days 22–30",
    chapters: [
      "Day 22 — Stripe: taking real money",
      "Day 23 — Razorpay: payments for Indian users",
      "Day 24 — Usage limits: don't let free users run up your API bill",
      "Day 25 — Project: AI Resume Reviewer",
      "Day 26 — Project: AI Content Generator",
      "Day 27 — Voice AI: speak to your app",
      "Day 28 — Production hardening: make it not embarrassing",
      "Day 29 — Tests, SEO, and making it fast",
      "Day 30 — Capstone day: landing page, demo video, case study, launch",
    ],
  },
];

function ModuleCard({ mod }: { mod: (typeof modules)[number] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="w-full overflow-hidden rounded-xl border border-neutral-200 bg-white">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between gap-3 p-5 text-left"
      >
        <div className="flex flex-col gap-2 pr-3">
          <h3 className="text-lg font-medium text-black sm:text-xl">{mod.title}</h3>
          <p className="text-sm text-neutral-500">{mod.week}</p>
        </div>
        <span
          className={`grid h-9 w-9 shrink-0 place-items-center rounded-full bg-neutral-100 transition-transform ${
            open ? "rotate-45" : ""
          }`}
        >
          +
        </span>
      </button>
      {open && (
        <div className="border-t border-neutral-200 bg-[#f2f1ee] p-4">
          <ul className="flex flex-col gap-3">
            {mod.chapters.map((c, i) => (
              <li key={c} className="flex gap-3 text-sm text-black">
                <span className="text-neutral-500">{String(i + 1).padStart(2, "0")}</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default function Curriculum() {
  return (
    <section id="curriculum" className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 flex max-w-[540px] flex-col items-center gap-4 rounded-xl border border-dashed border-neutral-300 py-12 text-center">
          <p className="text-sm font-medium text-neutral-500">Curriculum Overview</p>
          <h2 className="max-w-[540px] px-4 text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl md:text-[38px]">
            Unlock the Full Stack Behind a{" "}
            <span className="text-[#ff6f00]">Real AI Product</span>.
          </h2>
        </div>

        <div className="mx-auto grid max-w-[1100px] grid-cols-1 gap-6">
          {modules.map((mod) => (
            <ModuleCard key={mod.title} mod={mod} />
          ))}
        </div>
      </div>
    </section>
  );
}
