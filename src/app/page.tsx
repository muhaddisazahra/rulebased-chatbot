
"use client";

import { FormEvent, useState } from "react";
import rules from "./rules.json";

type Message = {
  id: number;
  sender: "user" | "bot";
  text: string;
};

type Rule = {
  intent: string;
  keywords: string[];
  reply: string;
};

const chatbotRules = rules as Rule[];

const portals = [
  {
    number: "01",
    icon: "🎓",
    title: "Student Portal",
    description: "Access courses, lectures, assignments and academic resources.",
    url: "https://portal.uos.edu.pk/",
    label: "Open Student Portal",
    color: "from-blue-500/20 to-cyan-400/5",
  },
  {
    number: "02",
    icon: "📝",
    title: "Admissions Portal",
    description: "Explore admissions, online applications and merit information.",
    url: "https://admissions.su.edu.pk/",
    label: "Explore Admissions",
    color: "from-violet-500/20 to-fuchsia-400/5",
  },
  {
    number: "03",
    icon: "🏛️",
    title: "Official UOS Website",
    description: "Find university announcements, programs and student resources.",
    url: "https://su.edu.pk/",
    label: "Visit Official Website",
    color: "from-emerald-500/20 to-teal-400/5",
  },
];

const services = [
  {
    icon: "💳",
    title: "Fee Information",
    description: "Guidance about tuition fees, semester dues and challans.",
    question: "What is the fee structure?",
  },
  {
    icon: "🎯",
    title: "Admissions",
    description: "Explore admission procedures, eligibility and merit lists.",
    question: "How can I apply for admission?",
  },
  {
    icon: "🕒",
    title: "University Timings",
    description: "Ask about office hours and department schedules.",
    question: "What are the university timings?",
  },
  {
    icon: "📚",
    title: "Library Services",
    description: "Get guidance about books, membership and study spaces.",
    question: "Tell me about the library",
  },
  {
    icon: "🏠",
    title: "Hostel Assistance",
    description: "Explore hostel accommodation and room allotment guidance.",
    question: "How can I get a hostel?",
  },
  {
    icon: "💬",
    title: "General Help",
    description: "Ask your question and find the most relevant guidance.",
    question: "What can you help me with?",
  },
];

function normalizeMessage(message: string) {
  return message.toLowerCase().trim().replace(/\s+/g, " ");
}

function getBotReply(message: string): string {
  const normalized = normalizeMessage(message);

  // Prefer more specific, longer keywords.
  const sortedRules = [...chatbotRules].sort(
    (a, b) =>
      Math.max(...b.keywords.map((word) => word.length)) -
      Math.max(...a.keywords.map((word) => word.length))
  );

  for (const rule of sortedRules) {
    if (
      rule.keywords.some((keyword) =>
        normalized.includes(normalizeMessage(keyword))
      )
    ) {
      return rule.reply;
    }
  }

  return "I couldn't find an exact match for your question. Please try asking about fees, admissions, timings, library services or hostels. You can also use the official UOS portal links on this website.";
}

export default function Home() {
  const [chatOpen, setChatOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: "bot",
      text: "Hello and welcome to UOS Helpdesk! 👋 I'm here to guide you with common student questions. What would you like to know?",
    },
  ]);

  function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      id: Date.now(),
      sender: "user",
      text: trimmed,
    };

    const botMessage: Message = {
      id: Date.now() + 1,
      sender: "bot",
      text: getBotReply(trimmed),
    };

    setMessages((previous) => [
      ...previous,
      userMessage,
      botMessage,
    ]);
    setInput("");
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    sendMessage(input);
  }

  function askQuestion(question: string) {
    setChatOpen(true);
    sendMessage(question);
  }

  return (
    <main className="min-h-screen overflow-hidden bg-white text-slate-900 selection:bg-blue-200">
      {/* Navigation */}
      <nav className="sticky top-0 z-30 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 py-4 sm:px-8">
          <a href="#home" className="flex shrink-0 items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-xl text-white shadow-lg shadow-blue-200">
              🎓
            </div>
            <div>
              <p className="font-extrabold tracking-tight">
                UOS <span className="text-blue-700">Helpdesk</span>
              </p>
              <p className="text-xs text-slate-500">Student support hub</p>
            </div>
          </a>

          <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 lg:flex">
            <a href="#home" className="transition hover:text-blue-700">Home</a>
            <a href="#portals" className="transition hover:text-blue-700">Portals</a>
            <a href="#services" className="transition hover:text-blue-700">Services</a>
            <a href="#about" className="transition hover:text-blue-700">About</a>
          </div>

          <button
            onClick={() => setChatOpen(true)}
            className="rounded-full bg-blue-700 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-800 sm:px-5"
          >
            Ask Helpdesk ↗
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section id="home" className="relative isolate overflow-hidden bg-[#071126] text-white">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_75%_30%,rgba(59,130,246,0.25),transparent_45%),radial-gradient(ellipse_at_15%_90%,rgba(99,102,241,0.16),transparent_40%)]" />

        <div className="pointer-events-none absolute -right-24 top-12 -z-10 h-80 w-80 rounded-full border border-blue-400/10" />
        <div className="pointer-events-none absolute -right-12 top-24 -z-10 h-56 w-56 rounded-full border border-blue-400/15" />

        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 sm:px-8 sm:py-28 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="animate-[fadeIn_0.7s_ease-out]">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-blue-400/10 px-4 py-2 text-sm text-blue-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
              A smarter starting point for students
            </div>

            <h1 className="mt-7 max-w-3xl text-5xl font-black leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
              Your university.
              <span className="mt-2 block bg-gradient-to-r from-blue-300 via-cyan-200 to-indigo-300 bg-clip-text text-transparent">
                One easy hub.
              </span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-8 text-slate-300 sm:text-lg">
              Discover important UOS student portals, explore helpful
              resources, and get answers to common university questions
              from one simple, student-friendly website.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <button
                onClick={() => setChatOpen(true)}
                className="group flex items-center justify-center gap-3 rounded-2xl bg-blue-600 px-7 py-4 font-bold text-white shadow-xl shadow-blue-950/40 transition hover:-translate-y-1 hover:bg-blue-500"
              >
                <span>Start a Conversation</span>
                <span className="transition group-hover:translate-x-1">→</span>
              </button>

              <a
                href="https://portal.uos.edu.pk/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/5 px-7 py-4 font-bold text-white transition hover:border-blue-300/50 hover:bg-white/10"
              >
                Student Portal <span>↗</span>
              </a>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-slate-400">
              <span>✦ Easy navigation</span>
              <span>✦ Quick portal access</span>
              <span>✦ Built-in chatbot</span>
            </div>
          </div>

          {/* Distinctive dashboard preview */}
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-5 rounded-[2.5rem] bg-blue-500/10 blur-2xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-7">
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-blue-300">
                    Student dashboard
                  </p>
                  <h2 className="mt-2 text-xl font-bold">Where to next?</h2>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-2xl">
                  ✨
                </div>
              </div>

              <div className="mt-5 space-y-3">
                {portals.map((portal) => (
                  <a
                    key={portal.number}
                    href={portal.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group flex items-center gap-4 rounded-2xl border border-white/10 bg-gradient-to-r ${portal.color} p-4 transition hover:border-blue-300/40 hover:bg-white/10`}
                  >
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10 text-2xl">
                      {portal.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-bold">{portal.title}</p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {portal.description}
                      </p>
                    </div>
                    <span className="text-xl text-blue-300 transition group-hover:translate-x-1">
                      ↗
                    </span>
                  </a>
                ))}
              </div>

              <button
                onClick={() => setChatOpen(true)}
                className="mt-5 flex w-full items-center gap-3 rounded-2xl border border-blue-300/20 bg-blue-500/10 p-4 text-left transition hover:bg-blue-500/20"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500 text-xl">
                  💬
                </span>
                <span className="flex-1">
                  <span className="block font-bold">Need a little guidance?</span>
                  <span className="mt-1 block text-xs text-slate-400">
                    Open your virtual helpdesk assistant
                  </span>
                </span>
                <span className="text-blue-300">→</span>
              </button>
            </div>

            <div className="absolute -bottom-5 -left-2 hidden rounded-2xl border border-white/10 bg-[#101f3a] px-4 py-3 shadow-xl sm:block">
              <p className="text-sm font-bold">Everything in one place</p>
              <p className="mt-1 text-xs text-slate-400">
                Portals · Resources · Help
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Official portals */}
      <section id="portals" className="scroll-mt-24 bg-slate-50 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
                Direct access
              </p>
              <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
                Your UOS links, right here.
              </h2>
              <p className="mt-4 max-w-xl leading-7 text-slate-600">
                Jump directly to official university websites without
                searching through multiple pages.
              </p>
            </div>
            <span className="text-sm text-slate-500">
              Official external links ↗
            </span>
          </div>

          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {portals.map((portal) => (
              <a
                key={portal.number}
                href={portal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 sm:p-7"
              >
                <div className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${portal.color} blur-xl transition group-hover:scale-125`} />

                <div className="relative flex items-start justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-50 text-3xl">
                    {portal.icon}
                  </div>
                  <span className="text-sm font-bold text-slate-300">
                    {portal.number}
                  </span>
                </div>

                <h3 className="relative mt-7 text-xl font-bold">
                  {portal.title}
                </h3>
                <p className="relative mt-3 min-h-14 text-sm leading-6 text-slate-500">
                  {portal.description}
                </p>

                <div className="relative mt-7 flex items-center justify-between border-t border-slate-100 pt-5 text-sm font-bold text-blue-700">
                  {portal.label}
                  <span className="transition group-hover:translate-x-1">
                    ↗
                  </span>
                </div>
              </a>
            ))}
          </div>

          <p className="mt-5 text-xs leading-5 text-slate-500">
            Portal availability and access requirements are controlled by
            the university. Some services may require student credentials.
          </p>
        </div>
      </section>

      {/* Student help services */}
      <section id="services" className="scroll-mt-24 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-7xl">
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-700">
              Student assistance
            </p>
            <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-5xl">
              Questions? Start here.
            </h2>
            <p className="mt-5 leading-7 text-slate-600">
              Select a topic to open the chatbot with a suggested question.
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service, index) => (
              <button
                key={service.title}
                onClick={() => askQuestion(service.question)}
                className="group rounded-3xl border border-slate-200 bg-white p-6 text-left transition duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl hover:shadow-blue-900/5 sm:p-7"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-50 text-2xl transition group-hover:rotate-3 group-hover:bg-blue-100">
                    {service.icon}
                  </div>
                  <span className="text-sm font-bold text-slate-300">
                    0{index + 1}
                  </span>
                </div>
                <h3 className="mt-6 text-xl font-bold">{service.title}</h3>
                <p className="mt-3 min-h-14 text-sm leading-6 text-slate-500">
                  {service.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-bold text-blue-700">
                  Ask the chatbot
                  <span className="transition group-hover:translate-x-1">→</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="scroll-mt-24 bg-[#071126] px-5 py-20 text-white sm:px-8 sm:py-24">
        <div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-blue-300">
              About this project
            </p>
            <h2 className="mt-5 text-3xl font-black leading-tight sm:text-5xl">
              Designed around student needs.
            </h2>
          </div>

          <div>
            <p className="leading-8 text-slate-300">
              UOS Helpdesk is a student project that brings useful
              university links and common-question guidance together
              in one interface. Its chatbot uses predefined rules
              and keywords to respond to supported questions.
            </p>
            <button
              onClick={() => setChatOpen(true)}
              className="mt-7 rounded-2xl bg-white px-6 py-3.5 font-bold text-slate-900 transition hover:bg-blue-50"
            >
              Try the chatbot →
            </button>
            <p className="mt-5 text-sm leading-6 text-slate-400">
              This is an independent demonstration, not an official UOS
              service. The chatbot does not access student records or
              verify live university policies. Confirm important
              information through official UOS channels.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white px-5 py-8 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <a href="#home" className="flex items-center gap-3">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-700 text-xl text-white">
              🎓
            </span>
            <span>
              <span className="block font-extrabold">UOS Helpdesk</span>
              <span className="mt-1 block text-xs text-slate-500">
                Student support hub
              </span>
            </span>
          </a>

          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-slate-600">
            <a href="https://portal.uos.edu.pk/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              Student Portal ↗
            </a>
            <a href="https://admissions.su.edu.pk/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              Admissions ↗
            </a>
            <a href="https://su.edu.pk/" target="_blank" rel="noopener noreferrer" className="hover:text-blue-700">
              Official Website ↗
            </a>
          </div>

          <p className="text-xs text-slate-400">
            Built with Next.js and Tailwind CSS.
          </p>
        </div>
      </footer>

      {/* Floating chat launcher */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          aria-label="Open UOS Helpdesk chatbot"
          className="fixed bottom-5 right-5 z-40 flex items-center gap-3 rounded-full bg-blue-700 p-3 pr-5 text-white shadow-2xl shadow-blue-900/30 transition hover:-translate-y-1 hover:bg-blue-800 sm:bottom-7 sm:right-7"
        >
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/15 text-2xl">
            💬
          </span>
          <span className="text-left">
            <span className="block text-sm font-bold">Need help?</span>
            <span className="mt-1 block text-xs text-blue-100">
              Chat with us
            </span>
          </span>
        </button>
      )}

      {/* Chatbot window */}
      {chatOpen && (
        <section
          aria-label="UOS Helpdesk chat window"
          className="fixed bottom-3 right-3 z-50 flex h-[min(620px,85dvh)] w-[calc(100vw-24px)] max-w-[390px] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-2xl shadow-slate-900/25 sm:bottom-6 sm:right-6"
        >
          <header className="flex items-center gap-3 bg-gradient-to-r from-blue-700 to-indigo-700 px-4 py-4 text-white">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/15 text-xl">
              🎓
            </div>
            <div className="min-w-0 flex-1">
              <h2 className="font-bold">UOS Helpdesk Bot</h2>
              <p className="mt-1 text-xs text-blue-100">
                Student support assistant
              </p>
            </div>
            <button
              onClick={() => setChatOpen(false)}
              aria-label="Close chatbot"
              className="flex h-9 w-9 items-center justify-center rounded-full text-xl transition hover:bg-white/15"
            >
              ×
            </button>
          </header>

          <div
            className="flex-1 space-y-4 overflow-y-auto bg-slate-50 p-4"
            aria-live="polite"
          >
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[88%] whitespace-pre-wrap break-words rounded-2xl px-4 py-3 text-sm leading-6 ${
                    message.sender === "user"
                      ? "rounded-br-md bg-blue-700 text-white"
                      : "rounded-bl-md border border-slate-100 bg-white text-slate-700 shadow-sm"
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-slate-100 bg-white px-3 pt-3">
            <div className="mb-3 flex gap-2 overflow-x-auto pb-1">
              {["Fees", "Admissions", "Library", "Hostel"].map((topic) => (
                <button
                  key={topic}
                  onClick={() => sendMessage(topic)}
                  className="shrink-0 rounded-full border border-blue-100 bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700 transition hover:bg-blue-100"
                >
                  {topic}
                </button>
              ))}
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2 pb-3">
              <input
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder="Type your question..."
                aria-label="Type your question"
                className="min-w-0 flex-1 rounded-xl border border-slate-200 bg-slate-50 px-3 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="rounded-xl bg-blue-700 px-4 font-semibold text-white transition hover:bg-blue-800 disabled:cursor-not-allowed disabled:opacity-40"
              >
                Send
              </button>
            </form>
          </div>
        </section>
      )}
    </main>
  );
}
