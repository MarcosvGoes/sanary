"use server";

import { auth } from "@/features/auth/auth";
import { headers } from "next/headers";
import { db } from "../../../../prisma";
import { BookingStatus } from "@/prisma/generated/prisma/enums";
import { roomDateAvailable } from "./roomDateAvailable";

export async function createBook(values: {
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  notes?: string;
  guests: {
    name: string;
    cpf: string;
    birthDate: Date;
    type: "adult" | "elderly" | "child" | "baby";
  }[];
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) throw new Error("Usuário não autenticado");

  const available = await roomDateAvailable({
    roomId: values.roomId,
    checkIn: values.checkIn,
    checkOut: values.checkOut,
  });

  if (!available) throw new Error("Quarto indisponível para o período selecionado");

  const booking = await db.booking.create({
    data: {
      userId: session.user.id,
      roomId: values.roomId,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      notes: values.notes,
      status: BookingStatus.PENDING,
      guests: {
        create: values.guests.map((g) => ({
          name: g.name,
          cpf: g.cpf,
          birthDate: g.birthDate,
          type: g.type,
        })),
      },
    },
    include: { guests: true },
  });

  return booking;
}
