import { DRIVERS } from "@/mock-data";
import type { Driver } from "@/types";

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
  
  // Calculate a stable day index.
  // Using local timezone offset so that rotation happens at local midnight.
  const timezoneOffsetMs = date.getTimezoneOffset() * 60000;
  const localTimeMs = date.getTime() - timezoneOffsetMs;
  const daysSinceEpoch = Math.floor(localTimeMs / 86400000);

  const dayOffset = daysSinceEpoch % N;

  // The driver index shifts by dayOffset.
  const driverIndex = (tripIndex + dayOffset) % N;

  return routeDrivers[driverIndex];
}
