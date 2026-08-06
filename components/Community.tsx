import Image from "next/image";

export default function Community() {
  const points = [
    { icon: <Image src='./message.svg' alt='Message' width={24} height={24} />, label: "Quick\nResponses" },
    { icon: <Image src='./users.svg' alt='Users' width={24} height={24} />, label: "Real People,\nReal Help" },
    { icon: <Image src='./safety.svg' alt='Safety' width={24} height={24} />, label: "Here to Support\nYour Journey" },
  ];

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 md:py-24">
      <div className="mx-auto flex max-w-[900px] flex-col items-center gap-6 text-center">
        <h2 className="text-3xl font-semibold leading-tight tracking-tight text-black sm:text-4xl md:text-[42px]">
          Have a question?
          <br />
          We&apos;re just a <span className="text-[#ff6f00]">WhatsApp</span> away.
        </h2>
        <div className="h-0.5 w-10 bg-[#ff6f00]" />
        <p className="max-w-[520px] text-sm text-neutral-500 sm:text-base">
          Got a question about the course, curriculum, or pricing? Drop us a message on WhatsApp
          and our team will get back to you as soon as possible.
        </p>

        <a
          href="https://wa.me/"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 flex items-center gap-3 rounded-lg bg-[#ff6f00] py-1 pr-2 pl-4 text-sm font-medium text-white transition hover:brightness-105"
        >
          <span className="text-lg"><Image src="./whatsapp-white.svg" alt="WhatsApp" width={24} height={24} /></span>
          Chat with The ROAC Team
          <span className="grid h-9 w-9 place-items-center rounded-md bg-white text-[#ff6f00]">
            →
          </span>
        </a>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-8 sm:gap-12">
          {points.map((p, i) => (
            <div key={p.label} className="flex items-center gap-8 sm:gap-12">
              <div className="flex items-center gap-3 text-left">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[#fff0e2] text-lg">
                  {p.icon}
                </span>
                <p className="whitespace-pre-line text-sm font-medium text-black">{p.label}</p>
              </div>
              {i < points.length - 1 && (
                <div className="hidden h-8 w-px bg-neutral-200 sm:block" />
              )}
            </div>
          ))}
        </div>
      </div>

      {/* decorative dotted path + whatsapp bubble */}
      <div className="relative mx-auto mt-16 hidden max-w-[900px] items-center justify-center sm:flex">
        <svg
          viewBox="0 0 900 120"
          className="absolute w-full text-[#ffd9b3]"
          fill="none"
        >
          <path
            d="M20 60 Q 450 -20 880 60"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeDasharray="3 6"
          />
          <circle cx="220" cy="30" r="5" fill="#ff6f00" />
          <circle cx="680" cy="30" r="5" fill="#ff6f00" />
        </svg>
        <div className="relative z-10 grid h-24 w-24 place-items-center rounded-full border border-neutral-100 bg-white shadow-lg">
          <span className="text-lg"><Image src="./whatsapp.svg" alt="WhatsApp" width={48} height={48} /></span>
        </div>
      </div>
    </section>
  );
}