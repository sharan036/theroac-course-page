const stats = [
  { title: "100% — Live Sessions, Not Recordings", desc: "Every session is live — Wed/Sat/Sun, 2 hours each — with real-time building and feedback." },
  { title: "5 Weeks — One Continuous Capstone Build", desc: "Foundations → App Builder Mastery → AI Layer → Automation & Launch, all inside your own product." },
  { title: "1 Capstone — A Real, Demoable AI Product", desc: "Not a class exercise — the product you scope in Session 1 is the one you demo in Session 13." },
  { title: "4 AI Tools — No-Code AI Fluency", desc: "ChatGPT, Claude, no-code RAG tools, and conversational AI builders — connected without writing code." },
  { title: "2 Automations — Real Workflow Automation", desc: "A two-tool connection and a full end-to-end automation, both built and tested live." },
  { title: "1 Stress-Test — Know Your Limits, First-Hand", desc: "A dedicated exercise where you break your own build and learn exactly where no-code stops working for you." },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium text-neutral-500">Why choose us?</p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl md:text-[38px]">
            A <span className="text-[#ff6f00]">Real Product</span> Speaks for Itself
          </h2>
        </div>

        <div className="grid grid-cols-1 divide-y divide-black/10 overflow-hidden rounded-2xl border border-black/10 sm:grid-cols-2 sm:divide-x sm:divide-y-0 lg:grid-cols-3">
          {stats.map((s, i) => (
            <div key={i} className="flex flex-col gap-3 p-8">
              <h3 className="text-lg font-medium text-black">{s.title}</h3>
              <p className="text-sm text-neutral-600">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
