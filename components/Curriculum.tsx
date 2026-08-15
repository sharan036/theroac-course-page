"use client";

import { useState } from "react";

const modules = [
  {
    title: "Foundations & No-Code Landscape",
    week: "Week 1",
    chapters: [
      "Kickoff: scoping an AI product idea, tour of the no-code landscape, pick your capstone idea",
      "App builder fundamentals: layout, inputs, buttons, navigation, your first 2-screen app",
      "The data layer: structuring data in Airtable/Google Sheets and connecting it to your app",
    ],
  },
  {
    title: "App Builder Mastery",
    week: "Week 2",
    chapters: [
      "Logic & workflows: conditional logic, triggers, a working form → save → display flow",
      "User accounts & access: native no-code auth, roles, and gating each user's own data",
      "UI/UX polish: responsive layout, visual hierarchy, making it look like a real product",
    ],
  },
  {
    title: "AI & Model Layer, Conversational AI",
    week: "Week 3",
    chapters: [
      "Bringing AI into your app, no code: native plugins, Zapier/Make AI steps, an \"AI improve this text\" feature",
      "Prompt engineering for builders: reliable output, few-shot examples, structured/JSON-style prompts",
      "Conversational AI & chatbots: building with Voiceflow/Botpress/Chatbase, connected to your data",
      "No-code RAG: teaching AI your own documents with Chatbase/Stack AI/VectorShift, with source references",
    ],
  },
  {
    title: "Automation & Launch Prep",
    week: "Week 4",
    chapters: [
      "Automation basics: triggers, actions, connecting two tools end to end (Zapier/Make/n8n)",
      "Automation applied + payments basics: a real end-to-end automation for your capstone, plus a light no-code Razorpay paywall overview",
    ],
  },
  {
    title: "Capstone",
    week: "Week 5",
    chapters: [
      "Stress-test your own build, estimate AI costs at 100 users, identify where you'd need an engineer, then demo your live AI product",
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
        <div className="mx-auto mb-12 flex max-w-[620px] flex-col items-center gap-4 rounded-xl border border-dashed border-neutral-300 py-12 text-center">
          <p className="text-sm font-medium text-neutral-500">Curriculum Overview</p>
          <h2 className="max-w-[600px] px-4 text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl md:text-[38px]">
            Live Sessions. One Real{" "}
            <span className="text-[#ff6f00]">AI Product</span>, Built Week by Week.
          </h2>
        </div>

        <div className="mx-auto mb-8 flex flex-wrap justify-center gap-2 text-center text-xs text-neutral-500">
          <span className="rounded-full bg-[#f2f1ee] px-3 py-1.5">Bubble / Glide / Adalo</span>
          <span className="rounded-full bg-[#f2f1ee] px-3 py-1.5">Airtable / Google Sheets</span>
          <span className="rounded-full bg-[#f2f1ee] px-3 py-1.5">ChatGPT & Claude</span>
          <span className="rounded-full bg-[#f2f1ee] px-3 py-1.5">Voiceflow / Botpress / Chatbase</span>
          <span className="rounded-full bg-[#f2f1ee] px-3 py-1.5">Stack AI / VectorShift</span>
          <span className="rounded-full bg-[#f2f1ee] px-3 py-1.5">Zapier / Make / n8n</span>
          <span className="rounded-full bg-[#f2f1ee] px-3 py-1.5">Razorpay</span>
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
