import Image from "next/image";

const badges = [
  { label: "AI Product Builder", color: "#ff6f00", icon: "rocket" },
  { label: "No-Code Specialist", color: "#ff6f00", icon: "code" },
  { label: "Automation Expert", color: "#a855f7", icon: "gear" },
  { label: "Rapid Prototyper", color: "#22c55e", icon: "puzzle" },
  { label: "Startup Collaborator", color: "#3b82f6", icon: "users" },
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
        <svg {...common}>
          <path d="M12 2c-1.3 0-2.4.8-2.8 2H6.5a.5.5 0 0 0-.5.5v3c0 .2.1.4.3.5l2.7 1.1A3.9 3.9 0 0 0 10 15.7L7.6 18a2 2 0 0 0 0 2.8l1.6 1.6a2 2 0 0 0 2.8 0L12 21.4l.1.1a2 2 0 0 0 2.8 0l1.6-1.6a2 2 0 0 0 0-2.8L14 15.7a3.9 3.9 0 0 0 .7-5.6l2.7-1.1c.2-.1.3-.3.3-.5v-3a.5.5 0 0 0-.5-.5h-2.7c-.4-1.2-1.5-2-2.8-2z" />
        </svg>
      );
    case "code":
      return (
        <svg {...common}>
          <path d="M9 8l-4 4 4 4M15 8l4 4-4 4" />
        </svg>
      );
    case "gear":
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="3.2" />
          <path d="M12 2.5v2.2M12 19.3v2.2M4.2 6.5l1.9 1.1M17.9 16.4l1.9 1.1M2.5 12h2.2M19.3 12h2.2M4.2 17.5l1.9-1.1M17.9 7.6l1.9-1.1" />
        </svg>
      );
    case "puzzle":
      return (
        <svg {...common}>
          <path d="M9 4.5a1.8 1.8 0 0 1 3.5 0V6h1a2 2 0 0 1 2 2v1h1.5a1.8 1.8 0 0 1 0 3.5H16v1a2 2 0 0 1-2 2h-1v1.5a1.8 1.8 0 0 1-3.5 0V15h-1a2 2 0 0 1-2-2v-1H4.5a1.8 1.8 0 0 1 0-3.5H6V7a2 2 0 0 1 2-2h1V4.5z" />
        </svg>
      );
    case "users":
      return (
        <svg {...common}>
          <circle cx="9" cy="8" r="3" />
          <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
          <circle cx="17.5" cy="9" r="2.3" />
          <path d="M21.5 20c0-2.6-1.9-4.8-4.4-5.4" />
        </svg>
      );
    default:
      return null;
  }
}

export default function Mentor() {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="rounded-3xl bg-black p-6 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.3)] sm:p-10">
          <div className="mb-8 flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[#ff6f00]" />
            <p className="text-sm font-semibold tracking-[2px] text-[#ff6f00]">
              MEET YOUR INSTRUCTOR
            </p>
          </div>

          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            {/* left column: photo + name + badges + quote */}
            <div className="flex flex-col gap-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-[220px_1fr]">
                <div className="relative aspect-[4/5] w-full max-w-[260px] overflow-hidden rounded-2xl">
                  <Image
                    src="https://storage.googleapis.com/heartfelt-6a946.firebasestorage.app/theROAC/WhatsApp%20Image%202026-08-08%20at%2000.31.27.jpeg"
                    alt="Sharan Gopal"
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex flex-col gap-4">
                  <div>
                    <h3 className="text-3xl font-bold text-white sm:text-4xl">Sharan Gopal</h3>
                    <p className="mt-1 text-sm text-neutral-400">
                      AI Builder &amp; No-Code Product Mentor
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                    {badges.map((b) => (
                      <div
                        key={b.label}
                        className="flex items-center gap-2.5 rounded-xl border border-white/10 bg-white/[0.03] px-3.5 py-2.5"
                      >
                        <BadgeIcon type={b.icon} color={b.color} />
                        <span className="text-sm font-medium text-white">{b.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4">
                <span className="text-[#ff6f00]">★</span>
                <p className="text-sm text-[#ff6f00] sm:text-base">
                  Turning ideas into real AI products, fast.
                </p>
              </div>
            </div>

            {/* right column: bio */}
            <div className="flex flex-col justify-center gap-5 text-neutral-200">
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
