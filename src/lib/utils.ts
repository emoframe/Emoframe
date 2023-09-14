import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPhone(event: React.ChangeEvent<HTMLInputElement>): string {
  if (!event) return event;

  const onlyNums: string = event.target.value.replace(/[^\d]/g, '');
  let newValue = onlyNums;

  if (onlyNums.length > 2)
    newValue = `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 6)}`;

  if (onlyNums.length > 6) newValue += `-${onlyNums.slice(6)}`;

  if (onlyNums.length > 10) newValue = `(${onlyNums.slice(0, 2)}) ${onlyNums.slice(2, 7)}-${onlyNums.slice(7)}`;

  if (newValue.length > 7) return newValue.slice(0, 15);

  return newValue;
}
