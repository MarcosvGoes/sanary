"use server";

import { auth } from "@/features/auth/auth";
import { headers } from "next/headers";
import { db } from "../../../../prisma";
import { BookingStatus } from "@/prisma/generated/prisma/enums";
import { createCustomer } from "@/features/billing/actions/createCustomer";

export async function createBook(values: {
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
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return
  }

  createCustomer()

  const booking = await db.booking.create({
    data: {
      userId: session.user.id,
      checkIn: values.checkIn,
      checkOut: values.checkOut,
      notes: values.notes,
      status: BookingStatus.PENDING,

      guests: {
        create: values.guests.map((guest) => ({
          name: guest.name,
          cpf: guest.cpf,
          birthDate: guest.birthDate,
          type: guest.type,
        })),
      },
    },

    include: {
      guests: true,
    },
  });

  return booking;
}
