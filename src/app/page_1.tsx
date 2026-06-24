import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { MapArea } from "@/components/dashboard/MapArea";
import { RightPanel } from "@/components/dashboard/RightPanel";
import { ReplaceDriverModal } from "@/components/modals/ReplaceDriverModal";
import { Toast } from "@/components/ui/Toast";

export default function DashboardPage() {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-100">
      <Sidebar />

      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Header />

        <div className="flex flex-1 min-h-0 overflow-hidden">
          <MapArea />
          <RightPanel />
        </div>
      </div>

      <ReplaceDriverModal />
      <Toast />
    </div>
  );
}
