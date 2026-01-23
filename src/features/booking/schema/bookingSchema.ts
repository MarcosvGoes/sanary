import { Countrys } from "@/shared/utils/countrys";
import { z } from "zod";

export const bookingSchema = z.object({
  checkIn: z.coerce.date({ error: "Campo obrigatório" }).min(1),
  checkOut: z.coerce.date({ error: "Campo obrigatório" }).min(1),

  notes: z.string().optional(),

  roomId: z.string(),

  guests: z
    .array(
      z.object({
        name: z.string().min(1, { error: "Campo obrigatório" }),
        cpf: z
          .string({ error: "Campo obrigatório" })
          .length(11, { error: "Mínimo de 11 caracteres" }),
        birthDate: z.coerce.date({ error: "Campo obrigatório" }),
        type: z.enum(["adult", "elderly", "child", "baby"]),
      }),
    )
    .min(1),

  user: z.object({
    name: z
      .string({ error: "Campo obrigatório" })
      .min(1, { error: "Campo obrigatório" }),
    email: z
      .string({ error: "Campo obrigatório" })
      .email({ error: "Campo obrigatório" }),
    phoneNumber: z.string({ error: "Campo obrigatório" }).min(8),
    cpf: z
      .string({ error: "Campo obrigatório" })
      .length(11, { error: "Mínimo de 11 caracteres" }),

    documentNumber: z.string({ error: "Campo obrigatório" }),
    documentType: z.string({ error: "Campo obrigatório" }),
    ufEmitter: z.string({ error: "Campo obrigatório" }),

    cep: z.string({ error: "Campo obrigatório" }),
    street: z.string({ error: "Campo obrigatório" }),
    houseNumber: z.string({ error: "Campo obrigatório" }),
    complement: z.string({ error: "Campo obrigatório" }),
    neighborhood: z.string({ error: "Campo obrigatório" }),
    city: z.string({ error: "Campo obrigatório" }),
    state: z.string({ error: "Campo obrigatório" }),

    birthDate: z.coerce.date({ error: "Campo obrigatório" }),
    nacionality: z.string().refine((val) => Countrys.includes(val), {
      error: "Nacionalidade inválida",
    }),
  }),
});

export type CreateBookInput = Omit<BookingSchema, "checkIn" | "checkOut"> & {
  checkIn: Date;
  checkOut: Date;
};

export type BookingSchema = z.infer<typeof bookingSchema>;

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
] as const;
