// Converts epoch (in seconds) to "DD/MM"
export function formatEpochToDayMonth(epoch) {
  const date = new Date(epoch * 1000);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
}

// Converts epoch (in seconds) to full readable format like "15 May 2025, 14:30"
export function formatEpochToFullString(epoch) {
  const date = new Date(epoch * 1000);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
