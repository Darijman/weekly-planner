export const formatDateRange = (startDate: string | Date, endDate: string | Date) => {
  const start = typeof startDate === 'string' ? new Date(startDate) : startDate;
  const end = typeof endDate === 'string' ? new Date(endDate) : endDate;

  if (isNaN(start.getTime()) || isNaN(end.getTime())) {
    throw new Error('Invalid date(s) provided.');
  }

  const options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'short' };

  const formattedStart = start.toLocaleDateString('en-GB', options).replace(',', '');
  const formattedEnd = end.toLocaleDateString('en-GB', options).replace(',', '');

  const startYear = start.getFullYear();
  const endYear = end.getFullYear();

  const yearPart = startYear === endYear ? ` ${startYear}` : ` ${startYear} - ${endYear}`;

  return `${formattedStart} - ${formattedEnd}${yearPart}`;
};
