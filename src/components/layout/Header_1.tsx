"use client";

import { useClock } from "@/hooks/useClock";
import { Bell, Search } from "lucide-react";

export function Header() {
  const time = useClock();

  return (
    <header className="bg-white border-b border-gray-100 px-5 py-3 flex items-center justify-between flex-shrink-0">
      <div>
        <h1 className="text-xl font-bold text-[#1a1a2e] flex items-center gap-3">
          Dashboard
          <span className="text-sm font-normal text-gray-400">หน้าแดชบอร์ด</span>
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="ค้นหา..."
            className="pl-8 pr-3 py-1.5 text-xs border border-gray-200 rounded-lg outline-none focus:border-[#e8590c] w-40"
          />
        </div>
        <button className="relative p-2 rounded-lg hover:bg-gray-50 transition-colors">
          <Bell className="w-4 h-4 text-gray-500" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
        </button>
        <span className="text-xs text-gray-400 font-mono tabular-nums min-w-[70px]">
          {time}
        </span>
        <span className="bg-green-500 text-white text-[9px] px-2 py-1 rounded-full font-bold">
          ● LIVE
        </span>
      </div>
    </header>
  );
}
