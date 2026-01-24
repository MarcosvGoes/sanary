import { asaasBaseUrl } from "@/shared/utils/basesUrl";
import { db } from "../../../../../prisma";

function datesOverlap(startA: Date, endA: Date, startB: Date, endB: Date) {
  return startA <= endB && endA >= startB;
}

export async function POST(req: Request) {
  try {
    const payload = await req.json();
    const { event, payment } = payload;

    const bookingId = payment.externalReference;
    if (!bookingId) {
      return new Response("Sem externalReference", { status: 200 });
    }

    await db.payments.upsert({
      where: { paymentId: payment.id },
      update: {
        status: payment.status,
        invoiceUrl: payment.invoiceUrl,
        transactionReceiptUrl: payment.transactionReceiptUrl,
        paidAt: payment.paymentDate ? new Date(payment.paymentDate) : null,
        dueDate: payment.dueDate ? new Date(payment.dueDate) : null,
        amount: payment.value,
      },
      create: {
        paymentId: payment.id,
        bookingId,
        amount: payment.value,
        status: payment.status,
        billingType: payment.billingType,
        invoiceUrl: payment.invoiceUrl,
        transactionReceiptUrl: payment.transactionReceiptUrl,
        dueDate: payment.dueDate ? new Date(payment.dueDate) : null,
        paidAt: payment.paymentDate ? new Date(payment.paymentDate) : null,
      },
    });

    if (event === "PAYMENT_CONFIRMED" || event === "PAYMENT_RECEIVED") {
      const booking = await db.booking.findUnique({
        where: { id: bookingId },
      });

      if (!booking) {
        return new Response(
          JSON.stringify({ ok: false, message: "Booking não encontrado" }),
          { status: 404 },
        );
      }

      await db.booking.update({
        where: { id: booking.id },
        data: {
          status: "CONFIRMED",
          paymentConfirmedAt: payment.paymentDate
            ? new Date(payment.paymentDate)
            : new Date(),
        },
      });

      const conflictingBookings = await db.booking.findMany({
        where: {
          roomId: booking.roomId,
          status: "PENDING",
        },
      });

      const toCancel = conflictingBookings.filter((b) =>
        datesOverlap(b.checkIn, b.checkOut, booking.checkIn, booking.checkOut),
      );

      if (toCancel.length > 0) {
        await db.booking.updateMany({
          where: { id: { in: toCancel.map((b) => b.id) } },
          data: { status: "CANCELED" },
        });
      }

      return new Response(JSON.stringify({ ok: true }), { status: 200 });
    }

    if (event === "PAYMENT_OVERDUE") {
      await db.booking.update({
        where: { id: bookingId },
        data: { status: "CANCELED" },
      });

      await fetch(
        `${asaasBaseUrl}/v3/payments/${payment.id}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
            access_token: `$${process.env.ASAAS_API_KEY!}`,
          },
        },
      );

      return new Response(
        JSON.stringify({ ok: true, message: "Booking cancelado por atraso" }),
        { status: 200 },
      );
    }

    // Evento irrelevante
    return new Response(
      JSON.stringify({ ok: true, message: "Evento ignorado" }),
      { status: 200 },
    );
  } catch (err: any) {
    console.error("Erro ao processar webhook Asaas:", err);
    return new Response(JSON.stringify({ ok: false, message: err.message }), {
      status: 500,
    });
  }
}
