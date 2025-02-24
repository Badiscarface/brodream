import { useSelector } from 'react-redux';

export const useCurrencyConvert = () => {
  const { rate } = useSelector(({ settings }: { settings: any }) => settings); // Access currency and rate from Redux
  const convertCurrency = (number: number) => {
    return Number(number * rate);
  };
  return convertCurrency;
};
