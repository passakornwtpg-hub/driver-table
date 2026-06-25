import { DRIVERS } from "@/mock-data";
import type { Driver } from "@/types";
import { useFleetStore } from "@/store/fleetStore";

/**
 * Returns the driver assigned to a specific trip based on a daily rotation.
 * 
 * @param routeId The route (e.g. "L1", "L2", "L3")
 * @param tripIndex The index of the trip for the day (0, 1, 2, ...)
 * @param date The date for which the schedule is generated (defaults to today)
 * @returns The assigned Driver, or null if no drivers are available
 */
export function getDriverForTrip(routeId: string, tripIndex: number, date: Date = new Date()): Driver | null {
  // Filter base drivers for this route
  const routeDrivers = DRIVERS.filter(d => d.routeId === routeId);
  if (routeDrivers.length === 0) return null;

  const N = routeDrivers.length;
  
  // Check if there is a custom rotation config for this route
  const config = useFleetStore.getState().rotationConfigs[routeId];

  let driverIdToFind: number | null = null;

  if (config) {
    const startDate = new Date(config.startDate);
    startDate.setHours(0, 0, 0, 0);
    const targetDate = new Date(date);
    targetDate.setHours(0, 0, 0, 0);

    const diffTime = targetDate.getTime() - startDate.getTime();
    const daysSinceStart = Math.floor(diffTime / 86400000);

    // Calculate day offset with wrap-around for negative days
    const dayOffset = ((daysSinceStart % N) + N) % N;
    const driverIndex = (tripIndex + dayOffset) % N;
    
    // Safety check: ensure custom config matches number of drivers
    if (config.driverIds.length === N) {
      driverIdToFind = config.driverIds[driverIndex];
    }
  }

  // Fallback to default algorithm if no config or config is invalid
  if (driverIdToFind === null) {
    const timezoneOffsetMs = date.getTimezoneOffset() * 60000;
    const localTimeMs = date.getTime() - timezoneOffsetMs;
    const daysSinceEpoch = Math.floor(localTimeMs / 86400000);
    const dayOffset = daysSinceEpoch % N;
    const driverIndex = (tripIndex + dayOffset) % N;
    driverIdToFind = routeDrivers[driverIndex].id;
  }

  return routeDrivers.find(d => d.id === driverIdToFind) || null;
}
