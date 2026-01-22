export function formatCep(cep?: string | null): string {
  if (!cep) return "";

  const digits = cep.replace(/\D/g, "").slice(0, 8);

  if (digits.length <= 5) return digits;
  return `${digits.slice(0, 5)}-${digits.slice(5)}`;
}
