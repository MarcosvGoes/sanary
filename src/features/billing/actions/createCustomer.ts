"use server";

import { asaasBaseUrl } from "@/shared/utils/basesUrl";
import { db } from "../../../../prisma";

export async function createCustomer(session: any) {
  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado");
  }

  const asaasHeaders = {
    accept: "application/json",
    "content-type": "application/json",
    access_token: `$${process.env.ASAAS_API_KEY ?? ""}`,
  };

  const userId = session.user.id;

  // Busca se já existe customerId
  const paymentData = await db.userPaymentData.findUnique({
    where: { userId },
    select: { customerId: true },
  });

  // Pega os dados do usuário
  const user = await db.user.findUnique({
    where: { id: userId },
    select: {
      name: true,
      phoneNumber: true,
      cpf: true,
      street: true,
      houseNumber: true,
      complement: true,
      neighborhood: true,
      cep: true,
    },
  });

  if (!user) throw new Error("Usuário não encontrado");

  const body = {
    name: user.name,
    cpfCnpj: user.cpf,
    mobilePhone: user.phoneNumber,
    address: user.street,
    addressNumber: user.houseNumber,
    complement: user.complement ?? "",
    province: user.neighborhood,
    postalCode: user.cep,
    notificationDisabled: true,
  };

  // Se já existe customerId, atualiza apenas se necessário
  if (paymentData?.customerId) {
    const response = await fetch(
      `${asaasBaseUrl}/v3/customers/${paymentData.customerId}`,
      {
        method: "GET",
        headers: asaasHeaders,
      }
    );
    const existingCustomer = await response.json();

    const shouldUpdate =
      existingCustomer.name !== user.name ||
      existingCustomer.cpfCnpj !== user.cpf ||
      existingCustomer.mobilePhone !== user.phoneNumber ||
      (existingCustomer.address ?? "") !== (user.street ?? "") ||
      (existingCustomer.addressNumber ?? "") !== (user.houseNumber ?? "") ||
      (existingCustomer.complement ?? "") !== (user.complement ?? "") ||
      (existingCustomer.province ?? "") !== (user.neighborhood ?? "") ||
      (existingCustomer.postalCode ?? "") !== (user.cep ?? "");

    if (shouldUpdate) {
      const updateRes = await fetch(
        `${asaasBaseUrl}/v3/customers/${paymentData.customerId}`,
        {
          method: "PUT",
          headers: asaasHeaders,
          body: JSON.stringify(body),
        }
      );

      if (!updateRes.ok) {
        const error = await updateRes.json();
        console.error("Erro ao atualizar cliente no Asaas:", error);
        throw new Error(
          error.errors?.[0]?.description ||
            error.message ||
            "Erro ao atualizar cliente"
        );
      }

      console.log("Cliente atualizado no Asaas");
    } else {
      console.log("Cliente sem alterações, não atualizei");
    }

    return { id: paymentData.customerId };
  }

  // Se não existe, cria novo cliente
  const response = await fetch(`${asaasBaseUrl}/v3/customers`, {
    method: "POST",
    headers: asaasHeaders,
    body: JSON.stringify(body),
  });

  const customer = await response.json();

  if (!response.ok) {
    console.error("Erro ao registrar cliente:", customer);
    throw new Error(
      customer.errors?.[0]?.description ||
        customer.message ||
        "Erro ao registrar cliente"
    );
  }

  // Salva apenas o customerId no banco
  await db.userPaymentData.upsert({
    where: { userId },
    update: { customerId: customer.id },
    create: { userId, customerId: customer.id },
  });

  console.log("Cliente criado no Asaas com sucesso:", customer);

  return customer;
}
