import Image from "next/image"
import { getAllRooms } from "../actions/getAllRooms"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/shared/components/ui/dialog"
import EditRoom from "./EditRoom"
import { deleteRoom } from "../actions/deleteRoom"
import { Button } from "@/shared/components/ui/button"
import DeleteRoomButton from "./DeleteRoomButton"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/components/ui/carousel"

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
                    <div className="relative w-full aspect-video bg-muted">
                        <Carousel className="w-full aspect-video">
                            <CarouselContent>
                                {room.images.map((img: { url: string }, index: number) => (
                                    <CarouselItem key={index}>
                                        <div className="relative w-full aspect-video">
                                            <Image
                                                src={`https://oobokhduylbaaskwchph.supabase.co/storage/v1/object/public/rooms/${img.url}`}
                                                alt={room.title}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow" />
                            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow" />
                        </Carousel>
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
                                {room.price.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL"
                                })}
                            </span>
                        </div>
                        <div className="md:grid md:grid-cols-2 md:gap-2">
                            <DeleteRoomButton roomId={room.id} className="w-full mt-4" />

                            <Dialog>
                                <DialogTrigger className="bg-black text-white w-full mt-2 md:mt-4 py-1.5 cursor-pointer rounded-sm font-medium">
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
                                    </DialogHeader>
                                    <div>
                                        <EditRoom
                                            room={{
                                                ...room,
                                                description: room.description ?? "",
                                            }}
                                        />
                                    </div>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    )
}
