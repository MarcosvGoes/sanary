"use server";

import { auth } from "@/features/auth/auth";
import { headers } from "next/headers";
import { db } from "../../../../prisma";
import { editRoomSchema } from "../schemas/editRoomSchema";
import { supabase } from "@/shared/lib/createClientSupabase";

export async function updateRoom(roomId: string, data: any) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.id !== "pv8fETHJNurooR2cx3Ju1ydLwmvsgRmG") {
    throw new Error("Unauthorized");
  }

  const parsed = editRoomSchema.parse(data);

  const newImages: File[] = data.images || [];

  const room = await db.room.findUnique({
    where: { id: roomId },
    select: { images: true },
  });

  if (!room) throw new Error("Quarto não encontrado");

  if (room.images?.length) {
    const pathsToDelete = room.images.map((img) => img.url);
    await supabase.storage.from("rooms").remove(pathsToDelete);
  }

  const uploadedPaths: string[] = [];
  for (const file of newImages) {
    const filePath = `${roomId}/${Date.now()}_${file.name}`;
    const { error } = await supabase.storage
      .from("rooms")
      .upload(filePath, file);

    if (error) {
      console.error("Erro upload imagem:", error);
      continue;
    }

    uploadedPaths.push(filePath);
  }

  await db.room.update({
    where: { id: roomId },
    data: {
      ...parsed,
      images: {
        deleteMany: {},
        create: uploadedPaths.map((url) => ({ url })),
      },
    },
  });
}
