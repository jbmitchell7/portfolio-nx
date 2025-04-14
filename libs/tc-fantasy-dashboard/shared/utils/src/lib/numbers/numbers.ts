export const nthNumber = (num: number): string => {
  if (num > 3 && num < 21) return "th";
  switch (num % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
};
