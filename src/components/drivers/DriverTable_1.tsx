"use client";

import { Avatar } from "@/components/ui/Avatar";
import { StatusBadge } from "@/components/ui/Badge";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { useFleetStore } from "@/store/fleetStore";
import { useFilteredDrivers } from "@/hooks/useFilteredDrivers";
import { Search } from "lucide-react";

const ROUTE_COLORS: Record<string, string> = {
  "Line 1": "#e74c3c",
  "Line 2": "#3b82f6",
  "Line 3": "#16a34a",
};

export function DriverTable() {
  const {
    routeFilter, statusFilter, searchQuery,
    setRouteFilter, setStatusFilter, setSearchQuery,
    openModal,
  } = useFleetStore();

  const filtered = useFilteredDrivers();

  return (
    <div>
      <p className="text-[12px] font-bold text-[#1a1a2e] mb-2.5">Driver Assignment</p>

      {/* Filters */}
      <div className="flex gap-1.5 mb-2">
        <select
          value={routeFilter}
          onChange={(e) => setRouteFilter(e.target.value)}
          className="flex-1 text-[10px] border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-[#e8590c] bg-white text-gray-700"
        >
          <option value="">All Lines</option>
          <option value="Line 1">Line 1</option>
          <option value="Line 2">Line 2</option>
          <option value="Line 3">Line 3</option>
        </select>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="flex-1 text-[10px] border border-gray-200 rounded-lg px-2 py-1.5 outline-none focus:border-[#e8590c] bg-white text-gray-700"
        >
          <option value="">All Status</option>
          <option value="Active">Active</option>
          <option value="Leave">Leave</option>
        </select>
      </div>

      {/* Search */}
      <div className="relative mb-2.5">
        <Search className="w-3 h-3 absolute left-2.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search driver..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-[10px] border border-gray-200 rounded-lg pl-7 pr-3 py-1.5 outline-none focus:border-[#e8590c]"
        />
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-100">
              {["Line", "Driver", "Vehicle", "Cap.", "Action"].map((h) => (
                <th
                  key={h}
                  className="text-[9px] font-bold text-gray-400 text-left px-1.5 py-1.5 uppercase tracking-wide"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {filtered.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-6 text-[11px] text-gray-400">
                  ไม่พบข้อมูลคนขับ
                </td>
              </tr>
            ) : (
              filtered.map((d) => {
                const rc = ROUTE_COLORS[d.route] ?? "#8899bb";
                const isLeave = d.status === "Leave";
                return (
                  <tr
                    key={d.id}
                    className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors"
                  >
                    <td className="px-1.5 py-1.5">
                      <span
                        className="text-[8px] font-bold text-white px-1.5 py-0.5 rounded"
                        style={{ backgroundColor: rc }}
                      >
                        {d.route.replace("Line", "L")}
                      </span>
                    </td>
                    <td className="px-1.5 py-1.5">
                      <div className="flex items-center gap-1.5">
                        <Avatar name={d.name} size="xs" color={isLeave ? "#94a3b8" : undefined} />
                        <div className="min-w-0">
                          <span className={`text-[10px] block leading-tight ${isLeave ? "text-gray-400" : "text-[#1a1a2e]"}`}>
                            {d.name} {d.surname}
                          </span>
                          <span className="text-[7.5px] text-gray-400 leading-tight">{d.code}</span>
                        </div>
                        {isLeave && <StatusBadge status="Leave" />}
                      </div>
                    </td>
                    <td className="px-1.5 py-1.5 text-[9px] text-gray-500">{d.vehicle}</td>
                    <td className="px-1.5 py-1.5">
                      <div className="w-10">
                        <ProgressBar value={d.capacity} height="h-1" />
                        <p className="text-[7px] text-gray-400 mt-0.5">{d.capacity}%</p>
                      </div>
                    </td>
                    <td className="px-1.5 py-1.5">
                      {isLeave ? (
                        <span className="text-[8px] text-gray-400 font-semibold">On Leave</span>
                      ) : (
                        <button
                          onClick={() => openModal(d.id)}
                          className="bg-[#e8590c] hover:bg-[#c94800] text-white text-[8px] font-bold px-2 py-1 rounded-md transition-colors active:scale-95"
                        >
                          Replace
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
