"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Reveal from "./Reveal";

const headshots = [
  "https://framerusercontent.com/images/GvIIYiCvs1fSYrsqT9kkYqRv4Y.jpg",
  "https://framerusercontent.com/images/LS4ISV3lMw5erPxQJs6QzAYUmU.jpg",
  "https://framerusercontent.com/images/km3kZvwQj1ex1UnSfYsIR0bRQ.png",
  "https://framerusercontent.com/images/fVdbJJ2MWbfO3uSvWyvr0pmMb0M.png",
];

const typingMessages = [
  "Answer this question using only my documents.",
  "Turn ChatGPT into a chatbot for my customers.",
  "Summarize these meeting notes automatically.",
  "Add an AI feature that improves this text.",
  "Teach my AI assistant to remember our chats."
];

// ----------------------------------------------------
// Cookie Helpers
// ----------------------------------------------------

const getCookie = (name: string) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);

  if (parts.length === 2) {
    return parts.pop()?.split(";").shift();
  }

  return null;
};

const setCookie = (name: string, value: string, days = 30) => {
  const date = new Date();

  date.setTime(date.getTime() + days * 86400000);

  document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/`;
};

const INITIAL_SEATS = 19;
const MIN_SEATS = 1;
const BATCH_DATE = "20 Aug 2026";

const EARLY_DROP_MIN_DELAY_MS = 15 * 1000;
const EARLY_DROP_MAX_DELAY_MS = 45 * 1000;
const EARLY_DROP_PROBABILITY = 0.6;

const BASELINE_INTERVAL_MS = 8 * 60 * 1000;
const RESET_HOLD_MS = 5 * 60 * 1000; 

export default function Hero() {
  const [messageIndex, setMessageIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [seatsLeft, setSeatsLeft] = useState(INITIAL_SEATS);

  useEffect(() => {
    const startNewCycle = (now: number) => {
      const baseSeats = INITIAL_SEATS;
      const willDrop = Math.random() < EARLY_DROP_PROBABILITY;
      const earlyDropAt = willDrop
        ? now +
          EARLY_DROP_MIN_DELAY_MS +
          Math.random() * (EARLY_DROP_MAX_DELAY_MS - EARLY_DROP_MIN_DELAY_MS)
        : null;

      setCookie("cycleStartAt", String(now));
      setCookie("baseSeats", String(baseSeats));
      setCookie("earlyDropAt", earlyDropAt ? String(Math.round(earlyDropAt)) : "none");
      setCookie("hitMinAt", "none");

      return { cycleStartAt: now, baseSeats, earlyDropAt };
    };

    let cycleStartAt: number;
    let baseSeats: number;
    let earlyDropAt: number | null;

    const savedCycleStartAt = getCookie("cycleStartAt");
    const savedBaseSeats = getCookie("baseSeats");
    const savedEarlyDropAt = getCookie("earlyDropAt");

    if (savedCycleStartAt && savedBaseSeats && savedEarlyDropAt) {
      cycleStartAt = Number(savedCycleStartAt);
      baseSeats = Number(savedBaseSeats);
      earlyDropAt = savedEarlyDropAt === "none" ? null : Number(savedEarlyDropAt);
    } else {
      const fresh = startNewCycle(Date.now());
      cycleStartAt = fresh.cycleStartAt;
      baseSeats = fresh.baseSeats;
      earlyDropAt = fresh.earlyDropAt;
    }

    const computeSeats = () => {
      const now = Date.now();
      let seats = baseSeats;
      if (earlyDropAt && now >= earlyDropAt) {
        seats -= 1;
      }

      const baselineStart = earlyDropAt ?? cycleStartAt;
      if (now > baselineStart) {
        const elapsed = now - baselineStart;
        const dropped = Math.floor(elapsed / BASELINE_INTERVAL_MS);
        seats -= dropped;
      }

      const clamped = Math.max(MIN_SEATS, seats);

      // Track when we first hit MIN_SEATS, and reset after the hold period
      if (clamped === MIN_SEATS) {
        const savedHitMinAt = getCookie("hitMinAt");

        if (!savedHitMinAt || savedHitMinAt === "none") {
          setCookie("hitMinAt", String(now));
          setSeatsLeft(MIN_SEATS);
          return;
        }

        const hitMinAt = Number(savedHitMinAt);

        if (now - hitMinAt >= RESET_HOLD_MS) {
          const fresh = startNewCycle(now);
          cycleStartAt = fresh.cycleStartAt;
          baseSeats = fresh.baseSeats;
          earlyDropAt = fresh.earlyDropAt;
          setSeatsLeft(baseSeats);
          return;
        }
      }

      setSeatsLeft(clamped);
    };

    computeSeats();
    const interval = setInterval(computeSeats, 5 * 1000);
    return () => clearInterval(interval);
  }, []);

  // Typing animation
  useEffect(() => {
    const currentMessage = typingMessages[messageIndex];
    let timeout: NodeJS.Timeout;
    const typingSpeed = 55;
    const deletingSpeed = 30;
    const pauseTime = 1500;

    if (!isDeleting) {
      if (displayText.length < currentMessage.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentMessage.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, pauseTime);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(currentMessage.slice(0, displayText.length - 1));
        }, deletingSpeed);
      } else {
        setIsDeleting(false);
        setMessageIndex((prev) => (prev + 1) % typingMessages.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, messageIndex]);

  return (
    <header className="relative overflow-hidden bg-black pt-[150px] pb-10 px-4">

      {/* BACKGROUND TEXTURE */}
      <div className="absolute inset-0 -z-30">
        <Image
          src="https://framerusercontent.com/images/GGNg8KoV9Iwu1Z89UqqLzdQWx0.png"
          alt=""
          fill
          priority
          className="object-cover opacity-90"
        />
      </div>

      {/* GRID */}
      <div className="absolute inset-0 -z-20 opacity-40">
        <Image
          src="https://framerusercontent.com/images/I5BmrodulLElK3MtIcR7Z5YD8bI.svg"
          alt=""
          fill
          className="object-cover"
        />
      </div>

      {/* SPOTLIGHTS */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute -left-52 top-0 h-[700px] w-[450px] rotate-[35deg] bg-white/5 blur-[120px]" />
        <div className="absolute left-1/3 top-0 h-[700px] w-[350px] rotate-[45deg] bg-white/5 blur-[120px]" />
        <div className="absolute right-1/3 top-0 h-[700px] w-[350px] -rotate-[45deg] bg-white/5 blur-[120px]" />
        <div className="absolute -right-52 top-0 h-[700px] w-[450px] -rotate-[35deg] bg-white/5 blur-[120px]" />
      </div>

      <div className="relative mx-auto flex max-w-[1200px] flex-col items-center gap-16">

        {/* HERO CONTENT */}
        <div className="flex w-full max-w-[840px] flex-col items-center gap-8">

          {/* BATCH INFO BADGE */}
          <Reveal
            duration={600}
            direction="up"
            className="flex items-center gap-4 rounded-lg border border-white/15 bg-black px-5 py-3"
          >
            <div className="flex items-center gap-2">
              <span className="text-base text-[#FF6F00]">📅</span>
              <span className="text-sm text-neutral-200">
                Batch starts on{" "}
                <span className="font-semibold text-[#FF6F00]">
                  {BATCH_DATE}
                </span>
              </span>
            </div>

            <div className="h-4 w-px bg-white/20" />

            <span className="text-sm text-neutral-200">
              Only{" "}
              <span className="font-semibold text-[#FF6F00]">
                {seatsLeft}
              </span>{" "}
              seats left
            </span>
          </Reveal>

          {/* HEADING */}
          <Reveal delay={100} duration={800}>
            <h1 className="text-center text-[54px] font-semibold leading-[0.95] tracking-[-0.04em] text-white md:text-[64px]">
              Build & Ship a Real AI Product in{" "}
              <span className="text-[#ff6f00]">30 Days — No Code Required.</span>
            </h1>
          </Reveal>

          <Reveal delay={140} duration={800}>
            <p className="max-w-[640px] text-center text-base text-neutral-200 sm:text-lg">
              Live sessions, Wed / Sat / Sun, 2 hours each. From picking your idea to a
              working, demoable AI product — using no-code app builders, no-code AI
              integration, and no-code automation. Built for working professionals with
              limited weekly time.
            </p>
          </Reveal>

          {/* PROMPT BOX */}
          <Reveal delay={180} duration={800} className="w-full">
            <div className="rounded-[15px] border border-white/30 bg-black/20 px-7 py-6 backdrop-blur-sm">
              <p className="mb-12 min-h-[70px] text-[28px] font-medium text-white md:text-[32px]">
                {displayText}
                <span className="animate-pulse text-white">|</span>
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <button className="text-3xl text-white">+</button>
                  <button className="flex items-center gap-2 text-white">
                    <span>⚙</span>
                    <span>Tools</span>
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-white">🎤</span>
                  <div className="grid h-11 w-11 place-items-center rounded-full bg-white/20">
                    <div className="flex gap-[2px]">
                      <div className="h-2 w-1 rounded bg-white" />
                      <div className="h-4 w-1 rounded bg-white" />
                      <div className="h-3 w-1 rounded bg-white" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* CTA + SOCIAL PROOF */}
          <Reveal delay={280} duration={800} className="flex flex-col items-center gap-6 lg:flex-row">
            <a
              href="#pricing"
              className="flex items-center gap-4 rounded-lg bg-[#FF6F00] py-2 pr-2 pl-6 text-lg font-medium text-white shadow-[inset_0_4px_10px_rgba(255,255,255,0.15)] transition-all duration-200 hover:scale-[1.02]"
            >
              Book My Seat
              <span className="grid h-12 w-12 place-items-center rounded-md bg-white text-[#FF6F00]">
                →
              </span>
            </a>

            <div className="flex items-center gap-5">
              <div className="flex">
                {headshots.map((src, i) => (
                  <div
                    key={src}
                    className="relative -ml-3 h-12 w-12 overflow-hidden rounded-full border-2 border-white first:ml-0"
                    style={{ zIndex: headshots.length - i }}
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                  </div>
                ))}
              </div>

              <p className="max-w-[220px] text-xs uppercase leading-tight text-neutral-200 font-['Gloria_Hallelujah']">
                Every cohort ships real, working AI products — zero code written.
              </p>
            </div>
          </Reveal>
        </div>

        {/* VIDEO PLAYER */}
        <Reveal
          direction="none"
          duration={900}
          className="relative aspect-video w-full max-w-[1200px] overflow-hidden rounded-2xl border border-white/30 bg-black"
        >
          <Image
            src="https://storage.googleapis.com/heartfelt-6a946.firebasestorage.app/theROAC/Building%20AI%20Products.png"
            alt="Course Preview"
            fill
            className="object-cover"
          />
        </Reveal>
      </div>
    </header>
  );
}