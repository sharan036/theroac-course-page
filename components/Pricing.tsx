const features = [
  "Instant access to all live sessions, plus recordings if you miss one",
  "Pick and build your own capstone idea from Session 1 onward",
  "Hands-on, live builds every session — not passive watching",
  "A final stress-test exercise so you know exactly where no-code stops working for you",
];

const highlights = [
  "Zero Coding Experience Required",
  "Live 2-Hour Sessions (Wed/Sat/Sun)",
  "One Real AI Product Shipped by Session 13",
  "Built for Working Professionals — Light Weekly Homework",
];

const tools = ["Bubble", "Airtable", "ChatGPT", "Claude", "Voiceflow", "Chatbase", "Zapier", "Stripe"];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-neutral-900 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <span className="rounded-full bg-[#ff6f00]/15 px-4 py-1.5 text-xs font-medium text-[#ff6f00]">
            Cohort-based — limited seats per batch
          </span>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-[38px]">
            Join the No-Code AI Product Development Cohort
          </h2>
        </div>

        <div className="mx-auto grid max-w-[900px] grid-cols-1 gap-6 overflow-hidden rounded-2xl border border-white/10 bg-neutral-950/40 backdrop-blur sm:grid-cols-2">
          <div className="flex flex-col gap-6 p-8">
            <ul className="flex flex-col gap-4">
              {highlights.map((h) => (
                <li key={h} className="flex items-start gap-3 text-sm text-white">
                  <span className="mt-0.5 text-[#ff6f00]">✓</span>
                  {h}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-6 border-t border-white/10 p-8 sm:border-l sm:border-t-0">
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium tracking-wide text-neutral-400">
                QUICK OVERVIEW
              </p>
              <ul className="flex flex-col gap-3">
                {features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm text-white">
                    <span className="mt-0.5 text-[#ff6f00]">✓</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
            <a
              href="#"
              className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#ff6f00] py-3 text-sm font-medium text-white"
            >
              Book My Seat
            </a>
          </div>
        </div>

        <div className="mx-auto mt-14 flex max-w-[900px] flex-col items-center gap-6 text-center">
          <p className="text-sm font-medium tracking-wide text-neutral-400">TOOL STACK</p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {tools.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/10 bg-neutral-950/50 px-4 py-2 text-sm text-white"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}