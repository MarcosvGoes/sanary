"use server"

import { db } from "../../../../prisma"

export async function getAllRooms() {
  const rooms = await db.room.findMany({
    include: {
      images: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return rooms
}
