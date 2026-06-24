import type { Driver, ReserveDriver, Route, Vehicle } from "@/types";

export const ROUTES: Route[] = [
  {
    id: "L1",
    name: "Red Line",
    label: "สายสีแดง (Line 1)",
    labelTh: "สายสีแดง",
    color: "#e74c3c",
    bgColor: "#fef2f2",
    passengerLoad: 72,
    vehicles: 5,
  },
  {
    id: "L2",
    name: "Blue Line",
    label: "สายสีน้ำเงิน (Line 2)",
    labelTh: "สายสีน้ำเงิน",
    color: "#3b82f6",
    bgColor: "#eff6ff",
    passengerLoad: 55,
    vehicles: 5,
  },
  {
    id: "L3",
    name: "Green Line",
    label: "สายสีเขียว (Line 3)",
    labelTh: "สายสีเขียว",
    color: "#16a34a",
    bgColor: "#f0fdf4",
    passengerLoad: 40,
    vehicles: 5,
  },
];

/**
 * Real driver roster — Mahidol University shuttle bus staff.
 * Names, surnames and Mu0xx codes transcribed from the official staff list.
 * Route assignment (today) transcribed from the daily duty sheet.
 */
export const DRIVERS: Driver[] = [
  // ---- สายสีเขียว / Green Line (L3) ----
  { id: 1, name: "จำรัส", surname: "กลิ่นเปี่ยม", code: "Mu015", route: "Line 3", routeId: "L3", vehicle: "G-301", capacity: 38, status: "Active", experience: 6 },
  { id: 2, name: "ธนกฤต", surname: "สุวรรณโน", code: "Mu017", route: "Line 3", routeId: "L3", vehicle: "G-302", capacity: 42, status: "Active", experience: 4 },
  { id: 3, name: "สุธรรม", surname: "ไชยโคสาร", code: "Mu014", route: "Line 3", routeId: "L3", vehicle: "G-303", capacity: 35, status: "Active", experience: 7 },
  { id: 4, name: "บัวทอง", surname: "บุตรงาม", code: "Mu016", route: "Line 3", routeId: "L3", vehicle: "G-304", capacity: 40, status: "Active", experience: 5 },
  { id: 5, name: "อัธยา", surname: "เพ็งสว่าง", code: "Mu034", route: "Line 3", routeId: "L3", vehicle: "G-305", capacity: 44, status: "Active", experience: 3 },

  // ---- สายสีน้ำเงิน / Blue Line (L2) ----
  { id: 6, name: "สัมพันธ์", surname: "เลี้ยงรักษา", code: "Mu003", route: "Line 2", routeId: "L2", vehicle: "B-201", capacity: 50, status: "Active", experience: 8 },
  { id: 7, name: "เฉลิมพล", surname: "แสงทอง", code: "Mu012", route: "Line 2", routeId: "L2", vehicle: "B-202", capacity: 65, status: "Active", experience: 5 },
  { id: 8, name: "บดินทร์", surname: "ศรีมาน้อย", code: "Mu033", route: "Line 2", routeId: "L2", vehicle: "B-203", capacity: 45, status: "Active", experience: 2 },
  { id: 9, name: "คมสันต์", surname: "คำผุย", code: "Mu013", route: "Line 2", routeId: "L2", vehicle: "B-204", capacity: 70, status: "Active", experience: 6 },
  { id: 10, name: "เปรม", surname: "เปรมปกร", code: "Mu004", route: "Line 2", routeId: "L2", vehicle: "B-205", capacity: 58, status: "Active", experience: 9 },

  // ---- สายสีแดง / Red Line (L1) ----
  { id: 11, name: "ณัฐวุฒิ", surname: "ปิ่นปฐม", code: "Mu005", route: "Line 1", routeId: "L1", vehicle: "R-101", capacity: 72, status: "Active", experience: 10 },
  { id: 12, name: "วีระ", surname: "ท้าวโกษา", code: "Mu019", route: "Line 1", routeId: "L1", vehicle: "R-102", capacity: 68, status: "Active", experience: 4 },
  { id: 13, name: "ชาติ", surname: "คำแพงทอง", code: "Mu036", route: "Line 1", routeId: "L1", vehicle: "R-103", capacity: 80, status: "Active", experience: 3 },
  { id: 14, name: "ธนบูรณ์", surname: "ปวงสุข", code: "Mu037", route: "Line 1", routeId: "L1", vehicle: "R-104", capacity: 55, status: "Active", experience: 2 },
  { id: 15, name: "พรหมพิพัฒน์", surname: "เจี๋ยมตน", code: "Mu018", route: "Line 1", routeId: "L1", vehicle: "R-105", capacity: 60, status: "Active", experience: 5 },
];

/**
 * Reserve pool — currently no separate reserve roster was provided, so the
 * reserve pool re-uses two named drivers as the standby example shown on
 * the daily duty sheet (e.g. ธนกฤต covering the Blue Line 8:05 / 8:35 trips).
 */
export const RESERVE_DRIVERS: ReserveDriver[] = [
  {
    id: "R1",
    name: "ธนกฤต สุวรรณโน",
    role: "สำรองสายสีเขียว",
    availability: 70,
    skillLevel: 4,
    experience: 4,
    status: "Available",
    color: "#16a34a",
    note: "อังคาร-ศุกร์ ช่วยสายสีน้ำเงิน รอบ 08:05 และ 08:35",
  },
  {
    id: "R2",
    name: "อัธยา เพ็งสว่าง",
    role: "สำรองสายสีเขียว",
    availability: 50,
    skillLevel: 3,
    experience: 3,
    status: "Available",
    color: "#06b6d4",
  },
  {
    id: "R3",
    name: "บดินทร์ ศรีมาน้อย",
    role: "สำรองสายสีน้ำเงิน",
    availability: 85,
    skillLevel: 5,
    experience: 2,
    status: "Available",
    color: "#f59e0b",
  },
  {
    id: "R4",
    name: "ธนบูรณ์ ปวงสุข",
    role: "สำรองสายสีแดง",
    availability: 60,
    skillLevel: 3,
    experience: 2,
    status: "Available",
    color: "#8b5cf6",
  },
  {
    id: "R5",
    name: "พรหมพิพัฒน์ เจี๋ยมตน",
    role: "สำรองสายสีแดง",
    availability: 90,
    skillLevel: 5,
    experience: 5,
    status: "Available",
    color: "#e8590c",
  },
];

export const VEHICLES: Vehicle[] = DRIVERS.map((d) => ({
  id: d.vehicle,
  number: d.vehicle,
  routeId: d.routeId,
  driverId: d.id,
  capacity: d.capacity,
  status: "Active" as const,
}));

export const CHART_DATA = [
  { name: "Mon", efficiency: 88, trips: 42, delay: 5 },
  { name: "Tue", efficiency: 75, trips: 38, delay: 12 },
  { name: "Wed", efficiency: 92, trips: 45, delay: 3 },
  { name: "Thu", efficiency: 68, trips: 35, delay: 18 },
  { name: "Fri", efficiency: 85, trips: 44, delay: 7 },
  { name: "Sat", efficiency: 95, trips: 48, delay: 2 },
];

export const UTILIZATION_DATA = [
  { name: "1", value: 60 },
  { name: "2", value: 80 },
  { name: "3", value: 40 },
  { name: "4", value: 90 },
  { name: "5", value: 70 },
  { name: "6", value: 55 },
  { name: "7", value: 85 },
  { name: "8", value: 65 },
  { name: "9", value: 75 },
];

export { TIMETABLES, getNextDepartures, countDailyTrips } from "./timetables";
