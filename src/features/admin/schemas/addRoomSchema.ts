import z from "zod";

export const addRoomSchema = z.object({
  title: z.string().min(3, "Título muito curto"),
  description: z.string().min(10, "Descrição muito curta"),

  price: z.coerce
    .number({ error: "Preço é obrigatório" })
    .positive("Preço deve ser maior que 0"),

  capacity: z.coerce
    .number({ error: "Capacidade é obrigatória" })
    .int("Capacidade deve ser um número inteiro")
    .positive("Capacidade deve ser maior que 0"),

  images: z
    .any()
    .refine((files) => files?.length > 0, "Selecione ao menos uma imagem"),
});
