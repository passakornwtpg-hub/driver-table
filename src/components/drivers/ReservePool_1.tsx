"use client";

import { ReserveDriverCard } from "./ReserveDriverCard";
import { useFleetStore } from "@/store/fleetStore";

export function ReservePool() {
  const { reserveDrivers } = useFleetStore();

  return (
    <div>
      <div className="flex items-center gap-2 mb-2.5">
        <p className="text-[12px] font-bold text-[#1a1a2e]">Reserve Driver Pool</p>
        <span className="bg-[#e8590c] text-white text-[9px] px-2 py-0.5 rounded-full font-semibold">
          กลุ่มคนสำรอง
        </span>
        <span className="ml-auto text-[9px] text-gray-400">
          {reserveDrivers.filter((r) => r.status === "Available").length} available
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {reserveDrivers.map((r) => (
          <ReserveDriverCard key={r.id} driver={r} />
        ))}
      </div>
    </div>
  );
}
