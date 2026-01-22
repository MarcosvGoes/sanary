"use server";

import { asaasBaseUrl } from "@/shared/utils/basesUrl";
import { db } from "../../../../prisma";
import { auth } from "@/features/auth/auth";
import { headers } from "next/headers";

export async function createCustomer() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }

  const asaasHeaders = {
    accept: "application/json",
    "content-type": "application/json",
    access_token: `$${process.env.ASAAS_API_KEY || ""}`,
  };

  const userId = session.user.id;

  const paymentData = await db.userPaymentData.findUnique({
    where: { userId },
    select: { customerId: true },
  });

  if (paymentData?.customerId) {
    return { id: paymentData.customerId };
  }

  const user = await db.user.findUnique({
    where: { id: userId },
  });

  if (!user?.cpf || !user.name) {
    throw new Error("Dados insuficientes para registrar cliente");
  }

  const body = {
    name: user.name,
    cpfCnpj: user.cpf,
    notificationDisabled: true,
  };

  const response = await fetch(`${asaasBaseUrl}/v3/customers`, {
    method: "POST",
    headers: asaasHeaders,
    body: JSON.stringify(body),
  });

  const customer = await response.json();

  if (!response.ok) {
    const error = customer;
    console.error("Erro ao regitrar cliente:", error);
    throw new Error(
      error.errors?.[0]?.description ||
        error.message ||
        "Erro ao registrar cliente",
    );
  }

  await db.userPaymentData.upsert({
    where: { userId },
    update: { customerId: customer.id },
    create: { userId, customerId: customer.id },
  });

  return customer;
}
