"use client"

import Image from "next/image";
import Link from "next/link";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "../ui/sheet";
import { mobilePhone } from "@/shared/utils/contacts";
import { Button } from "../ui/button";
import { logoFont } from "@/app/layout";
import SocialButtonSignin from "@/features/auth/components/SocialButtonSignin";
import { useState } from "react";
import { toast } from "sonner";
import { Menu, X } from "lucide-react";
import { authClient } from "@/features/auth/auth-client";

export default function Navbar() {
    const [loadingSocial, setLoadingSocial] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const { data: session } = authClient.useSession()

    async function handleSocialLoginGoogle() {
        setLoadingSocial(true);

        await authClient.signIn.social(
            {
                provider: "google",
                callbackURL: "/booking",
            },
            {
                onError: () => {
                    setLoadingSocial(false);
                    toast.error("Erro ao entrar com Google");
                },
            },
        );
    }

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
                    <Link href="https://airbnb.com.br" target="_blank">
                        <Button className="cursor-pointer items-center border rounded-full p-3 md:p-5 hover:bg-background hover:border-foreground hover:border hover:text-foreground" variant={"default"}>
                            <p>RESERVAR</p> <Image src="/assets/icones/airbnb-color.svg" alt="logo airbnb" width={20} height={20} />
                        </Button>
                    </Link>
                    <Link target="_blank" href={`https://wa.me/55${mobilePhone}?text=Ol%C3%A1%2C%20gostaria%20de%20mais%20informações.`}>
                        <Button className="cursor-pointer items-center rounded-full p-3 md:p-5 border-black" variant={"outline"}>
                            <p>RESERVAR</p> <i className="uil uil-whatsapp text-green-600 text-xl" />
                        </Button>
                    </Link>
                </section>
            </nav>

            {/* Navbar Mobile */}
            <nav className="flex md:hidden w-full justify-between fixed top-0 z-50 py-3 px-5 bg-background shadow">
                <Link href="/" className={`flex flex-col items-center rounded-full leading-none text-xl font-extrabold ${logoFont.className} antialiased`}>
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
                        </div>
                        {!session
                            ?
                            <SocialButtonSignin
                                provider="google"
                                text={`Reservar / Acessar`}
                                icon={
                                    <svg width="20" height="20" viewBox="0 0 48 48">
                                        {" "}
                                        <path
                                            fill="#FFC107"
                                            d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                                        />{" "}
                                        <path
                                            fill="#FF3D00"
                                            d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                                        />{" "}
                                        <path
                                            fill="#4CAF50"
                                            d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                                        />{" "}
                                        <path
                                            fill="#1976D2"
                                            d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                                        />{" "}
                                    </svg>
                                }
                                onClick={handleSocialLoginGoogle}
                                loading={
                                    loadingSocial
                                }
                                selected={loadingSocial}
                            />
                            :
                            <Link href={"/booking"}>
                                <SheetClose asChild>
                                    <Button className="flex cursor-pointer mx-auto rounded-full bg-white border-muted-foreground" variant={"outline"}>
                                        Reservar agora
                                    </Button>
                                </SheetClose>
                            </Link>
                        }

                    </SheetContent>
                </Sheet>
            </nav>
        </>
    );
}
