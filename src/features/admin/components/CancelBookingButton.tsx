"use client"

import { Button } from "@/shared/components/ui/button"
import cancelBooking from "../actions/cancelBooking"
import { useState } from "react"
import { toast } from "sonner"
import { Spinner } from "@/shared/components/ui/spinner"
import { useRouter } from "next/navigation"

export default function CancelBookingButton({ bookingId }: { bookingId: string }) {
    const [cancelling, setCancelling] = useState(false)
    const router = useRouter()

    async function handleCancel() {
        setCancelling(true)
        try {
            await cancelBooking(bookingId)
            toast.success("Reserva cancelada com sucesso")
            router.refresh()
        } catch (e) {
            console.log(e)
        } finally {
            setCancelling(false)
        }
    }

    return (
            <Button
                variant="destructive"
                disabled={cancelling}
                className="cursor-pointer"
                onClick={handleCancel}
            >
                {cancelling ? (
                    <span className="flex items-center gap-x-2">
                        <Spinner className="size-4" />
                        Cancelando...
                    </span>
                ) : (
                    "Cancelar reserva"
                )}
            </Button>
    )
}