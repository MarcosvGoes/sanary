"use server";

import { db } from "../../../../prisma";

type Props = {
  roomId: string;
};

export async function getRoomUnavailableIntervals({ roomId }: Props) {
  if (!roomId) throw new Error("roomId obrigatório");

  const bookings = await db.booking.findMany({
    where: {
      roomId,
      status: { in: ["CONFIRMED"] },
    },
    select: { checkIn: true, checkOut: true },
  });

  if (bookings.length === 0) {
    return [];
  }

  bookings.forEach((b, idx) => {});

  const intervals = bookings.map((b) => ({
    from: b.checkIn.toISOString().split("T")[0],
    to: b.checkOut.toISOString().split("T")[0],
  }));

  return intervals;
}

export async function roomDateAvailable({
  roomId,
  checkIn,
  checkOut,
}: {
  roomId: string;
  checkIn: Date;
  checkOut: Date;
}): Promise<boolean> {
  if (!roomId) throw new Error("roomId obrigatório");

  const conflict = await db.booking.findFirst({
    where: {
      roomId,
      status: { in: ["PENDING", "CONFIRMED"] },
      AND: [{ checkIn: { lt: checkOut } }, { checkOut: { gt: checkIn } }],
    },
  });

  return !conflict;
}
