"use server"

import { auth } from "@/features/auth/auth"
import { headers } from "next/headers"
import { randomUUID } from "crypto"
import { db } from "../../../../prisma"
import { roomSchema } from "../schemas/addRoomSchema"
import { supabase } from "@/shared/lib/createClientSupabase"

export async function addRoom(formData: FormData) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.id !== "pv8fETHJNurooR2cx3Ju1ydLwmvsgRmG") {
    throw new Error("Unauthorized")
  }

  const data = {
    title: formData.get("title"),
    description: formData.get("description"),
    price: Number(formData.get("price")),
    capacity: Number(formData.get("capacity")),
    images: formData.getAll("images"),
  }

  const parsed = roomSchema.safeParse(data)
  if (!parsed.success) {
    throw new Error("Dados inválidos")
  }

  const room = await db.room.create({
    data: {
      title: parsed.data.title,
      description: parsed.data.description,
      price: parsed.data.price,
      capacity: parsed.data.capacity,
    },
  })

  for (const file of parsed.data.images) {
    const filename = `${room.id}/${randomUUID()}.jpg`

    const { error } = await supabase.storage
      .from("rooms")
      .upload(filename, file, {
        contentType: file.type,
      })

    if (error) {
      throw new Error("Erro ao subir imagem")
    }

    const { data: publicUrl } = supabase.storage
      .from("rooms")
      .getPublicUrl(filename)

    await db.roomImage.create({
      data: {
        roomId: room.id,
        url: publicUrl.publicUrl,
      },
    })
  }

  return room
}
