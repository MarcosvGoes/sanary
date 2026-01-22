"use server";

import { asaasBaseUrl } from "@/shared/utils/basesUrl";
import { db } from "../../../../prisma";
import { auth } from "@/features/auth/auth";
import { headers } from "next/headers";

export async function createCharge(userId: string, value: number) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }

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

  if (!user) {
    throw new Error("Usúario não encontrado");
  }

  const body = {
    customer: paymentData?.customerId,
    billingType: "UNDEFINED",
    value,
    dueDate: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString().split("T")[0],
    description: "Pousada Riviera Sanary",
  };

  const response = await fetch(`${asaasBaseUrl}/v3/customers`, {
    method: "POST",
    headers: {
      accept: "appliction/json",
      "Content-Type": "application/json",
      access_token: `${process.env.ASAAS_API_KEY}`,
    },
    body: JSON.stringify(body),
  });

  const charge = await response.json();

  if (!response.ok) {
    const error = charge;
    console.error("Erro ao regitrar cliente:", error);
    throw new Error(
      error.errors?.[0]?.description ||
      error.message ||
      "Erro ao registrar cliente",
    );
  }

  const userPaymentData = await db.userPaymentData.upsert({
    where: { userId },
    update: {
      customerId: charge.customer,
    },
    create: {
      userId,
      customerId: charge.customer,
    },
  });

  return charge;
}
