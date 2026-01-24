"use server";

import { auth } from "@/features/auth/auth";
import { headers } from "next/headers";
import { db } from "../../../../prisma";

export async function getAllBookings() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.id !== "pv8fETHJNurooR2cx3Ju1ydLwmvsgRmG") {
    throw new Error("Unauthorized");
  }

  const bookings = await db.booking.findMany({
    where: {
      status: {
        not: "BLOCKED",
      },
    },
    orderBy: {
      createdAt: "desc",
    },
    include: {
      user: {
        include: {
          paymentData: {
            include: {
              Payments: true,
            },
          },
        },
      },
      guests: true,
    },
  });

  return bookings;
}
