"use client"

import { useState } from "react"
import { updateRoom } from "../actions/editRoom"
import { EditRoomSchema } from "../schemas/editRoomSchema"
import { Button } from "@/shared/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { DialogClose } from "@/shared/components/ui/dialog"
import { Spinner } from "@/shared/components/ui/spinner"

type Props = {
    room: {
        id: string
        title: string
        description: string
        price: number
        capacity: number
    }
}

export default function EditRoom({ room }: Props) {
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(formData: FormData) {
        setLoading(true)
        try {
            const data: EditRoomSchema = {
                title: String(formData.get("title")),
                description: String(formData.get("description")),
                price: Number(formData.get("price")),
                capacity: Number(formData.get("capacity")),
            }
            await updateRoom(room.id, data)
            toast("Quarto editado com sucesso")
            router.refresh()
        } catch (e) {
            console.log(e)
        } finally {
            setLoading(false)
        }
    }

    return (
        <form action={handleSubmit} className="space-y-4 max-w-md">
            <div>
                <label>Título</label>
                <input
                    name="title"
                    defaultValue={room.title}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div>
                <label>Descrição</label>
                <textarea
                    name="description"
                    defaultValue={room.description}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div>
                <label>Preço</label>
                <input
                    name="price"
                    type="number"
                    defaultValue={room.price}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div>
                <label>Capacidade</label>
                <input
                    name="capacity"
                    type="number"
                    defaultValue={room.capacity}
                    className="w-full border rounded px-3 py-2"
                />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <DialogClose asChild>
                    <Button variant={"destructive"}>
                        Fechar
                    </Button>
                </DialogClose>
                <Button
                    type="submit"
                    disabled={loading}
                    className="bg-black text-white px-4 py-2 w-full"
                >
                    {loading ? <span className="flex items-center gap-x-1"><Spinner /> Salvando...</span> : "Salvar alterações"}
                </Button>

            </div>
        </form>
    )
}
