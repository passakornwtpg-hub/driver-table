"use client";

import { useEffect, useState } from "react";
import { Clock, AlarmClock } from "lucide-react";
import { getNextDepartures, getMinutesUntilNext } from "@/mock-data/timetables";
import { getDriverForTrip } from "@/lib/shiftRotation";
import type { RouteId } from "@/types";

interface NextDepartureProps {
  routeId: RouteId;
  color: string;
}

export function NextDeparture({ routeId, color }: NextDepartureProps) {
  const [departures, setDepartures] = useState<{ time: string; tripIndex: number }[]>([]);
  const [countdown, setCountdown] = useState<{
    minutes: number;
    seconds: number;
    time: string;
    tripIndex: number;
  } | null>(null);
  const [blink, setBlink] = useState(true);

  useEffect(() => {
    /* Update list of next departures every 30 s */
    const refreshDepartures = () =>
      setDepartures(getNextDepartures(routeId, new Date(), 3));
    refreshDepartures();
    const deptId = setInterval(refreshDepartures, 30_000);

    /* Update countdown every second */
    const tickId = setInterval(() => {
      const result = getMinutesUntilNext(routeId, new Date());
      setCountdown(result);
    }, 1_000);
    // Kick off immediately
    setCountdown(getMinutesUntilNext(routeId, new Date()));

    /* Blink toggle every 800 ms */
    const blinkId = setInterval(() => setBlink((b) => !b), 800);

    return () => {
      clearInterval(deptId);
      clearInterval(tickId);
      clearInterval(blinkId);
    };
  }, [routeId]);

  /* Urgency thresholds */
  const mins = countdown?.minutes ?? Infinity;
  const isUrgent  = mins <= 3;   // ≤3 min → bright red fast blink
  const isWarning = mins <= 8;   // ≤8 min → amber slow blink
  const urgentColor  = "#ef4444";
  const warningColor = "#f59e0b";

  const badgeColor = isUrgent ? urgentColor : isWarning ? warningColor : color;

  const currentDriver = countdown ? getDriverForTrip(routeId, countdown.tripIndex, new Date()) : null;

  return (
    <div className="mt-1">
      {/* ── Countdown strip ── */}
      {countdown ? (
        <div
          className="flex items-center gap-2 rounded-lg px-2 py-1.5 mb-1.5"
          style={{
            background: isUrgent
              ? `rgba(239,68,68,0.08)`
              : isWarning
              ? `rgba(245,158,11,0.08)`
              : `${color}0d`,
            border: `1px solid ${isUrgent ? "rgba(239,68,68,0.2)" : isWarning ? "rgba(245,158,11,0.2)" : `${color}25`}`,
          }}
        >
          <AlarmClock
            className="w-3.5 h-3.5 flex-shrink-0"
            style={{ color: badgeColor }}
          />

          <div className="flex items-baseline gap-1 flex-1 min-w-0">
            <span className="text-[9px] text-gray-500 whitespace-nowrap">อีก</span>

            {/* Minutes — the prominent countdown number */}
            <span
              className="font-extrabold tabular-nums leading-none"
              style={{
                color: badgeColor,
                fontSize: isUrgent ? "20px" : isWarning ? "18px" : "16px",
                /* Blink by reducing opacity; urgent blinks faster (handled by blinkId) */
                opacity: isWarning || isUrgent ? (blink ? 1 : 0.25) : 1,
                transition: "opacity 0.15s ease",
                textShadow: isUrgent
                  ? `0 0 12px rgba(239,68,68,0.6)`
                  : isWarning
                  ? `0 0 8px rgba(245,158,11,0.4)`
                  : "none",
              }}
            >
              {countdown.minutes}
            </span>

            <span className="text-[10px] font-semibold" style={{ color: badgeColor }}>
              นาที
            </span>

            {/* Seconds (small, always visible) */}
            <span
              className="text-[9px] text-gray-400 tabular-nums"
              style={{ minWidth: "2.2ch" }}
            >
              {String(countdown.seconds).padStart(2, "0")} วิ
            </span>
            
            <span className="text-[9px] text-slate-500 whitespace-nowrap ml-1">
              {currentDriver ? `(รอบของ: ${currentDriver.name})` : "(ไม่พบคนขับ)"}
            </span>
          </div>

          {/* Next departure time badge */}
          <span
            className="text-[9px] font-bold px-2 py-0.5 rounded-full flex-shrink-0 tabular-nums"
            style={{
              background: isUrgent
                ? "rgba(239,68,68,0.15)"
                : isWarning
                ? "rgba(245,158,11,0.12)"
                : `${color}18`,
              color: badgeColor,
              border: `1px solid ${isUrgent ? "rgba(239,68,68,0.3)" : isWarning ? "rgba(245,158,11,0.25)" : `${color}30`}`,
            }}
          >
            🕐 {countdown.time}
          </span>
        </div>
      ) : (
        <div
          className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 mb-1.5"
          style={{
            background: "rgba(148,163,184,0.08)",
            border: "1px solid rgba(148,163,184,0.15)",
          }}
        >
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="text-[9px] text-gray-400 italic">หมดรอบวันนี้</span>
        </div>
      )}

      {/* ── Upcoming departures row ── */}
      <div className="flex items-center gap-1 flex-wrap">
        <Clock className="w-2.5 h-2.5 flex-shrink-0 text-gray-400" />
        {departures.length > 0 ? (
          departures.map((dept, i) => {
            const driver = getDriverForTrip(routeId, dept.tripIndex, new Date());
            return (
              <span
                key={i}
                className="text-[9px] px-1.5 py-0.5 rounded border flex items-center gap-1"
                style={{
                  background: "rgba(248,249,252,0.8)",
                  borderColor: "rgba(148,163,184,0.2)",
                  color: "#64748b",
                }}
                title={driver ? `รอบของ: ${driver.name} ${driver.surname}` : ""}
              >
                {dept.time}
                {driver && <span className="text-slate-400 truncate max-w-[40px] hidden sm:inline-block"> {driver.name}</span>}
              </span>
            );
          })
        ) : (
          <span className="text-[9px] text-gray-400">ไม่มีรอบถัดไป</span>
        )}
      </div>
    </div>
  );
}
