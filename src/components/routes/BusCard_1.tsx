import { Avatar } from "@/components/ui/Avatar";
import type { Driver } from "@/types";
import { cn } from "@/lib/utils";

interface BusCardProps {
  driver: Driver;
  routeColor: string;
}

export function BusCard({ driver, routeColor }: BusCardProps) {
  const isLeave = driver.status === "Leave";
  return (
    <div
      className={cn(
        "bg-gray-50 border rounded-lg p-1.5 min-w-[56px] cursor-pointer",
        "transition-all duration-200 hover:-translate-y-0.5 group",
        isLeave
          ? "border-gray-200 opacity-60"
          : "border-gray-200 hover:border-[#e8590c] hover:bg-orange-50"
      )}
      title={`${driver.name} ${driver.surname} (${driver.code}) — ${driver.vehicle}`}
    >
      <div className="text-center text-base mb-1">🚌</div>
      <Avatar name={driver.name} size="xs" color={isLeave ? "#94a3b8" : undefined} className="mx-auto mb-0.5" />
      <p className="text-[7px] text-center text-gray-500 truncate max-w-[52px]">{driver.name}</p>
      <p className="text-[6px] text-center text-gray-400">{driver.vehicle}</p>
      {isLeave && (
        <p className="text-[6px] text-center text-red-400 font-bold">LEAVE</p>
      )}
    </div>
  );
}
