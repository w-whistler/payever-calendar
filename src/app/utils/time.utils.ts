export function timeToTimeString(hour: number, minute: number) {
  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    throw new Error('Invalid hour or minute value');
  }

  const formattedHour = hour.toString().padStart(2, '0');
  const formattedMinute = minute.toString().padStart(2, '0');

  return `${formattedHour}:${formattedMinute}`;
}

export function dayOfWeekToString(dayOfWeek: number) {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];
  return days[dayOfWeek];
}
