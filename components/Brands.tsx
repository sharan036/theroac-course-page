const logos = ["OpenAI", "Anthropic", "Stripe", "Razorpay", "PostgreSQL", "Next.js"];

export default function Brands() {
  return (
    <section className="bg-neutral-950 px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] text-center">
        <h2 className="mb-10 text-2xl font-semibold text-white sm:text-3xl">
          The stack you&apos;ll ship with:
        </h2>
        <div className="flex flex-wrap items-center justify-center gap-10 opacity-70">
          {logos.map((l) => (
            <span key={l} className="text-lg font-medium tracking-tight text-white">
              {l}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
