"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@radix-ui/react-accordion";
import { Beef, CookingPot, Tv, Users, Thermometer, Waves, Bed, Refrigerator } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/shared/components/ui/carousel";
import SocialButtonSignin from "@/features/auth/components/SocialButtonSignin";
import { getAllRooms } from "@/features/admin/actions/getAllRooms";
import { Card } from "@/shared/components/ui/card";
import Link from "next/link";
import { mobilePhone } from "@/shared/utils/contacts";

interface RoomImage {
  id: string;
  url: string;
}

interface Room {
  id: string;
  title: string;
  description?: string | null;
  features?: string[];
  images?: RoomImage[];
  airbnbUrl?: string;
}

function featureIcon(feature: string) {
  const f = feature.toLowerCase();
  if (f.startsWith("área")) return <Beef size={16} />;
  if (f.startsWith("coz")) return <CookingPot size={16} />;
  if (f.startsWith("tv") || f.startsWith("smart")) return <Tv size={16} />;
  if (f.startsWith("2")) return <Users size={16} />;
  if (f.startsWith("ar") || f.startsWith("clima")) return <Thermometer size={16} />;
  if (f.startsWith("sacada ampla") || f.startsWith("vista para")) return <Waves size={16} />;
  if (f.startsWith("suíte")) return <Bed size={16} />;
  if (f.startsWith("frigobar")) return <Refrigerator size={16} />;
  return <span className="w-4" />;
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRooms() {
      try {
        const data = await getAllRooms();
        setRooms(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchRooms();
  }, []);

  if (loading) return <p className="text-center mt-10">Carregando quartos...</p>;

  if (rooms.length === 0)
    return <p className="text-center mt-10 text-[#14274A]/70">Nenhum quarto disponível no momento.</p>;

  return (
    <main className="min-h-screen py-5 flex flex-col items-center gap-10 lg:py-10 max-w-[95%] lg:max-w-[1200px] mx-auto w-full">
      <div className="text-center gap-4 grid">
        <h1 className="text-xl lg:text-3xl font-semibold">Nossos quartos</h1>
        <p className="text-base font-medium">Todos os quartos são suítes climatizadas com cama de casal, chuveiro eletrônico e vista para o mar.</p>
      </div>
      {rooms.map((room) => (
        <Card
          key={room.id}
          className="shadow-lg w-full py-0 rounded-md gap-0 max-w-[800px] overflow-hidden bg-white/10 backdrop-blur-md"
        >
          <Carousel className="w-full">
            <CarouselContent>
              {room.images?.length ? (
                room.images.map((img) => (
                  <CarouselItem key={img.id}>
                    <div className="relative w-full aspect-video">
                      <Image
                        src={`https://oobokhduylbaaskwchph.supabase.co/storage/v1/object/public/rooms/${img.url}`}
                        alt={room.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </CarouselItem>
                ))
              ) : (
                <div className="w-full aspect-video flex items-center justify-center bg-gray-200">
                  <span className="text-gray-500">Sem imagens</span>
                </div>
              )}
            </CarouselContent>

            <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow" />
            <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow" />
          </Carousel>

          <div className="text-center py-3">
            <h2 className="font-medium text-base">{room.title}</h2>
          </div>
          {room.description && <p className=" px-5 py-3 text-sm md:text-base">{room.description}</p>}

          <div className="p-2">
            <div className="mt-4 mx-auto grid md:grid-cols-2 gap-2">
              <Link
                target="_blank"
                href={`https://wa.me/55${mobilePhone}`}
                className="cursor-pointer"
              >
                <Button className="text-sm py-4.5 border-2 w-full cursor-pointer" variant={"outline"}>
                  Entrar em contato
                </Button>
              </Link>
              <SocialButtonSignin classNameLogged="bg-[#14274A] text-white text-sm rounded-md max-w-full" classNameNotLogged="bg-[#14274A] text-lg rounded-md max-w-full text-white" />
            </div>
          </div>
        </Card>
      ))}
    </main>
  );
}
