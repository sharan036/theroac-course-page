import Image from "next/image";

export default function Community() {
  return (
    <section className="relative overflow-hidden bg-white px-4 pb-0 pt-16 md:pt-24">
      <div className="mx-auto flex max-w-[1200px] flex-col items-center gap-6 text-center">
        <p className="text-sm font-medium text-neutral-500">Community</p>
        <h2 className="max-w-[600px] text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl md:text-[38px]">
          Join an <span className="text-[#ff6f00]">Exclusive</span> Network of AI Builders
        </h2>
        <p className="max-w-[510px] text-sm text-neutral-500">
          Join the private ROAC community to get unstuck fast, share your daily commits, and see
          how other builders solved the same Day 13 auth bug or Day 20 RAG pipeline you&apos;re
          working through right now.
        </p>
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg bg-[#ff6f00] py-1 pr-2 pl-4 text-sm font-medium text-white"
        >
          Join the Community — It&apos;s Free
          <span className="grid h-9 w-9 place-items-center rounded-md bg-white text-[#ff6f00]">
            →
          </span>
        </a>
      </div>
      <div className="relative mx-auto mt-8 aspect-[954/438] w-full max-w-[954px]">
        <Image
          src="https://framerusercontent.com/images/IdIdxExRKEeAESwBLqg5FOIZFo.png"
          alt="Community globe"
          fill
          className="object-contain object-top"
        />
      </div>
    </section>
  );
}
