export default function isValidCPF(cpf?: string | null) {
  if (!cpf) return true

  const cleaned = cpf.replace(/\D/g, "")
  if (cleaned.length !== 11) return false
  if (/^(\d)\1+$/.test(cleaned)) return false

  const calcCheckDigit = (base: string, factor: number) => {
    let total = 0
    for (let i = 0; i < base.length; i++) {
      total += Number(base[i]) * factor--
    }
    const rest = total % 11
    return rest < 2 ? 0 : 11 - rest
  }

  const digit1 = calcCheckDigit(cleaned.slice(0, 9), 10)
  const digit2 = calcCheckDigit(cleaned.slice(0, 10), 11)

  return (
    digit1 === Number(cleaned[9]) &&
    digit2 === Number(cleaned[10])
  )
}

export function formatCPF(value: string): string {
  if (!value) return "";

  const digits = value.replace(/\D/g, "");
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return digits.replace(/(\d{3})(\d+)/, "$1.$2");
  if (digits.length <= 9)
    return digits.replace(/(\d{3})(\d{3})(\d+)/, "$1.$2.$3");
  return digits
    .replace(/(\d{3})(\d{3})(\d{3})(\d+)/, "$1.$2.$3-$4")
    .slice(0, 14);
}

export function maskCPF(cpf: string) {
  if (!cpf) return "";

  const numbersOnly = cpf.replace(/\D/g, "");

  if (numbersOnly.length !== 11) return cpf;

  return numbersOnly.replace(/^\d{3}(\d{3})(\d{3})\d{2}$/, "***.$1.$2-**");
}
