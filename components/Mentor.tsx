import Image from "next/image";

const fingerPaint = { className: "font-finger-paint" };
const dmSans = { className: "font-dm-sans" };
const inter = { className: "font-inter" };

const badges = [
  { label: "AI Product Builder", color: "#ff6f00", icon: "rocket" },
  { label: "No-Code Specialist", color: "#ff6f00", icon: "code" },
  { label: "Automation Expert", color: "#a855f7", icon: "gear" },
  { label: "Rapid Prototyper", color: "#22c55e", icon: "puzzle" },
  { label: "Startup Collaborator", color: "#3b82f6", icon: "users" },
];

const socials = [
  { label: "YouTube", href: "#", icon: "youtube" },
  { label: "X", href: "#", icon: "x" },
  { label: "LinkedIn", href: "#", icon: "linkedin" },
  { label: "Instagram", href: "#", icon: "instagram" },
];

function BadgeIcon({ type, color }: { type: string; color: string }) {
  const common = {
    width: 18,
    height: 18,
    viewBox: "0 0 24 24",
    fill: "none" as const,
    stroke: color,
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (type) {
    case "rocket":
      return (
        <Image src="/rocket.svg" alt="" width={200} height={200} className="w-6 h-6" />
      );
    case "code":
      return (
        <Image src="/code.svg" alt="" width={200} height={200} className="w-6 h-6" />
      );
    case "gear":
      return (
        <Image src="/gear.svg" alt="" width={200} height={200} className="w-6 h-6" />
      );
    case "puzzle":
      return (
        <Image src="/puzzle.svg" alt="" width={200} height={200} className="w-6 h-6" />
      );
    case "users":
      return (
        <Image src="/user.svg" alt="" width={200} height={200} className="w-6 h-6" />
      );
    default:
      return null;
  }
}

function SocialIcon({ type }: { type: string }) {
  const common = {
    width: 15,
    height: 15,
    viewBox: "0 0 24 24",
  };
  switch (type) {
    case "youtube":
      return (
        <svg {...common} fill="currentColor">
          <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31 31 0 0 0 0 12a31 31 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31 31 0 0 0 24 12a31 31 0 0 0-.5-5.8zM9.6 15.5V8.5l6.3 3.5-6.3 3.5z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} fill="currentColor">
          <path d="M18.9 2H22l-7.6 8.7L23.4 22h-7.1l-5.5-7.2L4.6 22H1.5l8.1-9.3L1 2h7.3l5 6.6L18.9 2zm-1.2 18h1.7L6.4 4H4.6L17.7 20z" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} fill="currentColor">
          <path d="M20.5 2h-17A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2zM8.3 18.5H5.6V9.8h2.7v8.7zM7 8.6a1.6 1.6 0 1 1 0-3.1 1.6 1.6 0 0 1 0 3.1zm11.5 9.9h-2.7v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4v4.7H9.9V9.8h2.6v1.2h.1c.4-.7 1.3-1.5 2.7-1.5 2.9 0 3.4 1.9 3.4 4.3v4.7z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth="1.8">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Mentor() {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1430px]">
        <div className="rounded-3xl bg-black p-5 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] sm:p-10">
          <div className="mb-6 flex items-center gap-2 lg:mb-8">
            <span className="h-2 w-2 rounded-full bg-[#ff6f00]" />
            <p className="text-sm font-semibold tracking-[2px] text-[#ff6f00]">
              MEET YOUR INSTRUCTOR
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {/* left column: photo + name + badges + quote (desktop) / full card (mobile) */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-[220px_1fr]">
                <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl lg:max-w-[260px]">
                  <Image
                    src="https://storage.googleapis.com/heartfelt-6a946.firebasestorage.app/theROAC/WhatsApp%20Image%202026-08-08%20at%2000.31.27.jpeg"
                    alt="Sharan Gopal"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className={`${inter.className} text-3xl font-extrabold text-white sm:text-4xl`}>
                      Sharan Gopal
                    </h3>
                    <p className={`${inter.className} mt-1 text-sm text-neutral-400`}>
                      AI Builder &amp; No-Code Product Mentor
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5">
                    {badges.map((b) => (
                      <div
                        key={b.label}
                        className={`flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5 ${
                          b.label === "Startup Collaborator" ? "col-span-2 sm:col-span-1" : ""
                        }`}
                      >
                        <BadgeIcon type={b.icon} color={b.color} />
                        <span className={`${dmSans.className} text-sm font-medium text-white`}>
                          {b.label}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* mobile-only bio block */}
              <div className="flex flex-col gap-5 lg:hidden">
                <div className="border-t border-dashed border-white/15 pt-5">
                  <div className="mb-3 flex items-center gap-2">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ff6f00" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="8" r="3.2" />
                      <path d="M4.5 20c0-3.6 3.4-6.5 7.5-6.5s7.5 2.9 7.5 6.5" />
                    </svg>
                    <p className={`${inter.className} text-xs font-semibold tracking-[2px] text-[#ff6f00]`}>
                      BIO
                    </p>
                  </div>
                  <p className={`${inter.className} text-[15px] leading-relaxed text-neutral-200`}>
                    I&apos;ve spent years building and shipping AI products, and mentoring people
                    who don&apos;t code but have real product ideas. This course is the no-code
                    path through the same skills our coding workbook teaches—app building, AI
                    integration, automation, and a real product to show for it — built live,
                    session by session, with people who have a few hours a week, not a few hours
                    a day.
                  </p>
                </div>

                <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                  <span className="text-[#ff6f00]">★</span>
                  <p className={`${fingerPaint.className} text-sm leading-snug text-[#ff6f00]`}>
                    Turning ideas into real AI products, fast.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  {socials.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-4 py-2 text-white"
                    >
                      <SocialIcon type={s.icon} />
                      <span className={`${dmSans.className} text-sm font-medium`}>{s.label}</span>
                    </a>
                  ))}
                </div>
              </div>

              {/* desktop-only quote */}
              <div className="hidden items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 lg:flex">
                <span className="text-[#ff6f00]">★</span>
                <p className={`${fingerPaint.className} text-sm leading-snug text-[#ff6f00] sm:text-base`}>
                  Turning ideas into real AI products, fast.
                </p>
              </div>
            </div>

            {/* right column: bio (desktop only) */}
            <div className={`${inter.className} hidden flex-col justify-center gap-5 text-neutral-200 lg:flex`}>
              <p className="text-base leading-relaxed sm:text-lg">
                I build AI products for the next generation of startups and help people turn
                ideas into working products.
              </p>
              <p className="text-base leading-relaxed sm:text-lg">
                With hands-on experience across AI, no-code development, automation, and rapid
                prototyping, I work with tools including{" "}
                <span className="font-semibold text-[#ff6f00]">OpenAI</span>,{" "}
                <span className="font-semibold text-[#ff6f00]">Claude</span>,{" "}
                <span className="font-semibold text-[#ff6f00]">Cursor</span>,{" "}
                <span className="font-semibold text-[#ff6f00]">Lovable</span>,{" "}
                <span className="font-semibold text-[#ff6f00]">Bolt</span>,{" "}
                <span className="font-semibold text-[#ff6f00]">Replit</span>,{" "}
                <span className="font-semibold text-[#ff6f00]">Make</span>,{" "}
                <span className="font-semibold text-[#ff6f00]">n8n</span>, and{" "}
                <span className="font-semibold text-[#ff6f00]">Supabase</span>.
              </p>
              <p className="text-base leading-relaxed sm:text-lg">
                In this course, I&apos;ll help you apply the same product-building mindset — turn
                an idea into a working AI product, integrate AI, automate workflows, and ship
                something you can actually put in front of users.
              </p>
              <svg width="70" height="20" viewBox="0 0 70 20" className="text-[#ff6f00]">
                <path
                  d="M2 14 Q10 4 18 14 T34 14 T50 14 T66 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}