const forYou = [
  "You want to build a real, working AI SaaS product \u2014 not another to-do app tutorial",
  "You\u2019re comfortable putting in 6\u20139 focused hours a day for 30 days",
  "You want daily structure telling you exactly what to build and ship",
  "You want to learn OpenAI, Claude, RAG, and real payments in one connected project",
  "You\u2019re ready to commit code to GitHub every single day, no exceptions",
];

const notForYou = [
  "You want a free course with scattered AI tips and no build plan",
  "You prefer watching tutorials over shipping working code",
  "You dislike structured, step-by-step, deadline-driven training",
  "You want to explore AI casually with no daily deliverable",
  "You\u2019re not ready to touch a terminal, a database, or an API key",
];

export default function IsThisForYou() {
  return (
    <section className="relative overflow-hidden bg-neutral-900 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <p className="text-white text-sm font-medium text-neutral-400">is this for you?</p>
          <h2 className="max-w-[700px] text-3xl font-semibold leading-tight tracking-tight text-white sm:text-4xl md:text-[38px]">
            This Course is a Fit If You&apos;re{" "}
            <span className="text-[#ff6f00]">Ready to Ship</span>, Not Just Study
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex flex-col overflow-hidden rounded-2xl border-2 border-[#ff6f00]">
            <div className="bg-[#ff6f00] py-1.5 text-center text-sm text-white">
              THIS IS FOR YOU IF:
            </div>
            <ul className="flex flex-col gap-4 bg-white p-8">
              {forYou.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-black">
                  <span className="mt-0.5 text-[#ff6f00]">✓</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col overflow-hidden rounded-2xl border-2 border-[#ff6f00] bg-white">
            <div className="bg-[#ff6f00] py-1.5 text-center text-sm text-white">
              THIS IS FOR YOU IF:
            </div>
            <ul className="flex flex-col gap-4 bg-white p-8">
              {notForYou.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-black">
                  <span className="mt-0.5 text-neutral-400">✕</span>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
