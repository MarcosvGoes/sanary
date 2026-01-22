"use client"

import { useEffect, useState } from "react"
import { getBooks } from "@/features/booking/actions/getBooks"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Card } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"

/* =======================
   TIPOS
======================= */

type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELED" | "REFUNDED"

type Booking = {
  id: string
  status: BookingStatus
  checkIn: string
  checkOut: string
  guests: any[]
}

type BookingAction = {
  label: string
  variant?: "default" | "outline" | "destructive"
  disabled?: boolean
  onClick?: () => void
}

/* =======================
   CONFIGS
======================= */

const bookingStatusConfig: Record<
  BookingStatus,
  {
    label: string
    dot: string
    border: string
    text: string
  }
> = {
  PENDING: {
    label: "Pagamento pendente",
    dot: "bg-orange-500",
    border: "border-orange-300",
    text: "text-orange-600",
  },
  CONFIRMED: {
    label: "Reserva confirmada",
    dot: "bg-green-600",
    border: "border-green-300",
    text: "text-green-600",
  },
  CANCELED: {
    label: "Reserva cancelada",
    dot: "bg-red-600",
    border: "border-red-300",
    text: "text-red-600",
  },
  REFUNDED: {
    label: "Pagamento reembolsado",
    dot: "bg-blue-600",
    border: "border-blue-300",
    text: "text-blue-600",
  },
}

const bookingActionsMap: Record<BookingStatus, BookingAction[]> = {
  PENDING: [
    {
      label: "Confirmar pagamento",
      onClick: () => console.log("confirmar pagamento"),
    },
    {
      label: "Cancelar reserva",
      variant: "destructive",
      onClick: () => console.log("cancelar"),
    },
  ],

  CONFIRMED: [
    {
      label: "Editar reserva",
      variant: "outline",
      onClick: () => console.log("editar"),
    },
    {
      label: "Reembolsar",
      variant: "destructive",
      onClick: () => console.log("reembolsar"),
    },
  ],

  REFUNDED: [
    {
      label: "Reembolsado",
      disabled: true,
    },
  ],

  CANCELED: [],
}

export default function MyBookings({ session }: { session: any }) {
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function load() {
      const data = await getBooks()
      const formattedData = data.map(booking => ({
        ...booking,
        checkIn: booking.checkIn instanceof Date ? booking.checkIn.toISOString() : booking.checkIn,
        checkOut: booking.checkOut instanceof Date ? booking.checkOut.toISOString() : booking.checkOut,
      }))
      setBookings(formattedData)
      setLoading(false)
    }

    load()
  }, [])

  if (loading) return <p>Carregando reservas...</p>

  if (bookings.length === 0) {
    return <p className="text-muted-foreground">Você ainda não possui reservas.</p>
  }

  return (
    <div className="space-y-4 pb-4">
      {bookings.map((booking) => {
        const statusConfig = bookingStatusConfig[booking.status]
        const actions = bookingActionsMap[booking.status]

        return (
          <Card
            key={booking.id}
            className="border rounded-xl px-5 py-3 gap-3 bg-white shadow-sm"
          >
            <span className="text-[10px]">Id da reserva: {booking.id}</span>

            <div className={`flex items-center gap-x-2 font-medium ${statusConfig.text}`}>
              <span
                className={`
                  w-2.5 h-2.5 rounded-full
                  border-2
                  ${statusConfig.dot}
                  ${statusConfig.border}
                `}
              />
              <span>{statusConfig.label}</span>
            </div>

            <div className="flex gap-x-5 text-sm">
              <span>
                <strong>Check-in</strong><br />
                {format(new Date(booking.checkIn), "dd/MM/yyyy", { locale: ptBR })}
              </span>

              <span>→</span>

              <span>
                <strong>Check-out</strong><br />
                {format(new Date(booking.checkOut), "dd/MM/yyyy", { locale: ptBR })}
              </span>
            </div>

            <span>Hóspedes: {booking.guests.length}</span>

            <div className="grid grid-cols-2 gap-2 pt-2">
              {actions.map((action: BookingAction, index: number) => (
                <Button
                  key={index}
                  size="sm"
                  className="rounded-full text-sm"
                  variant={action.variant ?? "default"}
                  disabled={action.disabled}
                  onClick={action.onClick}
                >
                  {action.label}
                </Button>
              ))}
            </div>
          </Card>
        )
      })}
    </div>
  )
}
