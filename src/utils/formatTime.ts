import { format, getTime, formatDistanceToNow } from "date-fns";
import { fr } from "date-fns/locale"; // Import French locale

// ----------------------------------------------------------------------

export function fDate(date: Date | string | number): string {
  return format(new Date(date), "dd MMMM yyyy", { locale: fr });
}

export function fDateShortMonth(date: Date | string | number): string {
  return format(new Date(date), "dd/MM/yyyy", { locale: fr }); // Adjusted to French style
}

export function fDateShort(date: Date | string | number): string {
  return format(new Date(date), "dd MMM yyyy", { locale: fr });
}

export function fDateShortMth(date: Date | string | number): string {
  return format(new Date(date), "dd MMM", { locale: fr });
}

export function fDateTime(date: Date | string | number): string {
  return format(new Date(date), "dd MMM yyyy HH:mm", { locale: fr });
}

export function fTimestamp(date: Date | string | number): number {
  return getTime(new Date(date));
}

export function fDateTimeSuffix(date: Date | string | number): string {
  return format(new Date(date), "dd/MM/yyyy hh:mm a", { locale: fr });
}

export function fToNow(date: Date | string | number): string {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
    locale: fr,
  });
}
