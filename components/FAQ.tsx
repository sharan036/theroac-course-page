"use client";

import { useState } from "react";

const faqs = [
  {
    q: "How much time do I need each day?",
    a: "Plan for 6\u20139 focused hours a day, 30 days straight. Some days (like Day 25, 26, and 30) run longer because they're full project-build days. The one rule of the course: if a day's deliverable isn't done, you don't start the next day until it is.",
  },
  {
    q: "Do I need any coding background to start?",
    a: "You need to be comfortable installing software and following instructions. Day 1 starts from JavaScript fundamentals \u2014 variables, functions, and arrow functions \u2014 so no prior AI or React experience is required. Basic comfort with a terminal helps.",
  },
  {
    q: "What makes this different from free YouTube tutorials?",
    a: "Every day has one deliverable you must ship and commit to GitHub before you sleep \u2014 not a video to passively watch. By Day 30 you have one continuous, live AI SaaS product with real auth, a real database, real AI features, and real payments, not 30 disconnected demos.",
  },
  {
    q: "Can I pause if life gets busy?",
    a: "Yes \u2014 the workbook is self-paced and yours for life, but the daily-shipping habit is the core mechanic of the course, so we recommend running the 30 days as close to back-to-back as your schedule allows for the best results.",
  },
  {
    q: "Will I get future updates to the curriculum for free?",
    a: "Yes, all future updates, new bonus prompts, and additional projects added to the workbook are included at no extra cost for all enrolled builders.",
  },
  {
    q: "What do I actually walk away with?",
    a: "A live AI SaaS product covering JavaScript, Node/Express, PostgreSQL, React, Next.js, Clerk auth, OpenAI, Claude, RAG, Stripe, and Razorpay \u2014 plus a TheROAC Verified certificate and a portfolio case study you can show in interviews.",
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
          <p className="text-neutral-400">Still got questions? Reach out — we&apos;re here to help</p>
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
