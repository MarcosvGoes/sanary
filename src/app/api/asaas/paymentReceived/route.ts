import { db } from "../../../../../prisma";

enum AsaasEvent {
  PAYMENT_CONFIRMED = "PAYMENT_CONFIRMED",
  PAYMENT_RECEIVED = "PAYMENT_RECEIVED",
}

function datesOverlap(startA: Date, endA: Date, startB: Date, endB: Date) {
  return startA <= endB && endA >= startB;
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const event = payload.event as AsaasEvent;

    if (![AsaasEvent.PAYMENT_CONFIRMED, AsaasEvent.PAYMENT_RECEIVED].includes(event)) {
      return new Response(JSON.stringify({ ok: true, message: "Evento ignorado" }), { status: 200 });
    }

    const externalReference = payload.payment.externalReference;
    const paymentDate = payload.payment.paymentDate;

    // Buscar booking
    const booking = await db.booking.findUnique({
      where: { id: externalReference },
    });

    if (!booking) {
      return new Response(JSON.stringify({ ok: false, message: "Booking não encontrado" }), { status: 404 });
    }

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

    return new Response(JSON.stringify({ ok: true }), { status: 200 });
  } catch (err: any) {
    console.error("Erro ao processar webhook Asaas:", err);
    return new Response(JSON.stringify({ ok: false, message: err.message }), { status: 500 });
  }
}
