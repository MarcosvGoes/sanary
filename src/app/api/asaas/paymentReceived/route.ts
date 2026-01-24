import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../../../prisma";

enum AsaasEvent {
  PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
}

function datesOverlap(startA: Date, endA: Date, startB: Date, endB: Date) {
  return startA <= endB && endA >= startB;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") return res.status(405).end();

  const payload = req.body;
  const event = payload.event as AsaasEvent;

  try {
    if (![AsaasEvent.PAYMENT_CONFIRMED, AsaasEvent.PAYMENT_RECEIVED].includes(event)) {
      return res.status(200).json({ ok: true, message: "Evento ignorado" });
    }

    const externalReference = payload.payment.externalReference;
    const paymentDate = payload.payment.paymentDate;

    const booking = await db.booking.findUnique({
      where: { id: externalReference },
    });

    if (!booking) return res.status(404).json({ ok: false, message: "Booking não encontrado" });

    await db.booking.update({
      where: { id: booking.id },
      data: {
        status: "CONFIRMED",
        paymentConfirmedAt: new Date(paymentDate),
      },
    });

    const conflictingBookings = await db.booking.findMany({
      where: {
        roomId: booking.roomId,
        status: "PENDING",
      },
    });

    const toCancel = conflictingBookings.filter((b) =>
      datesOverlap(b.checkIn, b.checkOut, booking.checkIn, booking.checkOut)
    );

    if (toCancel.length > 0) {
      await db.booking.updateMany({
        where: { id: { in: toCancel.map((b) => b.id) } },
        data: { status: "CANCELED" },
      });
    }

    return res.status(200).json({ ok: true });
  } catch (err: any) {
    console.error("Erro ao processar webhook Asaas:", err);
    return res.status(500).json({ ok: false, message: err.message });
  }
}
