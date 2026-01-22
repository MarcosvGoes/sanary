export function formatAndMaskPhoneNumber(value: string): string {
  if (!value) return "";

  const digits = value.replace(/\D/g, "").substring(0, 11);

  const len = digits.length;

  if (len === 0) return "";

  if (len < 3) {
    return "(" + digits;
  } else if (len < 8) {
    return `(${digits.substring(0, 2)}) ${digits.substring(2)}`;
  } else {
    return `(${digits.substring(0, 2)}) ${digits.substring(2, 7)}-${digits.substring(7)}`;
  }
}
