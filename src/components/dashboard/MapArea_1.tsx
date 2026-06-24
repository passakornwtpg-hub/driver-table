import { MapBackground } from "./MapBackground";
import { RouteOverviewPanel } from "@/components/routes/RouteOverviewPanel";
import { FleetChart } from "@/components/charts/FleetChart";

export function MapArea() {
  return (
    <div className="flex-1 relative overflow-hidden min-w-0">
      {/* Full-bleed map */}
      <div className="absolute inset-0">
        <MapBackground />
      </div>

      {/* Route overview overlay (left) */}
      <RouteOverviewPanel />


      {/* Fleet chart (top right) */}
      <FleetChart />
    </div>
  );
}
