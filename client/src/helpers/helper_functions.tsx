export const calcTime = (dateString: string | undefined): string => {
  if (!dateString) return "unknown time";

  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) throw new Error("Invalid date");

    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    // 1. Check if the date is in the FUTURE
    const isFuture = diffInSeconds < 0;
    const absDiff = Math.abs(diffInSeconds); // Use Absolute Value to remove the '-'

    // 2. Helper to format the string
    const formatLabel = (value: number, unit: string) => {
      return isFuture ? `in ${value} ${unit}` : `${value} ${unit} ago`;
    };

    // 3. Logic for relative time using the absolute difference
    if (absDiff < 60) return formatLabel(absDiff, "seconds");

    const diffInMinutes = Math.floor(absDiff / 60);
    if (diffInMinutes < 60) return formatLabel(diffInMinutes, "minutes");

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return formatLabel(diffInHours, "hours");

    const diffInDays = Math.floor(diffInHours / 24);
    return formatLabel(diffInDays, "days");
  } catch (error) {
    return "invalid date: " + error;
  }
};

export const formatDateForInput = (dateString: string | undefined): string => {
  if (!dateString) return "";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return "";

  // This extracts the "2026-01-07" part of an ISO string
  return d.toISOString().split("T")[0];
};
