"use client";

import { useState } from "react";

const faqs = [
  {
    q: "What's the time commitment?",
    a: "Live sessions on Wed/Sat/Sun, 2 hours each, over 30 days — a few hours a week.",
  },
  {
    q: "Are sessions live or recorded?",
    a: "Live, with real-time feedback. Recordings are available if you miss one.",
  },
  {
    q: "What do I walk away with?",
    a: "A real, working AI product you build yourself, plus a clear sense of where no-code stops working for your idea.",
  },
  {
    q: "Which tools will I use?",
    a: "Bubble, Airtable, ChatGPT, Claude, Chatbase, n8n, and Razorpay.",
  },
  {
    q: "What's the stress-test session?",
    a: "You break your own build on purpose, estimate real usage costs, and find its limits — hands-on, not a lecture.",
  },
  {
    q: "Do I get access after the course ends?",
    a: "Yes — lifetime access to every session recording.",
  },
  {
    q: "Can I pause if I get busy?",
    a: "The cohort runs on a live schedule, but recordings let you catch up anytime.",
  },
  {
    q: "Is this the same as the coding bootcamp?",
    a: "No — same outcomes, but built entirely without code.",
  },
  {
    q: "Do I need to pay for the tools separately?",
    a: "Most have free tiers that cover the course. Paid tiers only matter if you keep your product live after.",
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
