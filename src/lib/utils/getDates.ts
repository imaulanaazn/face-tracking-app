export function getStartAndEndDates(period: string): {
  startDate: string;
  endDate: string;
} {
  const today = new Date();
  let startDate: Date;
  let endDate: Date = new Date(today.toISOString().split("T")[0]); // Set endDate to current date (00:00:00 of today)

  switch (period) {
    case "today":
      startDate = new Date(today.setHours(0, 0, 0, 0));
      break;

    case "thisWeek":
      const dayOfWeek = today.getDay();
      const diff = today.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1); // Adjust for week starting on Monday
      startDate = new Date(today.setDate(diff));
      startDate.setHours(0, 0, 0, 0);
      break;

    case "thisMonth":
      startDate = new Date(
        today.getFullYear(),
        today.getMonth(),
        1,
        0,
        0,
        0,
        0
      );
      break;

    case "thisYear":
      startDate = new Date(today.getFullYear(), 0, 1, 0, 0, 0, 0);
      break;

    default:
      throw new Error("Invalid period");
  }

  return {
    startDate: startDate.toISOString(),
    endDate: endDate.toISOString(), // This will always be the current date at 00:00:00 UTC
  };
}
