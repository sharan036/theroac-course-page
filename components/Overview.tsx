const points = [
  {
    title: "LIVE, NOT RECORDED",
    desc: "Live 2-hour sessions on Wed/Sat/Sun — real-time building, real-time feedback, not another pre-recorded course.",
  },
  {
    title: "ONE CAPSTONE, BUILT ALL MONTH",
    desc: "You pick your product idea in Session 1 and build it, session by session, into a real demoable AI product by end of the cohort. No exercises, no class projects — just your own product.",
  },
  {
    title: "NO CODE, REAL AI",
    desc: "Connect ChatGPT and Claude to your app, build a chatbot, and even teach AI your own documents — without writing a line of code.",
  },
];

export default function Overview() {
  return (
    <section className="bg-black px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium text-neutral-400">Introducing the No-Code AI Method</p>
          <h2 className="max-w-[830px] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-[38px]">
            A Live, Session-by-Session System for{" "}
            <span className="text-[#ff6f00]">Shipping a Real AI Product</span>
          </h2>
        </div>

        <div className="flex flex-col gap-0.5 overflow-hidden rounded-xl border border-[#333]">
          <div className="flex flex-col gap-12 bg-neutral-900 p-6 md:flex-row md:p-10">
            <div className="flex flex-1 flex-col gap-6">
              <span className="inline-block w-fit rounded-lg bg-neutral-800 px-3 py-1.5 text-sm text-white shadow-[inset_0_4px_4px_rgba(255,255,255,0.05)]">
                Get Ahead
              </span>
              <h3 className="text-2xl font-medium leading-tight text-white sm:text-[23px]">
                Live sessions, Wednesday / Saturday / Sunday, 2 hours each, across a 30-day window. No prior coding experience required. Every session builds directly on your own capstone idea, so by end of the cohort. you're not demoing a class exercise — you're demoing your own working AI product
              </h3>
              <a
                href="#pricing"
                className="flex w-fit items-center gap-3 rounded-lg bg-[#ff6f00] py-1 pr-2 pl-4 text-sm font-medium text-white"
              >
                Book My Seat
                <span className="grid h-9 w-9 place-items-center rounded-md bg-white text-[#ff6f00]">
                  →
                </span>
              </a>
            </div>

            <div className="flex flex-1 flex-col gap-6">
              <p className="text-left text-sm text-neutral-400">
                Roles this unlocks:
              </p>
              <div className="flex flex-wrap gap-3">
                {["Full-Stack AI Engineer", "AI Product Builder", "SaaS Founder / Indie Hacker"].map((r) => (
                  <span
                    key={r}
                    className="rounded-lg border border-white/10 bg-white/10 px-4 py-2 text-sm text-neutral-200 backdrop-blur"
                  >
                    {r}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 divide-y divide-black/20 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
            {points.map((p) => (
              <div key={p.title} className="flex flex-col gap-4 bg-[#f2f1ee] p-8">
                <p className="text-sm font-medium text-neutral-500">{p.title}</p>
                <p className="text-sm text-black">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* testimonial */}
        <blockquote className="mx-auto mt-12 flex max-w-[1040px] flex-col items-center gap-4 rounded-xl border border-white/10 bg-neutral-950/40 p-8 text-center backdrop-blur">
          <p className="max-w-[600px] text-lg text-white sm:text-xl">
            &quot;I didn't need to learn AI theory — I needed a shippable product. By the capstone, I had a live automation pipeline running my own workflow end-to-end, with a paywall in place.&quot;
          </p>
          <div className="mt-2 flex flex-col items-center">
            <p className="text-white">Course Graduate</p>
            <p className="text-sm text-neutral-400">Full-Stack AI Engineer</p>
          </div>
        </blockquote>
      </div>
    </section>
  );
}
