// AdminCalendar.tsx
"use client";

import { Calendar } from "@/shared/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/shared/components/ui/dialog";
import { formatDateUTC } from "@/shared/utils/date";
import { ptBR } from "date-fns/locale";
import { useState } from "react";

type Props = {
  calendarMap: Record<string, any[]>;
};

export default function AdminCalendar({ calendarMap }: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);

  const occupiedDates: Date[] = [];
  const blockedDates: Date[] = [];

  Object.entries(calendarMap).forEach(([date, bookings]) => {
    const [year, month, day] = date.split("-").map(Number);
    const parsedDate = new Date(year, month - 1, day);

    const hasBlocked = bookings.some((b) => b.status === "BLOCKED");

    if (hasBlocked) {
      blockedDates.push(parsedDate);
    } else {
      occupiedDates.push(parsedDate);
    }
  });

  function handleDayClick(day: Date) {
    const key = day.toISOString().split("T")[0];
    if (!calendarMap[key]) return;
    setSelectedDate(day);
    setOpen(true);
  }

  return (
    <>
      <Calendar
        locale={ptBR}
        className="mx-auto w-full bg-white max-w-lg border rounded-md shadow-md cursor-pointer"
        fromDate={new Date()}
        mode="single"
        modifiers={{ occupied: occupiedDates, blocked: blockedDates }}
        modifiersClassNames={{
          occupied: "bg-blue-500 text-white hover:bg-blue-600",
          blocked: "bg-red-600 text-white hover:bg-red-700",
        }}
        onDayClick={handleDayClick}
      />

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg mx-auto p-4">
          <DialogHeader>
            <DialogTitle>Reserva {selectedDate && formatDateUTC(selectedDate)}</DialogTitle>
          </DialogHeader>

          <div className="grid gap-3">
            {selectedDate &&
              calendarMap[selectedDate.toISOString().split("T")[0]].map((booking) => {
                const isBlocked = booking.status === "BLOCKED";
                return (
                  <div
                    key={booking.id}
                    className={`grid gap-2 p-3 rounded-md border ${isBlocked ? "border-red-500 bg-red-50" : "border-gray-300 bg-gray-50 dark:bg-gray-700"
                      }`}
                  >
                    <p>
                      <strong>Quarto:</strong> {booking.room.title}
                    </p>
                    {isBlocked ? (
                      <p className="text-red-600 font-semibold">Bloqueado</p>
                    ) : (
                      <p>
                        <strong>Cliente:</strong> {booking.user.name}
                      </p>
                    )}

                    <div className="flex justify-between">
                      <span>
                        <strong>Check-in:</strong> {formatDateUTC(new Date(booking.checkIn))}
                      </span>
                      <span>
                        <strong>Check-out:</strong> {formatDateUTC(new Date(booking.checkOut))}
                      </span>
                    </div>

                    {isBlocked && booking.notes && (
                      <div className="text-sm text-red-700 bg-red-100 p-2 rounded-md">
                        <strong>Motivo:</strong> {booking.notes}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
