'use client'

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Mail, Phone } from "lucide-react";
import { email, mobilePhone } from "@/utils/contacts";
import { Button } from "../ui/button";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleNavigate = (href: string) => {
        setIsOpen(false);
        router.push(href);
    };

    return (
        <>
            <nav className="fixed top-0 w-full py-3.5 md:flex justify-around hidden border-b border bg-background z-50 border-black">
                <Link href="/" className="flex flex-col items-center hover:bg-black/80 bg-black rounded-full px-1 py-0.5">
                    <Image width={50} height={50} alt="logo" src={'/assets/logos/logo-1.png'} />
                </Link>

                <section className="flex items-center justify-between gap-x-5 lg:gap-x-10">
                    <ul className="flex font-medium gap-x-5 text-base bg-background">
                        <Link className="border-r pr-5 border-black" href="/rooms"><li>Acomodações</li></Link>
                        <Link className="border-r pr-5 border-black" href="/facilities"><li>Instalações</li></Link>
                        <Link href="/contact"><li>Contato</li></Link>
                    </ul>
                    <div>
                        <Link href="https://airbnb.com.br" target="_blank">
                            <Button className="cursor-pointer items-center border-r-none rounded-l-full py-5 border-black" variant={"outline"}>
                                <p>RESERVAR</p> <Image src="/assets/icones/airbnb-color.svg" alt="logo airbnb" width={20} height={20} />
                            </Button>
                        </Link>
                        <Link target="_blank" href={`https://wa.me/55${mobilePhone}?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informações.`}>
                            <Button className="cursor-pointer items-center border-l-none rounded-r-full py-5 border-black" variant={"outline"}>
                                <p>RESERVAR</p> <i className="uil uil-whatsapp text-green-600 text-xl" />
                            </Button>
                        </Link>
                    </div>
                </section>
            </nav>

            {/* Navbar Mobile */}
            <nav className="flex md:hidden w-full justify-between fixed z-50 pb-2 px-5 items-center bg-background">
                <Link href="/" className="flex flex-col items-center hover:bg-black/80 bg-black rounded-full px-1 py-0.5 my-2">
                    <Image width={50} height={50} alt="logo" src={'/assets/logos/logo-1.png'} />
                </Link>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger className="text-2xl py-1 px-2 rounded-md"><i className="uil uil-bars" /></SheetTrigger>
                    <SheetContent side="right" className="w-screen h-screen flex flex-col items-center justify-center gap-10 text-xl font-semibold">
                        <SheetTitle className="sr-only" />

                        <SheetClose className="absolute top-5 right-5 text-2xl transition" asChild>
                            <i className="uil uil-times" />
                        </SheetClose>
                        <Link href="/" className="flex flex-col items-center hover:bg-black/80 bg-black rounded-full top-2 fixed left-4 px-1 py-0.5">
                            <Image width={50} height={50} alt="logo" src={'/assets/logos/logo-1.png'} />
                        </Link>

                        <button onClick={() => handleNavigate("/")}>Início</button>
                        <button onClick={() => handleNavigate("/rooms")}>Acomodações</button>
                        <button onClick={() => handleNavigate("/facilities")}>Instalações</button>
                        <button onClick={() => handleNavigate("/contact")}>Contato</button>
                    </SheetContent>
                </Sheet>
            </nav>
        </>
    );
}
