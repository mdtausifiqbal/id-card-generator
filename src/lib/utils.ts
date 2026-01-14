import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export const formattedDate = (dateStr: string) => {
  if (!dateStr) return "";
  const date = new Date(dateStr);
  return `${String(date.getDate()).padStart(2, "0")}-${String(
    date.getMonth() + 1
  ).padStart(2, "0")}-${date.getFullYear()}`;
};

// create a cn function with clsx and tailwind merge
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}
