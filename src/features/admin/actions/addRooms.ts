"use server";

import { auth } from "@/features/auth/auth";
import { headers } from "next/headers";
import { db } from "../../../../prisma";
import { supabase } from "@/shared/lib/createClientSupabase";

export async function addRoom(data: {
  title: string;
  description?: string;
  price: number;
  capacity: number;
  images: string[];
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session || session.user.id !== "pv8fETHJNurooR2cx3Ju1ydLwmvsgRmG") {
    throw new Error("Unauthorized");
  }

  return db.room.create({
    data: {
      title: data.title,
      description: data.description,
      price: data.price,
      capacity: data.capacity,
      images: {
        create: data.images.map((path) => ({
          url: path,
        })),
      },
    },
  });
}

export async function uploadImages(files: File[], roomId: string) {
  const paths: string[] = [];

  for (const file of files) {
    const filePath = `${roomId}/${crypto.randomUUID()}.${file.type.split("/")[1]}`;

    const { error } = await supabase.storage
      .from("rooms")
      .upload(filePath, file, {
        contentType: file.type,
      });

    if (error) throw error;

    paths.push(filePath);
  }

  return paths;
}
