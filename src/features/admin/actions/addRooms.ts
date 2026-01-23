"use server"

import { auth } from "@/features/auth/auth"
import { headers } from "next/headers"
import { db } from "../../../../prisma"
import { supabase } from "@/shared/lib/createClientSupabase"

export async function addRoom(data: {
  title: string
  description?: string
  price: number
  capacity: number
  images: string[]
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.id !== "pv8fETHJNurooR2cx3Ju1ydLwmvsgRmG") {
    throw new Error("Unauthorized")
  }

  return db.room.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      capacity: data.capacity,
      images: {
        createMany: {
          data: data.images.map((url) => ({ url })),
        },
      },
    },
  })
}


export async function uploadImages(files: File[], roomId: string) {
  const urls: string[] = []

  for (const file of files) {
    const filename = `${roomId}/${crypto.randomUUID()}.${file.type.split("/")[1]}`

    const { error } = await supabase.storage
      .from("rooms")
      .upload(filename, file, {
        contentType: file.type,
      })

    if (error) throw error

    const { data } = supabase.storage
      .from("rooms")
      .getPublicUrl(filename)

    urls.push(data.publicUrl)
  }

  return urls
}
