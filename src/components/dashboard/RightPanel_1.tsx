import { ReservePool } from "@/components/drivers/ReservePool";
import { DriverTable } from "@/components/drivers/DriverTable";

export function RightPanel() {
  return (
    <aside className="w-[370px] bg-white border-l border-gray-100 flex flex-col overflow-hidden flex-shrink-0 shadow-[-4px_0_20px_rgba(0,0,0,0.06)]">
      {/* Panel Header */}
      <div className="bg-[#1a1a2e] px-4 py-3.5 flex-shrink-0">
        <h2 className="text-[14px] font-bold text-white">
          Fleet Management &amp; Reserve Pool
        </h2>
        <p className="text-[10px] text-slate-400 mt-0.5">
          การจัดการกองรถและกลุ่มคนสำรอง
        </p>
      </div>

      {/* Panel Body */}
      <div className="flex-1 overflow-y-auto p-4 space-y-5 scrollbar-thin scrollbar-thumb-gray-200">
        <ReservePool />
        <div className="border-t border-gray-100 pt-4">
          <DriverTable />
        </div>
      </div>
    </aside>
  );
}
