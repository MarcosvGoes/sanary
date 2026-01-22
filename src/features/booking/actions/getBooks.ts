"use server"

import { db } from "../../../../prisma"
import { auth } from "@/features/auth/auth"
import { headers } from "next/headers"

export async function getBooks() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user?.id) {
    throw new Error("Usuário não autenticado")
  }

  const bookings = await db.booking.findMany({
    where: {
      userId: session.user.id,
    },
    include: {
      guests: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return bookings
}
