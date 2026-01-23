"use server";

import { db } from "../../../../prisma";

type Props = {
  roomId: string;
};

export async function getRoomUnavailableIntervals({ roomId }: Props) {
  if (!roomId) {
    throw new Error("roomId obrigatório");
  }

  const bookings = await db.booking.findMany({
    where: {
      roomId,
      status: {
        in: ["PENDING", "CONFIRMED"],
      },
    },
    select: {
      checkIn: true,
      checkOut: true,
    },
  });

  const intervals = bookings.map((b) => ({
    from: b.checkIn.toISOString(),
    to: b.checkOut.toISOString(),
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
