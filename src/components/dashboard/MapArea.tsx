import { MapBackground } from "./MapBackground";
import { RouteOverviewPanel } from "@/components/routes/RouteOverviewPanel";
import { FleetChart } from "@/components/charts/FleetChart";

export function MapArea() {
  return (
    // Fills the entire parent container — RightPanel and toggle button are siblings (not inside here)
    <div className="absolute inset-0">
      {/* Full-bleed map */}
      <div className="absolute inset-0 overflow-hidden">
        <MapBackground />
      </div>

      {/* Left curtain overlay */}
      <RouteOverviewPanel />

      {/* Fleet chart overlay (top area) */}
      <FleetChart />
    </div>
  );
}
