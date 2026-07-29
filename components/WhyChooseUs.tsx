const stats = [
  { title: "30/30 — Daily Deliverables", desc: "Every day ends with something shipped and committed to GitHub \u2014 not just watched." },
  { title: "4 Phases — One Continuous Build", desc: "JS \u2192 React/Next.js \u2192 AI \u2192 Monetization, all inside a single, growing product." },
  { title: "9 Real Builds — Portfolio-Ready Projects", desc: "Including a Notes app, a RAG document Q&A tool, an AI Resume Reviewer, and an AI Content Generator." },
  { title: "2 AI Providers — OpenAI + Claude Fluency", desc: "Learn to build an AI abstraction layer that can swap models with one environment variable." },
  { title: "2 Payment Rails — Global + Local Monetization", desc: "Ship Stripe for card payments and Razorpay/UPI for Indian users in the same product." },
  { title: "1 — Live AI SaaS at the Finish Line", desc: "Capstone day ships a landing page, a demo video, and a case study \u2014 ready to show in interviews." },
];

export default function WhyChooseUs() {
  return (
    <section id="why-choose-us" className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium text-neutral-500">Why choose us?</p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl md:text-[38px]">
            The <span className="text-[#ff6f00]">Deliverables</span> Speak for Themselves
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
