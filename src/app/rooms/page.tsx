import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { mobilePhone } from "@/utils/contacts";
import { Beef, CookingPot } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Rooms() {
    return (
        <main className="min-h-screen py-32 md:py-40 lg:py-60 max-w-[90%] lg:max-w-[1200px] mx-auto">
            <div className="lg:px-20 p-5">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center">Nossos quartos</h1>
                <p className="text-xs md:text-sm lg:text-base font-medium text-center mt-4">Nossos quartos são suítes aconchegantes, climatizadas e equipadas com cama de casal e chuveiro eletrônico. Todos quartos contam com uma vista deslumbrante para o mar. Para maior comodidade, também aceitamos reservas via Airbnb.</p>
            </div>

              <div className="shadow-[0_3px_10px_rgb(20,39,74,0.2)] mt-10 rounded-md max-w-[800px] mx-auto">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/cobertura/cobertura.avif" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/cobertura/cobertura.avif" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/cobertura/cobertura.avif" className="object-cover" fill />
                        </CarouselItem>
                    </CarouselContent>

                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>


                <div className="bg-[#14274A] text-center py-1">
                    <span className="text-white font-bold text-xl">Cobertura</span>
                </div>

                <Accordion type="single" collapsible className="px-5">
                    <AccordionItem value="item-1">
                            <AccordionTrigger><span className="gap-x-2 items-center flex text-md md:text-lg"><i className="uil uil-plus-circle text-md" /> Detalhes do quarto</span></AccordionTrigger>
                        <AccordionContent>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-users-alt" />2 pessoas</span>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><Beef size={18} />Área de churrasco</span>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-mountains-sun" />Sacada</span>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><CookingPot size={18} />Cozinha</span>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-temperature-quarter" />Ambiente climatizado</span>
                            <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Suíte</span>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>

                <div>
                    <div className="grid grid-cols-2 p-2 gap-x-2">
                        <Button variant={"outline"} className="items-center">
                            <Link target="_blank" href={`https://wa.me/55${mobilePhone}?text=Ol%C3%A1%2C%20gostaria%20de%20reserva%20a%20cobertura%20!`} className="gap-x-2 flex">
                                <i className="uil uil-whatsapp text-md" />
                                Reservar
                            </Link>
                        </Button>
                        <Button variant={"link"} className="items-center text-[#FF5252]">
                            <Link target="_blank" href="https://airbnb.com.br" className="flex gap-x-2 items-center">
                                <Image width={16} height={16} alt="airbnb logo" src="/assets/icones/airbnb-color.svg" />
                                Airbnb
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

            <div className="shadow-[0_3px_10px_rgb(20,39,74,0.2)] mt-10 rounded-md max-w-[800px] mx-auto">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>

                <div className="bg-[#14274A] text-center py-1">
                    <span className="text-white font-bold text-xl">1203 - Serra</span>
                </div>

                <div>
                    <Accordion type="single" collapsible className="px-5">
                        <AccordionItem value="item-1">
                            <AccordionTrigger><span className="gap-x-2 items-center flex text-md md:text-lg"><i className="uil uil-plus-circle text-md" /> Detalhes do quarto</span></AccordionTrigger>
                            <AccordionContent>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-users-alt" />2 pessoas</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-temperature-quarter" />Climatizado</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Suíte</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Vista para o mar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Frigobar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />TV Smart</span>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="grid grid-cols-2 p-2 gap-x-2">
                        <Button variant={"outline"} className="items-center">
                            <Link target="_blank" href={`https://wa.me/55${mobilePhone}?text=Ol%C3%A1%2C%20gostaria%20de%20reservar%20o%20quarto%201203%20-%20Serra.`} className="gap-x-2 flex">
                                <i className="uil uil-whatsapp text-md" />
                                Reservar
                            </Link>
                        </Button>
                        <Button variant={"link"} className="items-center text-[#FF5252]">
                            <Link target="_blank" href="https://airbnb.com.br" className="flex gap-x-2 items-center">
                                <Image width={16} height={16} alt="airbnb logo" src="/assets/icones/airbnb-color.svg" />
                                Airbnb
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

                <div className="shadow-[0_3px_10px_rgb(20,39,74,0.2)] mt-10 rounded-md max-w-[800px] mx-auto">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/guarapari/guarapari1.jpeg" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>

                <div className="bg-[#14274A] text-center py-1">
                    <span className="text-white font-bold text-xl">1204 - Guarapari</span>
                </div>

                <div>
                    <Accordion type="single" collapsible className="px-5">
                        <AccordionItem value="item-1">
                            <AccordionTrigger><span className="gap-x-2 items-center flex text-md md:text-lg"><i className="uil uil-plus-circle text-md" /> Detalhes do quarto</span></AccordionTrigger>
                            <AccordionContent>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-users-alt" />2 pessoas</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-temperature-quarter" />Climatizado</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Suíte</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Vista para o mar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Frigobar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />TV Smart</span>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="grid grid-cols-2 p-2 gap-x-2">
                        <Button variant={"outline"} className="items-center">
                            <Link target="_blank" href={`https://wa.me/55${mobilePhone}?text=Ol%C3%A1%2C%20gostaria%20de%20reservar%20o%20quarto%201204%20-%20Guarapari.`} className="gap-x-2 flex">
                                <i className="uil uil-whatsapp text-md" />
                                Reservar
                            </Link>
                        </Button>
                        <Button variant={"link"} className="items-center text-[#FF5252]">
                            <Link target="_blank" href="https://airbnb.com.br" className="flex gap-x-2 items-center">
                                <Image width={16} height={16} alt="airbnb logo" src="/assets/icones/airbnb-color.svg" />
                                Airbnb
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

                    <div className="shadow-[0_3px_10px_rgb(20,39,74,0.2)] mt-10 rounded-md max-w-[800px] mx-auto">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>

                <div className="bg-[#14274A] text-center py-1">
                    <span className="text-white font-bold text-xl">1205 - Aracruz</span>
                </div>

                <div>
                    <Accordion type="single" collapsible className="px-5">
                        <AccordionItem value="item-1">
                            <AccordionTrigger><span className="gap-x-2 items-center flex text-md md:text-lg"><i className="uil uil-plus-circle text-md" /> Detalhes do quarto</span></AccordionTrigger>
                            <AccordionContent>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-users-alt" />2 pessoas</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-temperature-quarter" />Climatizado</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Suíte</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Vista para o mar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Frigobar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />TV Smart</span>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="grid grid-cols-2 p-2 gap-x-2">
                        <Button variant={"outline"} className="items-center">
                            <Link target="_blank" href={`https://wa.me/55${mobilePhone}?text=Ol%C3%A1%2C%20gostaria%20de%20reservar%20o%20quarto%201205%20-%20Aracruz.`} className="gap-x-2 flex">
                                <i className="uil uil-whatsapp text-md" />
                                Reservar
                            </Link>
                        </Button>
                        <Button variant={"link"} className="items-center text-[#FF5252]">
                            <Link target="_blank" href="https://airbnb.com.br" className="flex gap-x-2 items-center">
                                <Image width={16} height={16} alt="airbnb logo" src="/assets/icones/airbnb-color.svg" />
                                Airbnb
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

                      <div className="shadow-[0_3px_10px_rgb(20,39,74,0.2)] mt-10 rounded-md max-w-[800px] mx-auto">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/domingos-martins/domingos-martins1.jpeg" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>

                <div className="bg-[#14274A] text-center py-1">
                    <span className="text-white font-bold text-xl">1206 - Domingos Martins</span>
                </div>

                <div>
                    <Accordion type="single" collapsible className="px-5">
                        <AccordionItem value="item-1">
                            <AccordionTrigger><span className="gap-x-2 items-center flex text-md md:text-lg"><i className="uil uil-plus-circle text-md" /> Detalhes do quarto</span></AccordionTrigger>
                            <AccordionContent>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-users-alt" />2 pessoas</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-temperature-quarter" />Climatizado</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Suíte</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Vista para o mar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Frigobar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />TV Smart</span>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="grid grid-cols-2 p-2 gap-x-2">
                        <Button variant={"outline"} className="items-center">
                            <Link target="_blank" href={`https://wa.me/55${mobilePhone}?text=Ol%C3%A1%2C%20gostaria%20de%20reservar%20o%20quarto%201206%20-%20Domingos%20Martins.`} className="gap-x-2 flex">
                                <i className="uil uil-whatsapp text-md" />
                                Reservar
                            </Link>
                        </Button>
                        <Button variant={"link"} className="items-center text-[#FF5252]">
                            <Link target="_blank" href="https://airbnb.com.br" className="flex gap-x-2 items-center">
                                <Image width={16} height={16} alt="airbnb logo" src="/assets/icones/airbnb-color.svg" />
                                Airbnb
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

                          <div className="shadow-[0_3px_10px_rgb(20,39,74,0.2)] mt-10 rounded-md max-w-[800px] mx-auto">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>

                <div className="bg-[#14274A] text-center py-1">
                    <span className="text-white font-bold text-xl">1207 - Marataízes</span>
                </div>

                <div>
                    <Accordion type="single" collapsible className="px-5">
                        <AccordionItem value="item-1">
                            <AccordionTrigger><span className="gap-x-2 items-center flex text-md md:text-lg"><i className="uil uil-plus-circle text-md" /> Detalhes do quarto</span></AccordionTrigger>
                            <AccordionContent>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-users-alt" />2 pessoas</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-temperature-quarter" />Climatizado</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Suíte</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Vista para o mar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Frigobar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />TV Smart</span>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="grid grid-cols-2 p-2 gap-x-2">
                        <Button variant={"outline"} className="items-center">
                            <Link target="_blank" href={`https://wa.me/55${mobilePhone}?text=Ol%C3%A1%2C%20gostaria%20de%20reservar%20o%20quarto%201207%20-%20Marataízes.`} className="gap-x-2 flex">
                                <i className="uil uil-whatsapp text-md" />
                                Reservar
                            </Link>
                        </Button>
                        <Button variant={"link"} className="items-center text-[#FF5252]">
                            <Link target="_blank" href="https://airbnb.com.br" className="flex gap-x-2 items-center">
                                <Image width={16} height={16} alt="airbnb logo" src="/assets/icones/airbnb-color.svg" />
                                Airbnb
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

                                <div className="shadow-[0_3px_10px_rgb(20,39,74,0.2)] mt-10 rounded-md max-w-[800px] mx-auto">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/piuma/piuma1.jpeg" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>

                <div className="bg-[#14274A] text-center py-1">
                    <span className="text-white font-bold text-xl">1208 - Piúma</span>
                </div>

                <div>
                    <Accordion type="single" collapsible className="px-5">
                        <AccordionItem value="item-1">
                            <AccordionTrigger><span className="gap-x-2 items-center flex text-md md:text-lg"><i className="uil uil-plus-circle text-md" /> Detalhes do quarto</span></AccordionTrigger>
                            <AccordionContent>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-users-alt" />2 pessoas</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-temperature-quarter" />Climatizado</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Suíte</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Vista para o mar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Frigobar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />TV Smart</span>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="grid grid-cols-2 p-2 gap-x-2">
                        <Button variant={"outline"} className="items-center">
                            <Link target="_blank" href={`https://wa.me/55${mobilePhone}?text=Ol%C3%A1%2C%20gostaria%20de%20reservar%20o%20quarto%201208%20-%20Piúma.`} className="gap-x-2 flex">
                                <i className="uil uil-whatsapp text-md" />
                                Reservar
                            </Link>
                        </Button>
                        <Button variant={"link"} className="items-center text-[#FF5252]">
                            <Link target="_blank" href="https://airbnb.com.br" className="flex gap-x-2 items-center">
                                <Image width={16} height={16} alt="airbnb logo" src="/assets/icones/airbnb-color.svg" />
                                Airbnb
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

                                    <div className="shadow-[0_3px_10px_rgb(20,39,74,0.2)] mt-10 rounded-md max-w-[800px] mx-auto">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/itapemirim/itapemirim1.jpeg" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>

                <div className="bg-[#14274A] text-center py-1">
                    <span className="text-white font-bold text-xl">1209 - Itapemirim</span>
                </div>

                <div>
                    <Accordion type="single" collapsible className="px-5">
                        <AccordionItem value="item-1">
                            <AccordionTrigger><span className="gap-x-2 items-center flex text-md md:text-lg"><i className="uil uil-plus-circle text-md" /> Detalhes do quarto</span></AccordionTrigger>
                            <AccordionContent>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-users-alt" />2 pessoas</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-temperature-quarter" />Climatizado</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Suíte</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Vista para o mar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Frigobar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />TV Smart</span>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="grid grid-cols-2 p-2 gap-x-2">
                        <Button variant={"outline"} className="items-center">
                            <Link target="_blank" href={`https://wa.me/55${mobilePhone}?text=Ol%C3%A1%2C%20gostaria%20de%20reservar%20o%20quarto%201209%20-%20Itapemirim.`} className="gap-x-2 flex">
                                <i className="uil uil-whatsapp text-md" />
                                Reservar
                            </Link>
                        </Button>
                        <Button variant={"link"} className="items-center text-[#FF5252]">
                            <Link target="_blank" href="https://airbnb.com.br" className="flex gap-x-2 items-center">
                                <Image width={16} height={16} alt="airbnb logo" src="/assets/icones/airbnb-color.svg" />
                                Airbnb
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

                                           <div className="shadow-[0_3px_10px_rgb(20,39,74,0.2)] mt-10 rounded-md max-w-[800px] mx-auto">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/vitoria/vitoria1.jpeg" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>

                <div className="bg-[#14274A] text-center py-1">
                    <span className="text-white font-bold text-xl">1210 - Vitória</span>
                </div>

                <div>
                    <Accordion type="single" collapsible className="px-5">
                        <AccordionItem value="item-1">
                            <AccordionTrigger><span className="gap-x-2 items-center flex text-md md:text-lg"><i className="uil uil-plus-circle text-md" /> Detalhes do quarto</span></AccordionTrigger>
                            <AccordionContent>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-users-alt" />2 pessoas</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-temperature-quarter" />Climatizado</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Suíte</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Vista para o mar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Frigobar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />TV Smart</span>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="grid grid-cols-2 p-2 gap-x-2">
                        <Button variant={"outline"} className="items-center">
                            <Link target="_blank" href={`https://wa.me/55${mobilePhone}?text=Ol%C3%A1%2C%20gostaria%20de%20reservar%20o%20quarto%201210%20-%20Vitória.`} className="gap-x-2 flex">
                                <i className="uil uil-whatsapp text-md" />
                                Reservar
                            </Link>
                        </Button>
                        <Button variant={"link"} className="items-center text-[#FF5252]">
                            <Link target="_blank" href="https://airbnb.com.br" className="flex gap-x-2 items-center">
                                <Image width={16} height={16} alt="airbnb logo" src="/assets/icones/airbnb-color.svg" />
                                Airbnb
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

                                             <div className="shadow-[0_3px_10px_rgb(20,39,74,0.2)] mt-10 rounded-md max-w-[800px] mx-auto">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/pedra-azul/pedra-azul1.jpeg" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>

                <div className="bg-[#14274A] text-center py-1">
                    <span className="text-white font-bold text-xl">1211 - Pedra Azul</span>
                </div>

                <div>
                    <Accordion type="single" collapsible className="px-5">
                        <AccordionItem value="item-1">
                            <AccordionTrigger><span className="gap-x-2 items-center flex text-md md:text-lg"><i className="uil uil-plus-circle text-md" /> Detalhes do quarto</span></AccordionTrigger>
                            <AccordionContent>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-users-alt" />2 pessoas</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-temperature-quarter" />Climatizado</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Suíte</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Vista para o mar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Frigobar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />TV Smart</span>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="grid grid-cols-2 p-2 gap-x-2">
                        <Button variant={"outline"} className="items-center">
                            <Link target="_blank" href={`https://wa.me/55${mobilePhone}?text=Ol%C3%A1%2C%20gostaria%20de%20reservar%20o%20quarto%201211%20-%20Pedra%20Azul.`} className="gap-x-2 flex">
                                <i className="uil uil-whatsapp text-md" />
                                Reservar
                            </Link>
                        </Button>
                        <Button variant={"link"} className="items-center text-[#FF5252]">
                            <Link target="_blank" href="https://airbnb.com.br" className="flex gap-x-2 items-center">
                                <Image width={16} height={16} alt="airbnb logo" src="/assets/icones/airbnb-color.svg" />
                                Airbnb
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>

                                             <div className="shadow-[0_3px_10px_rgb(20,39,74,0.2)] mt-10 rounded-md max-w-[800px] mx-auto">
                <Carousel>
                    <CarouselContent>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/vila-velha/vila-velha1.jpeg" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                        <CarouselItem className="relative w-full h-[300px] md:h-[500px]">
                            <Image alt="room image" src="/assets/rooms/room.png" className="object-cover" fill />
                        </CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious className="ml-14" />
                    <CarouselNext className="mr-14" />
                </Carousel>

                <div className="bg-[#14274A] text-center py-1">
                    <span className="text-white font-bold text-xl">1212 - Vila Velha</span>
                </div>

                <div>
                    <Accordion type="single" collapsible className="px-5">
                        <AccordionItem value="item-1">
                            <AccordionTrigger><span className="gap-x-2 items-center flex text-md md:text-lg"><i className="uil uil-plus-circle text-md" /> Detalhes do quarto</span></AccordionTrigger>
                            <AccordionContent>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-users-alt" />2 pessoas</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-temperature-quarter" />Climatizado</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Suíte</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Vista para o mar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />Frigobar</span>
                                <span className="flex items-center gap-x-2 text-sm font-semibold"><i className="text-lg uil uil-toilet-paper" />TV Smart</span>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>

                    <div className="grid grid-cols-2 p-2 gap-x-2">
                        <Button variant={"outline"} className="items-center">
                            <Link target="_blank" href={`https://wa.me/55${mobilePhone}?text=Ol%C3%A1%2C%20gostaria%20de%20reservar%20o%20quarto%201212%20-%20Vila%20Velha.`} className="gap-x-2 flex">
                                <i className="uil uil-whatsapp text-md" />
                                Reservar
                            </Link>
                        </Button>
                        <Button variant={"link"} className="items-center text-[#FF5252]">
                            <Link target="_blank" href="https://airbnb.com.br" className="flex gap-x-2 items-center">
                                <Image width={16} height={16} alt="airbnb logo" src="/assets/icones/airbnb-color.svg" />
                                Airbnb
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </main>
    )
}