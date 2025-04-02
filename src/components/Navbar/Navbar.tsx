"use client"; // Importante para componentes interativos

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleNavigate = (href: string) => {
        setIsOpen(false);
        router.push(href);
    };

    return (
        <>
            {/* Navbar Desktop */}
            <nav className="bg-background hidden lg:flex items-center justify-around fixed w-full z-50">
                <Link href="/">
                    <Image
                        width={180}
                        height={180}
                        alt="sanary logo"
                        src="/assets/full-logo.png"
                        className="p-5 bg-white shadow-[0_1px_5px_var(--border)] hover:bg-border transition duration-75 rounded-b-3xl"
                    />
                </Link>
                <ul className="flex font-semibold gap-x-3 py-5 lg:gap-x-18 lg:text-xl">
                    <Link href="/"><li>Início</li></Link>
                    <Link href="/rooms"><li>Acomodações</li></Link>
                    <Link href="/facilities"><li>Facilidades</li></Link>
                    <Link href="/contact"><li>Contato</li></Link>
                </ul>
            </nav>

            {/* Navbar Mobile */}
            <nav className="flex lg:hidden w-full justify-between fixed z-50 pb-2 px-5 items-center bg-background">
                <Link href="/">
                    <Image
                        width={100}
                        height={100}
                        alt="sanary logo"
                        src="/assets/full-logo.png"
                        className="p-5 ml-5 bg-white shadow-[0_1px_5px_var(--border)] hover:bg-border transition duration-75 rounded-b-3xl"
                    />
                </Link>

                <Sheet open={isOpen} onOpenChange={setIsOpen}>
                    <SheetTrigger className="text-2xl py-1 px-2 rounded-md"><i className="uil uil-bars" /></SheetTrigger>
                    <SheetContent side="right" className="w-screen h-screen flex flex-col items-center justify-center gap-10 text-xl font-semibold">
                        <SheetTitle className="sr-only" />

                        <SheetClose className="absolute top-5 right-5 text-2xl transition" asChild>
                            <i className="uil uil-times" />
                        </SheetClose>
                        <Image
                            width={100}
                            height={100}
                            alt="sanary logo"
                            src="/assets/full-logo.png"
                            className="p-5 bg-white shadow-[0_1px_5px_var(--border)] hover:bg-border transition duration-75 rounded-b-3xl fixed top-0"
                        />

                        <button onClick={() => handleNavigate("/")}>Início</button>
                        <button onClick={() => handleNavigate("/rooms")}>Acomodações</button>
                        <button onClick={() => handleNavigate("/facilities")}>Facilidades</button>
                        <button onClick={() => handleNavigate("/contact")}>Contato</button>
                    </SheetContent>
                </Sheet>
            </nav>
        </>
    );
}
