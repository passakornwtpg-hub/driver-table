"use client";

import { useState } from "react";
import { RouteSection } from "./RouteSection";
import { TimetableView } from "@/components/timetable/TimetableView";
import { useFleetStore } from "@/store/fleetStore";
import type { RouteId } from "@/types";
import { CalendarClock } from "lucide-react";

export function RouteOverviewPanel() {
  const { routes, drivers } = useFleetStore();
  const [timetableOpen, setTimetableOpen] = useState(false);
  const [timetableRoute, setTimetableRoute] = useState<RouteId>("L1");

  const byRoute: Record<string, typeof drivers> = {
    L1: drivers.filter((d) => d.routeId === "L1"),
    L2: drivers.filter((d) => d.routeId === "L2"),
    L3: drivers.filter((d) => d.routeId === "L3"),
  };

  const openTimetable = (routeId: RouteId) => {
    setTimetableRoute(routeId);
    setTimetableOpen(true);
  };

  return (
    <>
      <div className="absolute top-3 left-3 bottom-3 w-[295px] bg-white rounded-2xl p-3 overflow-y-auto shadow-xl z-10 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-[#1a1a2e]">Active Routes Overview</p>
            <p className="text-[10px] text-gray-400">ภาพรวมเส้นทางที่ใช้งานอยู่</p>
          </div>
          <button
            onClick={() => openTimetable("L1")}
            title="ดูตารางเวลาเดินรถทั้งหมด"
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-[#e8590c] transition-colors flex-shrink-0"
          >
            <CalendarClock className="w-4 h-4" />
          </button>
        </div>

        {routes.map((route, i) => (
          <RouteSection
            key={route.id}
            route={route}
            drivers={byRoute[route.id] ?? []}
            lineNum={i + 1}
            onShowTimetable={() => openTimetable(route.id)}
          />
        ))}
      </div>

      <TimetableView
        open={timetableOpen}
        onClose={() => setTimetableOpen(false)}
        initialRoute={timetableRoute}
      />
    </>
  );
}
