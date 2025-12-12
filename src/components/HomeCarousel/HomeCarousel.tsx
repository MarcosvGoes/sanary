'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

export function HomeCarousel() {
  const [emblaRef] = useEmblaCarousel(
    {
      loop: true,
      align: 'start',
    },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  )

  return (
    <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
      <div className="flex">
        <div className="min-w-full flex-shrink-0">
          <div className="relative h-[40vh] md:h-[60vh]">
            <Image
              fill
              src="/assets/images/room-img1.jpeg"
              alt="Quarto com vista para o mar"
              className="w-full h-full object-cover object-[50%_25%]"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white flex flex-col justify-between h-full py-5">
                <h2 className="text-2xl md:text-4xl font-semibold">
                  Vista para o mar
                </h2>
                <p className="text-xs">Conforto e natureza em um só lugar</p>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-full flex-shrink-0">
          <div className="relative h-[40vh] md:h-[60vh]">
            <Image
              fill
              src="/assets/images/room-img2.jpeg"
              alt="Quarto com vista para o mar"
              className="w-full h-full object-cover object-[50%_35%]"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white flex flex-col justify-between h-full py-5">
                <h2 className="text-2xl md:text-4xl font-semibold">
                  Segurança e conforto
                </h2>
                <p className="text-xs">Trancas eletrônicas e TV's smart</p>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-full flex-shrink-0">
          <div className="relative h-[40vh] md:h-[60vh]">
            <Image
              fill
              src="/assets/images/room-img3.jpeg"
              alt="Quarto com vista para o mar"
              className="w-full h-full object-cover object-[50%_25%]"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white flex flex-col justify-between h-full py-5">
                <h2 className="text-2xl md:text-4xl font-semibold">
                  Climatização
                </h2>
                <p className="text-xs">Todos os quartos são climatizados</p>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-full flex-shrink-0">
          <div className="relative h-[40vh] md:h-[60vh]">
            <Image
              fill
              src="/assets/images/room-img4.jpeg"
              alt="Quarto com vista para o mar"
              className="w-full h-full object-cover object-[50%_65%]"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white flex flex-col justify-between h-full py-5">
                <h2 className="text-2xl md:text-4xl font-semibold">
                  Tudo que você precisa
                </h2>
                <p className="text-xs">Todos os quartos contam com frigobar e mesa</p>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-full flex-shrink-0">
          <div className="relative h-[40vh] md:h-[60vh]">
            <Image
              fill
              src="/assets/images/room-img5.jpeg"
              alt="Quarto com vista para o mar"
              className="w-full h-full object-cover object-[50%_65%]"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white flex flex-col justify-between h-full py-5">
                <h2 className="text-2xl md:text-4xl font-semibold">
                  Organização para você
                </h2>
                <p className="text-xs">Todos os quartos contam com cabideiro e <br /> suporte para roupas</p>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-full flex-shrink-0">
          <div className="relative h-[40vh] md:h-[60vh]">
            <Image
              fill
              src="/assets/images/room-img6.jpeg"
              alt="Quarto com vista para o mar"
              className="w-full h-full object-cover object-[50%_65%]"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white flex flex-col justify-between h-full py-5">
                <h2 className="text-2xl md:text-4xl font-semibold">
                  Camas confortáveis
                </h2>
                <p className="text-xs">Todos os quartos contam com camas king size <br /> lençóis da mais alta qualidade, criado-mudo e cabeceira</p>
              </div>
            </div>
          </div>
        </div>

        <div className="min-w-full flex-shrink-0">
          <div className="relative h-[40vh] md:h-[60vh]">
            <Image
              fill
              src="/assets/images/room-img7.jpeg"
              alt="Quarto com vista para o mar"
              className="w-full h-full object-cover object-[50%_65%]"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <div className="text-center text-white flex flex-col justify-between h-full py-5">
                <h2 className="text-2xl md:text-4xl font-semibold">
                  Banheiros completos
                </h2>
                <p className="text-xs">Todos os quartos contam com banheiros completos<br />com chuveiro eletrônico, ducha higiênica,<br />torneira eletrônica, e muito mais</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}