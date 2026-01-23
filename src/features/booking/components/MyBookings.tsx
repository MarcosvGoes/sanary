"use client"

import { useEffect, useState } from "react"
import { getBooks } from "@/features/booking/actions/getBooks"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { Card } from "@/shared/components/ui/card"
import { Button } from "@/shared/components/ui/button"
import { Spinner } from "@/shared/components/ui/spinner"
import { Guest, GuestType } from "@/prisma/generated/prisma/client"
import { Popover, PopoverContent, PopoverTrigger } from "@/shared/components/ui/popover"
import { EllipsisVertical } from "lucide-react"

/* =======================
   TIPOS
======================= */

type BookingStatus = "PENDING" | "CONFIRMED" | "CANCELED" | "REFUNDED"

type Booking = {
  id: string
  status: BookingStatus
  checkIn: string
  checkOut: string
  guests: Guest[]
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

const guestTypeLabel: Record<GuestType, string> = {
  adult: "Adulto",
  child: "Criança",
  elderly: "Idoso",
  baby: "Bebê",
}

function getGuestSummary(guests: Guest[]) {
  const countMap = guests.reduce<Record<GuestType, number>>(
    (acc, guest) => {
      acc[guest.type]++
      return acc
    },
    {
      adult: 0,
      child: 0,
      elderly: 0,
      baby: 0,
    }
  )

  return Object.entries(countMap)
    .filter(([, count]) => count > 0)
    .map(
      ([type, count]) =>
        `${count}x ${guestTypeLabel[type as GuestType]}${count > 1 ? "s" : ""}`
    )
    .join(", ")
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

  if (loading) return <p><Spinner className="size-10 flex mx-auto w-full my-10" /></p>

  if (bookings.length === 0) {
    return <p className="text-muted-foreground">Você ainda não possui reservas.</p>
  }

  return (
    <div className="space-y-4 pb-4 px-0">
      {bookings.map((booking) => {
        const statusConfig = bookingStatusConfig[booking.status]

        return (
          <Card
            key={booking.id}
            className="border rounded-xl p-5 gap-3 max-w-[500px] min-w-[300px] md:mx-auto bg-white shadow-sm"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px]">Id da reserva: {booking.id}</span>
            </div>

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

            <div className="text-sm space-y-1 grid">
              <span className="font-semibold text-base">
                Hóspedes
              </span>
              <span className="font-medium">
                {getGuestSummary(booking.guests)}
              </span>

              <div className="text-muted-foreground flex flex-col text-sm">
                {booking.guests.map((guest) => (
                  <span key={guest.id}>
                    {guest.name}
                  </span>
                ))}
              </div>

            </div>

          </Card>
        )
      })}
    </div>
  )
}
