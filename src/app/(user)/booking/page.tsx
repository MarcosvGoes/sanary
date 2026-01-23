import { auth } from "@/features/auth/auth"
import BookingTabs from "@/features/booking/components/BookingTabs"
import { headers } from "next/headers"
import { redirect } from "next/navigation"

export default async function Booking() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    redirect("/")
  }

  return (
    <BookingTabs session={session} />
  )
}
