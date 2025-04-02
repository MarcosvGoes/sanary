import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="relative">
      <div className="relative h-screen">
        <div
          className="absolute inset-0 bg-[url(/assets/nova-almeida2.jpg)] bg-center bg-cover"
          style={{
            filter: "brightness(0.6)"
          }}
        />

        <div className="absolute inset-0 bg-black/30" />

        <section className="max-w-[80%] mx-auto relative z-10 h-full flex flex-col justify-center py-40">
          <div className="text-muted">
            <h3 className="font-medium text-3xl">BEM VINDO A</h3>
            <h2 className="font-bold text-4xl">POUSADA</h2>
            <h1 className="font-semibold text-4xl">SANARY</h1>
          </div>

          <div className="mt-5 grid">
            <span className="text-muted font-semibold text-base">
              Agende já sua estadia e viva<br /> momentos inesquecíveis <br /> à beira-mar!
            </span>
            <Button className="w-40 mx-auto mt-10 font-semibold" variant={"secondary"}>
              <Link href="/rooms">
              RESERVA AGORA
              </Link>
            </Button>
          </div>
        </section>
      </div>

      <section className="max-w-[90%] mx-auto bg-background relative z-20 -mt-10 my-10 grid gap-10">
        <div className="grid grid-cols-1 md:grid-cols-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] min-h-[200px]">
          <div className="p-4 flex flex-col justify-center">
            <h1 className="text-lg font-bold mb-2">Quartos completos</h1>
            <p className="text-sm font-medium">Suítes climatizadas, com TV smart, chuveiro eletrônico, camas de alta qualidade e com vista para o mar.</p>
          </div>
          <div className="relative aspect-square">
            <Image
              fill
              alt="image room"
              src="/assets/room.png"
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 shadow-[0_3px_10px_rgb(0,0,0,0.2)] min-h-[200px]">
          <div className="p-4 flex flex-col justify-center order-2 md:order-1">
            <h1 className="text-lg font-bold mb-2">Experiência Litorânea</h1>
            <p className="text-sm font-medium">Encante-se com praias e falésias paradisíacas, restaurantes com sabor local de tirar o fôlego.</p>
          </div>
          <div className="relative aspect-square order-1 md:order-2">
            <Image
              fill
              alt="Vista das falésias e praia da região"
              src="/assets/falesias.webp"
              className="object-cover"
            />
          </div>
        </div>
      </section>
    </main>
  );
}