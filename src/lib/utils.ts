import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function typograph(text: string): string {
  if (!text || typeof text !== "string") return text;

  let result = text;
  
  // 1. Неразрывный пробел после коротких слов (1-3 буквы: в, на, под, без, для, и т.д.)
  // Применяем дважды для случаев подряд идущих предлогов (например "а в лесу")
  result = result.replace(/(^|\s)([а-яА-ЯёЁa-zA-Z]{1,3})\s+/g, "$1$2\u00A0");
  result = result.replace(/(^|\s)([а-яА-ЯёЁa-zA-Z]{1,3})\s+/g, "$1$2\u00A0");

  // 2. Неразрывный пробел перед тире и замена дефиса на длинное тире
  result = result.replace(/\s+[-—]\s+/g, "\u00A0— ");

  // 3. Неразрывный пробел между числом и словом/знаком процента
  result = result.replace(/(\d+)\s+([а-яА-Яa-zA-Z%])/g, "$1\u00A0$2");

  return result;
}
