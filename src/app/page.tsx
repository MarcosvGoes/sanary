import { Button } from "@/components/ui/button";
import { mobilePhone } from "@/utils/contacts";
import Image from "next/image";
import Link from "next/link";
import { logoFont } from "./layout";
import { HomeCarousel } from "@/components/HomeCarousel/HomeCarousel";
import { TourismCarousel } from "@/components/TourismCarousel/TourismCarousel";

export default function Home() {
  return (
    <main>
      <section className="relative bg-[url(/assets/images/hero-bg-one.jpg)] bg-cover h-[30vh] md:h-[40vh] my-2 lg:my-10 mx-3 md:mx-10 rounded-3xl">
        <div className="absolute inset-0 bg-black/50 rounded-3xl" />
        <div className="max-w-[90%] mx-auto relative z-10 h-full flex flex-col justify-center">
          <h1 className={`text-white text-2xl font-extrabold text-center ${logoFont.className}`}>Pousada Riviera Sanary</h1>
          <span className="font-semibold text-white text-center text-sm flex justify-center mt-2 ">
            Agende já sua estadia e viva momentos inesquecíveis à beira-mar!
          </span>

        </div>
        <div className="flex justify-center z-50 -mt-6 relative">
          <Link href="https://airbnb.com.br" target="_blank">
            <Button className="cursor-pointer items-center border-r-none rounded-l-full py-5 md:p-6 border-black" variant={"outline"}>
              <p>RESERVAR</p> <Image src="/assets/icones/airbnb-color.svg" alt="logo airbnb" width={20} height={20} />
            </Button>
          </Link>
          <Link target="_blank" href={`https://wa.me/55${mobilePhone}?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informações.`}>
            <Button className="cursor-pointer items-center border-l-none rounded-r-full py-5 md:p-6 border-black" variant={"outline"}>
              <p>RESERVAR</p> <i className="uil uil-whatsapp text-green-600 text-xl" />
            </Button>
          </Link>
        </div>
      </section>

      <section className="mx-3 mt-10 md:mt-20 md:gap-5 flex flex-col max-w-[1000px] max-h-[800px] md:mx-auto">
        <h1 className="text-center mt-10 mb-5 text-xl md:text-3xl font-semibold">Conheça nossas instalações</h1>
        <HomeCarousel />
      </section>

      <section className="mx-3 mt-10 md:mt-20 md:gap-5 md:mb-10 flex flex-col max-w-[1000px] max-h-[800px] md:mx-auto">
        <h1 className="text-center mt-10 mb-5 text-xl md:text-3xl font-semibold">Destinos populares</h1>
        <TourismCarousel />
      </section>
    </main>
  );
}