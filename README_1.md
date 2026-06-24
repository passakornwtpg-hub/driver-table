# 🚌 Fleet Management Dashboard

ระบบจัดการรถโดยสารและการแทนที่พนักงานขับรถ — Production-ready Next.js 15 Dashboard

---

## Tech Stack

| Package | Version | ใช้ทำอะไร |
|---------|---------|-----------|
| Next.js | 16 (App Router) | Framework |
| TypeScript | 5 | Type safety |
| Tailwind CSS | 4 | Styling |
| Zustand | 5 | Global state |
| Recharts | 3 | Charts/Graphs |
| Lucide React | latest | Icons |
| Radix UI | latest | Accessible primitives |

---

## Quick Start

```bash
# 1. ติดตั้ง dependencies
npm install

# 2. รัน dev server
npm run dev

# 3. เปิดที่ http://localhost:3000
```

---

## Folder Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout (metadata, font)
│   ├── page.tsx            # Dashboard page (entry)
│   └── globals.css         # Tailwind + custom styles
│
├── types/
│   └── index.ts            # TypeScript interfaces (Driver, Route, Reserve...)
│
├── mock-data/
│   └── index.ts            # Mock drivers, routes, vehicles, chart data
│
├── store/
│   └── fleetStore.ts       # Zustand store (global state + actions)
│
├── lib/
│   └── utils.ts            # cn(), getAvatarColor(), getInitials(), getLoadColor()
│
├── hooks/
│   ├── useClock.ts         # Real-time clock hook
│   └── useFilteredDrivers.ts  # Memoized driver filter hook
│
└── components/
    ├── ui/
    │   ├── Avatar.tsx       # Reusable avatar with auto-color
    │   ├── Badge.tsx        # StatusBadge, RouteBadge
    │   ├── ProgressBar.tsx  # Animated load/capacity bars
    │   └── Toast.tsx        # Global toast notification
    │
    ├── layout/
    │   ├── Sidebar.tsx      # Left 72px nav (icons + labels)
    │   └── Header.tsx       # Top bar (title, clock, search, bell)
    │
    ├── dashboard/
    │   ├── MapArea.tsx      # Center map container
    │   ├── MapBackground.tsx # SVG mock city map
    │   ├── OptimizeCard.tsx # Orange gradient card (top center)
    │   └── RightPanel.tsx   # Right 370px panel wrapper
    │
    ├── routes/
    │   ├── RouteOverviewPanel.tsx  # Left overlay card
    │   ├── RouteSection.tsx        # Per-route card (buses + load bar)
    │   └── BusCard.tsx             # Individual bus card with driver
    │
    ├── drivers/
    │   ├── ReservePool.tsx         # Reserve pool section
    │   ├── ReserveDriverCard.tsx   # Selectable reserve card
    │   └── DriverTable.tsx         # Filterable driver table
    │
    ├── modals/
    │   └── ReplaceDriverModal.tsx  # Driver replacement modal
    │
    └── charts/
        └── FleetChart.tsx          # Recharts bar charts overlay
```

---

## Features

### Dashboard
- ✅ Full-screen layout (Sidebar + Map + Right Panel)
- ✅ Real-time clock (useClock hook)
- ✅ Live status badge

### Route Overview
- ✅ 3 เส้นทาง (Red / Blue / Green Line)
- ✅ Bus Cards พร้อม Driver Avatar
- ✅ Passenger Load Progress Bar พร้อม Color coding
- ✅ SVG mock city map พร้อม animated bus markers

### Reserve Pool
- ✅ แสดงคนสำรอง พร้อม Skill Stars, Availability Bar
- ✅ Click to select reserve driver ก่อน replace
- ✅ Real-time status update (Available → Assigned)

### Driver Assignment Table
- ✅ Filter by Route, Status
- ✅ Search by Driver Name
- ✅ Replace button → เปิด Modal
- ✅ "On Leave" state แสดงหลัง confirm

### Driver Replacement Modal
- ✅ Transfer visualization (Reserve → Driver)
- ✅ Reason dropdown (Sick Leave / Vacation / Emergency / Training)
- ✅ Date picker
- ✅ Notes textarea
- ✅ Confirm → Zustand state update → Toast notification

### Charts
- ✅ Fleet Performance Bar Chart (Recharts)
- ✅ Fleet Utilization Column Chart (Recharts)

---

## State Management (Zustand)

```typescript
// เข้าถึง store จากทุก component:
const { drivers, openModal, confirmTransfer } = useFleetStore();
```

**Actions หลัก:**
- `openModal(driverId)` — เปิด modal สำหรับ replace
- `confirmTransfer(reason, date, notes)` — ยืนยันการย้าย
- `setSelectedReserve(reserve)` — เลือกคนสำรอง
- `showToast(message)` — แสดง toast (auto-hide 3s)
- `setRouteFilter/setStatusFilter/setSearchQuery` — filter table

---

## Environment

ไม่ต้องมี `.env` ใดๆ — ใช้ mock data ทั้งหมด  
พร้อมเพิ่ม API calls แทน mock-data ได้ทันทีใน production

---

## Build

```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # ESLint check
```
