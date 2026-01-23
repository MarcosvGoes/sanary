"use server";

import { auth } from "@/features/auth/auth";
import { headers } from "next/headers";
import { db } from "../../../../prisma";

export default async function cancelBooking(bookingId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.id !== "pv8fETHJNurooR2cx3Ju1ydLwmvsgRmG") {
    throw new Error("Unauthorized");
  }

  const booking = await db.booking.findUnique({
    where: {
      id: bookingId,
    },
  });

  if (!booking) {
    throw new Error("Booking not found");
  }

  const updatedBooking = await db.booking.update({
    where: {
      id: bookingId,
    },
    data: {
      status: "CANCELED",
    },
  });

  return updatedBooking;
}
