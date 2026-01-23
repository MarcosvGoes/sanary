"use server";

import { auth } from "@/features/auth/auth";
import { headers } from "next/headers";
import { db } from "../../../../prisma";
import { Prisma } from "@/prisma/generated/prisma/client";

export async function deleteRoom(roomId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.id !== "pv8fETHJNurooR2cx3Ju1ydLwmvsgRmG") {
    throw new Error("Unauthorized");
  }

  try {
    await db.room.delete({
      where: { id: roomId },
    });
  } catch (error: any) {
    if (
      error instanceof Prisma.PrismaClientKnownRequestError &&
      error.code === "P2003"
    ) {
      console.error(
        "Não foi possível deletar: existe reserva vinculada ao quarto",
        error.meta,
      );
      throw new Error(
        "Não é possível deletar este quarto, pois há reservas associadas.",
      );
    }

    console.error("Erro ao deletar quarto:", error);
    throw new Error("Erro ao deletar quarto");
  }
}
