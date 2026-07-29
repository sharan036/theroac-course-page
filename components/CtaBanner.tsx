import Image from "next/image";

const benefits = [
  "30 Days of Career-Oriented Building",
  "Learn by Shipping, Not Watching",
  "Lifetime Access with All Future Updates",
];

export default function CtaBanner() {
  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 md:py-24">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-8 text-center">
        <p className="text-sm font-medium text-neutral-500">Registrations Ongoing!</p>
        <div className="flex -space-x-3">
          {[
            "https://framerusercontent.com/images/GvIIYiCvs1fSYrsqT9kkYqRv4Y.jpg",
            "https://framerusercontent.com/images/LS4ISV3lMw5erPxQJs6QzAYUmU.jpg",
            "https://framerusercontent.com/images/fVdbJJ2MWbfO3uSvWyvr0pmMb0M.png",
          ].map((src, i) => (
            <div
              key={i}
              className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white"
            >
              <Image src={src} alt="Student" fill className="object-cover" />
            </div>
          ))}
        </div>

        <h2 className="max-w-[700px] text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl md:text-[38px]">
          Book My Seat &amp; <span className="text-[#ff6f00]">Start Shipping Tonight</span>
        </h2>
        <p className="max-w-[500px] text-sm text-neutral-500">
          Graduates walk away with a live AI SaaS product, a verified certificate, and a
          portfolio case study — built one daily deliverable at a time.
        </p>

        <a
          href="#pricing"
          className="flex items-center gap-3 rounded-lg bg-[#ff6f00] py-1 pr-2 pl-4 text-sm font-medium text-white"
        >
          Book My Seat
          <span className="grid h-9 w-9 place-items-center rounded-md bg-white text-[#ff6f00]">
            →
          </span>
        </a>

        <div className="mt-4 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
          {benefits.map((b) => (
            <div
              key={b}
              className="flex flex-col items-center gap-3 rounded-xl bg-white p-4 text-center shadow-[0_1px_2px_rgba(0,0,0,0.06)]"
            >
              <span className="text-[#ff6f00]">★</span>
              <p className="text-sm text-black">{b}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
