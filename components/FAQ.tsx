"use client";

import { useState } from "react";

const faqs = [
  {
    q: "Do I need any coding experience?",
    a: "No. This course is built entirely around no-code tools — app builders, Airtable/Google Sheets, no-code AI plugins, and automation platforms like Zapier and Make. If you can use a spreadsheet, you can follow along.",
  },
  {
    q: "What's the actual time commitment?",
    a: "Live sessions, Wednesday / Saturday / Sunday, 2 hours each, across a 30-day window, plus light homework between sessions — a few hours a week, not a daily grind. It's designed for working professionals with limited weekly time.",
  },
  {
    q: "Are the sessions live or pre-recorded?",
    a: "Live. Every session is a real-time build with the mentor and the cohort — you'll get feedback in the moment, not just a video to watch alone.",
  },
  {
    q: "What do I actually walk away with?",
    a: "One real, working, demoable AI product that you scope in Session 1 and build session by session — plus a first-hand, tested understanding of exactly where no-code stops working for your specific idea.",
  },
  {
    q: "Which tools will I use?",
    a: "A no-code app builder (Bubble/Glide/Adalo), Airtable or Google Sheets for data, ChatGPT and Claude via no-code plugins, a conversational AI tool (Voiceflow/Botpress/Chatbase), a no-code RAG tool (Chatbase/Stack AI/VectorShift), and an automation platform (Zapier/Make/n8n).",
  },
  {
    q: "What if I miss a live session?",
    a: "Recordings are available so you don't fall behind, but because each session builds on your own capstone, we recommend attending live whenever possible to get real-time feedback.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faqs" className="bg-neutral-950 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[800px]">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium text-neutral-400">FAQ</p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-[38px]">
            Frequently Asked <span className="text-[#ff6f00]">Questions</span>
          </h2>
        </div>

        <div className="flex flex-col gap-1">
          {faqs.map((f, i) => {
            const open = openIndex === i;
            return (
              <div key={f.q} className="overflow-hidden rounded bg-neutral-900">
                <button
                  onClick={() => setOpenIndex(open ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-6 text-left"
                >
                  <span className="text-lg font-medium text-white">{f.q}</span>
                  <span
                    className={`shrink-0 text-2xl text-white transition-transform ${
                      open ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>
                {open && (
                  <div className="px-6 pb-6 pr-16">
                    <p className="text-sm leading-relaxed text-white/80">{f.a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="mt-10 flex flex-col items-center gap-6 text-center">
          <p className="text-neutral-400">Still got questions? Reach out — we&apos;re here to help.</p>
          <a
            href="#"
            className="flex items-center gap-3 rounded-lg bg-[#ff6f00] py-1 pr-2 pl-4 text-sm font-medium text-white"
          >
            Reach out to us
            <span className="grid h-9 w-9 place-items-center rounded-md bg-white text-[#ff6f00]">
              →
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
