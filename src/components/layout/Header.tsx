"use client";

import { useClock } from "@/hooks/useClock";
import { Bell, Search, Wifi } from "lucide-react";

export function Header() {
  const time = useClock();

  return (
    <header
      className="relative bg-white border-b border-gray-100/80 px-3 md:px-5 py-2 md:py-3 flex items-center justify-between flex-shrink-0"
      style={{ boxShadow: "0 1px 0 rgba(255,255,255,0.9), 0 2px 12px rgba(26,26,46,0.07)" }}
    >
      {/* Subtle top gradient line */}
      <div
        className="absolute inset-x-0 top-0 h-[2px] rounded-none"
        style={{ background: "linear-gradient(90deg, #2563eb 0%, #3b82f6 40%, #475569 70%, #0f172a 100%)" }}
      />

      <div>
        <h1 className="text-base md:text-xl font-bold text-[#0f172a] flex items-center gap-2 md:gap-3 pt-0.5">
          <span
            style={{
              background: "linear-gradient(135deg, #0f172a 0%, #1e293b 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Dashboard
          </span>
          <span className="hidden sm:inline text-sm font-normal text-gray-400">หน้าแดชบอร์ด</span>
        </h1>
      </div>

      <div className="flex items-center gap-2 md:gap-3">
        {/* Search — hidden on mobile */}
        <div className="relative group hidden md:block">
          <Search className="w-3.5 h-3.5 text-gray-400 group-focus-within:text-[#2563eb] absolute left-2.5 top-1/2 -translate-y-1/2 transition-colors" />
          <input
            type="text"
            placeholder="ค้นหา..."
            className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg outline-none w-40 transition-all duration-200 focus:border-[#2563eb] focus:ring-2 focus:ring-blue-100"
            style={{ background: "rgba(248,249,252,0.8)" }}
          />
        </div>

        {/* Bell */}
        <button
          className="relative p-2 rounded-lg hover:bg-blue-50 transition-all duration-200 hover:shadow-sm"
          style={{ transition: "all 0.2s ease" }}
        >
          <Bell className="w-4 h-4 text-gray-500" />
          <span
            className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full"
            style={{ boxShadow: "0 0 0 2px white, 0 0 6px rgba(239,68,68,0.5)" }}
          />
        </button>

        {/* Clock */}
        <div
          className="px-3 py-1.5 rounded-lg text-xs font-mono tabular-nums text-[#0f172a] font-semibold"
          style={{
            background: "linear-gradient(135deg, #f8f9fc, #f0f2f8)",
            boxShadow: "inset 0 1px 0 rgba(255,255,255,1), 0 1px 3px rgba(15,23,42,0.10)",
            border: "1px solid rgba(15,23,42,0.07)",
            minWidth: "76px",
            textAlign: "center",
          }}
        >
          {time}
        </div>



        {/* Signal — hidden on mobile */}
        <Wifi className="w-4 h-4 text-gray-300 hidden md:block" />
      </div>
    </header>
  );
}
