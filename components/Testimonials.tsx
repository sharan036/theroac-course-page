const testimonials = [
  {
    name: "Full-Stack Builder",
    role: "Cohort Graduate",
    before:
      "\u201cI kept bouncing between JavaScript tutorials and AI API docs, never connecting the two into one real product.\u201d",
    after:
      "\u201cI shipped a full AI Resume Reviewer with auth, payments, and a usage paywall \u2014 in 30 days, one commit at a time.\u201d",
  },
  {
    name: "Indie Hacker",
    role: "Cohort Graduate",
    before:
      "\u201cEvery AI tutorial I followed ended in a Jupyter notebook, never a real app someone could actually use.\u201d",
    after:
      "\u201cNow I have a working RAG chatbot with source citations, streaming responses, and a Razorpay subscription gate.\u201d",
  },
  {
    name: "AI Product Builder",
    role: "Cohort Graduate",
    before:
      "\u201cI was scared of PostgreSQL, Razorpay webhooks, and production auth \u2014 I always shipped mock data instead.\u201d",
    after:
      "\u201cI deployed a real multi-tenant SaaS with Clerk auth, a Postgres database, and live Razorpay billing.\u201d",
  },
];

export default function Testimonials() {
  return (
    <section id="reviews" className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium text-neutral-500">This can be you</p>
          <h2 className="max-w-[540px] text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl md:text-[38px]">
            Our Builders Don&apos;t Just Learn — <span className="text-[#ff6f00]">They Ship.</span>
          </h2>
        </div>

        <div className="flex snap-x gap-4 overflow-x-auto pb-4">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="flex w-[85vw] max-w-[380px] shrink-0 snap-center flex-col rounded-2xl bg-[#f2f1ee]"
            >
              <div className="flex items-center gap-3 p-4">
                <div className="h-12 w-12 rounded-full bg-neutral-300" />
                <div>
                  <p className="text-sm font-medium text-black">{t.name}</p>
                  <p className="text-xs text-neutral-500">{t.role}</p>
                </div>
              </div>
              <div className="border-t border-dashed border-black/20 p-4">
                <p className="mb-1 text-xs font-medium text-black">BEFORE</p>
                <p className="text-sm text-neutral-500">{t.before}</p>
              </div>
              <div className="rounded-xl bg-neutral-900 p-4 text-white">
                <p className="mb-1 text-xs font-medium text-neutral-300">AFTER</p>
                <p className="text-sm">{t.after}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
