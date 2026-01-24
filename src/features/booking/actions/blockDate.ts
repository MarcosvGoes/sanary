"use server";

import { auth } from "@/features/auth/auth";
import { headers } from "next/headers";
import { db } from "../../../../prisma";
import { BookingStatus } from "@/prisma/generated/prisma/enums";
import { roomDateAvailable } from "./roomDateAvailable";

export async function blockRoomDates(values: {
  roomId: string;
  checkIn: Date;
  checkOut: Date;
  notes?: string;
}) {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session) throw new Error("Usuário não autenticado");

  const available = await roomDateAvailable({
    roomId: values.roomId,
    checkIn: values.checkIn,
    checkOut: values.checkOut,
  });

  if (!available) {
    throw new Error("Já existe reserva ou bloqueio nesse período");
  }

  const block = await db.booking.create({
    data: {
      userId: session.user.id, // admin
      roomId: values.roomId,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      notes: values.notes ?? "Bloqueio manual",
      status: BookingStatus.BLOCKED,
    },
  });

  return block;
}
