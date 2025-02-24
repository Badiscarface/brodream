import { format, getTime, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date: Date | string | number): string {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateShortMonth(date: Date | string | number): string {
  return format(new Date(date), 'MM/dd/yyyy'); // Change format here if needed
}

export function fDateShort(date: Date | string | number): string {
  return format(new Date(date), 'dd MMM yyyy');
}
export function fDateShortMth(date: Date | string | number): string {
  return format(new Date(date), 'dd MMM');
}
export function fDateTime(date: Date | string | number): string {
  return format(new Date(date), 'dd MMM yyyy HH:mm');
}

export function fTimestamp(date: Date | string | number): number {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: Date | string | number): string {
  return format(new Date(date), 'dd/MM/yyyy hh:mm a');
}

export function fToNow(date: Date | string | number): string {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}
