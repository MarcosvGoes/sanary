import { z } from "zod"

export const bookingSchema = z.object({
  checkIn: z.coerce.date().min(1),
  checkOut: z.coerce.date().min(1),

  notes: z.string().optional(),

  guests: z.array(
    z.object({
      name: z.string().min(1),
      cpf: z.string().length(11),
      birthDate: z.string().optional(),
      type: z.enum(["adult", "elderly", "child", "baby"]),
    })
  ).min(1),

  user: z.object({
    name: z.string().min(1),
    email: z.string().email(),
    phoneNumber: z.string().min(8),
    cpf: z.string().length(11),

    documentNumber: z.string().optional(),
    documentType: z.string().optional(),
    ufEmitter: z.string().optional(),

    cep: z.string().optional(),
    street: z.string().optional(),
    number: z.string().optional(),
    complement: z.string().optional(),
    neighborhood: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),

    birthDate: z.string().optional(),
  }),
})

export type CreateBookInput = Omit<BookingSchema, "checkIn" | "checkOut"> & {
  checkIn: Date
  checkOut: Date
}


export type BookingSchema = z.infer<typeof bookingSchema>


export const userFields = [
  ["name", "Nome completo"],
  ["email", "Email"],
  ["phoneNumber", "Telefone"],
  ["cpf", "CPF"],
  ["documentNumber", "Documento"],
  ["documentType", "Tipo de documento"],
  ["ufEmitter", "UF emissor"],
  ["cep", "CEP"],
  ["street", "Rua"],
  ["number", "Número"],
  ["complement", "Complemento"],
  ["neighborhood", "Bairro"],
  ["city", "Cidade"],
  ["state", "Estado"],
  ["birthDate", "Data de nascimento", "date"],
] as const
