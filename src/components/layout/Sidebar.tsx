"use client";

import {
  LayoutDashboard,
  MapPin,
  Bus,
  Users,
  BarChart3,
  Settings,
  Zap,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "Dashboard", id: "dashboard" },
  { icon: MapPin,          label: "เส้นทาง",   id: "routes" },
  { icon: Bus,             label: "กองรถ",     id: "fleet" },
  { icon: Users,           label: "คนขับ",     id: "drivers" },
  { icon: BarChart3,       label: "วิเคราะห์",  id: "analytics" },
];

export function Sidebar() {
  const [active, setActive] = useState("dashboard");

  return (
    <aside
      className="w-[72px] flex flex-col items-center py-3 gap-1 flex-shrink-0 relative"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #1e293b 60%, #334155 100%)",
        boxShadow: "2px 0 28px rgba(0,0,0,0.35), inset -1px 0 0 rgba(255,255,255,0.04)",
      }}
    >
      {/* Decorative vertical glow line */}
      <div
        className="absolute right-0 inset-y-0 w-[1px]"
        style={{ background: "linear-gradient(180deg, transparent, rgba(37,99,235,0.30) 40%, rgba(71,85,105,0.25) 70%, transparent)" }}
      />

      {/* Logo */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center mb-3 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)",
          boxShadow: "0 4px 16px rgba(37,99,235,0.40), inset 0 1px 0 rgba(255,255,255,0.20)",
        }}
      >
        <Bus className="w-6 h-6 text-white relative z-10 drop-shadow-sm" />
        <div
          className="absolute inset-0 rounded-xl"
          style={{ background: "linear-gradient(135deg, rgba(255,255,255,0.15) 0%, transparent 60%)" }}
        />
      </div>

      {NAV_ITEMS.map(({ icon: Icon, label, id }) => (
        <button
          key={id}
          onClick={() => setActive(id)}
          className={cn(
            "relative w-[52px] h-[52px] rounded-xl flex flex-col items-center justify-center gap-1",
            "text-[9px] cursor-pointer group overflow-hidden",
            "transition-all duration-250"
          )}
          style={
            active === id
              ? {
                  background: "linear-gradient(135deg, rgba(37,99,235,0.22), rgba(37,99,235,0.10))",
                  boxShadow: "0 2px 12px rgba(37,99,235,0.20), inset 0 1px 0 rgba(255,255,255,0.08)",
                  color: "#3b82f6",
                }
              : {
                  color: "#94a3b8",
                }
          }
          title={label}
        >
          {/* Hover bg */}
          <div
            className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
            style={{ background: "rgba(255,255,255,0.06)" }}
          />
          {/* Active indicator */}
          {active === id && (
            <div
              className="absolute left-0 inset-y-3 w-0.5 rounded-r-full"
              style={{ background: "linear-gradient(180deg, #2563eb, #3b82f6)", boxShadow: "0 0 8px rgba(37,99,235,0.60)" }}
            />
          )}
          <Icon className="w-5 h-5 relative z-10 transition-transform duration-200 group-hover:scale-110" />
          <span className="relative z-10 font-semibold">{label}</span>
        </button>
      ))}

      {/* Divider */}
      <div className="mt-auto mb-1 w-8 h-[1px]" style={{ background: "rgba(255,255,255,0.08)" }} />

      {/* Settings */}
      <button
        className="relative w-[52px] h-[52px] rounded-xl flex flex-col items-center justify-center gap-1 text-[9px] text-[#94a3b8] group overflow-hidden transition-all duration-200"
        title="Settings"
        style={{ transition: "all 0.2s ease" }}
      >
        <div
          className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          style={{ background: "rgba(255,255,255,0.06)" }}
        />
        <Settings className="w-5 h-5 relative z-10 group-hover:rotate-45 transition-transform duration-500 group-hover:text-slate-300" />
        <span className="relative z-10 group-hover:text-slate-300 transition-colors">ตั้งค่า</span>
      </button>

      {/* Bottom glow dot */}
      <div
        className="w-1.5 h-1.5 rounded-full mb-1"
        style={{ background: "#16a34a", boxShadow: "0 0 8px rgba(22,163,74,0.60)" }}
      />
    </aside>
  );
}
