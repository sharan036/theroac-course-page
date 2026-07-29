const linkCols = [
  {
    heading: "Links",
    links: ["Curriculum", "Reviews", "Why Us", "FAQs", "Contact us"],
  },
  {
    heading: "Others",
    links: ["Terms of Service", "Privacy Policy", "404"],
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#e9e7e2] px-4 py-16">
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12">
        <div className="flex flex-col gap-12 md:flex-row md:justify-between">
          <div className="flex max-w-[300px] flex-col gap-4">
            <p className="text-xl font-semibold text-black">TheROAC</p>
            <p className="text-sm text-neutral-500">
              Go from zero code to one live AI SaaS product in 30 days.
            </p>
            <div className="flex gap-2">
              {["YouTube", "X", "LinkedIn", "Instagram"].map((s) => (
                <span
                  key={s}
                  className="grid h-9 w-9 place-items-center rounded-md bg-[#f2f1ee] text-xs"
                >
                  {s[0]}
                </span>
              ))}
            </div>
          </div>

          <div className="flex flex-wrap gap-16">
            {linkCols.map((col) => (
              <div key={col.heading} className="flex flex-col gap-4">
                <p className="text-sm font-medium text-black">{col.heading}</p>
                <ul className="flex flex-col gap-3">
                  {col.links.map((l) => (
                    <li key={l}>
                      <a href="#" className="text-sm text-neutral-500 hover:text-black">
                        {l}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="flex flex-col gap-1">
              <p className="text-sm font-medium text-black">help@theroac.com</p>
              <p className="text-sm text-neutral-500">For all your questions</p>
            </div>
          </div>
        </div>

        <div className="border-t border-dashed border-black/20 pt-6" />

        <div className="flex flex-col items-center justify-between gap-2 text-sm text-neutral-500 sm:flex-row">
          <p>© 2026 TheROAC.</p>
          <p>All Rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
