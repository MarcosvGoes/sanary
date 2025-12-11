"use client";

import Image from "next/image";

const facilitiesData = [
  {
    image: "/assets/images/room.png",
    title: "Conforto e privacidade",
    paragraphs: [
      "Nossos quartos são suítes privativas, garantindo conforto e privacidade. Cada acomodação conta com ar-condicionado, cama de casal confortável e chuveiro eletrônico para ajuste preciso da temperatura.",
      "Além disso, todos os quartos oferecem uma bela vista para o mar. Há ainda a possibilidade de adicionar uma cama extra por quarto, ideal para famílias ou grupos."
    ]
  },
  {
    image: "/assets/images/litoral.webp",
    title: "Natureza ao seu redor",
    paragraphs: [
      "Nossa localização é privilegiada, cercada por praias paradisíacas, com falésias esculpidas pelo tempo oferecendo um cenário deslumbrante e perfeito para belas fotos.",
      "Além do litoral, a região conta com rios de águas tranquilas, ideais para passeios relaxantes e contato direto com a natureza."
    ]
  }
];

export default function Facilities() {
  return (
    <main className="min-h-screen py-24 md:py-32 lg:py-40 max-w-6xl mx-auto px-6">
      <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-center mb-14 tracking-tight">
        Nossas Instalações
      </h1>

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {facilitiesData.map((item, i) => (
          <div
            key={i}
            className="rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.1)] bg-white overflow-hidden hover:shadow-[0_8px_25px_rgba(0,0,0,0.15)] transition-all"
          >
            <div className="relative w-full h-64 md:h-72">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6 space-y-3 text-sm md:text-base leading-relaxed">
              <h2 className="text-lg md:text-xl font-semibold mb-1">
                {item.title}
              </h2>
              {item.paragraphs.map((p, j) => (
                <p key={j}>{p}</p>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
