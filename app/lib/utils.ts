import {
  format,
  isToday,
  isYesterday,
  differenceInDays,
  differenceInWeeks,
} from "date-fns";

export function formatDate(datestring: string) {
  const date = new Date(datestring);
  const today = new Date();

  if (isToday(date)) {
    return "Hari ini";
  } else if (isYesterday(date)) {
    return "Kemarin";
  } else if (differenceInDays(today, date) < 7) {
    return format(date, "d MMMM");
  } else if (differenceInWeeks(today, date) < 4) {
    return format(date, "MMMM d");
  } else {
    return format(date, "MMMM d, yyyy");
  }
}

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, '...', totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    '...',
    currentPage - 1,
    currentPage,
    currentPage + 1,
    '...',
    totalPages,
  ];
};
