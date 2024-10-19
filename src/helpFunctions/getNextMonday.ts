export const getNextMonday = (date: Date): Date => {
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    throw new Error('Invalid date provided');
  }
  const nextMonday = new Date(date);
  nextMonday.setDate(date.getDate() + ((8 - date.getDay()) % 7 || 7));
  nextMonday.setHours(0, 0, 0, 0);
  return nextMonday;
};
