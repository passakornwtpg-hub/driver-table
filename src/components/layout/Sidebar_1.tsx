"use client";

import {
  LayoutDashboard,
  MapPin,
  Bus,
  Users,
  BarChart3,
  Settings,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: MapPin, label: "เส้นทาง", id: "routes" },
  { icon: Bus, label: "กองรถ", id: "fleet" },
  { icon: Users, label: "คนขับ", id: "drivers" },
  { icon: BarChart3, label: "วิเคราะห์", id: "analytics" },
];

export function Sidebar() {
  const [active, setActive] = useState("dashboard");

  return (
    <aside className="w-[72px] bg-[#1a1a2e] flex flex-col items-center py-3 gap-1 flex-shrink-0">
      {/* Logo */}
      <div className="w-11 h-11 bg-[#e8590c] rounded-xl flex items-center justify-center mb-3">
        <Bus className="w-6 h-6 text-white" />
      </div>

      {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
        <button
          key={id}
          onClick={() => setActive(id)}
          className={cn(
            "w-13 h-13 w-[52px] h-[52px] rounded-xl flex flex-col items-center justify-center gap-1",
            "text-[9px] transition-all duration-200 cursor-pointer",
            active === id
              ? "bg-[#e8590c]/20 text-[#e8590c]"
              : "text-[#8899bb] hover:bg-white/8 hover:text-slate-300"
          )}
          title={label}
        >
          <Icon className="w-5 h-5" />
          <span>{label}</span>
        </button>
      ))}

      <div className="mt-auto">
        <button
          className="w-[52px] h-[52px] rounded-xl flex flex-col items-center justify-center gap-1 text-[9px] text-[#8899bb] hover:bg-white/8 hover:text-slate-300 transition-all"
          title="Settings"
        >
          <Settings className="w-5 h-5" />
          <span>ตั้งค่า</span>
        </button>
      </div>
    </aside>
  );
}
