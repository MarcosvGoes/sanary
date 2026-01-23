"use client"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs"
import BookingNow from "./BookingNow"
import MyBookings from "./MyBookings"

export default function BookingTabs({ session }: { session: any }) {
  return (
    <Tabs defaultValue="bookingNow">
      <TabsList className="grid grid-cols-2 font-medium mb-4 md:mb-6 w-full rounded-none border-b  shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
        <TabsTrigger value="bookingNow" className="shadow-none data-[state=active]:text-blue-500 md:text-xl cursor-pointer">
          Reserve agora
        </TabsTrigger>
        <TabsTrigger value="myBookings" className="shadow-none data-[state=active]:text-blue-500 md:text-xl cursor-pointer">
          Minhas reservas
        </TabsTrigger>
      </TabsList>

      <TabsContent className="max-w-[95%] mx-auto" value="bookingNow">
        <BookingNow session={session} />
      </TabsContent>

      <TabsContent className="max-w-[95%] mx-auto" value="myBookings">
        <MyBookings session={session} />
      </TabsContent>
    </Tabs>
  )
}
