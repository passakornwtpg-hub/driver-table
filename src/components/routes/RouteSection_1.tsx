import { BusCard } from "./BusCard";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { NextDeparture } from "@/components/timetable/NextDeparture";
import type { Route, Driver } from "@/types";

interface RouteSectionProps {
  route: Route;
  drivers: Driver[];
  lineNum: number;
  onShowTimetable?: () => void;
}

export function RouteSection({ route, drivers, lineNum, onShowTimetable }: RouteSectionProps) {
  return (
    <div className="border border-gray-100 rounded-xl p-2.5">
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <div
          className="w-7 h-7 rounded-md flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0"
          style={{ backgroundColor: route.color }}
        >
          {lineNum}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-[11px] font-bold text-[#1a1a2e]">
            Lin. {lineNum} - {route.name}
          </p>
        </div>
        <span
          className="text-[9px] font-bold text-white px-2 py-0.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: route.color }}
        >
          {route.labelTh}
        </span>
      </div>

      {/* Next departure */}
      <button
        onClick={onShowTimetable}
        className="w-full text-left hover:bg-gray-50 rounded-lg -mx-1 px-1 transition-colors"
      >
        <NextDeparture routeId={route.id} color={route.color} />
      </button>

      {/* Bus cards */}
      <div className="flex gap-1 flex-wrap mb-2">
        {drivers.map((d) => (
          <BusCard key={d.id} driver={d} routeColor={route.color} />
        ))}
      </div>

      {/* Passenger load */}
      <p className="text-[9px] text-gray-400 mb-1">
        Passenger Load <span className="text-[8px]">จำนวนผู้โดยสาร</span>
      </p>
      <ProgressBar value={route.passengerLoad} showLabel height="h-1.5" />
    </div>
  );
}
