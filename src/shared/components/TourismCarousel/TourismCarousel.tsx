'use client'

import React from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import Image from 'next/image'

export function TourismCarousel() {
    const [emblaRef] = useEmblaCarousel(
        {
            loop: true,
            align: 'start',
        },
        [Autoplay({ delay: 6000, stopOnInteraction: false })]
    )

    return (
        <div className="overflow-hidden rounded-3xl" ref={emblaRef}>
            <div className="flex">
                <div className="min-w-full flex-shrink-0">
                    <div className="relative h-[40vh] md:h-[60vh]">
                        <Image
                            fill
                            src="/assets/images/tourism-1.webp"
                            alt="Quarto com vista para o mar"
                            className="w-full h-full object-cover object-[50%_25%]"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="text-center text-white flex flex-col justify-between h-full py-5">
                                <h2 className="text-2xl md:text-4xl font-semibold">
                                    Igreja reis magos
                                </h2>
                                <p className="text-xs">A Igreja dos Reis Magos, localizada em Nova Almeida (ES), foi construída entre 1580 e 1615 pelos jesuítas com ajuda dos índios tupiniquins.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="min-w-full flex-shrink-0">
                    <div className="relative h-[40vh] md:h-[60vh]">
                        <Image
                            fill
                            src="/assets/images/hero-bg-one.jpg"
                            alt="Quarto com vista para o mar"
                            className="w-full h-full object-cover object-[50%_35%]"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="text-center text-white flex flex-col justify-between h-full py-5">
                                <h2 className="text-2xl md:text-4xl font-semibold">
                                    Vitória, ES
                                </h2>
                                <p className="text-xs">Aproveite tudo que uma das maiores capitais do Brasil tem a oferecer. Passeios de barco, shoppings, praias e muito mais!</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="min-w-full flex-shrink-0">
                    <div className="relative h-[40vh] md:h-[60vh]">
                        <Image
                            fill
                            src="/assets/images/tourism-2.jpg"
                            alt="Quarto com vista para o mar"
                            className="w-full h-full object-cover object-[50%_25%]"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <div className="text-center text-white flex flex-col justify-between h-full py-5">
                                <h2 className="text-2xl md:text-4xl font-semibold">
                                    Praias incríveis
                                </h2>
                                <p className="text-xs">Diversas praias em diversas cidades e bairros, todas excelentes, seja bicanga, seja praia grande, ou qualquer outra</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}