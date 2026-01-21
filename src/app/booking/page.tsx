import { auth } from "@/features/auth/auth"
import BookingTabs from "@/features/booking/components/BookingTabs"
import { headers } from "next/headers"

export default async function Booking() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  /*if (!session) {
    throw new Error("Unauthorized")
  }*/

  return (
    <div className="max-w-[95%] mx-auto">
      <BookingTabs session={session} />
    </div>
  )
}
