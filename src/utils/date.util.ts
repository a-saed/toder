import dayjs, { Dayjs } from "dayjs";

/**
 * Check if a given date falls within the current week
 *
 * @param date - The given date to check against .
 * @returns `true` if the date falls within the current week, `false` otherwise.
 */
export const isInCurrentWeek = (date: Dayjs): boolean => {
  const startDate = dayjs().startOf("week");
  const endDate = dayjs().endOf("week");
  return date.isAfter(startDate) && date.isBefore(endDate);
};

/**
 * Check if a given date falls within the current year
 *
 * @param date - The given date to check against .
 * @returns `true` if the date falls within the current year, `false` otherwise.
 */
export const isInCurrentYear = (date: Dayjs): boolean => {
  return date.year() === dayjs().year();
};

/**
 * Formats the provided date based on whether it falls within the current week or the current year or is "Today" or "Tomorrow"
 *
 * @param selectedDate - The date to be formatted.
 * @returns A formatted date string.
 */
export const formatDueDateButtonText = (selectedDate: Dayjs | null): string => {
  if (!selectedDate) return "Due Date";

  const today = dayjs();
  const tomorrow = today.add(1, "day");

  if (selectedDate.isSame(today, "day")) {
    return "Today";
  } else if (selectedDate.isSame(tomorrow, "day")) {
    return "Tomorrow";
  } else if (selectedDate.isSame(today, "week")) {
    return selectedDate.format("dddd");
  } else if (selectedDate.isSame(today, "year")) {
    return selectedDate.format("MMM D");
  } else {
    return selectedDate.format("MMM D YYYY");
  }
};
