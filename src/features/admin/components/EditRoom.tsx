"use client"

import { useState } from "react"
import { updateRoom } from "../actions/editRoom"
import { Button } from "@/shared/components/ui/button"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { DialogClose } from "@/shared/components/ui/dialog"
import { Spinner } from "@/shared/components/ui/spinner"
import { Textarea } from "@/shared/components/ui/textarea"
import { Input } from "@/shared/components/ui/input"
import Image from "next/image"

type Props = {
  room: {
    id: string
    title: string
    description: string
    price: number
    capacity: number
    images: string[]
  }
}

export default function EditRoom({ room }: Props) {
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [existingImages, setExistingImages] = useState<string[]>(room.images)
  const [newImages, setNewImages] = useState<File[]>([])
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoadingEdit(true)

    try {
      const formData = new FormData(e.currentTarget)

      await updateRoom(room.id, {
        title: String(formData.get("title")),
        description: String(formData.get("description")),
        price: Number(formData.get("price")),
        capacity: Number(formData.get("capacity")),
        keepImages: existingImages,
        newImages,
      })

      toast.success("Quarto editado com sucesso")
      router.refresh()
    } catch (err) {
      console.error(err)
      toast.error("Erro ao editar quarto")
    } finally {
      setLoadingEdit(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md">

      {/* Imagens existentes */}
      <div className="grid grid-cols-3 gap-2">
        {existingImages.map((url) => (
          <div key={url} className="relative">
            <Image
              src={`https://oobokhduylbaaskwchph.supabase.co/storage/v1/object/public/rooms/${url}`}
              alt="Imagem do quarto"
              width={120}
              height={120}
              className="h-24 w-full object-cover rounded"
            />
            <Button
              type="button"
              onClick={() =>
                setExistingImages((prev) => prev.filter((img) => img !== url))
              }
              className="absolute top-1 right-1 bg-black/70 text-white text-xs px-2 rounded"
            >
              Remover
            </Button>
          </div>
        ))}
      </div>

      {/* Novas imagens */}
      <Input
        type="file"
        multiple
        accept="image/*"
        onChange={(e) =>
          setNewImages(Array.from(e.target.files ?? []))
        }
      />

      <Input name="title" defaultValue={room.title} />
      <Textarea name="description" defaultValue={room.description} />
      <Input name="price" type="number" defaultValue={room.price} />
      <Input name="capacity" type="number" defaultValue={room.capacity} />

      <div className="grid grid-cols-2 gap-2">
        <DialogClose asChild>
          <Button className="cursor-pointer" variant="destructive">Fechar</Button>
        </DialogClose>

        <Button type="submit" className="cursor-pointer" disabled={loadingEdit}>
          {loadingEdit ? (
            <span className="flex items-center gap-1">
              <Spinner /> Salvando...
            </span>
          ) : (
            "Salvar alterações"
          )}
        </Button>
      </div>
    </form>
  )
}
