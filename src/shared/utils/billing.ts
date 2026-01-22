export function formatCurrency(value: number | string): string {
  if (typeof value === "string") value = Number(value);
  if (isNaN(value)) return "R$ 0,00";

  return value.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function parseCurrency(value: string): number {
  if (!value) return 0;
  return Number(
    value
      .replace(/\s/g, "")
      .replace("R$", "")
      .replace(/\./g, "")
      .replace(",", "."),
  );
}

export function formatCurrencyInput(value: string): string {
  const numeric = value.replace(/\D/g, "");
  if (!numeric) return "";
  const integerPart = numeric.slice(0, -2) || "0";
  const decimalPart = numeric.slice(-2);
  const number = `${integerPart}.${decimalPart}`;
  return Number(number).toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}

export function bindCurrencyField(field: {
  value: number | undefined | null;
  onChange: (v: number) => void;
}) {
  return {
    value: field.value != null ? formatCurrency(field.value) : "",
    onChange: (e: any) => {
      const numeric = e.target.value.replace(/\D/g, "");
      const numberValue = numeric ? Number(numeric) / 100 : 0;
      field.onChange(numberValue);
    },
  };
}
