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

export function formatContact(value: string) {
  if (!value) return value;
  
  const isPhone = /^[\d+]/.test(value);
  if (isPhone) {
    let digits = value.replace(/\D/g, "");
    if (!digits) return value;
    
    if (digits[0] === "9") digits = "7" + digits;
    else if (digits[0] === "8") digits = "7" + digits.substring(1);
    
    if (digits[0] !== "7") return "+" + digits;

    let res = "+7";
    if (digits.length > 1) res += ` (${digits.substring(1, 4)}`;
    if (digits.length > 4) res += `) ${digits.substring(4, 7)}`;
    if (digits.length > 7) res += `-${digits.substring(7, 9)}`;
    if (digits.length > 9) res += `-${digits.substring(9, 11)}`;
    return res;
  }
  
  return value.trim();
}

export function isValidContact(value: string) {
  if (!value) return false;
  const isPhone = /^[\d+]/.test(value);
  if (isPhone) {
    const digits = value.replace(/\D/g, "");
    return digits.length >= 11 && digits[0] === "7";
  } else {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
  }
}
