"use client"

import { useState } from "react"
import { Controller } from "react-hook-form"

import { Button } from "@/shared/components/ui/button"
import { Input } from "@/shared/components/ui/input"
import { Textarea } from "@/shared/components/ui/textarea"
import { toast } from "sonner"

import { addRoom, uploadImages } from "../actions/addRooms"
import { Dialog, DialogContent, DialogHeader, DialogTrigger } from "@/shared/components/ui/dialog"
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog"
import { Plus } from "lucide-react"
import { FieldError } from "@/shared/components/ui/field"
import { addRoomSchema } from "../schemas/addRoomSchema"
import { useZodForm } from "@/shared/hooks/useZodForm"
import { Label } from "@/shared/components/ui/label"
import { useRouter } from "next/navigation"


type AddRoomFormData = {
    title: string
    description: string
    price: number
    capacity: number
    images: FileList
}

export default function AddRooms() {
    const [loading, setLoading] = useState(false)
    const router = useRouter()
    const form = useZodForm(addRoomSchema, {
        defaultValues: {
            title: "",
            description: "",
            price: 0,
            capacity: 2,
            images: undefined,
        }
    })

    async function onSubmit(data: AddRoomFormData) {
        setLoading(true)

        try {
            const roomId = crypto.randomUUID()

            const files = Array.from(data.images)
            const imageUrls = await uploadImages(files, roomId)

            await addRoom({
                title: data.title,
                description: data.description,
                price: data.price,
                capacity: data.capacity,
                images: imageUrls,
            })

            toast.success("Quarto criado com sucesso")
            form.reset()
            router.refresh()
        } catch {
            toast.error("Erro ao criar quarto")
        } finally {
            setLoading(false)
        }
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className="flex items-center cursor-pointer gap-x-2 border-2" variant="outline">
                    <Plus /> Adicionar quarto
                </Button>
            </DialogTrigger>

            <DialogContent className="p-0">
                <DialogHeader className="gap-0 m-4">
                    <DialogTitle className="text-xl font-semibold">
                        Adicionar quarto
                    </DialogTitle>
                    <DialogDescription className="text-sm font-medium">
                        Insira os dados do quarto
                    </DialogDescription>
                </DialogHeader>

                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="max-w-xl space-y-4 bg-white p-6 rounded-xl border"
                >
                    {/* Título */}
                    <Controller
                        name="title"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div>
                                <Label className="mb-1">Título</Label>
                                <Input placeholder="Título do quarto" {...field} />
                                <FieldError errors={[fieldState.error]} />
                            </div>
                        )}
                    />

                    {/* Descrição */}
                    <Controller
                        name="description"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div>
                                <Label className="mb-1">Descrição</Label>
                                <Textarea placeholder="Descrição" {...field} />
                                <FieldError errors={[fieldState.error]} />
                            </div>
                        )}
                    />

                    <div className="grid grid-cols-2 gap-3">
                        {/* Preço */}
                        <Controller
                            name="price"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <div>
                                    <Label className="mb-1">Preço</Label>
                                    <Input placeholder="Preço" {...field} />
                                    <FieldError errors={[fieldState.error]} />
                                </div>
                            )}
                        />

                        {/* Capacidade */}
                        <Controller
                            name="capacity"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <div>
                                    <Label className="mb-1">Capacidade</Label>
                                    <Input type="number" placeholder="Capacidade" {...field} />
                                    <FieldError errors={[fieldState.error]} />
                                </div>
                            )}
                        />
                    </div>

                    {/* Imagens */}
                    <Controller
                        name="images"
                        control={form.control}
                        render={({ field, fieldState }) => (
                            <div>
                                <Label className="mb-1">Imagens</Label>
                                <Input
                                    type="file"
                                    accept="image/*"
                                    multiple
                                    onChange={(e) => field.onChange(e.target.files)}
                                />
                                <FieldError errors={[fieldState.error]} />
                            </div>
                        )}
                    />

                    <Button disabled={loading} className="w-full cursor-pointer">
                        {loading ? "Salvando..." : "Criar quarto"}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    )
}
