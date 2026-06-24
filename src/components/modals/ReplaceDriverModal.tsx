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
    /* Overlay — click outside to close */
    <div
      className="fixed inset-0 bg-black/50 backdrop-blur-[2px]"
      style={{ zIndex: 1999 }}
      onClick={closeModal}
    >
      {/* Side panel — slides in from the right */}
      <div
        className="absolute top-0 right-0 h-full w-[340px] bg-white shadow-2xl flex flex-col animate-slide-in-right"
        style={{ zIndex: 2000 }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Banner label */}
        <div className="bg-[#2563eb]/10 border-b border-[#2563eb]/20 px-4 py-2 flex items-center justify-between flex-shrink-0">
          <span className="text-[11px] font-bold text-[#2563eb]">หน้าต่างป๊อปอัป</span>
          <button
            onClick={closeModal}
            className="p-1 rounded-lg hover:bg-gray-100 transition-colors text-gray-400"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Scrollable body */}
        <div className="flex-1 overflow-y-auto p-5">
          {/* Header */}
          <div className="mb-4">
            <h2 className="text-[15px] font-bold text-[#0f172a]">
              Confirm Substitute Driver
            </h2>
            <p className="text-[11px] text-gray-400">ยืนยันการกำหนดคนขับสำรอง</p>
          </div>

          {/* Transfer visualization */}
          <div className="flex items-center justify-center gap-5 my-5">
            {/* Reserve */}
            <div className="text-center">
              <Avatar name={reserve.name} size="lg" color={reserve.color} className="mx-auto mb-2" />
              <p className="text-[12px] font-bold text-[#0f172a]">{reserve.name}</p>
              <p className="text-[9px] text-gray-400">{reserve.role}</p>
            </div>

            {/* Arrow */}
            <div className="flex flex-col items-center gap-1">
              <ArrowRight className="w-6 h-6 text-[#2563eb] animate-pulse" />
              <span className="text-[9px] text-gray-400">แทนที่</span>
            </div>

            {/* Current driver */}
            <div className="text-center">
              <Avatar name={driver.name} size="lg" className="mx-auto mb-2" />
              <p className="text-[12px] font-bold text-[#0f172a]">{driver.name}</p>
              <p className="text-[9px] text-gray-400">{driver.route}</p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-lg px-3 py-2 mb-4 text-[11px] text-gray-500">
            Assigning{" "}
            <span className="font-semibold text-[#2563eb]">{reserve.name}</span>{" "}
            to Replace{" "}
            <span className="font-semibold">
              {driver.name} {driver.surname}
            </span>{" "}
            ({driver.route})
          </div>

          {/* Notes label */}
          <p className="text-[10px] font-semibold text-gray-500 mb-1.5">กล่องหมายเหตุ</p>

          {/* Form */}
          <div className="space-y-3">
            <div>
              <label className="block text-[10px] font-semibold text-gray-400 mb-1">
                เหตุผลในการลา / Reason
              </label>
              <select
                value={reason}
                onChange={(e) => setReason(e.target.value as LeaveReason)}
                className="w-full text-[12px] border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#2563eb] bg-white"
              >
                {REASONS.map((r) => (
                  <option key={r} value={r}>{r}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-gray-400 mb-1">
                วันที่ / Date
              </label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full text-[12px] border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#2563eb]"
              />
            </div>

            <div>
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={"Select a driver to be replaced.\n(P.S. Used to substitute driver)\nเลือกคนขับที่จะให้คนขับสำรองแทนที่\n(ปล: ใช้ในการให้คนขับแทนที่)"}
                rows={4}
                className="w-full text-[11px] border border-gray-200 rounded-lg px-3 py-2 outline-none focus:border-[#2563eb] resize-none text-gray-500"
              />
            </div>
          </div>
        </div>

        {/* Fixed bottom buttons */}
        <div className="flex-shrink-0 p-4 pt-0 space-y-2">
          <button
            onClick={handleConfirm}
            disabled={!date}
            className={cn(
              "w-full text-white text-[14px] font-bold py-3.5 rounded-xl transition-all",
              "bg-gradient-to-br from-[#2563eb] to-[#3b82f6]",
              "hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed",
              "shadow-lg shadow-[#2563eb]/25 active:scale-[0.98]"
            )}
          >
            ยืนยันการย้าย
          </button>
          <button
            onClick={closeModal}
            className="w-full text-[13px] font-semibold text-gray-500 py-2.5 rounded-xl hover:bg-gray-50 transition-all"
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
}
