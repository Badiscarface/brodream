import { replace } from "lodash";
import numeral from "numeral";

// ----------------------------------------------------------------------

const locale = "en-US";
export function fCurrency(number: number) {
  const currency = new Intl.NumberFormat(locale, {
    style: "currency",
    currency: process.env.BASE_CURRENCY || "USD",
  });

  return currency.format(number).slice(0, -1);
}

export function fPercent(number: number) {
  return numeral(number / 100).format("0.0%");
}

export function fNumber(number: number) {
  return numeral(number).format();
}

export function fShortenNumber(number: number) {
  return replace(numeral(number).format("0.00a"), ".00", "");
}

export function fData(number: number) {
  return numeral(number).format("0.0 b");
}
