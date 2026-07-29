const problems = [
  "You've watched 40 hours of tutorials but never shipped anything that actually runs.",
  "You know JavaScript basics but freeze the moment you have to connect a database, an API, and a frontend together.",
  "You've tried \u201cvibe-coding\u201d an AI wrapper and it broke the moment a real user touched it.",
  "You don't know how OpenAI, Claude, and RAG actually fit into a real product \u2014 just isolated demos.",
  "You have zero idea how to charge people \u2014 Stripe, Razorpay, and usage limits feel like a different universe.",
  "You keep starting projects and abandoning them by day 3 because there's no plan, just vibes.",
];

export default function Problems() {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-10 flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium text-neutral-500">Sound familiar?</p>
          <h2 className="max-w-[830px] text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl md:text-[38px]">
            Does Your AI SaaS Idea Still Live{" "}
            <span className="text-[#ff6f00]">Only in Your Notes App?</span>
          </h2>
        </div>

        <div className="relative grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {problems.map((text) => (
            <div
              key={text}
              className="flex w-full flex-col items-center gap-5 rounded-xl p-2 text-center"
            >
              <div className="grid h-10 w-10 place-items-center rounded-full bg-[#ff6f00]/10 text-lg text-[#ff6f00]">
                ✕
              </div>
              <p className="text-sm text-black">{text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
