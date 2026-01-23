"use client"

import { useState } from "react"
import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { toast } from "sonner"
import { addRoom, uploadImages } from "../actions/addRooms"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/shared/components/ui/dialog"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { Plus } from "lucide-react"

export default function AddRooms() {
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setLoading(true)

        try {
            const form = e.currentTarget
            const formData = new FormData(form)

            const files = formData.getAll("images") as File[]

            const roomId = crypto.randomUUID()

            const imageUrls = await uploadImages(files, roomId)

            await addRoom({
                title: formData.get("title") as string,
                description: formData.get("description") as string,
                price: Number(formData.get("price")) as unknown as number,
                capacity: Number(formData.get("capacity")) as unknown as number,
                images: imageUrls,
            } as any)

            toast.success("Quarto criado com sucesso")
            form.reset()
        } catch (err: any) {
            toast.error("Erro ao criar quarto")
        } finally {
            setLoading(false)
        }
    }


    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex items-center gap-x-2 border-2" variant={"outline"}>
                    <Plus /> Adicionar quarto
                </Button>
            </DialogTrigger>
            <DialogContent className="p-0">
                <DialogHeader className="gap-0 mt-4">
                    <DialogTitle className="text-xl font-semibold">
                        Adicionar quarto
                    </DialogTitle>
                    <DialogDescription className="text-sm font-medium">
                        Insira os dados do quarto
                    </DialogDescription>
                </DialogHeader>
                <form
                    onSubmit={handleSubmit}
                    className="max-w-xl space-y-4 bg-white p-6 rounded-xl border"
                >
                    <Input name="title" placeholder="Título do quarto" required />
                    <Textarea name="description" placeholder="Descrição" required />

                    <div className="grid grid-cols-2 gap-3">
                        <Input name="price" type="number" placeholder="Preço" required />
                        <Input name="capacity" type="number" placeholder="Capacidade" required />
                    </div>

                    <Input
                        name="images"
                        type="file"
                        accept="image/*"
                        multiple
                        required
                    />

                    <Button disabled={loading} className="w-full">
                        {loading ? "Salvando..." : "Criar quarto"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
