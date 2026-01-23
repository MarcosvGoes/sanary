import Image from "next/image"
import { getAllRooms } from "../actions/getAllRooms"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import EditRoom from "./EditRoom"

export default async function RoomsList() {
    const rooms = await getAllRooms()

    if (rooms.length === 0) {
        return (
            <p className="text-sm text-muted-foreground">
                Nenhum quarto cadastrado ainda
            </p>
        )
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
                <div
                    key={room.id}
                    className="border rounded-xl overflow-hidden bg-white shadow-sm"
                >
                    <div className="relative w-full h-40 bg-muted">
                        {room.images[0] ? (
                            <Image
                                src={room.images[0].url}
                                alt={room.title}
                                fill
                                className="object-cover"
                            />
                        ) : (
                            <div className="flex items-center justify-center h-full text-xs text-muted-foreground">
                                Sem imagem
                            </div>
                        )}
                    </div>

                    <div className="p-4 space-y-1">
                        <h2 className="font-semibold">{room.title}</h2>

                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {room.description}
                        </p>

                        <div className="flex justify-between text-sm pt-2">
                            <span>
                                Capacidade:{" "}
                                <strong>{room.capacity}</strong>
                            </span>

                            <span className="font-semibold text-green-700">
                                R$ {room.price}
                            </span>
                        </div>
                        <Dialog>
                            <DialogTrigger className="bg-black text-white w-full rounded-lg mt-4 py-1 cursor-pointer">
                                Editar quarto
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>
                                        Edite seu quarto
                                    </DialogTitle>
                                    <DialogDescription>
                                        Insira os dados da edição
                                    </DialogDescription>
                                    <div>
                                    <EditRoom
                                        room={{
                                            ...room,
                                            description: room.description ?? "",
                                        }}
                                    />
                                    </div>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            ))}
        </div>
    )
}
