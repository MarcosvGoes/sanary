"use server"

import { auth } from "@/features/auth/auth"
import { headers } from "next/headers"
import { db } from "../../../../prisma"
import { editRoomSchema } from "../schemas/editRoomSchema"
import { supabase } from "@/shared/lib/createClientSupabase"

type UpdateRoomData = {
  title: string
  description: string
  price: number
  capacity: number
  keepImages: string[]
  newImages: File[]
}

export async function updateRoom(roomId: string, data: UpdateRoomData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.id !== "pv8fETHJNurooR2cx3Ju1ydLwmvsgRmG") {
    throw new Error("Unauthorized")
  }

  const parsed = editRoomSchema.parse(data)

  const room = await db.room.findUnique({
    where: { id: roomId },
    include: { images: true },
  })

  if (!room) throw new Error("Quarto não encontrado")

  /** 🔥 Remove apenas imagens deletadas */
  const imagesToDelete = room.images.filter(
    (img) => !data.keepImages.includes(img.url)
  )

  if (imagesToDelete.length) {
    await supabase.storage
      .from("rooms")
      .remove(imagesToDelete.map((img) => img.url))
  }

  /** ⬆️ Upload apenas das novas */
  const uploadedUrls: string[] = []

  for (const file of data.newImages) {
    const path = `${roomId}/${Date.now()}_${file.name}`
    const { error } = await supabase.storage
      .from("rooms")
      .upload(path, file)

    if (!error) uploadedUrls.push(path)
  }

  /** 🧠 Atualiza o banco */
  await db.room.update({
    where: { id: roomId },
    data: {
      title: parsed.title,
      description: parsed.description,
      price: parsed.price,
      capacity: parsed.capacity,
      images: {
        deleteMany: {
          url: { notIn: data.keepImages },
        },
        create: uploadedUrls.map((url) => ({ url })),
      },
    },
  })
}
