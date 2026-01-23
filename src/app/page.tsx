import { logoFont } from "./layout";
import { Metadata } from "next";
import { HomeCarousel } from "@/shared/components/HomeCarousel/HomeCarousel";
import { TourismCarousel } from "@/shared/components/TourismCarousel/TourismCarousel";
import SocialButtonSignin from "@/features/auth/components/SocialButtonSignin";

export const metadata: Metadata = {
  title: "Pousada Riviera Sanary",
  description: "Pousada Riviera Sanary",
};

export default function Home() {
  return (
    <main>
      <section className="relative bg-[url(/assets/images/hero-bg-one.jpg)] bg-cover h-[30vh] md:h-[40vh] my-2 lg:my-10 mx-3 md:mx-10 z-40 rounded-3xl">
        <div className="absolute inset-0 bg-black/50 rounded-3xl" />
        <div className="max-w-[90%] mx-auto relative z-10 h-full flex flex-col justify-center items-center">
          <h1 className={`text-white text-2xl font-extrabold text-center ${logoFont.className}`}>
            Pousada Riviera Sanary
          </h1>
          <span className="font-semibold text-white text-center text-sm flex justify-center mt-2 ">
            Agende já sua estadia e viva momentos inesquecíveis à beira-mar!
          </span>

          {/* Aqui forçamos o botão a ficar sobreposto */}
        </div>
      </section>
        <SocialButtonSignin />


      <section className="mx-3 mt-10 md:mt-20 md:gap-5 flex flex-col max-w-[1000px] max-h-[800px] md:mx-auto">
        <h1 className="text-center mt-10 mb-5 text-xl md:text-3xl font-semibold">Conheça nossas instalações</h1>
        <HomeCarousel />
      </section>

      <section className="mx-3 mt-10 md:mt-20 md:gap-5 mb-10 flex flex-col max-w-[1000px] max-h-[800px] md:mx-auto">
        <h1 className="text-center mt-10 mb-5 text-xl md:text-3xl font-semibold">Destinos populares</h1>
        <TourismCarousel />
      </section>
    </main>
  );
}