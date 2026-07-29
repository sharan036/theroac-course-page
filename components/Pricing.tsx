const plans = [
  {
    tier: "AI SaaS Builder Cohort",
    price: "Beginner Friendly",
    desc: "JS fundamentals covered on Day 1 — 180+ hours of build time.",
    features: [
      "Instant access to the full 30-day, 4-phase curriculum",
      "All future updates and bonus prompts/projects included",
      "Weekly live build-along workshops",
      "Community support: stuck-for-20-minutes rule + peer troubleshooting",
    ],
    cta: "Book My Seat",
    sub: "Limited Seats Available for This Cohort",
    highlight: true,
    access:
      "Full lifetime access to the workbook + Verified Completion Certificate",
  },
];

export default function Pricing() {
  return (
    <section id="pricing" className="bg-neutral-900 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium text-neutral-400">Limited Seats Available for This Cohort</p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-[38px]">
            Join the <span className="text-[#ff6f00]">AI SaaS Builder</span> Cohort
          </h2>
        </div>

        <div className="mx-auto grid max-w-[560px] grid-cols-1 gap-6">
          {plans.map((p) => (
            <div
              key={p.tier}
              className={`flex flex-col overflow-hidden rounded-2xl border backdrop-blur ${
                p.highlight ? "border-white/20 bg-neutral-950/60" : "border-white/10 bg-neutral-950/40"
              }`}
            >
              <div className="flex flex-col gap-5 border-b border-white/5 bg-gradient-to-b from-white/0 to-white/5 p-6">
                <span
                  className={`w-fit rounded-lg px-3 py-1.5 text-sm text-white ${
                    p.highlight ? "bg-[#ff6f00]" : "bg-neutral-800"
                  }`}
                >
                  {p.tier}
                </span>
                <p className="text-4xl font-semibold text-white sm:text-5xl">{p.price}</p>
                <p className="text-sm text-neutral-400">{p.desc}</p>
              </div>

              <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-col gap-3">
                  <p className="text-xs font-medium tracking-wide text-neutral-400">
                    WHAT&apos;S INCLUDED
                  </p>
                  <ul className="flex flex-col gap-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white">
                        <span className="mt-0.5 text-[#ff6f00]">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
                <p className="text-lg text-white">{p.access}</p>
                <div className="flex flex-col gap-2">
                  <a
                    href="#"
                    className="flex w-full items-center justify-center gap-3 rounded-lg bg-[#ff6f00] py-3 text-sm font-medium text-white"
                  >
                    {p.cta}
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
