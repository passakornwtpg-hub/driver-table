"use client";

import { Avatar } from "@/components/ui/Avatar";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useFleetStore } from "@/store/fleetStore";
import type { ReserveDriver } from "@/types";
import { cn } from "@/lib/utils";

interface ReserveDriverCardProps {
  driver: ReserveDriver;
}

export function ReserveDriverCard({ driver }: ReserveDriverCardProps) {
  const { selectedReserve, setSelectedReserve } = useFleetStore();
  const isSelected = selectedReserve?.id === driver.id;
  const isAssigned = driver.status === "Assigned";

  return (
    <div
      onClick={() => !isAssigned && setSelectedReserve(isSelected ? null : driver)}
      className={cn(
        "flex-1 border-[1.5px] rounded-xl p-2.5 transition-all duration-200",
        isAssigned
          ? "border-gray-200 opacity-60 cursor-not-allowed"
          : "cursor-pointer hover:shadow-md",
        isSelected && !isAssigned
          ? "border-[#e8590c] bg-orange-50"
          : "border-gray-200"
      )}
    >
      <Avatar
        name={driver.name}
        size="md"
        color={isAssigned ? "#94a3b8" : driver.color}
        className="mx-auto mb-2"
      />
      <p className="text-[11px] font-bold text-center text-[#1a1a2e]">{driver.name}</p>
      <p className="text-[9px] text-gray-400 text-center mb-2">{driver.role}</p>

      <div className="flex items-center gap-1 mb-2">
        <div
          className="w-1.5 h-1.5 rounded-full flex-shrink-0"
          style={{ backgroundColor: isAssigned ? "#94a3b8" : "#22c55e" }}
        />
        <span className="text-[9px] text-gray-500">
          Status:{" "}
          <span className={cn("font-semibold", isAssigned ? "text-gray-400" : "text-green-600")}>
            {isAssigned ? "Assigned" : "Available"}
          </span>
        </span>
      </div>

      <ProgressBar value={driver.availability} height="h-1" />
      <p className="text-[8px] text-gray-400 text-right mt-0.5">
        Capacity: {driver.availability}%
      </p>

      <div className="text-center mt-1">
        <span className="text-[10px] text-amber-400">
          {"★".repeat(driver.skillLevel)}
          {"☆".repeat(5 - driver.skillLevel)}
        </span>
        <span className="text-[8px] text-gray-400 ml-1">Level</span>
      </div>

      {isSelected && (
        <div className="mt-1.5 text-center">
          <span className="text-[9px] text-[#e8590c] font-semibold">✓ Selected</span>
        </div>
      )}

      {driver.note && (
        <p className="text-[7.5px] text-gray-400 text-center mt-1.5 leading-tight border-t border-gray-100 pt-1.5">
          {driver.note}
        </p>
      )}
    </div>
  );
}
