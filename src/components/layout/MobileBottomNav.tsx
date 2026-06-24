"use client";

import {
  LayoutDashboard,
  MapPin,
  Bus,
  Users,
  BarChart3,
} from "lucide-react";
import { useState } from "react";

const NAV_ITEMS = [
  { icon: LayoutDashboard, label: "หน้าหลัก", id: "dashboard" },
  { icon: MapPin,          label: "เส้นทาง",  id: "routes" },
  { icon: Bus,             label: "กองรถ",    id: "fleet" },
  { icon: Users,           label: "คนขับ",    id: "drivers" },
  { icon: BarChart3,       label: "วิเคราะห์", id: "analytics" },
];

export function MobileBottomNav() {
  const [active, setActive] = useState("dashboard");

  return (
    <nav
      className="relative flex-shrink-0"
      style={{
        background: "linear-gradient(180deg, #0f172a 0%, #1e293b 100%)",
        boxShadow: "0 -2px 20px rgba(0,0,0,0.30), inset 0 1px 0 rgba(255,255,255,0.06)",
        /* Safe area for home-indicator on iOS */
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute inset-x-0 top-0 h-[2px]"
        style={{
          background:
            "linear-gradient(90deg, #2563eb 0%, #3b82f6 30%, #475569 70%, #0f172a 100%)",
        }}
      />

      <div className="flex items-stretch">
        {NAV_ITEMS.map(({ icon: Icon, label, id }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              onClick={() => setActive(id)}
              className="mobile-nav-item relative overflow-hidden group"
              style={{
                color: isActive ? "#3b82f6" : "#94a3b8",
                paddingTop: "10px",
                paddingBottom: "10px",
              }}
            >
              {/* Active background glow */}
              {isActive && (
                <span
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(37,99,235,0.15) 0%, rgba(37,99,235,0.05) 100%)",
                  }}
                />
              )}
              {/* Active top indicator */}
              {isActive && (
                <span
                  className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] rounded-full"
                  style={{
                    width: "28px",
                    background: "linear-gradient(90deg, #2563eb, #3b82f6)",
                    boxShadow: "0 0 8px rgba(37,99,235,0.55)",
                  }}
                />
              )}
              {/* Hover bg */}
              <span
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                style={{ background: "rgba(255,255,255,0.04)" }}
              />

              <Icon
                className="relative z-10 transition-transform duration-200 group-hover:scale-110"
                style={{ width: "20px", height: "20px" }}
              />
              <span className="relative z-10" style={{ fontSize: "9px", fontWeight: 600 }}>
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
