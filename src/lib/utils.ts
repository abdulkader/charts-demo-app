import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getFrequencyOptions = (defaultFrequency: string) => {
  const frequencyEntries = [
    { value: 'd', label: 'Daily' },
    { value: 'w', label: 'Weekly' },
    { value: 'bw', label: 'Biweekly' },
    { value: 'm', label: 'Monthly' },
    { value: 'q', label: 'Quarterly' },
    { value: 'sa', label: 'Semiannual' },
    { value: 'a', label: 'Annual' },
  ];

  const initialIndex = frequencyEntries.findIndex(
    (entry) => entry.value === defaultFrequency.toLowerCase(),
  );
  const frequencyOptions = frequencyEntries.slice(initialIndex);
  return frequencyOptions;
};

export const formatNumberVal = (val: any, decimal = 2, forcedDecimal = 0) => {
  if (!val) return 0;
  if (val < 1000) return parseFloat(`${val}`).toFixed(decimal);
  if (val < 1000000) {
    return parseFloat(`${val / 1000}`)?.toFixed(decimal) + 'K';
  }
  if (val < 1000000000) {
    return parseFloat(`${val / 1000000}`)?.toFixed(forcedDecimal) + 'M';
  }
  if (val < 1000000000000) {
    return parseFloat(`${val / 1000000000}`)?.toFixed(forcedDecimal) + 'B';
  }
  if (val < 1000000000000000) {
    return parseFloat(`${val / 1000000000000}`)?.toFixed(forcedDecimal) + 'T';
  }
};