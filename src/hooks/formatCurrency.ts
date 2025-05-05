import { useState, useEffect } from "react";

// import { RootState } from "src/redux"; // Update the import to your actual RootState location

export const useCurrencyFormatter = (curr?: string) => {
  // Define the Redux selector type
  const currency = process.env.BASE_CURRENCY;
  // const currency = "USD";
  // Set formatter type to `Intl.NumberFormat | null`
  const [formatter, setFormatter] = useState<Intl.NumberFormat | null>(null);
  const locale = "fr";

  useEffect(() => {
    if (currency && locale) {
      const newFormatter = new Intl.NumberFormat(locale, {
        style: "currency",
        currency: curr || currency,
      });
      setFormatter(newFormatter);
    }
  }, [currency, locale, curr]);

  const formatCurrency = (number: number | string): string => {
    if (!formatter) return String(number);
    return formatter.format(Number(number));
  };

  return formatCurrency;
};
