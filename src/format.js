export function formatNumber(n) {
  if (n < 1000) {
    const rounded = n < 10 ? Math.round(n * 10) / 10 : Math.round(n);
    return Number.isInteger(rounded) ? String(rounded) : rounded.toFixed(1);
  }
  const units = ['K', 'M', 'B', 'T'];
  let unitIndex = -1;
  let value = n;
  while (value >= 1000 && unitIndex < units.length - 1) {
    value /= 1000;
    unitIndex += 1;
  }
  return `${value.toFixed(value < 10 ? 2 : 1)}${units[unitIndex]}`;
}

export function formatDuration(ms) {
  const totalMinutes = Math.floor(ms / 60000);
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  if (hours > 0) return `${hours} h ${minutes} min`;
  return `${minutes} min`;
}
