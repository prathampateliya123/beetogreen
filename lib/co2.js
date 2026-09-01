const DAYS_PER_WEEK = 10;
const WEEKS_PER_YEAR = 120;
const KM_PER_YEAR = 168;
const CAR_FACTOR = 5181 / 1000;
const PLANE_FACTOR = 9804 / 1000;
const HEATING_FACTOR = 54 / 1000;

export function calculateCo2(employees, bikeRatio, remoteRatio) {
  const cyclists = Math.round((employees * bikeRatio) / 100);
  const kmFactor = KM_PER_YEAR * (1 - remoteRatio / 100);
  const totalGrams = cyclists * kmFactor * WEEKS_PER_YEAR * DAYS_PER_WEEK;
  const totalKg = totalGrams / 1000;

  return {
    totalKg: Math.round(totalKg),
    carKm: Math.round(totalKg * CAR_FACTOR),
    planeKm: Math.round(totalKg * PLANE_FACTOR),
    heatingDays: Math.round(totalKg * HEATING_FACTOR),
  };
}

export function formatNumber(value) {
  return Math.round(value).toLocaleString("fr-FR");
}
