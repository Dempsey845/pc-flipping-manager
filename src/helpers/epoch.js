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

// Calculates how many full days have passed since the given epoch (in seconds)
export function getDaysSinceEpoch(pastEpoch) {
  const now = Math.floor(Date.now() / 1000); // current time in seconds
  const secondsInDay = 86400;
  const diffInSeconds = now - pastEpoch;
  return Math.floor(diffInSeconds / secondsInDay);
}

export function getTimeDifferenceString(epoch1, epoch2) {
  const diffSeconds = Math.abs(epoch2 - epoch1);

  const minutes = Math.floor(diffSeconds / 60);
  const hours = Math.floor(diffSeconds / 3600);
  const days = Math.floor(diffSeconds / 86400);

  const time = {
    seconds: diffSeconds,
    minutes: minutes,
    hours: hours,
    days: days,
    string: "",
  };

  if (days >= 1) {
    time.string = `${days} day${days === 1 ? "" : "s"}`;
  } else if (hours >= 1) {
    time.string = `${hours} hour${hours === 1 ? "" : "s"}`;
  } else if (minutes >= 1) {
    time.string = `${minutes} minute${minutes === 1 ? "" : "s"}`;
  } else {
    time.string = "< 1 minute";
  }

  return time;
}
