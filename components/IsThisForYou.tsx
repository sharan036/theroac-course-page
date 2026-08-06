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
  MessageCircle,
  LayoutDashboard,
  FileSpreadsheet,
} from "lucide-react";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

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
          <SwiperSlide className="h-auto">
            <Card
              number="01"
              title="AI SaaS Product"
              description="Build a full-stack AI SaaS from idea to deployment."
              footer="End-to-end product you can ship"
            >
              <div className="flex items-center justify-between">
                <Node icon={<User size={20} />} title="User" />
                <Image src="arrow.svg" alt="Arrow" width={24} height={24} />
                <Node
                  orange
                  icon={<Brain size={20} />}
                  title="AI Engine"
                />
                <Image src="arrow.svg" alt="Arrow" width={24} height={24} />
                <Node
                  icon={<ChartColumn size={20} />}
                  title="Result"
                />
              </div>
              <div className="flex justify-center">
                <div className="flex flex-col items-center">
                  <Image src="arrow.svg" alt="Arrow" width={24} height={24} style={{ transform: 'rotate(270deg)' }} />
                  <Node
                    icon={<Database size={20} />}
                    title="Database"
                  />
                </div>
              </div>
            </Card>
          </SwiperSlide>
          {/* CARD 2 */}
          <SwiperSlide className="h-auto">
            <Card
              number="02"
              title="RAG-Powered Assistant"
              description="Create an AI assistant that answers questions using your data."
              footer="Smart, context-aware responses"
            >
              <div className="flex items-center justify-end">
                <MiniStack
                  data={[
                    {
                      icon: <FileText size={18} />,
                      text: "PDF",
                    },
                    {
                      icon: <FileText size={18} />,
                      text: "Docs",
                    },
                    {
                      icon: <Globe size={18} />,
                      text: "Web",
                    },
                  ]}
                />
                <Image src="arrow.svg" alt="Arrow" width={24} height={24} />
                <Node
                  title="Embedding Model"
                />
                <Image src="arrow.svg" alt="Arrow" width={24} height={24} />
                <Node
                  icon={<ChartColumn size={20} />}
                  title="Vector Database"
                />
              </div>
              <div className="flex items-center justify-end">
                <div className="flex flex-col items-center">
                  <Image src="arrow.svg" alt="Arrow" width={24} height={24} style={{ transform: 'rotate(90deg)' }} />
                  <Node
                    icon={<Sparkles size={20} />}
                    title="LLM"
                  />
                </div>
                <Image src="arrow.svg" alt="Arrow" width={24} height={24} />
                <Node
                  icon={<MessageCircleMore size={20} />}
                  title="Answer"
                />
              </div>
            </Card>
          </SwiperSlide>
          {/* CARD 3 */}
          <SwiperSlide className="h-auto">
            <Card
            number="03"
            title="AI Agent Workflow"
            description="Build autonomous agents that take action, use tools, and get work done."
            footer="Agents that think, act & deliver"
          >
            <div className="flex items-center justify-center">
              <Node icon={<Target size={22} />} title="Trigger" />
              <Image src="arrow.svg" alt="Arrow" width={24} height={24} />
              <div className="flex flex-col items-center gap-1.5 rounded-full border-2 border-[#ff6f00] px-4 py-3 text-[#ff6f00]">
                <Bot size={24} />
                <span className="whitespace-nowrap text-[11px] font-semibold">Automation</span>
              </div>
              <Image src="arrow.svg" alt="Arrow" width={24} height={24} />
              <div className="ml-1 flex flex-col gap-1.5">
                <Mini icon={<LayoutDashboard size={18} />} text="App" />
                <Mini icon={<FileSpreadsheet size={18} />} text="Sheet" />
                <Mini icon={<Mail size={18} />} text="Email" />
                <Mini icon={<MessageCircleMore size={18} />} text="Chatbot" />
              </div>
            </div>
          </Card>
          </SwiperSlide>
          {/* CARD 4 */}
          <SwiperSlide className="h-auto">
            <Card
              number="04"
              title="AI-Powered Feature"
              description="Add intelligent features that users actually love."
              footer="Ship features with real AI value"
            >
              <div className="flex items-center justify-between">
                <Node
                  icon={<Pencil size={22} />}
                  title="User Input"
                />
                <Image src="arrow.svg" alt="Arrow" width={24} height={24} />
                <Node
                  orange
                  icon={<Sparkles size={22} />}
                  title="AI Plugin"
                />
                <Image src="arrow.svg" alt="Arrow" width={24} height={24} />
                <Node
                  icon={<Sparkles size={22} />}
                  title="Smart Output"
                />
              </div>
              <div className="flex items-center justify-center">
                <Image src="arrow.svg" alt="Arrow" width={24} height={24} style={{ transform: 'rotate(90deg)' }} />
              </div>
              <div className="pb-14 flex items-center justify-center">
                <Mini
                  icon={<RefreshCw size={20} />}
                  text="Feedback Loop"
                />
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

function Card({
  number,
  title,
  description,
  footer,
  children,
}: CardProps) {
  return (
    <div className="flex h-full flex-col rounded-[26px] border border-zinc-200 bg-white p-6 lg:p-8 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
      <div className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-[#f39a55] text-lg font-bold text-[#f08a34]">
        {number}
      </div>
      <h3 className="mt-6 text-2xl lg:text-[24px] font-bold leading-tight text-zinc-900">
        {title}
      </h3>
      <p className="mt-4 text-base lg:text-[16px] leading-[1.05] text-zinc-600">
        {description}
      </p>
      <div className="my-10 flex-1">
        {children}
      </div>
      <div className="border-t pt-6">
        <div className="flex items-center gap-3 text-base font-medium text-zinc-700">
          <CheckCircle2
            className="text-[#f08a34]"
            size={20}
          />
          {footer}
        </div>
      </div>
    </div>
  );
}

type NodeProps = {
  icon?: React.ReactNode;
  title: string;
  orange?: boolean;
};

function Node({
  icon,
  title,
  orange = false,
}: NodeProps) {
  return (
    <div
      className={`flex h-20 w-20 flex-col items-center justify-center rounded-2xl border text-center shadow-sm transition-all ${
        orange
          ? "border-[#f08a34] bg-orange-50"
          : "border-zinc-300 bg-white"
      }`}
    >
      {icon}

      <div className="mt-2 px-2 text-xs font-semibold text-zinc-700">
        {title}
      </div>

    </div>
  );
}

type MiniProps = {
  icon: React.ReactNode;
  text: string;
};

function Mini({
  icon,
  text,
}: MiniProps) {
  return (
    <div className="flex h-12 w-full items-center gap-3 rounded-xl border border-zinc-300 bg-white px-4 text-sm font-medium shadow-sm">
      {icon}
      {text}
    </div>
  );
}

type MiniPropsObject = {
  data: Array<{
    icon: React.ReactNode;
    text: string;
  }>;
};

function MiniStack({
  data
}: MiniPropsObject) {
  return (
    <div className="w-24 flex-col items-center rounded-xl border border-zinc-300 bg-white p-4 text-sm font-medium shadow-sm">
      {data.map((item, index) => (
        <div key={index} className="flex items-center gap-2 mb-2 last:mb-0">
          {item.icon}
          <span className="text-sm text-zinc-600">{item.text}</span>
        </div>
      ))}
    </div>
  );
}