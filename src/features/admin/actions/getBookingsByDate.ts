"use server";

import { auth } from "@/features/auth/auth";
import { headers } from "next/headers";
import { db } from "../../../../prisma";
export async function getBookingsCalendarMap() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session || session.user.id !== "pv8fETHJNurooR2cx3Ju1ydLwmvsgRmG") {
    throw new Error("Unauthorized");
  }
  const bookings = await db.booking.findMany({
    where: {
      status: {
        in: ["CONFIRMED", "BLOCKED"],
      },
    },
    include: { room: true, user: true, guests: true },
  });
  const calendarMap: Record<string, typeof bookings> = {};
  for (const booking of bookings) {
    let current = new Date(booking.checkIn);
    while (current <= booking.checkOut) {
      const key = current.toISOString().split("T")[0];
      if (!calendarMap[key]) {
        calendarMap[key] = [];
      }
      calendarMap[key].push(booking);
      current.setDate(current.getDate() + 1);
    }
  }
  return calendarMap;
}
