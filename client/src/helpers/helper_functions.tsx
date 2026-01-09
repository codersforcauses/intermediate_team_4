// @author sylee212
export const calcTime = (dateString: string | undefined): string => {
  if (!dateString) return "unknown time";

  try {
    // 1. If the string contains 'T' but doesn't have a timezone offset,
    // or if we want to treat the 'Z' as local time to match the user's intent:
    let formattedString = dateString;
    if (dateString.includes("T") && dateString.endsWith("Z")) {
      // Remove the 'Z' so the browser interprets this as LOCAL time, not UTC
      formattedString = dateString.slice(0, -1);
    }

    const date = new Date(formattedString);
    if (isNaN(date.getTime())) throw new Error("Invalid date");

    const now = new Date();

    // 2. Standardize both to ignore milliseconds for cleaner math
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    const isFuture = diffInSeconds < 0;
    const absDiff = Math.abs(diffInSeconds);

    const formatLabel = (value: number, unit: string) => {
      return isFuture ? `in ${value} ${unit}` : `${value} ${unit} ago`;
    };

    // 3. Logic (Same as before)
    if (absDiff < 60) return isFuture ? "due now" : "just now";

    const diffInMinutes = Math.floor(absDiff / 60);
    if (diffInMinutes < 60) return formatLabel(diffInMinutes, "minutes");

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return formatLabel(diffInHours, "hours");

    const diffInDays = Math.floor(diffInHours / 24);
    return formatLabel(diffInDays, "days");
  } catch (error) {
    return "invalid date" + error;
  }
};

export const formatDateForInput = (dateString: string | undefined): string => {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "";

  // This extracts the "2026-01-07" part of an ISO string
  return d.toISOString().split("T")[0];
};
