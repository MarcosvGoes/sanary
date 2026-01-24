"use server";
import { db } from "../../../prisma";

const getUserByCPF = async (cpf: string) => {
  try {
    const user = await db.user.findUnique({ where: { cpf } });
    return user;
  } catch {
    return null;
  }
};

export async function checkCpfExists(cpf: string) {
  if (!cpf) {
    throw new Error("CPF é obrigatório");
  }

  const user = await getUserByCPF(cpf);
  return { cpfExists: !!user, id: user?.id ?? null };
}
