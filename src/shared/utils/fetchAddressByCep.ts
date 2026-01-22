export async function fetchAddressByCep(cep: string): Promise<{
  street?: string;
  neighborhood?: string;
  city?: string;
  state?: string;
} | null> {
  try {
    const res = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
    if (!res.ok) throw new Error("Erro ao buscar CEP");
    const data = await res.json();
    if (data.erro) return null;
    return {
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf,
    };
  } catch {
    return null;
  }
}
