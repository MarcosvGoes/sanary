"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Beef, CookingPot, Tv, Users, Thermometer, Waves, Bed, Refrigerator } from "lucide-react";
import { mobilePhone } from "@/utils/contacts";

const roomsData = [
  {
    id: "cobertura",
    title: "Cobertura",
    subtitle: "Suíte com vista panorâmica",
    images: [
      "/assets/rooms/cobertura/cobertura.avif",
      "/assets/rooms/cobertura/cobertura-2.avif",
      "/assets/rooms/cobertura/cobertura-3.avif",
    ],
    features: ["2 pessoas", "Área de churrasco", "Sacada ampla", "Cozinha completa", "Climatizado", "Suíte"],
    whatsappMessage: "Olá! Gostaria de reservar a cobertura.",
    airbnbUrl: "https://airbnb.com.br",
  },
  {
    id: "1203",
    title: "1203 - Serra",
    subtitle: "Quarto casal com vista privilegiada",
    images: [
      "/assets/rooms/room.png",
      "/assets/rooms/room-2.png",
      "/assets/rooms/room-3.png",
    ],
    features: ["2 pessoas", "Climatizado", "Suíte", "Vista para o mar", "Frigobar", "TV Smart"],
    whatsappMessage: "Olá! Gostaria de reservar o quarto 1203 - Serra.",
    airbnbUrl: "https://airbnb.com.br",
  },
  {
    id: "1204",
    title: "1204 - Guarapari",
    subtitle: "Aconchegante e iluminado",
    images: [
      "/assets/rooms/guarapari/guarapari1.jpeg",
      "/assets/rooms/room.png",
      "/assets/rooms/room.png",
    ],
    features: ["2 pessoas", "Climatizado", "Suíte", "Vista para o mar", "Frigobar", "TV Smart"],
    whatsappMessage: "Olá! Gostaria de reservar o quarto 1204 - Guarapari.",
    airbnbUrl: "https://airbnb.com.br",
  },
  {
    id: "1205",
    title: "1205 - Vitória",
    subtitle: "Moderno e confortável",
    images: [
      "/assets/rooms/room.png",
      "/assets/rooms/room-2.png",
      "/assets/rooms/room-3.png",
    ],
    features: ["2 pessoas", "Climatizado", "Suíte", "Frigobar", "TV Smart", "Vista parcial do mar"],
    whatsappMessage: "Olá! Gostaria de reservar o quarto 1205 - Vitória.",
    airbnbUrl: "https://airbnb.com.br",
  },
  {
    id: "1206",
    title: "1206 - Anchieta",
    subtitle: "Perfeito para casal",
    images: [
      "/assets/rooms/room.png",
      "/assets/rooms/room-2.png",
    ],
    features: ["2 pessoas", "Suíte", "Ar condicionado", "Frigobar"],
    whatsappMessage: "Olá! Gostaria de reservar o quarto 1206 - Anchieta.",
    airbnbUrl: "https://airbnb.com.br",
  },
  {
    id: "1210",
    title: "1210 - Meaípe",
    subtitle: "Amplo e confortável",
    images: [
      "/assets/rooms/room.png",
      "/assets/rooms/room-3.png",
    ],
    features: ["2 pessoas", "Climatizado", "TV Smart", "Frigobar"],
    whatsappMessage: "Olá! Gostaria de reservar o quarto 1210 - Meaípe.",
    airbnbUrl: "https://airbnb.com.br",
  },
  {
    id: "1211",
    title: "1211 - Itapoã",
    subtitle: "Elegante e funcional",
    images: [
      "/assets/rooms/room-2.png",
      "/assets/rooms/room-3.png",
    ],
    features: ["2 pessoas", "Ar condicionado", "TV Smart"],
    whatsappMessage: "Olá! Gostaria de reservar o quarto 1211 - Itapoã.",
    airbnbUrl: "https://airbnb.com.br",
  },
  {
    id: "1212",
    title: "1212 - Camburi",
    subtitle: "Ambiente climatizado e moderno",
    images: [
      "/assets/rooms/room.png",
      "/assets/rooms/room-2.png",
    ],
    features: ["2 pessoas", "Climatizado", "Suíte", "Frigobar"],
    whatsappMessage: "Olá! Gostaria de reservar o quarto 1212 - Camburi.",
    airbnbUrl: "https://airbnb.com.br",
  },
];

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

function RoomCard({ room }: { room: (typeof roomsData)[0] }) {
  return (
    <div className="shadow-[0_3px_10px_rgba(20,39,74,0.12)] w-full mt-10 rounded-md max-w-[800px] overflow-hidden bg-white/5">
      <Carousel>
        <CarouselContent>
          {room.images.map((src, i) => (
            <CarouselItem key={src + i} className="relative w-full h-[300px] md:h-[500px]">
              <Image src={src} alt={room.title} className="object-cover" fill />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="ml-14" />
        <CarouselNext className="mr-14" />
      </Carousel>

      <div className="bg-[#14274A] text-center py-2">
        <h2 className="text-white font-bold text-xl">{room.title}</h2>
        {room.subtitle && <p className="text-white/80 text-xs">{room.subtitle}</p>}
      </div>

      <div className="px-5 py-4">
        <Accordion type="single" collapsible>
          <AccordionItem value="details">
            <AccordionTrigger>Detalhes do quarto</AccordionTrigger>
            <AccordionContent>
              <div className="grid gap-2">
                {room.features.map((f, i) => (
                  <span key={i} className="flex items-center gap-2 text-sm font-semibold">
                    {featureIcon(f)} {f}
                  </span>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="grid grid-cols-2 gap-3 mt-4">
          <Button variant="outline">
            <Link
              href={`tel:${mobilePhone}`}
              target="_blank"
              className="w-full flex gap-2 items-center justify-center"
            >
              <i className="uil uil-whatsapp" /> Reservar
            </Link>
          </Button>

          <Button variant="link" className="text-[#FF5252]">
            <Link href={room.airbnbUrl} target="_blank" className="flex gap-2">
              <Image src="/assets/icones/airbnb-color.svg" alt="Airbnb" width={16} height={16} />
              Airbnb
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen py-32 flex flex-col items-center gap-10 max-w-[95%] lg:max-w-[1200px] mx-auto w-full">
      <div className="lg:px-20 p-5 text-center max-w-[900px]">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">Nossos quartos</h1>
        <p className="text-xs md:text-sm lg:text-base font-medium mt-3">
          Todos os quartos são suítes climatizadas com cama de casal, chuveiro eletrônico e vista para o mar.
          As reservas também podem ser feitas via Airbnb.
        </p>
      </div>

      {roomsData.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
    </main>
  );
}
