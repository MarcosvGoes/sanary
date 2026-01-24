import { getAllRooms } from "@/features/admin/actions/getAllRooms";
import { getBookingsCalendarMap } from "@/features/admin/actions/getBookingsByDate";
import AdminCalendar from "@/features/admin/components/AdminCalendar";
import BlockDates from "@/features/booking/components/BlockDates";

export default async function Admin() {
  const calendarMap = await getBookingsCalendarMap();
  const rooms = await getAllRooms()

  return (
    <div className="mx-auto max-w-[95%] space-y-10 py-5 md:py-10 min-h-[100dvh]">
      <div className="grid gap-5">
        <h2 className="text-lg text-center font-semibold">Reservas</h2>
        <AdminCalendar calendarMap={calendarMap} />
      </div>
      <div className="grid gap-5">
        <h2 className="text-lg text-center font-semibold">Bloquear datas</h2>
        <BlockDates rooms={rooms} />
      </div>
    </div>
  );
}
