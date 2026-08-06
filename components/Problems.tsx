type Waypoint = {
  id: string;
  Icon: React.FC<{ className?: string }>;
  copy: string;
  left: number;
  top: number;
  width: number;
};

const ORANGE = "#F2600C";
const ORANGE_BRIGHT = "#FF7A1A";


function IconIdea({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <g stroke="#171717" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="12" cy="9.3" r="4.3" />
        <path d="M10.1 15.6h3.8" />
        <path d="M10.4 17.4h3.2" />
        <path d="M12 3.6v-1" />
        <path d="M17.3 4.3l.8-.7" />
        <path d="M6.7 4.3l-.8-.7" />
        <path d="M18.7 9.3h1" />
        <path d="M4.3 9.3h-1" />
        <path d="M17 13.1l.8.7" />
        <path d="M7 13.1l-.8.7" />
      </g>
    </svg>
  );
}

function IconPuzzleTrio({ className = "" }: { className?: string }) {
  const piece = (fill: string, stroke: string) => (
    <path
      d="M2.2 3.4h3.1V2a1.5 1.5 0 0 1 3 0v1.4h3.1v3.1H10a1.5 1.5 0 0 0 0 3h1.4v3.1H2.2V9.5H.8a1.5 1.5 0 0 1 0-3h1.4z"
      fill={fill}
      stroke={stroke}
      strokeWidth="1.1"
      strokeLinejoin="round"
    />
  );
  return (
    <svg viewBox="0 0 34 15" className={className} fill="none">
      <g transform="translate(0,0)">{piece("none", "#171717")}</g>
      <g transform="translate(11.2,0)">{piece("#FFF3EA", ORANGE)}</g>
      <g transform="translate(22.4,0)">{piece("none", "#171717")}</g>
    </svg>
  );
}

function IconChatQuestion({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path
        d="M3.5 5.2A2.2 2.2 0 0 1 5.7 3h12.6a2.2 2.2 0 0 1 2.2 2.2v8.1a2.2 2.2 0 0 1-2.2 2.2H9.4l-4 3.3v-3.3H5.7a2.2 2.2 0 0 1-2.2-2.2z"
        stroke="#171717"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M9.7 8.6a2.3 2.3 0 1 1 3.4 2c-.7.45-1.1.8-1.1 1.7"
        stroke={ORANGE}
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="12" cy="14.9" r="0.95" fill={ORANGE} />
    </svg>
  );
}

function IconBranchKnot({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 20" className={className} fill="none">
      <g strokeWidth="1.6" strokeLinecap="round">
        <path d="M4.5 10 L21 3.2" stroke="#171717" />
        <path d="M4.5 10 L21 16.8" stroke={ORANGE} />
      </g>
      <circle cx="4.5" cy="10" r="2.6" fill="#fff" stroke="#171717" strokeWidth="1.6" />
      <circle cx="21" cy="3.2" r="2.6" fill="#fff" stroke="#171717" strokeWidth="1.6" />
      <circle cx="21" cy="16.8" r="2.6" fill={ORANGE} stroke={ORANGE} strokeWidth="1.6" />
    </svg>
  );
}

function IconChainBroken({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 26 20" className={className} fill="none">
      <g stroke="#171717" strokeWidth="1.7" strokeLinecap="round">
        <rect x="1" y="6" width="9.5" height="8" rx="4" transform="rotate(-18 5.75 10)" />
        <rect x="15.5" y="6" width="9.5" height="8" rx="4" transform="rotate(-18 20.25 10)" />
      </g>
      <g stroke={ORANGE} strokeWidth="1.5" strokeLinecap="round">
        <path d="M11.6 5.4l1.3-1.6" />
        <path d="M14.2 4.2l.3-2" />
        <path d="M16.6 5.6l1.7-1.2" />
      </g>
    </svg>
  );
}

function IconClockLimited({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none">
      <path d="M12 2.5a9.5 9.5 0 1 1 0 19 9.5 9.5 0 0 1 0-19z" fill="none" stroke="#d4d4d4" strokeWidth="1.6" />
      <path d="M12 12 L12 5.6" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 12 L16.2 12" stroke="#171717" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M12 12 L15.3 8.1 A5.4 5.4 0 0 0 12 6.5z" fill={ORANGE} opacity="0.85" />
      <g stroke="#d4d4d4" strokeWidth="1.3" strokeLinecap="round">
        <path d="M12 3.3v1.1" />
        <path d="M20.7 12h-1.1" />
        <path d="M12 20.7v-1.1" />
        <path d="M3.3 12h1.1" />
      </g>
      <circle cx="12" cy="12" r="0.9" fill="#171717" />
    </svg>
  );
}

function CenterGraphic() {
  return (
    <div
      className="absolute grid place-items-center"
      style={{ left: "42.5%", top: "36%", width: "15%", aspectRatio: "1 / 1" }}
    >
      <svg viewBox="0 0 100 100" className="h-full w-full overflow-visible">
        <path
          d="M22 10h44a6 6 0 0 1 6 6v58l-16 16H22a6 6 0 0 1-6-6V16a6 6 0 0 1 6-6z"
          fill="#fff"
          stroke="#171717"
          strokeWidth="2.2"
          strokeLinejoin="round"
        />
        <path d="M56 90 L72 74 L60 74a4 4 0 0 0-4 4z" fill="#e5e5e5" stroke="#171717" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M26 26h36" stroke="#171717" strokeWidth="2.2" strokeLinecap="round" />
        <g transform="translate(30,34) scale(1.55)" stroke="#171717" strokeWidth="1.5" strokeLinecap="round" fill="none">
          <circle cx="12" cy="9.3" r="4.3" />
          <path d="M10.1 15.6h3.8" />
          <path d="M10.4 17.4h3.2" />
          <path d="M12 3.6v-1" />
          <path d="M17.3 4.3l.8-.7" />
          <path d="M6.7 4.3l-.8-.7" stroke={ORANGE} />
          <path d="M18.7 9.3h1" stroke={ORANGE} />
          <path d="M4.3 9.3h-1" />
          <path d="M17 13.1l.8.7" />
          <path d="M7 13.1l-.8.7" />
        </g>
        <circle cx="74" cy="72" r="17" fill="#fff" stroke="#e5e5e5" strokeWidth="1.5" />
        <g transform="translate(63,61)" stroke="#171717" strokeWidth="2" strokeLinecap="round" fill="none">
          <path d="M2 10a9 9 0 0 1 15.5-6.3" />
          <path d="M17.5 3.7v5h-5" />
          <path d="M20 12a9 9 0 0 1-15.5 6.3" />
          <path d="M4.5 18.3v-5h5" />
        </g>
      </svg>
    </div>
  );
}

const WAYPOINTS: Waypoint[] = [
  {
    id: "01",
    Icon: IconIdea,
    copy: "You have a real product idea — but no coding background, and no time to learn to code first.",
    left: 36.5,
    top: 6,
    width: 29,
  },
  {
    id: "02",
    Icon: IconPuzzleTrio,
    copy: "You've clicked around Bubble, Glide, or Airtable but never connected them into one working app.",
    left: 65,
    top: 30,
    width: 29,
  },
  {
    id: "03",
    Icon: IconChatQuestion,
    copy: "You've played with ChatGPT but have no idea how to wire it into a real product people can use.",
    left: 65,
    top: 56,
    width: 29,
  },
  {
    id: "04",
    Icon: IconBranchKnot,
    copy: "Chatbots, RAG, and “real AI features” all sound the same — you can't tell where one ends and the next begins.",
    left: 36.5,
    top: 80,
    width: 29,
  },
  {
    id: "05",
    Icon: IconChainBroken,
    copy: "You've never connected two tools with automation and don't know where to start.",
    left: 8.5,
    top: 56,
    width: 29,
  },
  {
    id: "06",
    Icon: IconClockLimited,
    copy: "You're a working professional with only a few hours a week — most courses assume you have all day.",
    left: 8.5,
    top: 30,
    width: 29,
  },
];

const DASHED_ARROWS = [
  "M768,132 C930,120 1075,155 1165,255",
  "M1245,300 C1265,360 1265,455 1245,515",
  "M1160,560 C1040,645 895,675 768,655",
  "M680,655 C545,675 395,645 275,560",
  "M275,515 C255,455 255,360 275,300",
];

const CLOSING_ARROW =
  "M340,245 C430,120 610,105 760,125";

function WaypointCard({ point }: { point: Waypoint }) {
  const { Icon, id, copy } = point;
  return (
    <div
      className="absolute flex items-start gap-4 rounded-2xl bg-white px-6 py-6 shadow-[0_10px_28px_-10px_rgba(15,15,15,0.18)] ring-1 ring-black/[0.04]"
      style={{ left: `${point.left}%`, top: `${point.top}%`, width: `${point.width}%` }}
    >
      <span className="absolute -top-3 -left-3 grid h-7 w-7 place-items-center rounded-[7px] border-[1.5px] border-[#F2600C] bg-white text-[13px] font-bold text-[#F2600C]">
        {id}
      </span>
      <Icon className="mt-1 h-12 w-12 shrink-0" />
      <p className="text-left text-[13.5px] leading-relaxed text-neutral-700">{copy}</p>
    </div>
  );
}

function LoopArrows() {
  return (
    <svg viewBox="0 0 1536 720" className="pointer-events-none absolute inset-0 h-full w-full" fill="none">
      <defs>
        <marker id="arrow-dashed" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 Z" fill={ORANGE} />
        </marker>
        <marker id="arrow-solid" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="7.5" markerHeight="7.5" orient="auto-start-reverse">
          <path d="M0,0 L10,5 L0,10 Z" fill={ORANGE_BRIGHT} />
        </marker>
        <filter id="loop-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {DASHED_ARROWS.map((d, i) => (
        <path
          key={i}
          d={d}
          stroke={ORANGE}
          strokeWidth={2}
          strokeDasharray="8 8"
          strokeLinecap="round"
          markerEnd="url(#arrow-dashed)"
        />
      ))}

      <path
        d={CLOSING_ARROW}
        stroke={ORANGE_BRIGHT}
        strokeWidth={5}
        strokeLinecap="round"
        markerEnd="url(#arrow-solid)"
        filter="url(#loop-glow)"
      />
    </svg>
  );
}

function MobileLoop() {
  return (
    <div className="flex flex-col md:hidden">
      {WAYPOINTS.map((point, i) => {
        const { Icon } = point;
        return (
          <div key={point.id} className="relative flex gap-4 pb-8 pl-2 last:pb-0">
            {i !== WAYPOINTS.length - 1 && (
              <span className="absolute left-[19px] top-9 h-[calc(100%-1.25rem)] border-l-2 border-dashed border-[#F2600C]/40" />
            )}
            <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-md border-[1.5px] border-[#F2600C] bg-white text-xs font-bold text-[#F2600C]">
              {point.id}
            </span>
            <div className="flex flex-1 items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_10px_28px_-10px_rgba(15,15,15,0.18)] ring-1 ring-black/[0.04]">
              <Icon className="mt-1 h-12 w-12 shrink-0" />
              <p className="text-left text-[13.5px] leading-relaxed text-neutral-700">{point.copy}</p>
            </div>
          </div>
        );
      })}
      <div className="mt-2 flex items-center gap-2 pl-2 text-xs font-medium text-neutral-400">
        Back to 01 — the loop resets.
      </div>
    </div>
  );
}

export default function Problems() {
  return (
    <section className="bg-white px-4 py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-6 flex flex-col items-center gap-4 text-center">
          <p className="text-sm font-semibold tracking-[0.18em] text-neutral-500">SOUND FAMILIAR?</p>
          <h2 className="max-w-[830px] text-3xl font-extrabold leading-[1.15] tracking-tight text-black sm:text-4xl md:text-[42px]">
            Does Your AI Product Idea Still Live
            <br />
            <span className="text-[#F2600C]">Only in Your Notes App?</span>
          </h2>
          <p className="max-w-[520px] text-base text-neutral-500">
            It&apos;s not a one-time setback. It&apos;s a loop most builders get stuck in.
          </p>
        </div>

        <div className="relative mx-auto hidden w-full md:block" style={{ aspectRatio: "1536 / 720", maxWidth: 1200, minHeight: 620,}}>
          <LoopArrows />
          <CenterGraphic />
          {WAYPOINTS.map((point) => (
            <WaypointCard key={point.id} point={point} />
          ))}
        </div>
        <MobileLoop />
      </div>
    </section>
  );
}
