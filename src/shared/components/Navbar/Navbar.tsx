"use client"

import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { mobilePhone } from "@/shared/utils/contacts";
import { Button } from "../ui/button";
import { logoFont } from "@/app/layout";
import SocialButtonSignin from "@/features/auth/components/SocialButtonSignin";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import { authClient } from "@/features/auth/auth-client";

export default function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { data: session } = authClient.useSession()



    return (
        <>
            <nav className="fixed top-0 w-full py-3.5 md:flex justify-around hidden border-b border bg-background z-50 shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
                <section className="flex lg:gap-x-20 items-center">
                    <Link href="/" className={`flex flex-col items-center rounded-full leading-none text-xl font-extrabold ${logoFont.className} antialiased`}>
                        <span>Riviera</span>
                        <span>Sanary</span>
                    </Link>
                    <ul className="flex font-normal gap-x-3 text-sm bg-background">
                        <Link className="pr-3 font-medium" href="/"><li>Início</li></Link>
                        <Link className="pr-3 font-medium" href="/rooms"><li>Acomodações</li></Link>
                        <Link className="font-medium" href="/contact"><li>Contato</li></Link>
                    </ul>
                </section>
                <div>
                    <SocialButtonSignin showSignout />
                </div>
            </nav>

            {/* Navbar Mobile */}
            <nav className="flex md:hidden w-full justify-between fixed top-0 z-50 py-3 px-5 bg-background shadow">
                <Link href="/" className={`flex flex-col items-center rounded-full leading-none text-lg font-extrabold ${logoFont.className} antialiased`}>
                    <span>Riviera</span>
                    <span>Sanary</span>
                </Link>

                <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
                    <SheetTrigger className="flex items-center justify-center pr-2">
                        <Menu className={`        absolute transition-all duration-200 cursor-pointer        ${isMenuOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"}      `} />
                        <X className={`        absolute transition-all duration-200 cursor-pointer        ${isMenuOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"}      `} />
                    </SheetTrigger>
                    <SheetContent side="top" className="top-[64px] w-full h-auto z-40 bg-background py-6">
                        <SheetTitle className="sr-only" />
                        <SheetDescription className="sr-only" />
                        <div className="flex flex-col items-center gap-6 mb-2 text-lg font-semibold">
                            <SheetClose asChild>
                                <Link href="/">Início</Link>
                            </SheetClose>

                            <SheetClose asChild>
                                <Link href="/rooms">Acomodações</Link>
                            </SheetClose>

                            <SheetClose asChild>
                                <Link href="/contact">Contato</Link>
                            </SheetClose>
                            <SheetClose asChild>
                                <SocialButtonSignin showSignout classNameLogged="mx-auto flex w-full" />
                            </SheetClose>
                        </div>
                    </SheetContent>
                </Sheet>
            </nav>
        </>
    );
}
