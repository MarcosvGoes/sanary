import AddRooms from "@/features/admin/components/AddRooms";
import RoomsList from "@/features/admin/components/RoomsList";

export default async function AdminRooms() {
    return (
        <div className="max-w-[95%] mx-auto">
            <h1 className="text-xl font-semibold">
                Quartos
            </h1>
            <div className="my-5">
                <AddRooms />
            </div>
            <div className="my-5">
                <RoomsList />
            </div>
        </div>
    )
}