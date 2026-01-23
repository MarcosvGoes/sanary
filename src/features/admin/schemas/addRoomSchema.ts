import { z } from "zod"

export const roomSchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  description: z.string().min(10, "Descrição muito curta"),
  price: z.number().positive(),
  capacity: z.number().int().positive(),
  images: z
    .array(z.instanceof(File))
    .min(1, "Envie pelo menos uma imagem")
    .max(10, "Máximo de 10 imagens"),
})

export type RoomSchema = z.infer<typeof roomSchema>
