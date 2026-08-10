"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

// Design is authored at this fixed size, then scaled as a single rigid
// unit to fit the container. This keeps the arrows (SVG), the center
// graphic, and the cards perfectly aligned at every viewport width —
// instead of letting positions scale via % while text/padding/icons
// stay locked to px, which is what broke on non-lg desktop widths.
const DESIGN_WIDTH = 1536;
const DESIGN_HEIGHT = 720;

function IconIdea({ className = "" }: { className?: string }) {
  return (
    <Image src="/light.svg" alt="" width={200} height={200} className={className} />
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
    <Image src="/Question.svg" alt="" width={200} height={200} className={className} />
  );
}

function IconBranchKnot({ className = "" }: { className?: string }) {
  return (
    <Image src="/n8n.svg" alt="" width={200} height={200} className={className} />
  );
}

function IconChainBroken({ className = "" }: { className?: string }) {
  return (
    <Image src="/chain.svg" alt="" width={200} height={200} className={className} />
  );
}

function IconClockLimited({ className = "" }: { className?: string }) {
  return (
    <Image src="/clock.svg" alt="" width={200} height={200} className={className} />
  );
}

function CenterGraphic() {
  return (
    <div
      className="absolute grid place-items-center"
      style={{ left: "42.5%", top: "36%", width: "15%", aspectRatio: "1 / 1" }}
    >
      <Image src="/center.svg" alt="" width={200} height={200} className="h-full w-full" />
    </div>
  );
}

const WAYPOINTS: Waypoint[] = [
  {
    id: "01",
    Icon: IconIdea,
    copy: "You have a real product idea — but no coding background, and no time to learn to code first.",
    left: 36.5,
    top: 5,
    width: 30,
  },
  {
    id: "02",
    Icon: IconPuzzleTrio,
    copy: "You've clicked around Bubble, Glide, or Airtable but never connected them into one working app.",
    left: 65,
    top: 30,
    width: 30,
  },
  {
    id: "03",
    Icon: IconChatQuestion,
    copy: "You've played with ChatGPT but have no idea how to wire it into a real product people can use.",
    left: 65,
    top: 60,
    width: 30,
  },
  {
    id: "04",
    Icon: IconBranchKnot,
    copy: "Chatbots, RAG, and \u201creal AI features\u201d all sound the same — you can't tell where one ends and the next begins.",
    left: 36.5,
    top: 90,
    width: 30,
  },
  {
    id: "05",
    Icon: IconChainBroken,
    copy: "You've never connected two tools with automation and don't know where to start.",
    left: 8.5,
    top: 60,
    width: 30,
  },
  {
    id: "06",
    Icon: IconClockLimited,
    copy: "You're a working professional with only a few hours a week — most courses assume you have all day.",
    left: 8.5,
    top: 30,
    width: 30,
  },
];

const DASHED_ARROWS = [
  "M768,132 C930,120 1075,155 1165,255",
  "M1245,300 C1265,360 1265,455 1245,515",
  "M1160,560 C1040,645 895,675 768,655",
  "M680,655 C545,675 395,645 275,560",
  "M275,515 C255,455 255,360 275,300",
];

const CLOSING_ARROW = "M340,245 C430,120 610,105 760,125";

function WaypointCard({ point }: { point: Waypoint }) {
  const { Icon, id, copy } = point;
  return (
    <div
      className="absolute flex items-start gap-4 rounded-2xl bg-white pl-10 pr-4 py-6 shadow-[0_10px_28px_-10px_rgba(15,15,15,0.18)] ring-1 ring-black/[0.04]"
      style={{ left: `${point.left}%`, top: `${point.top}%`, width: `${point.width}%` }}
    >
      <span className="absolute top-3 left-3 grid h-7 w-7 place-items-center rounded-[7px] border-[1.5px] border-[#F2600C] bg-white text-[13px] font-bold text-[#F2600C]">
        {id}
      </span>
      <Icon className="mt-1 h-12 w-12 shrink-0" />
      <p className="text-left text-[13.5px] leading-relaxed text-neutral-700">
        {copy}
      </p>
    </div>
  );
}

function LoopArrows() {
  return (
    <svg
      viewBox="0 0 1536 720"
      preserveAspectRatio="xMidYMid meet"
      className="pointer-events-none absolute inset-0 h-full w-full"
      fill="none"
    >
      <defs>
        <marker
          id="arrow-dashed"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="7"
          markerHeight="7"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill={ORANGE} />
        </marker>

        <marker
          id="arrow-solid"
          viewBox="0 0 10 10"
          refX="6"
          refY="5"
          markerWidth="8"
          markerHeight="8"
          orient="auto-start-reverse"
        >
          <path d="M0,0 L10,5 L0,10 z" fill={ORANGE_BRIGHT} />
        </marker>

        <filter id="loop-glow" x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="4" result="blur" />
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
    <div className="flex flex-col lg:hidden">
      {WAYPOINTS.map((point, i) => {
        const { Icon } = point;
        return (
          <div key={point.id} className="relative flex gap-3 pb-6 pl-1 sm:gap-4 sm:pb-8 sm:pl-2 last:pb-0">
            {i !== WAYPOINTS.length - 1 && (
              <span className="absolute left-[21px] top-8 h-[calc(100%-1rem)] border-l-2 border-dashed border-[#F2600C]/40 sm:left-[25px] sm:top-9 sm:h-[calc(100%-1.25rem)]" />
            )}
            <span className="relative mt-6 z-10 grid h-8 w-8 shrink-0 place-items-center rounded-md border-[1.5px] border-[#F2600C] bg-white text-[11px] font-bold text-[#F2600C] sm:mt-7 sm:h-9 sm:w-9 sm:text-xs">
              {point.id}
            </span>
            <div className="flex flex-1 items-start gap-3 rounded-2xl bg-white p-3.5 shadow-[0_10px_28px_-10px_rgba(15,15,15,0.18)] ring-1 ring-black/[0.04] sm:p-4">
              <Icon className="mt-1 h-9 w-9 shrink-0 sm:h-12 sm:w-12" />
              <p className="text-left text-[12.5px] leading-relaxed text-neutral-700 sm:text-[13.5px]">
                {point.copy}
              </p>
            </div>
          </div>
        );
      })}
      <div className="mt-2 flex items-center gap-2 pl-1 text-xs font-medium text-neutral-400 sm:pl-2">
        Back to 01 — the loop resets.
      </div>
    </div>
  );
}

/**
 * Scales the fixed 1536x720 desktop composition down (or up) to fit
 * whatever width the container actually has, using a CSS transform.
 * This is what makes the waypoint cards, arrows, and center graphic
 * stay perfectly locked together at every screen size — rather than
 * the previous approach where card positions were % (responsive) but
 * card padding/text/icon sizes were fixed px (not responsive), which
 * caused misalignment and overlap outside the two hardcoded breakpoints.
 */
function useScaleToFit(designWidth: number) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const el = outerRef.current;
    if (!el) return;

    const update = () => {
      const width = el.getBoundingClientRect().width;
      if (width > 0) setScale(width / designWidth);
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    window.addEventListener("resize", update);

    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, [designWidth]);

  return { outerRef, scale };
}

export default function Problems() {
  const { outerRef, scale } = useScaleToFit(DESIGN_WIDTH);

  return (
    <section className="bg-white px-4 py-14 sm:py-16 md:py-24">
      <div className="mx-auto max-w-[1200px]">
        <div className="mb-6 flex flex-col items-center gap-4 text-center">
          <p className="text-xs font-semibold tracking-[0.18em] text-neutral-400 sm:text-sm">
            SOUND FAMILIAR?
          </p>
          <h2 className="max-w-[830px] text-2xl font-extrabold leading-[1.2] tracking-tight text-black sm:text-3xl md:text-4xl lg:text-[42px] lg:leading-[1.15]">
            Does Your AI Product Idea Still Live
            <br className="hidden sm:block" />
            <span className="text-[#F2600C]"> Only in Your Notes App?</span>
          </h2>
          <p className="max-w-[520px] text-sm text-neutral-500 sm:text-base">
            It&apos;s not a one-time setback. It&apos;s a loop most builders get stuck in.
          </p>
        </div>

        {/* Outer: real responsive width, height driven by the scaled inner box */}
        <div
          ref={outerRef}
          className="relative mx-auto hidden w-full lg:block"
          style={{
            maxWidth: DESIGN_WIDTH,
            height: DESIGN_HEIGHT * scale,
          }}
        >
          {/* Inner: fixed 1536x720 design, uniformly scaled to fit outer width */}
          <div
            className="absolute left-0 top-0"
            style={{
              width: DESIGN_WIDTH,
              height: DESIGN_HEIGHT,
              transform: `scale(${scale})`,
              transformOrigin: "top left",
            }}
          >
            <Image
              src="/arrow-lines.png"
              alt=""
              width={DESIGN_WIDTH}
              height={DESIGN_HEIGHT}
              priority
              className="pointer-events-none absolute inset-0 h-full w-full object-fill"
            />
            <CenterGraphic />
            {WAYPOINTS.map((point) => (
              <WaypointCard key={point.id} point={point} />
            ))}
          </div>
        </div>
        <MobileLoop />
      </div>
    </section>
  );
}
