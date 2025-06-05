export function formatDate(raw: string | Date | undefined): string {
  if (!raw) return "Unknown";
  const d = new Date(raw);
  if (isNaN(d.getTime())) return "Unknown";
  return d.toLocaleString(undefined, {
    year:   "numeric",
    month:  "long",
    day:    "numeric",
    hour:   "2-digit",
    minute: "2-digit",
  });
}