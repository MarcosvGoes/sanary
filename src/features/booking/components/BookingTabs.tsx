"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import BookingNow from "./BookingNow"
import MyBookings from "./MyBookings"

export default function BookingTabs({ session }: { session: any }) {
  return (
    <Tabs defaultValue="bookingNow">
      <TabsList className="grid grid-cols-2 font-medium my-4 md:my-6 w-full">
        <TabsTrigger value="bookingNow" className="shadow-none data-[state=active]:text-blue-500 md:text-xl lg:text-2xl cursor-pointer">
          Reserve agora
        </TabsTrigger>
        <TabsTrigger value="myBookings" className="shadow-none data-[state=active]:text-blue-500 md:text-xl lg:text-2xl cursor-pointer">
          Minhas reservas
        </TabsTrigger>
      </TabsList>

      <TabsContent value="bookingNow">
        <BookingNow session={session} />
      </TabsContent>

      <TabsContent value="myBookings">
        <MyBookings session={session} />
      </TabsContent>
    </Tabs>
  )
}
