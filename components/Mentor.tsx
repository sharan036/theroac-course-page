import Image from "next/image";

export default function Mentor() {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-12 flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-medium text-neutral-500">Meet Your Instructor</p>
          <h2 className="text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl md:text-[38px]">
            Your Guide Through the 
            <span className="text-[#ff6f00]"> No-Code AI Stack</span>
          </h2>
        </div>

        <div className="mx-auto grid max-w-[850px] grid-cols-1 gap-3 overflow-hidden rounded-2xl border-4 border-[#ff6f00]/60 sm:grid-cols-2">
          <div className="relative min-h-[260px] w-full">
            <Image
              src="https://framerusercontent.com/images/kBF4YAuHs3L8X3pme9TxgGme5E.png"
              alt="Instructor"
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-8 bg-neutral-950 p-8">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-lg font-medium text-white">Founder, TheROAC</p>
                <p className="text-sm text-neutral-400">Full-Stack AI Engineer</p>
              </div>
            </div>
            <div className="border-t border-dashed border-neutral-700" />
            <div className="flex flex-col gap-3">
              <p className="text-sm font-medium text-white">BIO</p>
              <p className="text-sm leading-relaxed text-neutral-200">
                I&apos;ve spent years building and shipping AI products, and mentoring people who
                don&apos;t code but have real product ideas. This course is the no-code path
                through the same skills our coding workbook teaches — app building, AI
                integration, automation, and a real product to show for it — built live, session
                by session, with people who have a few hours a week, not a few hours a day.
              </p>
            </div>
            <div className="mt-auto flex items-center justify-between rounded-xl bg-neutral-950">
              <div className="flex gap-2">
                {["YouTube", "X", "LinkedIn", "Instagram"].map((s) => (
                  <span
                    key={s}
                    className="grid p-2 place-items-center rounded-md bg-[#f2f1ee] text-xs"
                  >
                    {s}
                  </span>
                ))}
              </div>
              {/* <p className="text-sm text-neutral-400">10K+ Followers</p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
