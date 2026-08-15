"use client";

import {
  Database,
  User,
  Brain,
  ChartColumn,
  FileText,
  Globe,
  Sparkles,
  Mail,
  Bot,
  Pencil,
  MessageCircleMore,
  RefreshCw,
  CheckCircle2,
  Target,
  LayoutDashboard,
  FileSpreadsheet,
} from "lucide-react";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Shared arrow — sized with responsive classes instead of fixed px so it
// shrinks in lockstep with the nodes on narrow slides (slidesPerView 1.1).
function Arrow({ rotate }: { rotate?: number }) {
  return (
    <Image
      src="arrow.svg"
      alt=""
      width={24}
      height={24}
      className="h-4 w-4 shrink-0 sm:h-5 sm:w-5 lg:h-6 lg:w-6"
      style={rotate ? { transform: `rotate(${rotate}deg)` } : undefined}
    />
  );
}

export default function BuildProjects() {
  return (
    <section className="bg-black py-16 md:py-24 overflow-hidden">
      <div className="mx-auto max-w-[1500px] px-5 md:px-8">
        {/* Heading */}
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-[#ff8c33]">
            WHAT YOU'LL BUILD
          </p>
          <h2 className="text-4xl md:text-6xl font-bold leading-tight tracking-tight text-white">
            Real <span className="text-[#ff7f1f]">AI Projects.</span>
            <br />
            Not Just Theory.
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg md:text-xl leading-8 text-zinc-400">
            You won't just learn AI — you'll build with it.
            <br />
            Ship real-world projects that make an impact.
          </p>
        </div>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          loop
          autoplay={{
            delay: 3500,
            disableOnInteraction: false,
          }}
          spaceBetween={24}
          breakpoints={{
            0: {
              slidesPerView: 1.1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 1.4,
              spaceBetween: 18,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
            1440: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
          className="!pb-14"
        >
          {/* CARD 1 */}
          <SwiperSlide>
            <Card
              number="01"
              title="AI SaaS Product"
              description="Build a full-stack AI SaaS from idea to deployment."
              footer="End-to-end product you can ship"
            >
              <div className="flex items-center justify-between">
                <Node icon={<User size={18} className="h-4 w-4 sm:h-5 sm:w-5" />} title="User" />
                <Arrow />
                <Node orange icon={<Brain size={18} className="h-4 w-4 sm:h-5 sm:w-5" />} title="AI Engine" />
                <Arrow />
                <Node icon={<ChartColumn size={18} className="h-4 w-4 sm:h-5 sm:w-5" />} title="Result" />
              </div>
              <div className="flex justify-center">
                <Arrow rotate={270} />
              </div>
              <div className="flex justify-center">
                <Node icon={<Database size={18} className="h-4 w-4 sm:h-5 sm:w-5" />} title="Database" />
              </div>
            </Card>
          </SwiperSlide>
          {/* CARD 2 */}
          <SwiperSlide>
            <Card
              number="02"
              title="RAG-Powered Assistant"
              description="Create an AI assistant that answers questions using your data."
              footer="Smart, context-aware responses"
            >
              <div className="flex items-center justify-between text-[#0e0f0a]">
                <MiniStack
                  data={[
                    { icon: <FileText size={16} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, text: "PDF" },
                    { icon: <FileText size={16} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, text: "Docs" },
                    { icon: <Globe size={16} className="h-3.5 w-3.5 sm:h-4 sm:w-4" />, text: "Web" },
                  ]}
                />
                <Arrow />
                <Node title="Embedding Model" />
                <Arrow />
                <Node icon={<ChartColumn size={18} className="h-4 w-4 sm:h-5 sm:w-5" />} title="Vector Database" />
              </div>
              <div className="flex justify-center">
                <Arrow rotate={270} />
              </div>
              <div className="flex items-center justify-end gap-1.5 sm:gap-2">
                <div className="flex flex-col items-center">
                  <Node icon={<Sparkles size={18} className="h-4 w-4 sm:h-5 sm:w-5" />} title="LLM" />
                </div>
                <Arrow />
                <Node icon={<MessageCircleMore size={18} className="h-4 w-4 sm:h-5 sm:w-5" />} title="Answer" />
              </div>
            </Card>
          </SwiperSlide>
          {/* CARD 3 */}
          <SwiperSlide>
            <Card
              number="03"
              title="AI Agent Workflow"
              description="Build autonomous agents that take action, use tools, and get work done."
              footer="Agents that think, act & deliver"
            >
              <div className="flex items-center justify-center">
                <Node icon={<Target size={20} className="h-4.5 w-4.5 sm:h-5 sm:w-5" />} title="Trigger" />
                <Arrow />
                <div className="flex shrink-0 flex-col items-center gap-1 rounded-full border-2 border-[#ff6f00] px-2.5 py-2 text-[#ff6f00] sm:gap-1.5 sm:px-4 sm:py-3">
                  <Bot className="h-4 w-4 sm:h-6 sm:w-6" />
                  <span className="whitespace-nowrap text-[9px] font-semibold sm:text-[11px]">
                    Automation
                  </span>
                </div>
              </div>
              <div className="flex justify-center">
                <Arrow rotate={90} />
              </div>
              <div className="grid grid-cols-2 gap-2 sm:gap-3.5 border border-dashed p-2.5 sm:p-5 rounded-lg text-[#0e0f0a]">
                <Mini icon={<LayoutDashboard size={16} className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />} text="App" />
                <Mini icon={<FileSpreadsheet size={16} className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />} text="Sheet" />
                <Mini icon={<Mail size={16} className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />} text="Email" />
                <Mini icon={<MessageCircleMore size={16} className="h-3.5 w-3.5 sm:h-4 sm:w-4 shrink-0" />} text="Chatbot" />
              </div>
            </Card>
          </SwiperSlide>
          {/* CARD 4 */}
          <SwiperSlide>
            <Card
              number="04"
              title="AI-Powered Feature"
              description="Add intelligent features that users actually love."
              footer="Ship features with real AI value"
            >
              <div className="flex items-center justify-between">
                <Node icon={<Pencil size={20} className="h-4.5 w-4.5 sm:h-5 sm:w-5" />} title="User Input" />
                <Arrow />
                <Node orange icon={<Sparkles size={20} className="h-4.5 w-4.5 sm:h-5 sm:w-5" />} title="AI Plugin" />
                <Arrow />
                <Node icon={<Sparkles size={20} className="h-4.5 w-4.5 sm:h-5 sm:w-5" />} title="Smart Output" />
              </div>
              <div className="flex items-center justify-center">
                <Arrow rotate={90} />
              </div>
              <div className="flex items-center justify-center pb-6 sm:pb-14 text-[#0e0f0a]">
                <Mini icon={<RefreshCw size={18} className="h-4 w-4 sm:h-5 sm:w-5 shrink-0" />} text="Feedback Loop" />
              </div>
            </Card>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}

type CardProps = {
  number: string;
  title: string;
  description: string;
  footer: string;
  children: React.ReactNode;
};

function Card({ number, title, description, footer, children }: CardProps) {
  return (
    <div className="flex h-full flex-col rounded-[20px] border border-zinc-200 bg-white p-4 sm:p-4 lg:rounded-[26px] lg:px-4 lg:py-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[#f39a55] text-base font-bold text-[#f08a34] sm:h-12 sm:w-12 sm:text-lg">
        {number}
      </div>
      <h3 className="mt-4 text-xl font-bold leading-tight text-zinc-900 sm:mt-6 sm:text-2xl lg:text-[24px]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-snug text-zinc-600 sm:mt-4 sm:text-base lg:text-[16px] lg:leading-[1.05]">
        {description}
      </p>
      { number === "01" ? (
        <div className="my-10 flex-1 sm:my-14">{children}</div>
      ): (number === "03") ? (
        <div className="my-5 flex-1">{children}</div>
      ): (number === "04") ? (
        <div className="my-5 flex-1 sm:mt-12 sm:mb-10">{children}</div>
      ): (
        <div className="my-5 flex-1 sm:my-10">{children}</div>
      )}

      
    </div>
  );
}

type NodeProps = {
  icon?: React.ReactNode;
  title: string;
  orange?: boolean;
};

function Node({ icon, title, orange = false }: NodeProps) {
  return (
    <div
      className={`flex h-14 w-14 shrink-0 flex-col items-center justify-center gap-1 rounded-xl border text-center shadow-sm transition-all sm:h-20 sm:w-20 sm:gap-0 sm:rounded-2xl ${
        orange
          ? "border-[#f08a34] bg-orange-50 text-[#f08a34]"
          : "border-zinc-300 bg-white text-zinc-900"
      }`}
    >
      {icon}
      <div className="px-1 text-center text-[9px] font-semibold leading-tight text-zinc-700 sm:mt-2 sm:px-2 sm:text-xs">
        {title}
      </div>
    </div>
  );
}

type MiniProps = {
  icon: React.ReactNode;
  text: string;
};

function Mini({ icon, text }: MiniProps) {
  return (
    <div className={`flex h-9 w-full min-w-0 items-center gap-2 rounded-lg border border-zinc-300 bg-white px-2.5 text-xs font-medium shadow-sm sm:h-12 sm:gap-3 sm:rounded-xl sm:px-4 sm:text-[12px] ${text == 'Feedback Loop' &&'justify-center'}`}>
      {icon}
      <span className="truncate">{text}</span>
    </div>
  );
}

type MiniPropsObject = {
  data: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
};

function MiniStack({ data }: MiniPropsObject) {
  return (
    <div className="flex w-16 shrink-0 flex-col items-start gap-1.5 rounded-lg border border-zinc-300 bg-white p-2.5 text-sm font-medium shadow-sm sm:w-24 sm:gap-2 sm:rounded-xl sm:p-4">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-1.5">
          {item.icon}
          <span className="text-[8px] text-zinc-600 sm:text-[12px]">{item.text}</span>
        </div>
      ))}
    </div>
  );
}