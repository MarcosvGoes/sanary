import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Beef, CookingPot, User } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Rooms() {
    return (
        <main className="min-h-screen py-32 max-w-[80%] mx-auto">
            <div>
                <h1 className="text-3xl font-bold text-center">Nossos quartos</h1>
                <p className="text-xs font-medium text-center mt-4">Nossos quartos são suítes aconchegantes, climatizadas e equipadas com cama de casal e chuveiro eletrônico. Todos quartos contam com uma vista deslumbrante para o mar. Para maior comodidade, também aceitamos reservas via Airbnb.</p>
            </div>

            <div className="shadow-[0_3px_10px_rgb(20,39,74,0.2)] mt-10 rounded-md">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem><Image width={100} height={100} alt="room image" src="/assets/room.png" layout="responsive" /></CarouselItem>
                        <CarouselItem><Image width={100} height={100} alt="room image" src="/assets/room.png" layout="responsive" /></CarouselItem>
                        <CarouselItem><Image width={100} height={100} alt="room image" src="/assets/room.png" layout="responsive" /></CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>

                <div className="bg-[#14274A] text-center py-1">
                    <span className="text-white font-bold text-xl">Quarto Casal</span>
                </div>

                <div>
                    <Accordion type="single" collapsible className="px-5">
                        <AccordionItem value="item-1">
                            <AccordionTrigger><span className="gap-x-2 items-center flex text-md"><i className="uil uil-plus-circle text-md" /> Detalhes do quarto</span></AccordionTrigger>
                            <AccordionContent>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-users-alt" />2 pessoas</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-user-plus" />1 Adicional</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-temperature-quarter" />Climatizado</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Suíte</span>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="grid grid-cols-2 p-2 gap-x-2">
                        <Button variant={"outline"} className="items-center">
                            <Link href="https://wa.me/5527999167402?text=Ol%C3%A1%2C%20gostaria%20de%20reserva%20um%20quarto%20de%20casal%20!" className="gap-x-2 flex">
                                <i className="uil uil-whatsapp text-md" />
                                Reservar
                            </Link>
                        </Button>
                        <Button variant={"link"} className="items-center text-[#FF5252]">
                            <Link target="_blank" href="https://airbnb.com.br" className="flex gap-x-2 items-center">
                                <Image width={16} height={16} alt="airbnb logo" src="/assets/airbnb-color.svg" />
                                Airbnb
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="shadow-[0_3px_10px_rgb(20,39,74,0.2)] mt-10 rounded-md">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem><Image width={100} height={100} alt="room image" src="/assets/room-2.png" layout="responsive" /></CarouselItem>
                        <CarouselItem><Image width={100} height={100} alt="room image" src="/assets/room-2.png" layout="responsive" /></CarouselItem>
                        <CarouselItem><Image width={100} height={100} alt="room image" src="/assets/room-2.png" layout="responsive" /></CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>

                <div className="bg-[#14274A] text-center py-1">
                    <span className="text-white font-bold text-xl">Suíte Master</span>
                </div>

                <Accordion type="single" collapsible className="px-5">
                    <AccordionItem value="item-1">
                        <AccordionTrigger><span className="gap-x-2 items-center flex text-md"><i className="uil uil-plus-circle text-md" /> Detalhes do quarto</span></AccordionTrigger>
                        <AccordionContent>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-users-alt" />2 pessoas</span>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-user-plus" />2 Adicional</span>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-temperature-quarter" />Climatizado</span>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-bath" />Suíte com banheira</span>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div>
                    <div className="grid grid-cols-2 p-2 gap-x-2">
                        <Button variant={"outline"} className="items-center">
                            <Link href="https://wa.me/5527999167402?text=Ol%C3%A1%2C%20gostaria%20de%20reserva%20uma%20suíte%20master%20!" className="gap-x-2 flex">
                                <i className="uil uil-whatsapp text-md" />
                                Reservar
                            </Link>
                        </Button>
                        <Button variant={"link"} className="items-center text-[#FF5252]">
                            <Link target="_blank" href="https://airbnb.com.br" className="flex gap-x-2 items-center">
                                <Image width={16} height={16} alt="airbnb logo" src="/assets/airbnb-color.svg" />
                                Airbnb
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="shadow-[0_3px_10px_rgb(20,39,74,0.2)] mt-10 rounded-md">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem><Image width={100} height={100} alt="room image" src="/assets/cobertura.avif" className="max-h-60" layout="responsive" /></CarouselItem>
                        <CarouselItem><Image width={100} height={100} alt="room image" src="/assets/cobertura.avif" className="max-h-60" layout="responsive" /></CarouselItem>
                        <CarouselItem><Image width={100} height={100} alt="room image" src="/assets/cobertura.avif" className="max-h-60" layout="responsive" /></CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>

                <div className="bg-[#14274A] text-center py-1">
                    <span className="text-white font-bold text-xl">Cobertura</span>
                </div>

                <Accordion type="single" collapsible className="px-5">
                    <AccordionItem value="item-1">
                        <AccordionTrigger><span className="gap-x-2 items-center flex text-md"><i className="uil uil-plus-circle text-md" /> Detalhes do quarto</span></AccordionTrigger>
                        <AccordionContent>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-users-alt" />2 pessoas</span>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><Beef size={18} />Área de churrasco</span>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-mountains-sun" />Sacada</span>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><CookingPot size={18} />Cozinha</span>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-temperature-quarter" />Climatizado</span>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Suíte</span>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div>
                    <div className="grid grid-cols-2 p-2 gap-x-2">
                        <Button variant={"outline"} className="items-center">
                            <Link href="https://wa.me/5527999167402?text=Ol%C3%A1%2C%20gostaria%20de%20reserva%20a%20cobertura%20!" className="gap-x-2 flex">
                                <i className="uil uil-whatsapp text-md" />
                                Reservar
                            </Link>
                        </Button>
                        <Button variant={"link"} className="items-center text-[#FF5252]">
                            <Link target="_blank" href="https://airbnb.com.br" className="flex gap-x-2 items-center">
                                <Image width={16} height={16} alt="airbnb logo" src="/assets/airbnb-color.svg" />
                                Airbnb
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

        </main>
    )
}