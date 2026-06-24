"use client";

import { useState, useEffect } from "react";
import { X, ArrowRight } from "lucide-react";
import { Avatar } from "@/components/ui/Avatar";
import { useFleetStore } from "@/store/fleetStore";
import type { LeaveReason } from "@/types";
import { cn } from "@/lib/utils";

const REASONS: LeaveReason[] = ["Sick Leave", "Vacation", "Emergency", "Training"];

export function ReplaceDriverModal() {
  const {
    modalOpen, pendingDriverId, selectedReserve,
    drivers, reserveDrivers,
    closeModal, confirmTransfer,
  } = useFleetStore();

  const [reason, setReason] = useState<LeaveReason>("Sick Leave");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");

  const driver = drivers.find((d) => d.id === pendingDriverId);
  const reserve =
    selectedReserve ??
    reserveDrivers.find((r) => r.status === "Available") ??
    null;

  useEffect(() => {
    if (modalOpen) {
      const today = new Date().toISOString().split("T")[0];
      setDate(today);
      setNotes("");
      setReason("Sick Leave");
    }
  }, [modalOpen]);

  if (!modalOpen || !driver || !reserve) return null;

  const handleConfirm = () => {
    if (!date) return;
    confirmTransfer(reason, date, notes);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl p-6 w-full max-w-md shadow-2xl animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between mb-1">
          <div>
            <h2 className="text-base font-bold text-[#1a1a2e]">
              Confirm Substitute Driver
            </h2>
            <p className="text-[11px] text-gray-400">ยืนยันการกำหนดคนขับสำรอง</p>
          </div>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Transfer visualization */}
        <div className="flex items-center justify-center gap-6 my-5">
          {/* Reserve */}
          <div className="text-center">
            <Avatar name={reserve.name} size="lg" color={reserve.color} className="mx-auto mb-2" />
            <p className="text-[13px] font-bold text-[#1a1a2e]">{reserve.name}</p>
            <p className="text-[10px] text-gray-400">{reserve.role}</p>
            <p className="text-[9px] text-green-600 mt-0.5 font-semibold">
              ✓ Available {reserve.availability}%
            </p>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-0.5">
              <ArrowRight className="w-6 h-6 text-[#e8590c] animate-pulse" />
            </div>
            <span className="text-[9px] text-gray-400">แทนที่</span>
          </div>

          {/* Current driver */}
          <div className="text-center">
            <Avatar name={driver.name} size="lg" className="mx-auto mb-2" />
            <p className="text-[13px] font-bold text-[#1a1a2e]">{driver.name} {driver.surname}</p>
            <p className="text-[10px] text-gray-400">{driver.route} · {driver.code}</p>
            <p className="text-[9px] text-gray-400 mt-0.5">{driver.vehicle}</p>
          </div>
        </div>

        {/* Description */}
        <div className="bg-gray-50 rounded-lg px-3 py-2 mb-4 text-[11px] text-gray-500">
          Assigning <span className="font-semibold text-[#e8590c]">{reserve.name}</span> to Replace{" "}
          <span className="font-semibold">{driver.name} {driver.surname}</span> ({driver.route})
        </div>

        {/* Form */}
        <div className="space-y-3">
          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1">
              เหตุผลในการลา / Reason
            </label>
            <select
              value={reason}
              onChange={(e) => setReason(e.target.value as LeaveReason)}
              className="w-full text-[12px] border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#e8590c] bg-white"
            >
              {REASONS.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1">
              วันที่ / Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full text-[12px] border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#e8590c]"
            />
          </div>

          <div>
            <label className="block text-[10px] font-semibold text-gray-500 mb-1">
              หมายเหตุ / Notes
            </label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Select a driver to be replaced.&#10;(P.S. Used to substitute driver)"
              rows={3}
              className="w-full text-[11px] border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#e8590c] resize-none"
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex gap-2 mt-5">
          <button
            onClick={closeModal}
            className="flex-1 border border-gray-200 text-gray-500 text-[12px] font-semibold py-3 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all active:scale-98"
          >
            ยกเลิก
          </button>
          <button
            onClick={handleConfirm}
            disabled={!date}
            className={cn(
              "flex-[2] text-white text-[13px] font-bold py-3 rounded-xl transition-all active:scale-98",
              "bg-gradient-to-br from-[#e8590c] to-[#f5941e]",
              "hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
              "shadow-lg shadow-orange-500/25"
            )}
          >
            ยืนยันการย้าย
          </button>
        </div>
      </div>
    </div>
  );
}
