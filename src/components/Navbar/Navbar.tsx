import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";
import { Mail, Phone } from "lucide-react";
import { email, mobilePhone } from "@/utils/contacts";
import { Button } from "../ui/button";
import { logoFont } from "@/app/layout";

export default function Navbar() {

    return (
        <>
            <nav className="fixed top-0 w-full py-3.5 md:flex justify-around hidden border-b border bg-background z-50 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <section className="flex lg:gap-x-20 items-center">
                    <Link href="/" className={`flex flex-col items-center rounded-full leading-none text-xl font-extrabold ${logoFont.className} antialiased`}>
                        <span>Riviera</span>
                        <span>Sanary</span>
                    </Link>
                    <ul className="flex font-normal gap-x-3 text-sm bg-background">
                        <Link className="pr-3" href="/"><li>Início</li></Link>
                        <Link className="pr-3" href="/rooms"><li>Acomodações</li></Link>
                        <Link href="/contact"><li>Contato</li></Link>
                    </ul>
                </section>


                <section className="flex items-center justify-between gap-x-5">
                    <Link target="_blank" href={`https://wa.me/55${mobilePhone}?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informações.`}>
                        <Button className="cursor-pointer items-center rounded-full p-3 md:p-5 border-black" variant={"outline"}>
                            <p>RESERVAR</p> <i className="uil uil-whatsapp text-green-600 text-xl" />
                        </Button>
                    </Link>
                    <Link href="https://airbnb.com.br" target="_blank">
                        <Button className="cursor-pointer items-center rounded-full p-3 md:p-5 hover:bg-background hover:border-foreground hover:border hover:text-foreground" variant={"default"}>
                            <p>RESERVAR</p> <Image src="/assets/icones/airbnb-color.svg" alt="logo airbnb" width={20} height={20} />
                        </Button>
                    </Link>
                </section>
            </nav>

            {/* Navbar Mobile */}
            <nav className="flex md:hidden w-full justify-between fixed z-50 py-3 px-5 items-center bg-background shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <Link href="/" className={`flex flex-col items-center rounded-full leading-none text-xl font-extrabold ${logoFont.className} antialiased`}>
                    <span>Riviera</span>
                    <span>Sanary</span>
                </Link>

                <Sheet>
                    <SheetTrigger className="text-2xl py-1 px-2 rounded-md"><i className="uil uil-bars" /></SheetTrigger>
                    <SheetContent side="right" className="w-screen h-screen flex flex-col items-center justify-center gap-10 text-xl font-semibold">
                        <SheetTitle className="sr-only" />

                        <SheetClose className="absolute top-5 right-5 text-2xl transition" asChild>
                            <i className="uil uil-times" />
                        </SheetClose>
                        <Link href="/" className={`flex flex-col items-center rounded-full leading-none text-xl font-extrabold fixed top-3 left-4 ${logoFont.className} antialiased`}>
                            <span>Riviera</span>
                            <span>Sanary</span>
                        </Link>

                        <SheetClose asChild>
                            <Link href="/">Início</Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href="/rooms">Acomodações</Link>
                        </SheetClose>
                        <SheetClose asChild>
                            <Link href="/contact">Contato</Link>
                        </SheetClose>
                    </SheetContent>
                </Sheet>
            </nav>
        </>
    );
}
