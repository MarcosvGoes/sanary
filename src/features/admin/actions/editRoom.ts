"use server"

import { auth } from "@/features/auth/auth"
import { headers } from "next/headers"
import { db } from "../../../../prisma"
import { editRoomSchema } from "../schemas/editRoomSchema"

export async function updateRoom(roomId: string, data: unknown) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session || session.user.id !== "pv8fETHJNurooR2cx3Ju1ydLwmvsgRmG") {
    throw new Error("Unauthorized")
  }

  const parsed = editRoomSchema.parse(data)

  await db.room.update({
    where: { id: roomId },
    data: parsed,
  })
}
