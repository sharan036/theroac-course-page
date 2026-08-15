"use client";

import { useState, useEffect, useRef } from "react";

const years = ["2021", "2022", "2023", "2024", "2025"];

const series = [
  { name: "Microsoft", color: "#ff6f00", values: [100, 165, 225, 310, 360], salary: "₹18.7 LPA" },
  { name: "Airtable",  color: "#3b82f6", values: [100, 130, 160, 210, 250], salary: "₹13.4 LPA" },
  { name: "Zapier",    color: "#22c55e", values: [100, 108, 145, 180, 210], salary: "₹11.6 LPA" },
  { name: "Make",      color: "#a855f7", values: [100, 105, 130, 155, 210], salary: "₹10.9 LPA" },
  { name: "IBM",       color: "#eab308", values: [100, 100, 110, 130, 190], salary: "₹12.8 LPA" },
];

const CHART_HEIGHT = 340;
const Y_MIN = 100;
const Y_MAX = 420;
const Y_STEPS = [100, 150, 200, 250, 300, 350, 400];
const LABEL_HEIGHT = 56; // min vertical gap enforced between stacked end-labels

export default function HiringTrend() {
  const [width, setWidth] = useState(1000);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new ResizeObserver((entries) => {
      setWidth(entries[0].contentRect.width);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isMobile = width < 640;
  const isDesktop = width >= 900;

  const padLeft = isMobile ? 40 : 56;
  const padRight = isDesktop ? 190 : isMobile ? 16 : 24;
  const padTop = 20;
  const padBottom = 32;

  const plotWidth = Math.max(width - padLeft - padRight, 100);
  const plotHeight = CHART_HEIGHT - padTop - padBottom;

  const xFor = (i: number) => padLeft + (i / (years.length - 1)) * plotWidth;
  const yFor = (v: number) =>
    padTop + plotHeight - ((v - Y_MIN) / (Y_MAX - Y_MIN)) * plotHeight;

  const baselineY = yFor(Y_MIN);

  const labelPositions = (() => {
    const withY = series
      .map((s) => ({
        name: s.name,
        naturalY: yFor(s.values[s.values.length - 1]),
      }))
      .sort((a, b) => a.naturalY - b.naturalY);

    // Group into clusters where consecutive items are closer than LABEL_HEIGHT
    const clusters: (typeof withY)[] = [];
    let current: typeof withY = [];

    withY.forEach((item, i) => {
      if (i === 0) {
        current = [item];
        return;
      }
      const prev = withY[i - 1];
      if (item.naturalY - prev.naturalY < LABEL_HEIGHT) {
        current.push(item);
      } else {
        clusters.push(current);
        current = [item];
      }
    });
    if (current.length) clusters.push(current);

    const resolved: Record<string, number> = {};
    for (const cluster of clusters) {
      if (cluster.length === 1) {
        resolved[cluster[0].name] = cluster[0].naturalY;
        continue;
      }
      // Center the cluster on the true average of its members' positions,
      // then space each member LABEL_HEIGHT apart around that center.
      const avgY =
        cluster.reduce((sum, c) => sum + c.naturalY, 0) / cluster.length;
      const n = cluster.length;
      cluster.forEach((item, i) => {
        resolved[item.name] = avgY + (i - (n - 1) / 2) * LABEL_HEIGHT;
      });
    }

    return resolved;
  })();

  return (
    <section className="relative overflow-hidden bg-white px-4 py-16 md:py-24">
      <div className="pointer-events-none absolute left-0 top-0 grid grid-cols-4 gap-2 p-8 opacity-40">
        {Array.from({ length: 16 }).map((_, i) => (
          <span key={i} className="h-1 w-1 rounded-full bg-[#ff6f00]" />
        ))}
      </div>
      <div className="pointer-events-none absolute -top-10 -right-10 h-56 w-56 rounded-full border border-[#ff6f00]/25" />

      <div className="relative mx-auto max-w-[1200px]">
        <div className="mb-6 flex justify-center">
          <span className="rounded-lg border border-[#ff6f00]/40 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-[#ff6f00]">
            High Demand. High Impact.
          </span>
        </div>

        <h2 className="mx-auto max-w-3xl text-center text-3xl font-bold leading-tight text-zinc-900 md:text-5xl">
          Top Companies Hiring
          <br />
          <span className="text-[#ff6f00]">No Code AI</span> Product Builders
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-center text-base text-zinc-600 md:text-lg">
          From startups to global tech leaders, companies are actively hiring
          No Code AI talent to build, automate, and scale the future.
        </p>

        <div className="mt-12 rounded-3xl border border-zinc-200 bg-white p-5 shadow-sm md:p-8">
          <h3 className="text-base font-bold text-zinc-900 md:text-lg">
            Hiring Trend for No Code AI Roles
          </h3>
          <p className="mt-1 text-xs text-zinc-500 md:text-sm">
            Job Postings Index (2021 = 100)
          </p>

          <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
            {series.map((s) => (
              <div key={s.name} className="flex items-center gap-2">
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-xs font-semibold text-zinc-800 md:text-sm">
                  {s.name}
                </span>
              </div>
            ))}
          </div>

          <div ref={containerRef} className="relative mt-6 w-full">
            <svg
              width="100%"
              height={CHART_HEIGHT}
              viewBox={`0 0 ${width} ${CHART_HEIGHT}`}
              role="img"
              aria-label="Line chart showing job postings index growth from 2021 to 2025 for Microsoft, Airtable, Zapier, Make, and IBM, all trending upward with Microsoft growing the fastest."
            >
              {Y_STEPS.map((v) => (
                <g key={v}>
                  <line
                    x1={padLeft}
                    x2={width - padRight}
                    y1={yFor(v)}
                    y2={yFor(v)}
                    stroke="#e4e4e7"
                    strokeWidth={1}
                  />
                  <text
                    x={padLeft - 10}
                    y={yFor(v) + 4}
                    textAnchor="end"
                    fontSize={isMobile ? 10 : 12}
                    fill="#71717a"
                  >
                    {v}
                  </text>
                </g>
              ))}

              {years.map((y, i) => (
                <text
                  key={y}
                  x={xFor(i)}
                  y={CHART_HEIGHT - 8}
                  textAnchor="middle"
                  fontSize={isMobile ? 11 : 13}
                  fontWeight={600}
                  fill="#27272a"
                >
                  {y}
                </text>
              ))}

              {series.map((s) => {
                const points = s.values.map((v, i) => `${xFor(i)},${yFor(v)}`);
                // Area fill now drops only to the y-axis floor (value = 100),
                // not to zero — removes the dead gray slab below the chart.
                const areaPoints = [
                  `${xFor(0)},${baselineY}`,
                  ...points,
                  `${xFor(years.length - 1)},${baselineY}`,
                ].join(" ");

                return (
                  <g key={s.name}>
                    <polygon points={areaPoints} fill={s.color} opacity={0.06} />
                    <polyline
                      points={points.join(" ")}
                      fill="none"
                      stroke={s.color}
                      strokeWidth={2.5}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    {s.values.map((v, i) => (
                      <circle
                        key={i}
                        cx={xFor(i)}
                        cy={yFor(v)}
                        r={isMobile ? 3 : 4}
                        fill={s.color}
                        stroke="#fff"
                        strokeWidth={1.5}
                      />
                    ))}
                  </g>
                );
              })}
            </svg>

            {isDesktop && (
              <div className="pointer-events-none absolute inset-0">
                {series.map((s) => {
                  const top = labelPositions[s.name];
                  const left = xFor(years.length - 1) + 22;

                  return (
                    <div
                      key={s.name}
                      className="absolute flex -translate-y-1/2 items-center gap-2.5"
                      style={{ top, left }}
                    >
                      <span
                        className="grid h-8 w-11 shrink-0 place-items-center rounded-md border text-sm font-bold"
                        style={{
                          borderColor: `${s.color}55`,
                          color: s.color,
                          backgroundColor: `${s.color}10`,
                        }}
                      >
                        {s.values[s.values.length - 1]}
                      </span>
                      <div className="whitespace-nowrap">
                        <p className="text-[11px] leading-tight text-zinc-500">
                          Avg. Salary
                        </p>
                        <p className="text-[13px] font-bold leading-tight text-[#ff6f00]">
                          {s.salary}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {!isDesktop && (
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {series.map((s) => (
                <div
                  key={s.name}
                  className="flex items-center gap-3 rounded-xl border border-zinc-100 bg-zinc-50 px-3 py-2.5"
                >
                  <span
                    className="grid h-9 w-11 shrink-0 place-items-center rounded-lg border text-sm font-bold"
                    style={{
                      borderColor: `${s.color}55`,
                      color: s.color,
                      backgroundColor: `${s.color}10`,
                    }}
                  >
                    {s.values[s.values.length - 1]}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[11px] font-medium text-zinc-500">
                      Avg. Salary
                    </p>
                    <p className="text-sm font-bold text-[#ff6f00]">
                      {s.salary}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex items-start gap-2 rounded-xl bg-zinc-50 px-4 py-3 text-xs text-zinc-500 md:text-sm">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="mt-0.5 shrink-0">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="16" x2="12" y2="12" />
              <line x1="12" y1="8" x2="12.01" y2="8" />
            </svg>
            Job Postings Index represents the relative growth in job postings
            for No Code AI roles over time.
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-8 rounded-2xl bg-black px-6 py-8 sm:grid-cols-3 sm:gap-6 md:px-10">
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                  <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                </svg>
              ),
              title: "The demand is real.",
              desc: "Companies are actively hiring No Code AI talent across the globe.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <line x1="12" y1="20" x2="12" y2="10" />
                  <line x1="18" y1="20" x2="18" y2="4" />
                  <line x1="6" y1="20" x2="6" y2="16" />
                </svg>
              ),
              title: "Salaries are rising.",
              desc: "No Code AI roles are among the fastest-growing & highest-paying.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
                  <path d="M12 15l-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              ),
              title: "Be the advantage.",
              desc: "Learn the skills. Build real projects. Get hired by top companies.",
            },
          ].map((item) => (
            <div key={item.title} className="flex items-start gap-4">
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[#ff6f00]/40 text-[#ff6f00]">
                {item.icon}
              </span>
              <div>
                <h4 className="text-sm font-bold text-white md:text-base">
                  {item.title}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-zinc-400 md:text-sm">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-6 flex items-center justify-center gap-1.5 text-center text-xs text-zinc-400">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="16" x2="12" y2="12" />
            <line x1="12" y1="8" x2="12.01" y2="8" />
          </svg>
          Source: LinkedIn, Glassdoor &amp; Industry Reports (2021-2025)
        </p>
      </div>
    </section>
  );
}