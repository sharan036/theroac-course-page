
export default function Navbar() {
  const links = [
    { label: "Curriculum", href: "#curriculum" },
    { label: "Reviews", href: "#reviews" },
    { label: "Why Us", href: "#why-choose-us" },
    { label: "FAQs", href: "#faqs" },
  ];

  return (
    <div className="fixed top-6 left-1/2 z-50 w-full -translate-x-1/2 px-4">
      <nav className="mx-auto flex max-w-[800px] items-center justify-between gap-6 rounded-xl border border-black/10 bg-white/95 px-3 py-3 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.15)] backdrop-blur">
        <div className="flex items-center gap-4 mx-auto">
          <ul className="hidden items-center gap-6 md:flex">
            {links.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-black transition hover:opacity-60"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <a
          href="#pricing"
          className="flex shrink-0 items-center gap-3 rounded-lg bg-[#ff6f00] py-1 pr-2 pl-4 text-sm font-medium text-white shadow-[inset_0_4px_10px_rgba(255,255,255,0.15)] transition hover:brightness-105"
        >
          Book My Seat
          <span className="grid h-9 w-9 place-items-center rounded-md bg-white text-[#ff6f00]">
            →
          </span>
        </a>
      </nav>
    </div>
  );
}
