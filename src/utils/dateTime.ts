import { format } from 'date-fns';
import { toZonedTime, getTimezoneOffset } from 'date-fns-tz';

const NSW_TIMEZONE = 'Australia/Sydney';

export const toNSWTime = (date: Date): Date => {
  return toZonedTime(date, NSW_TIMEZONE);
};

export const fromNSWTime = (date: Date): Date => {
  const offset = getTimezoneOffset(NSW_TIMEZONE);
  return new Date(date.getTime() - offset);
};

export const formatNSWDate = (date: Date): string => {
  const nswDate = toNSWTime(date);
  return format(nswDate, 'dd/MM/yy');
};

export const formatNSWTime = (date: Date): string => {
  const nswDate = toNSWTime(date);
  return format(nswDate, 'HH:mm');
};

export const getCurrentNSWTime = (): Date => {
  return toNSWTime(new Date());
}; 