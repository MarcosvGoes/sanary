import { z } from "zod"

export const editRoomSchema = z.object({
  title: z.string().min(3),
  description: z.string().min(10),
  price: z.number().positive(),
  capacity: z.number().int().positive(),
})

export type EditRoomSchema = z.infer<typeof editRoomSchema>
