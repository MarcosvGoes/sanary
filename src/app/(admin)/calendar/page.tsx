import { Calendar } from "@/shared/components/ui/calendar";

export default function CalendarPage() {
    return (
        <div className="mx-auto">
            <h1>Bloquear datas</h1>
            <Calendar
                className="border rounded-md mx-auto shadow-[0_3px_10px_rgb(0,0,0,0.2)]"
                mode="range"
                fromDate={new Date()}
            />
        </div>
    )
}