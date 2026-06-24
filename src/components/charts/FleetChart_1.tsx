"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { CHART_DATA, UTILIZATION_DATA } from "@/mock-data";

export function FleetChart() {
  return (
    <div className="absolute top-3 right-3 bg-white rounded-2xl p-3 w-[155px] shadow-lg z-10">
      <p className="text-[10px] font-bold text-[#1a1a2e] mb-2">Fleet Performance</p>

      <ResponsiveContainer width="100%" height={70}>
        <BarChart data={CHART_DATA} margin={{ top: 0, right: 0, left: -28, bottom: 0 }}>
          <XAxis dataKey="name" tick={{ fontSize: 7, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <YAxis tick={{ fontSize: 7, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ fontSize: 9, padding: "4px 8px", borderRadius: 6, border: "none", boxShadow: "0 2px 12px rgba(0,0,0,0.15)" }}
            itemStyle={{ color: "#1a1a2e" }}
          />
          <Bar dataKey="efficiency" fill="#e8590c" radius={[2, 2, 0, 0]} name="Efficiency" />
          <Bar dataKey="trips" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Trips" />
          <Bar dataKey="delay" fill="#f59e0b" radius={[2, 2, 0, 0]} name="Delay" />
        </BarChart>
      </ResponsiveContainer>

      <div className="flex gap-2 mt-1 flex-wrap">
        {[
          { label: "Efficiency", color: "#e8590c" },
          { label: "Trips", color: "#3b82f6" },
          { label: "Delay", color: "#f59e0b" },
        ].map(({ label, color }) => (
          <div key={label} className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ backgroundColor: color }} />
            <span className="text-[7px] text-gray-400">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 pt-2 border-t border-gray-100">
        <p className="text-[10px] font-bold text-[#1a1a2e] mb-1.5">Fleet utilization</p>
        <ResponsiveContainer width="100%" height={48}>
          <BarChart data={UTILIZATION_DATA} margin={{ top: 0, right: 0, left: -28, bottom: 0 }}>
            <XAxis dataKey="name" tick={{ fontSize: 6, fill: "#94a3b8" }} axisLine={false} tickLine={false} />
            <YAxis hide />
            <Tooltip
              contentStyle={{ fontSize: 9, padding: "2px 6px", borderRadius: 4, border: "none" }}
            />
            <Bar dataKey="value" fill="#3b82f6" radius={[2, 2, 0, 0]} name="Utilization %" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
