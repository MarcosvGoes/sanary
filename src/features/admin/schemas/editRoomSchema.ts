import { z } from "zod"

export const editRoomSchema = z
  .object({
    title: z.string().min(3, "Título muito curto"),
    description: z.string().min(10, "Descrição muito curta"),
    price: z.number().positive("Preço inválido"),
    capacity: z.number().int().positive("Capacidade inválida"),

    keepImages: z.array(z.string()).optional(),
    newImages: z.array(z.any()).optional(),
  })
  .refine(
    (data) =>
      (data.keepImages?.length ?? 0) + (data.newImages?.length ?? 0) > 0,
    {
      message: "Selecione ao menos uma imagem",
      path: ["images"],
    }
  )
