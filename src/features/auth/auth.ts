import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { db } from "../../../prisma";

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),

  socialProviders: {
    google: {
      prompt: "select_account",
      clientId: `${process.env.GOOGLE_CLIENT_ID }`,
      clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
    }
  },

  user: {
    deleteUser: {
      enabled: true,
    },
    additionalFields: {
      phoneNumber: {
        type: "string",
        required: false,
      },
      email: {
        type: "string",
        required: true,
      },
      cpf: {
        type: "string",
        required: false,
      },
      documentType: {
        type: "string",
        required: false,
      },
      documentNumber: {
        type: "string",
        required: false,
      },
      ufEmitter: {
        type: "string",
        required: false,
      },
      nacionality: {
        type: "string",
        required: false,
      },
      birthDate: {
        type: "date",
        required: false,
      },
      cep: {
        type: "string",
        required: false,
      },
      street: {
        type: "string",
        required: false,
      },
      houseNumber: {
        type: "string",
        required: false,
      },
      complement: {
        type: "string",
        required: false,
      },
      neighborhood: {
        type: "string",
        required: false,
      },
      city: {
        type: "string",
        required: false,
      },
      state: {
        type: "string",
        required: false,
      },
    },
    changeEmail: {
      enabled: true,
      requireVerification: true,
    },
  },

  plugins: [nextCookies()],
});
