
import React, { useState } from "react";
import { motion } from "framer-motion";

const whyChoosePreview = [
  { icon: "🎯", text: "100% custom solutions built around your exact goals" },
  { icon: "👁️", text: "Transparent workflow with clear progress and updates" },
  { icon: "💬", text: "Smooth communication from planning to final delivery" },
  { icon: "🔄", text: "Support that continues after launch, not just before it" },
  { icon: "📈", text: "Systems designed to scale as your business grows" },
];

const ServiceSection = ({ services = [], onDelete, user }) => {
  const [expanded, setExpanded] = useState({});

  if (!services.length) {
    return (
      <p className="text-center text-gray-500 italic">No services available.</p>
    );
  }

  const iconClasses = [
    "bg-cyan-500/10 text-cyan-600",
    "bg-fuchsia-500/10 text-fuchsia-600",
    "bg-emerald-500/10 text-emerald-600",
    "bg-amber-500/10 text-amber-600",
    "bg-indigo-500/10 text-indigo-600",
  ];

  const getServiceIcon = (title = "") => {
    const normalized = title.toLowerCase();

    if (normalized.includes("data science") || normalized.includes("analytics")) {
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M5 19V11M12 19V5M19 19V14"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <path
            d="M4 19H20"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="5" cy="9" r="1.5" fill="currentColor" />
          <circle cx="12" cy="4" r="1.5" fill="currentColor" />
          <circle cx="19" cy="12" r="1.5" fill="currentColor" />
        </svg>
      );
    }

    if (normalized.includes("ai") || normalized.includes("machine")) {
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <rect
            x="7"
            y="7"
            width="10"
            height="10"
            rx="3"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M12 3V6M12 18V21M3 12H6M18 12H21M5.5 5.5L7.5 7.5M16.5 16.5L18.5 18.5M18.5 5.5L16.5 7.5M7.5 16.5L5.5 18.5"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
        </svg>
      );
    }

    if (normalized.includes("web")) {
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M4 7.5C4 6.12 5.12 5 6.5 5H17.5C18.88 5 20 6.12 20 7.5V16.5C20 17.88 18.88 19 17.5 19H6.5C5.12 19 4 17.88 4 16.5V7.5Z"
            stroke="currentColor"
            strokeWidth="1.7"
          />
          <path
            d="M4 9H20"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
          />
          <circle cx="7" cy="7" r="0.9" fill="currentColor" />
          <circle cx="10" cy="7" r="0.9" fill="currentColor" />
        </svg>
      );
    }

    if (normalized.includes("devops") || normalized.includes("ci/cd")) {
      return (
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          aria-hidden
        >
          <path
            d="M7 8L3 12L7 16M17 8L21 12L17 16M14 5L10 19"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      );
    }

    return (
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        aria-hidden
      >
        <path
          d="M4 7h16M7 4h10M7 12h10M4 17h16"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    );
  };

  return (
    <div className="space-y-10">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, i) => {
          const isExpanded = !!expanded[service._id || i];
          return (
            <motion.div
              key={service._id || i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              whileHover={{ y: -8, scale: 1.01 }}
              className="group relative rounded-[28px] bg-[linear-gradient(135deg,rgba(34,211,238,0.18),rgba(217,70,239,0.14)_40%,rgba(255,255,255,0.92))] p-[1px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition duration-300 hover:shadow-[0_26px_70px_rgba(79,70,229,0.18)]"
            >
              <div className="relative flex h-full min-h-[360px] flex-col overflow-hidden rounded-[27px] bg-white px-6 py-6">
                <div
                  aria-hidden
                  className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(192,132,252,0.16),transparent_30%),radial-gradient(circle_at_bottom_left,rgba(34,211,238,0.12),transparent_28%)]"
                />
                <div
                  aria-hidden
                  className="absolute -top-10 right-0 h-24 w-24 rounded-full bg-gradient-to-br from-fuchsia-200/70 to-cyan-200/60 blur-3xl"
                />

                <div className="relative z-10 flex items-start justify-between gap-4">
                  <div
                    className={`inline-flex h-12 w-12 items-center justify-center rounded-2xl shadow-sm ${iconClasses[i % iconClasses.length]}`}
                  >
                    {getServiceIcon(service.title)}
                  </div>

                  {user?.role === "admin" && (
                    <button
                      onClick={() => onDelete(service._id)}
                      className="rounded-full border border-slate-200 bg-white/90 px-3 py-1 text-xs text-slate-600 transition hover:border-red-300 hover:text-red-600"
                    >
                      Delete
                    </button>
                  )}
                </div>

                <div className="relative z-10 mt-5">
                  <h4 className="text-lg font-semibold text-slate-900">
                    {service.title || "Untitled Service"}
                  </h4>
                  <div className="mt-4 h-1.5 w-16 rounded-full bg-gradient-to-r from-cyan-500 via-sky-500 to-fuchsia-500 opacity-80" />
                </div>

                <div className="relative z-10 mt-4 flex-1">
                  <div
                    className={`prose prose-sm prose-slate max-w-full transition-all duration-300 ${
                      isExpanded
                        ? "max-h-[640px]"
                        : "max-h-[180px] overflow-hidden"
                    }`}
                    dangerouslySetInnerHTML={{
                      __html:
                        service.description ||
                        "<p class='text-gray-500 italic'>No description provided.</p>",
                    }}
                  />
                  {!isExpanded && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-white via-white/90 to-transparent"
                    />
                  )}
                </div>

                <div className="relative z-10 mt-4 flex items-center justify-between gap-3">
                  <button
                    onClick={() =>
                      setExpanded((prev) => ({
                        ...prev,
                        [service._id || i]: !isExpanded,
                      }))
                    }
                    className="inline-flex items-center rounded-full bg-gradient-to-r from-slate-900 via-slate-800 to-slate-700 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-white transition hover:shadow-[0_12px_24px_rgba(15,23,42,0.18)]"
                  >
                    {isExpanded ? "Show less" : "Read more"}
                  </button>

                  <span className="text-xs font-medium text-slate-400">
                    Premium delivery
                  </span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="rounded-[32px] bg-white px-6 py-8 shadow-[0_18px_50px_rgba(15,23,42,0.07)] ring-1 ring-slate-100 sm:px-10 sm:py-10"
      >
        <div className="max-w-5xl">
          <h3 className="text-[2rem] font-bold tracking-[-0.03em] text-slate-900 sm:text-[2.2rem]">
            💡 Why choose my services?
          </h3>
        </div>

        <div className="mt-8 grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-3">
          {whyChoosePreview.map((item, index) => (
            <motion.div
              key={`${item.text}-${index}`}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.06 }}
              className="flex items-start gap-4"
            >
              <span className="mt-1 text-[1.7rem] leading-none">
                {item.icon}
              </span>
              <p className="text-[1.05rem] leading-9 text-slate-600">
                {item.text}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative overflow-hidden rounded-[28px] bg-[linear-gradient(135deg,#0f172a,#1e1b4b_45%,#0f766e)] p-[1px] shadow-[0_24px_80px_rgba(15,23,42,0.18)]"
      >
        <div className="relative rounded-[27px] bg-slate-950 px-6 py-8 text-center text-white sm:px-8">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_32%),radial-gradient(circle_at_bottom,rgba(217,70,239,0.16),transparent_30%)]"
          />
          <div className="relative z-10">
            <p className="text-lg font-medium text-slate-100">
              Ready to build something that actually works?
            </p>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
            >
              Let&apos;s Talk - Contact
            </a>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ServiceSection;
